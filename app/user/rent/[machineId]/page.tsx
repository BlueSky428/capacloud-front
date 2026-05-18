'use client';

import { useState, useEffect } from 'react';
import { use } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import Link from 'next/link';
import { ArrowLeft, Cpu, DollarSign, HardDrive, Server, Zap, Clock, CheckCircle, XCircle, Loader, AlertCircle, TrendingUp } from 'lucide-react';
import { notifications } from '@/lib/notifications';

interface Machine {
  _id: string;
  gpuType: string;
  gpuMemory: number;
  cpuCores: number;
  ramSize: number;
  diskSize: number;
  ratePerHour: number;
  status: string;
  location?: string;
  uptime?: number;
  rating?: number;
  totalRentals?: number;
  cudaCores?: number;
  gpuUtilization?: number;
  temperature?: number;
  powerUsage?: number;
  hostname?: string;
  sshPort?: number;
}

function formatUptime(seconds: number): string {
  if (!seconds || seconds < 0) return 'N/A';
  
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  
  if (days > 0) {
    return `${days}d ${hours}h`;
  } else if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else {
    return `${minutes}m`;
  }
}

const statusColors = {
  active: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
  busy: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300',
  rented: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300',
  offline: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300',
  maintenance: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300',
};

export default function MachineDetailPage({ params }: { params: Promise<{ machineId: string }> }) {
  const { machineId } = use(params);
  const { connected, publicKey } = useWallet();
  const [loading, setLoading] = useState(true);
  const [machine, setMachine] = useState<Machine | null>(null);
  const [renting, setRenting] = useState(false);
  const [userBalance, setUserBalance] = useState<number | null>(null);
  const [sshKeys, setSshKeys] = useState<Array<{ id: string; name: string; publicKey: string }>>([]);
  const [selectedSshKeyIds, setSelectedSshKeyIds] = useState<string[]>([]);
  const [showSSHKeySelection, setShowSSHKeySelection] = useState(false);
  const MINIMUM_BALANCE = 10;

  useEffect(() => {
    if (connected) {
      loadMachine();
      loadUserBalance();
      loadSSHKeys();
    } else {
      setLoading(false);
    }
  }, [connected, machineId, publicKey]);

  const loadMachine = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/machines/${machineId}`);
      const data = await response.json();

      if (data.success) {
        setMachine(data.machine);
      } else {
        notifications.error(data.error || 'Failed to load machine details');
      }
    } catch (error) {
      console.error('Error loading machine:', error);
      notifications.error('Failed to load machine details');
    } finally {
      setLoading(false);
    }
  };

  const loadUserBalance = async () => {
    if (!publicKey) return;
    
    try {
      const response = await fetch(`/api/account/balance?walletAddress=${publicKey.toString()}`);
      const data = await response.json();
      
      if (data.success) {
        setUserBalance(data.balance || 0);
      }
    } catch (error) {
      console.error('Error loading balance:', error);
    }
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

  const handleRent = async () => {
    if (!connected || !publicKey) {
      notifications.warning('Please connect your wallet first');
      return;
    }

    if (machine?.status !== 'active') {
      notifications.error('This machine is not available for rent');
      return;
    }

    // Check if user has SSH keys
    if (sshKeys.length === 0) {
      notifications.error('You must add at least one SSH key in your settings before renting a machine');
      setTimeout(() => {
        window.location.href = '/user/settings';
      }, 2000);
      return;
    }

    // Show SSH key selection if not already selected
    if (selectedSshKeyIds.length === 0) {
      setShowSSHKeySelection(true);
      return;
    }

    try {
      setRenting(true);
      const loadingToast = notifications.loading('Creating rental...');
      const response = await fetch('/api/rentals/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          machineId: machine._id,
          renterWalletAddress: publicKey.toString(),
          selectedSshKeyIds: selectedSshKeyIds,
        }),
      });

      const data = await response.json();
      notifications.dismiss(loadingToast);

      if (data.success) {
        notifications.success('Machine rented successfully!');
        // Redirect to rental details
        setTimeout(() => {
          window.location.href = `/user/rentals/${data.rental.rentalId}`;
        }, 500);
      } else {
        notifications.error(data.error || 'Failed to rent machine');
      }
    } catch (error) {
      console.error('Error renting machine:', error);
      notifications.error('Failed to rent machine');
    } finally {
      setRenting(false);
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
            Please connect your Solana wallet to view machine details and rent GPUs.
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
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading machine details...</p>
        </div>
      </div>
    );
  }

  if (!machine) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
          <h2 className="text-lg font-medium text-red-800 dark:text-red-200 mb-2">
            Machine Not Found
          </h2>
          <p className="text-red-700 dark:text-red-300 mb-4">
            The machine you're looking for doesn't exist or has been removed.
          </p>
          <Link
            href="/user/rent"
            className="inline-flex items-center text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to GPU List
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/user/rent"
          className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to GPU List
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2 sm:gap-3">
              <Cpu className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600 dark:text-purple-400" />
              {machine.gpuType}
            </h1>
            <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
              Detailed machine specifications and rental information
            </p>
          </div>
          <span
            className={`self-start sm:self-auto px-3 py-1 text-sm font-medium rounded-full ${
              statusColors[machine.status as keyof typeof statusColors] || statusColors.offline
            }`}
          >
            {machine.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Machine Specifications */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Machine Specifications
            </h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <dt className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                  <Cpu className="w-4 h-4 mr-1" />
                  GPU Type
                </dt>
                <dd className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                  {machine.gpuType}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                  <HardDrive className="w-4 h-4 mr-1" />
                  GPU Memory
                </dt>
                <dd className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                  {machine.gpuMemory > 1000 
                    ? (machine.gpuMemory / 1024).toFixed(1) 
                    : machine.gpuMemory.toFixed(1)} GB
                </dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                  <Cpu className="w-4 h-4 mr-1" />
                  CPU Cores
                </dt>
                <dd className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                  {machine.cpuCores}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                  <Server className="w-4 h-4 mr-1" />
                  RAM
                </dt>
                <dd className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                  {machine.ramSize} GB
                </dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                  <HardDrive className="w-4 h-4 mr-1" />
                  Disk Size
                </dt>
                <dd className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                  {machine.diskSize} GB
                </dd>
              </div>
              {machine.cudaCores && (
                <div>
                  <dt className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                    <Zap className="w-4 h-4 mr-1" />
                    CUDA Cores
                  </dt>
                  <dd className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                    {machine.cudaCores.toLocaleString()}
                  </dd>
                </div>
              )}
              {machine.hostname && (
                <div>
                  <dt className="text-sm text-gray-500 dark:text-gray-400">Hostname</dt>
                  <dd className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                    {machine.hostname}
                  </dd>
                </div>
              )}
              {machine.sshPort && (
                <div>
                  <dt className="text-sm text-gray-500 dark:text-gray-400">SSH Port</dt>
                  <dd className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                    {machine.sshPort}
                  </dd>
                </div>
              )}
            </dl>
          </div>

          {/* Performance Metrics */}
          {(machine.gpuUtilization !== undefined || machine.temperature !== undefined || machine.powerUsage !== undefined) && (
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Performance Metrics
              </h2>
              <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {machine.gpuUtilization !== undefined && (
                  <div>
                    <dt className="text-sm text-gray-500 dark:text-gray-400">GPU Utilization</dt>
                    <dd className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                      {machine.gpuUtilization != null ? machine.gpuUtilization.toFixed(1) : '0.0'}%
                    </dd>
                  </div>
                )}
                {machine.temperature !== undefined && (
                  <div>
                    <dt className="text-sm text-gray-500 dark:text-gray-400">Temperature</dt>
                    <dd className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                      {machine.temperature != null ? machine.temperature.toFixed(0) : 'N/A'}°C
                    </dd>
                  </div>
                )}
                {machine.powerUsage !== undefined && (
                  <div>
                    <dt className="text-sm text-gray-500 dark:text-gray-400">Power Usage</dt>
                    <dd className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                      {machine.powerUsage != null ? machine.powerUsage.toFixed(1) : 'N/A'}W
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          )}

          {/* Additional Information */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Additional Information
            </h2>
            <dl className="space-y-3">
              {machine.location && (
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-500 dark:text-gray-400">Location</dt>
                  <dd className="text-sm font-medium text-gray-900 dark:text-white">
                    {machine.location}
                  </dd>
                </div>
              )}
              {machine.uptime !== undefined && (
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    Uptime
                  </dt>
                  <dd className="text-sm font-medium text-gray-900 dark:text-white">
                    {formatUptime(machine.uptime)}
                  </dd>
                </div>
              )}
              {machine.rating && (
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-500 dark:text-gray-400">Rating</dt>
                  <dd className="text-sm font-medium text-gray-900 dark:text-white flex items-center">
                    <span className="mr-1">{machine.rating}</span>
                    <span className="text-yellow-500">★</span>
                    {machine.totalRentals && (
                      <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                        ({machine.totalRentals} rentals)
                      </span>
                    )}
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>

        {/* Sidebar - Rental Information */}
        <div className="space-y-6">
          {/* Pricing Card */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Rental Information
            </h2>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                    <DollarSign className="w-4 h-4 mr-1" />
                    Price per Hour
                  </span>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {machine.ratePerHour}
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">USDT</p>
              </div>

              {machine.status === 'active' ? (
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-4">
                  {/* SSH Key Selection */}
                  {showSSHKeySelection && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                      <h3 className="text-sm font-medium text-blue-900 dark:text-blue-200 mb-3">
                        Select SSH Keys to Use
                      </h3>
                      <p className="text-xs text-blue-700 dark:text-blue-300 mb-3">
                        Select at least one SSH key to use for this rental. You can change them later.
                      </p>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
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
                        <p className="text-xs text-red-600 dark:text-red-400 mt-2">
                          Please select at least one SSH key
                        </p>
                      )}
                      <div className="flex justify-end space-x-2 mt-3">
                        <button
                          onClick={() => {
                            setShowSSHKeySelection(false);
                            setSelectedSshKeyIds([]);
                          }}
                          className="px-3 py-1 text-sm border border-blue-300 dark:border-blue-700 rounded text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/40"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleRent}
                          disabled={selectedSshKeyIds.length === 0 || renting}
                          className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                        >
                          Continue
                        </button>
                      </div>
                    </div>
                  )}

                  {!showSSHKeySelection && (
                    <>
                      {selectedSshKeyIds.length > 0 && (
                        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 mb-3">
                          <p className="text-sm text-green-800 dark:text-green-200">
                            <strong>{selectedSshKeyIds.length}</strong> SSH key{selectedSshKeyIds.length > 1 ? 's' : ''} selected
                          </p>
                          <button
                            onClick={() => setShowSSHKeySelection(true)}
                            className="text-xs text-green-700 dark:text-green-300 underline mt-1"
                          >
                            Change selection
                          </button>
                        </div>
                      )}
                      <button
                        onClick={handleRent}
                        disabled={renting || sshKeys.length === 0}
                        className="w-full px-4 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {renting ? (
                          <>
                            <Loader className="w-4 h-4 animate-spin" />
                            Renting...
                          </>
                        ) : (
                          <>
                            <CheckCircle className="w-4 h-4" />
                            Rent This GPU
                          </>
                        )}
                      </button>
                      {sshKeys.length === 0 && (
                        <p className="text-xs text-red-600 dark:text-red-400 mt-2 text-center">
                          You must add at least one SSH key in your settings to rent a machine
                        </p>
                      )}
                    </>
                  )}
                </div>
              ) : (
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                    <div className="flex">
                      <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-2 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-yellow-800 dark:text-yellow-200">
                        <p className="font-medium">Machine Not Available</p>
                        <p className="text-yellow-700 dark:text-yellow-300 mt-1">
                          This machine is currently {machine.status} and cannot be rented.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Features Card */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              What's Included
            </h2>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Full root access to the machine
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Install any libraries or frameworks
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Run any workload or application
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Web-based terminal access
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Real-time GPU metrics monitoring
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

