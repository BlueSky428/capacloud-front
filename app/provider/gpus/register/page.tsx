'use client';

import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Cpu, DollarSign, Zap, Save, RefreshCw, AlertCircle, CheckCircle, Copy, Check, ChevronDown, ChevronUp, Terminal, MonitorSpeaker } from 'lucide-react';
import Link from 'next/link';
import { notifications } from '@/lib/notifications';

interface PendingMachine {
  _id: string;
  workerId: string;
  gpuType: string;
  gpuMemory: number;
  cpuCores: number;
  ramSize: number;
  diskSize: number;
  sshPort?: number;
  sshPublicKey?: string;
  hostname?: string;
  status: string;
  createdAt: string;
}

export default function RegisterGPUPage() {
  const { connected, publicKey } = useWallet();
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);
  const [pendingMachines, setPendingMachines] = useState<PendingMachine[]>([]);
  const [selectedMachine, setSelectedMachine] = useState<PendingMachine | null>(null);
  const [userAccountId, setUserAccountId] = useState<string>('');
  const [copiedAccountId, setCopiedAccountId] = useState(false);
  const [showInstallGuide, setShowInstallGuide] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<'linux' | 'windows'>('linux');
  const [formData, setFormData] = useState({
    sshPort: '2222',
    ratePerHour: '0.01',
    hostname: '',
  });
  const [lastMachineCount, setLastMachineCount] = useState(0);
  const [pollingInterval, setPollingInterval] = useState<NodeJS.Timeout | null>(null);
  const [newMachineIds, setNewMachineIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (connected && publicKey) {
      loadUserAccountId();
      loadPendingMachines();
      
      // Start polling for new machines every 10 seconds
      const interval = setInterval(() => {
        checkForNewMachines();
      }, 10000); // Poll every 10 seconds
      
      setPollingInterval(interval);
      
      return () => {
        if (interval) clearInterval(interval);
      };
    }
  }, [connected, publicKey]);

  // Cleanup polling on unmount
  useEffect(() => {
    return () => {
      if (pollingInterval) {
        clearInterval(pollingInterval);
      }
    };
  }, [pollingInterval]);

  const loadUserAccountId = async () => {
    try {
      const response = await fetch(`/api/account/settings?walletAddress=${publicKey?.toString()}`);
      const data = await response.json();
      if (data.success && data.user) {
        setUserAccountId(data.user.accountId);
      }
    } catch (error) {
      console.error('Error loading account ID:', error);
    }
  };

  const loadPendingMachines = async (showNotification: boolean = false) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/account/settings?walletAddress=${publicKey?.toString()}`);
      const data = await response.json();
      
      if (data.success && data.user) {
        const machinesResponse = await fetch(`/api/machines/pending?accountId=${data.user.accountId}`);
        const machinesData = await machinesResponse.json();
        
        if (machinesData.success) {
          const newMachines = machinesData.machines || [];
          
          // Check if there are new machines
          if (showNotification && newMachines.length > lastMachineCount && lastMachineCount > 0) {
            const newCount = newMachines.length - lastMachineCount;
            const gpuTypes = newMachines
              .slice(-newCount)
              .map((m: PendingMachine) => m.gpuType)
              .join(', ');
            
            notifications.success(
              `🎉 New machine${newCount > 1 ? 's' : ''} registered! ${gpuTypes} ${newCount > 1 ? 'are' : 'is'} waiting for confirmation.`,
              { duration: 6000 }
            );
          }
          
          setPendingMachines(newMachines);
          setLastMachineCount(newMachines.length);
        }
      }
    } catch (error) {
      console.error('Error loading pending machines:', error);
      if (showNotification) {
      notifications.error('Failed to load pending machines');
      }
    } finally {
      setLoading(false);
    }
  };

  const checkForNewMachines = async () => {
    // Silent check for new machines (only show notification, don't show loading)
    try {
      const response = await fetch(`/api/account/settings?walletAddress=${publicKey?.toString()}`);
      const data = await response.json();
      
      if (data.success && data.user) {
        const machinesResponse = await fetch(`/api/machines/pending?accountId=${data.user.accountId}`);
        const machinesData = await machinesResponse.json();
        
        if (machinesData.success) {
          const newMachines = machinesData.machines || [];
          
          // Check if there are new machines
          if (newMachines.length > lastMachineCount && lastMachineCount > 0) {
            const newCount = newMachines.length - lastMachineCount;
            const newMachine = newMachines[newMachines.length - 1]; // Get the latest one
            const gpuType = newMachine.gpuType || 'GPU Machine';
            const memory = newMachine.gpuMemory > 1000 
              ? (newMachine.gpuMemory / 1024).toFixed(1) 
              : newMachine.gpuMemory.toFixed(1);
            
            // Show notification
            notifications.success(
              `🎉 New machine registered! ${gpuType} (${memory}GB) is waiting for confirmation.`,
              { duration: 6000 }
            );
            
            // Mark new machine as "new" for visual highlighting
            setNewMachineIds(prev => new Set([...prev, newMachine._id]));
            
            // Remove "new" indicator after 30 seconds
            setTimeout(() => {
              setNewMachineIds(prev => {
                const updated = new Set(prev);
                updated.delete(newMachine._id);
                return updated;
              });
            }, 30000);
            
            // Update state
            setPendingMachines(newMachines);
            setLastMachineCount(newMachines.length);
          } else if (newMachines.length !== lastMachineCount) {
            // Update count even if no new machines (in case one was removed)
            setPendingMachines(newMachines);
            setLastMachineCount(newMachines.length);
          }
        }
      }
    } catch (error) {
      // Silent fail for polling - don't show errors
      console.error('Error checking for new machines:', error);
    }
  };

  const handleSelectMachine = (machine: PendingMachine) => {
    setSelectedMachine(machine);
    setFormData({
      sshPort: machine.sshPort?.toString() || '2222',
      ratePerHour: '0.01',
      hostname: (machine as any).hostname || '',
    });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!connected || !selectedMachine) return;

    try {
      setRegistering(true);
      const loadingToast = notifications.loading('Registering machine...');
      const response = await fetch('/api/machines/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accountId: userAccountId,
          workerId: selectedMachine.workerId,
          gpuType: selectedMachine.gpuType,
          gpuMemory: selectedMachine.gpuMemory,
          cpuCores: selectedMachine.cpuCores,
          ramSize: selectedMachine.ramSize,
          diskSize: selectedMachine.diskSize,
          sshPort: parseInt(formData.sshPort) || selectedMachine.sshPort || 2222,
          ratePerHour: parseFloat(formData.ratePerHour),
          hostname: formData.hostname.trim(),
        }),
      });

      const data = await response.json();
      notifications.dismiss(loadingToast);

      if (data.success) {
        notifications.success('Machine registered successfully!');
        setSelectedMachine(null);
        loadPendingMachines();
      } else {
        notifications.error(data.error || 'Failed to register machine');
      }
    } catch (error) {
      console.error('Error registering machine:', error);
      notifications.error('Failed to register machine');
    } finally {
      setRegistering(false);
    }
  };

  if (!connected) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
          <h2 className="text-lg font-medium text-yellow-800 dark:text-yellow-200 mb-2">
            Wallet Not Connected
          </h2>
          <p className="text-yellow-700 dark:text-yellow-300">
            Please connect your Solana wallet to register a GPU.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Register GPU Machine</h1>
        <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
          Complete registration for machines that have been detected by GPU workers
        </p>
            <p className="mt-1 text-xs sm:text-sm text-green-600 dark:text-green-400">
              ✓ Auto-checking for new machines every 10 seconds
            </p>
          </div>
          <button
            onClick={() => loadPendingMachines(true)}
            className="self-start sm:self-auto px-3 sm:px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 flex items-center transition-colors text-sm sm:text-base"
            title="Check for new machines now"
          >
            <RefreshCw className="w-4 h-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Refresh Now</span>
            <span className="sm:hidden">Refresh</span>
          </button>
        </div>
      </div>

      {/* Account ID Info */}
      <div className="mb-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-blue-900 dark:text-blue-200">Your Account ID</p>
            <div className="mt-1 flex items-center space-x-2 min-w-0">
              <p className="text-sm font-mono text-blue-700 dark:text-blue-300 break-all">
                {userAccountId || 'Loading...'}
              </p>
              {userAccountId && (
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(userAccountId);
                    setCopiedAccountId(true);
                    notifications.success('Account ID copied', { duration: 2000 });
                    setTimeout(() => setCopiedAccountId(false), 2000);
                  }}
                  className="p-1.5 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-800 rounded transition-colors"
                  title="Copy Account ID"
                >
                  {copiedAccountId ? (
                    <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              )}
            </div>
            <p className="mt-2 text-xs text-blue-600 dark:text-blue-400">
              Use this Account ID when setting up GPU workers. You can also find it in{' '}
              <Link href="/user/settings" className="underline">
                Account Settings
              </Link>
              .
            </p>
          </div>
        </div>
      </div>

      {/* Quick Install Guide */}
      <div className="mb-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
        <button
          onClick={() => setShowInstallGuide(!showInstallGuide)}
          className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors rounded-lg"
        >
          <div className="flex items-center space-x-3">
            <Terminal className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Quick Install Guide
            </h3>
          </div>
          {showInstallGuide ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </button>
        
        {showInstallGuide && (
          <div className="px-4 pb-4 border-t border-gray-200 dark:border-gray-700">
            <div className="pt-4 space-y-4">
              {/* Platform Selection */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  Choose Your Platform
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => setSelectedPlatform('linux')}
                    className={`bg-white dark:bg-gray-800 rounded-lg p-4 border-2 text-left transition-all ${
                      selectedPlatform === 'linux'
                        ? 'border-green-500 dark:border-green-400 shadow-md'
                        : 'border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600'
                    }`}
                  >
                    <div className="flex items-center mb-2">
                      <Terminal className="w-4 h-4 mr-2 text-green-500" />
                      <span className="font-medium text-gray-900 dark:text-white">Linux</span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Native Linux installation
                    </p>
                  </button>
                  <button
                    onClick={() => setSelectedPlatform('windows')}
                    className={`bg-white dark:bg-gray-800 rounded-lg p-4 border-2 text-left transition-all ${
                      selectedPlatform === 'windows'
                        ? 'border-blue-500 dark:border-blue-400 shadow-md'
                        : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
                    }`}
                  >
                    <div className="flex items-center mb-2">
                      <MonitorSpeaker className="w-4 h-4 mr-2 text-blue-500" />
                      <span className="font-medium text-gray-900 dark:text-white">Windows</span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      WSL2 + Docker Desktop
                    </p>
                  </button>
                </div>
              </div>

              {/* Linux Installation Steps */}
              {selectedPlatform === 'linux' && (
                <>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Step 1: Install GPU Worker
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Run this command on your Linux GPU machine:
                    </p>
                    <div className="bg-gray-900 dark:bg-black rounded-lg p-4 relative">
                      <code className="text-sm text-green-400 font-mono block break-all">
                        curl -s https://capa.cloud/install.sh | sudo bash
                      </code>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText('curl -s https://capa.cloud/install.sh | sudo bash');
                          notifications.success('Command copied', { duration: 2000 });
                        }}
                        className="absolute top-2 right-2 p-1.5 text-gray-400 hover:text-white transition-colors"
                        title="Copy command"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Step 2: Verify Worker Status
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Check that the worker is running:
                    </p>
                    <div className="bg-gray-900 dark:bg-black rounded-lg p-4 relative">
                      <code className="text-sm text-green-400 font-mono block break-all">
                        sudo systemctl status capa-worker
                      </code>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText('sudo systemctl status capa-worker');
                          notifications.success('Command copied', { duration: 2000 });
                        }}
                        className="absolute top-2 right-2 p-1.5 text-gray-400 hover:text-white transition-colors"
                        title="Copy command"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* Windows Installation Steps */}
              {selectedPlatform === 'windows' && (
                <>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Step 1: Install WSL2 and Docker Desktop
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Ensure WSL2 and Docker Desktop are installed with WSL integration enabled.
                    </p>
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mb-2">
                      <p className="text-xs text-blue-800 dark:text-blue-200 mb-2">
                        <strong>Important:</strong> Docker Desktop must have WSL integration enabled for your Ubuntu distro.
                      </p>
                      <div className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
                        <p>📖 <a href="https://learn.microsoft.com/en-us/windows/wsl/install" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-900 dark:hover:text-blue-100">WSL2 Installation Guide</a></p>
                        <p>📖 <a href="https://docs.docker.com/desktop/setup/install/windows-install/" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-900 dark:hover:text-blue-100">Docker Desktop Installation</a></p>
                        <p>📖 <a href="https://docs.docker.com/desktop/features/wsl/" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-900 dark:hover:text-blue-100">Docker WSL2 Integration</a></p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Step 2: Install GPU Worker in WSL
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Open WSL Ubuntu and run the installation script:
                    </p>
                    <div className="bg-gray-900 dark:bg-black rounded-lg p-4 relative mb-2">
                      <code className="text-sm text-green-400 font-mono block break-all">
                        wsl
                      </code>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText('wsl');
                          notifications.success('Command copied', { duration: 2000 });
                        }}
                        className="absolute top-2 right-2 p-1.5 text-gray-400 hover:text-white transition-colors"
                        title="Copy command"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="bg-gray-900 dark:bg-black rounded-lg p-4 relative">
                      <code className="text-sm text-green-400 font-mono block break-all">
                        curl -s https://capa.cloud/install.sh | sudo bash
                      </code>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText('curl -s https://capa.cloud/install.sh | sudo bash');
                          notifications.success('Command copied', { duration: 2000 });
                        }}
                        className="absolute top-2 right-2 p-1.5 text-gray-400 hover:text-white transition-colors"
                        title="Copy command"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Step 3: Verify Worker Status (in WSL)
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Check that the worker is running inside WSL:
                    </p>
                    <div className="bg-gray-900 dark:bg-black rounded-lg p-4 relative">
                      <code className="text-sm text-green-400 font-mono block break-all">
                        sudo systemctl status capa-worker
                      </code>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText('sudo systemctl status capa-worker');
                          notifications.success('Command copied', { duration: 2000 });
                        }}
                        className="absolute top-2 right-2 p-1.5 text-gray-400 hover:text-white transition-colors"
                        title="Copy command"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* Common Steps */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  {selectedPlatform === 'linux' ? 'Step 3' : 'Step 4'}: Enter Your Account ID
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  When prompted during installation, enter your Account ID:
                </p>
                <div className="bg-gray-900 dark:bg-black rounded-lg p-4 relative">
                  <code className="text-sm text-green-400 font-mono block break-all">
                    {userAccountId || 'your_account_id'}
                  </code>
                  {userAccountId && (
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(userAccountId);
                        notifications.success('Account ID copied', { duration: 2000 });
                      }}
                      className="absolute top-2 right-2 p-1.5 text-gray-400 hover:text-white transition-colors"
                      title="Copy Account ID"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  {selectedPlatform === 'linux' ? 'Step 4' : 'Step 5'}: Complete Registration
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Once the worker is installed and running, your machine will appear in the pending machines list above. 
                  Select it and complete the registration by providing IP address/hostname, SSH port, and pricing.
                </p>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                <p className="text-xs text-blue-800 dark:text-blue-300">
                  {selectedPlatform === 'linux' ? (
                    <>
                      <strong>Note:</strong> The installation script will install Docker, NVIDIA Container Toolkit, 
                      and set up the GPU worker service automatically. Make sure you have sudo/root access.
                    </>
                  ) : (
                    <>
                      <strong>Windows Notes:</strong> Use your Windows machine's public IP address (not WSL internal IP) when registering. 
                      Ensure Windows Firewall and router firewall allow the SSH port (default: 2222).
                    </>
                  )}
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href="/docs/worker-installation"
                  className="text-sm text-purple-600 dark:text-purple-400 hover:underline inline-flex items-center"
                >
                  View full installation documentation →
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading pending machines...</p>
        </div>
      ) : pendingMachines.length === 0 ? (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
          <AlertCircle className="w-6 h-6 text-yellow-600 dark:text-yellow-400 mb-2" />
          <h2 className="text-lg font-medium text-yellow-800 dark:text-yellow-200 mb-2">
            No Pending Machines
          </h2>
          <p className="text-yellow-700 dark:text-yellow-300 mb-4">
            No machines are waiting for registration. Make sure you have:
          </p>
          <ul className="list-disc list-inside text-yellow-700 dark:text-yellow-300 space-y-1">
            <li>Installed the GPU worker on your machine</li>
            <li>Set the ACCOUNT_ID environment variable to: <code className="font-mono bg-yellow-100 dark:bg-yellow-900 px-1 rounded">{userAccountId || 'your_account_id'}</code></li>
            <li>Started the GPU worker</li>
          </ul>
          <button
            onClick={() => loadPendingMachines(true)}
            className="mt-4 px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 flex items-center"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pending Machines List */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Pending Machines ({pendingMachines.length})
            </h2>
            <div className="space-y-4">
              {pendingMachines.map((machine) => {
                const isNew = newMachineIds.has(machine._id);
                return (
                <div
                  key={machine._id}
                  onClick={() => handleSelectMachine(machine)}
                  className={`bg-white dark:bg-gray-800 shadow rounded-lg p-4 cursor-pointer border-2 transition-all ${
                    selectedMachine?._id === machine._id
                      ? 'border-purple-600 dark:border-purple-400'
                      : isNew
                      ? 'border-green-500 dark:border-green-400 animate-pulse'
                      : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <Cpu className="w-5 h-5 text-purple-600 dark:text-purple-400 mr-2" />
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {machine.gpuType}
                        </h3>
                        {isNew && (
                          <span className="ml-2 px-2 py-0.5 text-xs font-semibold bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full animate-pulse">
                            NEW
                          </span>
                        )}
                      </div>
                      <dl className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <dt className="text-gray-500 dark:text-gray-400">Memory</dt>
                          <dd className="text-gray-900 dark:text-white font-medium">
                            {machine.gpuMemory > 1000 ? (machine.gpuMemory / 1024).toFixed(1) : machine.gpuMemory.toFixed(1)} GB
                          </dd>
                        </div>
                        <div>
                          <dt className="text-gray-500 dark:text-gray-400">CPU Cores</dt>
                          <dd className="text-gray-900 dark:text-white font-medium">
                            {machine.cpuCores}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-gray-500 dark:text-gray-400">RAM</dt>
                          <dd className="text-gray-900 dark:text-white font-medium">
                            {machine.ramSize} GB
                          </dd>
                        </div>
                        <div>
                          <dt className="text-gray-500 dark:text-gray-400">Disk</dt>
                          <dd className="text-gray-900 dark:text-white font-medium">
                            {machine.diskSize} GB
                          </dd>
                        </div>
                      </dl>
                      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 font-mono">
                        Worker ID: {machine.workerId}
                      </p>
                    </div>
                    {selectedMachine?._id === machine._id && (
                      <CheckCircle className="w-6 h-6 text-purple-600 dark:text-purple-400 flex-shrink-0 ml-2" />
                    )}
                  </div>
                </div>
                );
              })}
            </div>
          </div>

          {/* Registration Form */}
          <div>
            {selectedMachine ? (
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Complete Registration
                </h2>
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Selected Machine
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {selectedMachine.gpuType} - {selectedMachine.gpuMemory > 1000 ? (selectedMachine.gpuMemory / 1024).toFixed(1) : selectedMachine.gpuMemory.toFixed(1)}GB
                    </p>
                  </div>

                  <div>
                    <label htmlFor="hostname" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      IP Address or Hostname <span className="text-red-500">*</span>
                      {(selectedMachine as any).hostname && (
                        <span className="ml-2 text-xs text-green-600 dark:text-green-400">(Auto-detected)</span>
                      )}
                    </label>
                    <input
                      type="text"
                      id="hostname"
                      required
                      value={formData.hostname}
                      onChange={(e) => setFormData({ ...formData, hostname: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white font-mono text-sm"
                      placeholder="192.168.1.100 or machine.example.com"
                    />
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      {(selectedMachine as any).hostname 
                        ? `IP address automatically detected. Verify it's correct or update if needed.`
                        : 'Required for SSH connections. Enter the machine\'s public IP address or hostname (e.g., 192.168.1.100 or machine.example.com)'}
                      {selectedPlatform === 'windows' && (
                        <span className="block mt-1 text-blue-600 dark:text-blue-400">
                          <strong>Windows:</strong> Use your Windows machine's public IP address, not the WSL internal IP.
                        </span>
                      )}
                    </p>
                  </div>

                  <div>
                    <label htmlFor="sshPort" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      SSH Port
                      {selectedMachine.sshPort && (
                        <span className="ml-2 text-xs text-green-600 dark:text-green-400">(Auto-detected)</span>
                      )}
                    </label>
                    <input
                      type="number"
                      id="sshPort"
                      required
                      min="1024"
                      max="65535"
                      value={formData.sshPort}
                      onChange={(e) => setFormData({ ...formData, sshPort: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      {selectedMachine.sshPort 
                        ? `Port automatically detected from worker. You can change it if needed.`
                        : 'Port where SSH will be accessible (default: 2222)'}
                      {selectedPlatform === 'windows' && (
                        <span className="block mt-1 text-blue-600 dark:text-blue-400">
                          <strong>Windows:</strong> Ensure this port is open in both Windows Firewall and router firewall.
                        </span>
                      )}
                    </p>
                  </div>

                  <div>
                    <label htmlFor="ratePerHour" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Rate per Hour (USDT)
                    </label>
                    <input
                      type="number"
                      id="ratePerHour"
                      required
                      min="0"
                      step="0.001"
                      value={formData.ratePerHour}
                      onChange={(e) => setFormData({ ...formData, ratePerHour: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Recommended: 0.01 - 0.1 USDT per hour based on GPU performance
                    </p>
                  </div>

                  <div className="flex justify-end space-x-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setSelectedMachine(null)}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={registering}
                      className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 flex items-center disabled:opacity-50"
                    >
                      {registering ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Registering...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Complete Registration
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-12 text-center">
                <Cpu className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">
                  Select a machine from the list to complete registration
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
