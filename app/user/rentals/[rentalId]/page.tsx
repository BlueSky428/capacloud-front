'use client';

import { use, useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import Link from 'next/link';
import { ArrowLeft, Clock, Cpu, DollarSign, CheckCircle, XCircle, Loader, Terminal, Copy, Check, ExternalLink, AlertCircle } from 'lucide-react';
import { notifications } from '@/lib/notifications';

interface RentalData {
  id: string;
  rentalId: string;
  gpuType: string;
  provider: string;
  providerAccountId: string;
  status: string;
  startedAt: string;
  endedAt?: string | null;
  totalCost: number;
  hoursUsed: number;
  sshHost?: string | null;
  sshPort?: number | null;
  sshUser?: string | null;
  gpuMemory?: number;
  gpuUtilization?: number | null;
  temperature?: number | null;
  powerUsage?: number | null;
  machineId?: string;
  selectedSshKeyIds?: string[];
}

const statusIcons = {
  active: Loader,
  completed: CheckCircle,
  cancelled: XCircle,
};

export default function RentalDetailsPage({ params }: { params: Promise<{ rentalId: string }> }) {
  const { rentalId } = use(params);
  const { connected, publicKey } = useWallet();
  const [rental, setRental] = useState<RentalData | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState<string | null>(null);
  const [sshKeys, setSshKeys] = useState<Array<{ id: string; name: string; publicKey: string }>>([]);
  const [showSSHKeyChange, setShowSSHKeyChange] = useState(false);
  const [selectedSshKeyIds, setSelectedSshKeyIds] = useState<string[]>([]);
  const [updatingSSHKeys, setUpdatingSSHKeys] = useState(false);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (connected) {
      loadRentalDetails();
    } else {
      setLoading(false);
    }
  }, [connected, rentalId]);

  // Start polling for metrics updates when rental becomes active
  useEffect(() => {
    if (rental?.status === 'active' && publicKey) {
      // Load metrics immediately
      loadMetrics();
      
      // Start polling for metrics updates every 5 seconds
      const interval = setInterval(() => {
        loadMetrics();
      }, 5000); // Poll every 5 seconds
      
      return () => {
        clearInterval(interval);
      };
    }
  }, [rental?.status, rentalId, publicKey]);

  const loadRentalDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/rentals/${rentalId}`);
      const data = await response.json();

      if (data.success && data.rental) {
        const machine = data.machine || {};
        const providerName = data.rental.providerAccountId 
          ? `${data.rental.providerAccountId.slice(0, 4)}...${data.rental.providerAccountId.slice(-4)}`
          : 'Unknown Provider';

        setRental({
          id: data.rental.rentalId,
          rentalId: data.rental.rentalId,
          gpuType: machine.gpuType || 'Unknown GPU',
          provider: providerName,
          providerAccountId: data.rental.providerAccountId,
          status: data.rental.status,
          startedAt: data.rental.startedAt,
          endedAt: data.rental.endedAt || null,
          totalCost: data.rental.totalCost || 0,
          hoursUsed: data.rental.hoursUsed || 0,
          sshHost: data.rental.sshHost || machine.hostname || null,
          sshPort: data.rental.sshPort || machine.sshPort || null,
          sshUser: data.rental.sshUser || 'root',
          gpuMemory: machine.gpuMemory,
          gpuUtilization: machine.gpuUtilization ?? 0,
          temperature: machine.temperature ?? null,
          powerUsage: machine.powerUsage ?? null,
          machineId: data.rental.machineId?.toString(),
          selectedSshKeyIds: data.rental.selectedSshKeyIds || [],
        });

        // Load initial metrics
        if (data.rental.status === 'active') {
          loadMetrics();
        }
      } else {
        notifications.error(data.error || 'Failed to load rental details');
      }
    } catch (error) {
      console.error('Error loading rental details:', error);
      notifications.error('Failed to load rental details');
    } finally {
      setLoading(false);
    }
  };

  const loadMetrics = async () => {
    if (!publicKey) return;

    try {
      const response = await fetch(
        `/api/rentals/${rentalId}/metrics?walletAddress=${publicKey.toString()}`
      );
      const data = await response.json();

      if (data.success && data.metrics) {
        setRental(prev => {
          if (!prev) return null;
          return {
            ...prev,
            gpuUtilization: data.metrics.gpuUtilization ?? 0,
            temperature: data.metrics.temperature ?? null,
            powerUsage: data.metrics.powerUsage ?? null,
          };
        });
      }
    } catch (error) {
      // Silent fail for metrics polling - don't show errors
      console.error('Error loading metrics:', error);
    }
  };

  if (!connected) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
          <h2 className="text-lg font-medium text-yellow-800 dark:text-yellow-200 mb-2">
            Wallet Not Connected
          </h2>
          <p className="text-yellow-700 dark:text-yellow-300">
            Please connect your Solana wallet to view rental details.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading rental details...</p>
        </div>
      </div>
    );
  }

  if (!rental) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
          <h2 className="text-lg font-medium text-red-800 dark:text-red-200 mb-2">
            Rental Not Found
          </h2>
          <p className="text-red-700 dark:text-red-300">
            The requested rental could not be found.
          </p>
          <Link
            href="/user/rentals/list"
            className="mt-4 inline-flex items-center text-sm text-red-600 dark:text-red-400 hover:underline"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Rentals
          </Link>
        </div>
      </div>
    );
  }

  const StatusIcon = statusIcons[rental.status as keyof typeof statusIcons];

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    notifications.success('Copied to clipboard', { duration: 2000 });
    setTimeout(() => setCopied(null), 2000);
  };

  const loadSSHKeys = async () => {
    if (!publicKey) return;
    
    try {
      const response = await fetch(`/api/user/ssh-keys?walletAddress=${publicKey.toString()}`);
      const data = await response.json();
      
      if (data.success) {
        setSshKeys(data.sshKeys || []);
      }
    } catch (error) {
      console.error('Error loading SSH keys:', error);
    }
  };

  const handleUpdateSSHKeys = async () => {
    if (!publicKey || !rentalId || selectedSshKeyIds.length === 0) {
      notifications.error('Please select at least one SSH key');
      return;
    }

    try {
      setUpdatingSSHKeys(true);
      const response = await fetch(`/api/rentals/${rentalId}/ssh-keys`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          walletAddress: publicKey.toString(),
          selectedSshKeyIds: selectedSshKeyIds,
        }),
      });

      const data = await response.json();
      if (data.success) {
        notifications.success('SSH keys updated successfully');
        setShowSSHKeyChange(false);
        setSelectedSshKeyIds([]);
        // Reload rental to get updated info
        loadRentalDetails();
      } else {
        notifications.error(data.error || 'Failed to update SSH keys');
      }
    } catch (error) {
      console.error('Error updating SSH keys:', error);
      notifications.error('Failed to update SSH keys');
    } finally {
      setUpdatingSSHKeys(false);
    }
  };

  // SSH command requires IP address or hostname (not localhost)
  // Users use their own SSH keys, so we show a generic command
  const sshCommand = rental && rental.sshHost && rental.sshHost !== 'localhost' && rental.sshHost.trim() !== ''
    ? `ssh -i ~/.ssh/your_key ${rental.sshUser || 'root'}@${rental.sshHost}${rental.sshPort && rental.sshPort !== 22 ? ` -p ${rental.sshPort}` : ''}`
    : null;

  const handleRentalAction = async (action: 'pause' | 'resume' | 'stop') => {
    if (processing) return;

    try {
      setProcessing(true);
      const loadingToast = notifications.loading(
        action === 'pause' ? 'Pausing rental...' :
        action === 'resume' ? 'Resuming rental...' :
        'Ending rental session...'
      );

      const response = await fetch(`/api/rentals/${rentalId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action }),
      });

      const data = await response.json();

      notifications.dismiss(loadingToast);

      if (data.success) {
        notifications.success(
          action === 'pause' ? 'Rental paused successfully' :
          action === 'resume' ? 'Rental resumed successfully' :
          'Rental session ended successfully',
          { duration: 3000 }
        );
        // Reload page to show updated status
        setTimeout(() => window.location.reload(), 1000);
      } else {
        notifications.error(data.error || `Failed to ${action} rental`, { duration: 4000 });
      }
    } catch (error) {
      notifications.error(`Failed to ${action} rental`, { duration: 4000 });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href="/user/rentals/list"
        className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Rentals
      </Link>

      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {rental.gpuType} - {rental.provider}
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Rental ID: {rental.id}</p>
          </div>
          <div className="flex items-center space-x-2">
            <StatusIcon className={`w-6 h-6 text-gray-400 ${rental.status === 'active' ? 'animate-spin' : ''}`} />
            <span className="text-lg font-medium text-gray-900 dark:text-white capitalize">
              {rental.status}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Connection Options - Only for active rentals */}
          {rental.status === 'active' && (
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                  <Terminal className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" />
                  Connect to Machine
                </h2>
              </div>

              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Connection Command
                  </label>
                  <div className="flex items-center bg-gray-900 dark:bg-black rounded-lg p-4">
                    <code className="flex-1 font-mono text-sm text-green-400 break-all">
                      {sshCommand}
                    </code>
                    <button
                      onClick={() => sshCommand && copyToClipboard(sshCommand, 'command')}
                      className="ml-2 p-2 text-gray-400 hover:text-white transition-colors rounded"
                      title="Copy command"
                    >
                      {copied === 'command' ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Host
                    </label>
                    <div className="flex items-center bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                      <code className="flex-1 font-mono text-sm text-gray-900 dark:text-white">
                        {rental.sshHost}
                      </code>
                      <button
                        onClick={() => rental.sshHost && copyToClipboard(rental.sshHost, 'host')}
                        className="ml-2 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded transition-colors"
                        title="Copy host"
                      >
                        {copied === 'host' ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Port
                    </label>
                    <div className="flex items-center bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                      <code className="flex-1 font-mono text-sm text-gray-900 dark:text-white">
                        {rental.sshPort}
                      </code>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Username
                    </label>
                    <div className="flex items-center bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                      <code className="flex-1 font-mono text-sm text-gray-900 dark:text-white">
                        {rental.sshUser}
                      </code>
                      <button
                        onClick={() => copyToClipboard(rental.sshUser!, 'user')}
                        className="ml-2 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded transition-colors"
                        title="Copy username"
                      >
                        {copied === 'user' ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {rental.sshHost && rental.sshHost !== 'localhost' && (
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <div className="flex">
                    <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-800 dark:text-blue-200">
                        <p className="font-medium mb-1">SSH Connection Instructions:</p>
                      <ol className="list-decimal list-inside space-y-1 text-blue-700 dark:text-blue-300">
                          <li>Make sure you have added your SSH public key to this rental (use "Change Keys" below if needed)</li>
                          <li>Use your SSH private key to connect. Replace <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">~/.ssh/your_key</code> in the command above with the path to your private key (e.g., <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">~/.ssh/id_rsa</code> or <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">~/.ssh/id_ed25519</code>)</li>
                          <li>If your key has a passphrase, you'll be prompted to enter it</li>
                          <li>You have full access to install libraries and run any workload</li>
                      </ol>
                    </div>
                  </div>
                </div>
                )}
                
                {(!rental.sshHost || rental.sshHost === 'localhost') && (
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                    <div className="flex">
                      <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-2 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-yellow-800 dark:text-yellow-200">
                        <p className="font-medium mb-1">IP Address Required for SSH</p>
                        <p className="text-yellow-700 dark:text-yellow-300 mb-2">
                          The machine IP address is not configured. <strong>IP address is required for SSH connections.</strong>
                        </p>
                        <p className="text-yellow-700 dark:text-yellow-300">
                          <strong>Solution:</strong> Contact the provider to configure the machine's IP address for root access.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* SSH Key Management - Only for active rentals */}
                {rental.status === 'active' && (
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                        SSH Keys for This Rental
                      </h3>
                      <button
                        onClick={() => {
                          setShowSSHKeyChange(!showSSHKeyChange);
                          if (!showSSHKeyChange && rental.selectedSshKeyIds) {
                            setSelectedSshKeyIds([...rental.selectedSshKeyIds]);
                          }
                        }}
                        className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
                      >
                        {showSSHKeyChange ? 'Cancel' : 'Change Keys'}
                      </button>
                    </div>

                    {!showSSHKeyChange && rental.selectedSshKeyIds && rental.selectedSshKeyIds.length > 0 && (
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                          Currently using {rental.selectedSshKeyIds.length} SSH key{rental.selectedSshKeyIds.length > 1 ? 's' : ''}:
                        </p>
                        <div className="space-y-1">
                          {rental.selectedSshKeyIds.map((keyId: string) => {
                            const key = sshKeys.find(k => k.id === keyId);
                            return key ? (
                              <div key={keyId} className="text-xs font-mono text-gray-700 dark:text-gray-300">
                                • {key.name}
                              </div>
                            ) : null;
                          })}
                        </div>
                      </div>
                    )}

                    {showSSHKeyChange && (
                      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                        <p className="text-sm text-blue-800 dark:text-blue-200 mb-3">
                          Select SSH keys to use for this rental. Changes will be applied immediately.
                        </p>
                        <div className="space-y-2 max-h-48 overflow-y-auto mb-3">
                          {sshKeys.map((key) => (
                            <label
                              key={key.id}
                              className="flex items-start space-x-2 p-2 rounded hover:bg-blue-100 dark:hover:bg-blue-900/40 cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                checked={selectedSshKeyIds.includes(key.id)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedSshKeyIds([...selectedSshKeyIds, key.id]);
                                  } else {
                                    setSelectedSshKeyIds(selectedSshKeyIds.filter(id => id !== key.id));
                                  }
                                }}
                                className="mt-1"
                              />
                              <div className="flex-1">
                                <div className="text-sm font-medium text-blue-900 dark:text-blue-200">
                                  {key.name}
                                </div>
                                <div className="text-xs font-mono text-blue-700 dark:text-blue-300 truncate">
                                  {key.publicKey.substring(0, 50)}...
                                </div>
                              </div>
                            </label>
                          ))}
                        </div>
                        {selectedSshKeyIds.length === 0 && (
                          <p className="text-xs text-red-600 dark:text-red-400 mb-3">
                            Please select at least one SSH key
                          </p>
                        )}
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => {
                              setShowSSHKeyChange(false);
                              setSelectedSshKeyIds([]);
                            }}
                            className="px-3 py-1 text-sm border border-blue-300 dark:border-blue-700 rounded text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/40"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleUpdateSSHKeys}
                            disabled={selectedSshKeyIds.length === 0 || updatingSSHKeys}
                            className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                          >
                            {updatingSSHKeys ? 'Updating...' : 'Update Keys'}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Real-time GPU Metrics - Only for active rentals */}
          {rental.status === 'active' && (
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">GPU Metrics</h2>
                <span className="text-xs text-green-600 dark:text-green-400 flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></span>
                  Live
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">GPU Utilization</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                    {(rental.gpuUtilization ?? 0).toFixed(1)}%
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Temperature</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                    {rental.temperature !== null && rental.temperature !== undefined 
                      ? `${rental.temperature.toFixed(0)}°C` 
                      : 'N/A'}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Power Usage</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                    {rental.powerUsage !== null && rental.powerUsage !== undefined 
                      ? `${rental.powerUsage.toFixed(1)}W` 
                      : 'N/A'}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Memory</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                    {rental.gpuMemory ? (rental.gpuMemory > 1000 ? (rental.gpuMemory / 1024).toFixed(1) : rental.gpuMemory.toFixed(1)) + 'GB' : 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Usage Summary - For completed rentals */}
          {rental.status === 'completed' && (
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Usage Summary</h2>
              <p className="text-gray-600 dark:text-gray-400">
                This rental session has ended. You can view your usage history and download any files you saved during the session.
              </p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Session Info */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Session Info</h2>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  Started
                </dt>
                <dd className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                  {new Date(rental.startedAt).toLocaleString()}
                </dd>
              </div>
              {rental.endedAt && (
                <div>
                  <dt className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    Ended
                  </dt>
                  <dd className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                    {new Date(rental.endedAt).toLocaleString()}
                  </dd>
                </div>
              )}
              <div>
                <dt className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  Duration
                </dt>
                <dd className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                  {rental.hoursUsed.toFixed(1)} hours
                </dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                  <Cpu className="w-4 h-4 mr-2" />
                  GPU Type
                </dt>
                <dd className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                  {rental.gpuType}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500 dark:text-gray-400">
                  Provider
                </dt>
                <dd className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                  {rental.provider}
                </dd>
              </div>
            </dl>
          </div>

          {/* Payment */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Payment Details
            </h2>
            <dl className="space-y-2">
              <div className="flex justify-between">
                <dt className="text-sm text-gray-500 dark:text-gray-400">Total Cost</dt>
                <dd className="text-sm font-medium text-gray-900 dark:text-white">
                  {rental.totalCost.toFixed(3)} USDT
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-gray-500 dark:text-gray-400">Hours Used</dt>
                <dd className="text-sm font-medium text-gray-900 dark:text-white">
                  {rental.hoursUsed.toFixed(1)}h
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-gray-500 dark:text-gray-400">Status</dt>
                <dd className="text-sm font-medium text-gray-900 dark:text-white">
                  {rental.status === 'completed' ? 'Paid' : 'Billing Active'}
                </dd>
              </div>
            </dl>
          </div>

          {/* Quick Actions */}
          {rental.status === 'active' && (
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Quick Actions
              </h2>
              <div className="space-y-2">
                <button
                  onClick={() => handleRentalAction('stop')}
                  disabled={processing}
                  className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-sm font-medium"
                >
                  {processing ? 'Processing...' : 'End Rental Session'}
                </button>
                <Link
                  href="/user/rent"
                  className="block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 text-center text-sm font-medium"
                >
                  Rent Another GPU
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

