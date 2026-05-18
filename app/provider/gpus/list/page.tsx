'use client';

import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import Link from 'next/link';
import { Plus, Cpu, Edit, Trash2, Activity, RefreshCw, AlertCircle } from 'lucide-react';
import { notifications } from '@/lib/notifications';
import { MachineStatus } from '@/lib/models/Machine';

interface Machine {
  _id: string;
  workerId: string;
  gpuType: string;
  gpuMemory: number;
  cpuCores: number;
  ramSize: number;
  diskSize: number;
  ratePerHour: number;
  status: MachineStatus;
  gpuUtilization?: number;
  temperature?: number;
  powerUsage?: number;
  lastHeartbeat?: Date;
  createdAt: Date;
  totalRentals?: number;
}

const statusColors: Record<string, string> = {
  active: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
  rented: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300',
  offline: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300',
  pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300',
  maintenance: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300',
};

const getStatusLabel = (status: MachineStatus): string => {
  const labels: Record<MachineStatus, string> = {
    [MachineStatus.PENDING]: 'Pending',
    [MachineStatus.ACTIVE]: 'Online',
    [MachineStatus.RENTED]: 'Busy',
    [MachineStatus.OFFLINE]: 'Offline',
    [MachineStatus.MAINTENANCE]: 'Maintenance',
  };
  return labels[status] || status;
};

const getStatusColor = (status: MachineStatus): string => {
  return statusColors[status] || statusColors.offline;
};

export default function GPUsListPage() {
  const { connected, publicKey } = useWallet();
  const [loading, setLoading] = useState(true);
  const [machines, setMachines] = useState<Machine[]>([]);
  const [userAccountId, setUserAccountId] = useState<string>('');

  useEffect(() => {
    if (connected && publicKey) {
      loadUserAccountId().then(() => {
        loadMachines();
      });
    } else {
      setLoading(false);
    }
  }, [connected, publicKey]);

  const loadUserAccountId = async (): Promise<string | null> => {
    try {
      const response = await fetch(`/api/account/settings?walletAddress=${publicKey?.toString()}`);
      const data = await response.json();
      if (data.success && data.user) {
        const accountId = data.user.accountId;
        setUserAccountId(accountId);
        return accountId;
      }
      return null;
    } catch (error) {
      console.error('Error loading account ID:', error);
      return null;
    }
  };

  const loadMachines = async () => {
    if (!publicKey) return;
    
    try {
      setLoading(true);
      
      // Get account ID (load if not already loaded)
      const accountId = userAccountId || await loadUserAccountId();
      
      if (!accountId) {
        setLoading(false);
        return;
      }

      const response = await fetch(`/api/machines/list?accountId=${accountId}`);
      const data = await response.json();

      if (data.success) {
        setMachines(data.machines || []);
      } else {
        notifications.error(data.error || 'Failed to load machines');
      }
    } catch (error) {
      console.error('Error loading machines:', error);
      notifications.error('Failed to load machines');
    } finally {
      setLoading(false);
    }
  };

  const isMachineOffline = (machine: Machine): boolean => {
    if (!machine.lastHeartbeat) return true;
    const lastHeartbeat = new Date(machine.lastHeartbeat);
    const now = new Date();
    const minutesSinceHeartbeat = (now.getTime() - lastHeartbeat.getTime()) / (1000 * 60);
    return minutesSinceHeartbeat > 5; // Offline if no heartbeat for 5 minutes
  };

  const getEffectiveStatus = (machine: Machine): MachineStatus => {
    if (machine.status === MachineStatus.RENTED) {
      return MachineStatus.RENTED;
    }
    if (isMachineOffline(machine)) {
      return MachineStatus.OFFLINE;
    }
    return machine.status;
  };

  if (!connected) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
          <h2 className="text-lg font-medium text-yellow-800 dark:text-yellow-200 mb-2">
            Wallet Not Connected
          </h2>
          <p className="text-yellow-700 dark:text-yellow-300">
            Please connect your Solana wallet to view your GPUs.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">My GPUs</h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Manage your registered GPU resources
          </p>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-3">
          <button
            onClick={loadMachines}
            disabled={loading}
            className="inline-flex items-center px-3 sm:px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 text-sm sm:text-base"
          >
            <RefreshCw className={`w-4 h-4 mr-1 sm:mr-2 ${loading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        <Link
          href="/provider/gpus/register"
          className="inline-flex items-center px-3 sm:px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 text-sm sm:text-base"
        >
          <Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
          <span className="hidden sm:inline">Register GPU</span>
          <span className="sm:hidden">Register</span>
        </Link>
      </div>
            </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading machines...</p>
              </div>
      ) : machines.length === 0 ? (
        <div className="text-center py-12">
          <Cpu className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No GPUs</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Get started by registering your first GPU.
          </p>
          <div className="mt-6">
            <Link
              href="/provider/gpus/register"
              className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              <Plus className="w-5 h-5 mr-2" />
              Register GPU
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {machines.map((machine) => {
            const effectiveStatus = getEffectiveStatus(machine);
            const isOffline = isMachineOffline(machine);
            
            return (
              <div
                key={machine._id}
                className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <Cpu className="w-8 h-8 text-purple-600 dark:text-purple-400 mr-3" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {machine.gpuType}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {machine.workerId}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(effectiveStatus)}`}
                  >
                    {getStatusLabel(effectiveStatus)}
                  </span>
                </div>

                <dl className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-500 dark:text-gray-400">Memory</dt>
                    <dd className="text-sm font-medium text-gray-900 dark:text-white">
                      {machine.gpuMemory > 1000 ? (machine.gpuMemory / 1024).toFixed(1) : machine.gpuMemory.toFixed(1)} GB
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-500 dark:text-gray-400">Price/Hour</dt>
                    <dd className="text-sm font-medium text-gray-900 dark:text-white">
                      {machine.ratePerHour} USDT
                    </dd>
                  </div>
                  {machine.gpuUtilization !== undefined && (
                    <div className="flex justify-between">
                      <dt className="text-sm text-gray-500 dark:text-gray-400">GPU Usage</dt>
                      <dd className="text-sm font-medium text-gray-900 dark:text-white">
                        {machine.gpuUtilization.toFixed(1)}%
                      </dd>
                    </div>
                  )}
                  {machine.temperature !== undefined && (
                    <div className="flex justify-between">
                      <dt className="text-sm text-gray-500 dark:text-gray-400">Temperature</dt>
                      <dd className="text-sm font-medium text-gray-900 dark:text-white">
                        {machine.temperature.toFixed(0)}°C
                      </dd>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-500 dark:text-gray-400">Rentals</dt>
                    <dd className="text-sm font-medium text-gray-900 dark:text-white">
                      {machine.totalRentals || 0}
                    </dd>
                  </div>
                  {machine.lastHeartbeat && (
                    <div className="flex justify-between">
                      <dt className="text-sm text-gray-500 dark:text-gray-400">Last Heartbeat</dt>
                      <dd className="text-sm font-medium text-gray-900 dark:text-white">
                        {isOffline ? (
                          <span className="text-red-600 dark:text-red-400 flex items-center">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            Offline
                          </span>
                        ) : (
                          new Date(machine.lastHeartbeat).toLocaleTimeString()
                        )}
                      </dd>
                    </div>
                  )}
                </dl>

                <div className="flex space-x-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Link
                    href={`/provider/gpus/${machine._id}`}
                    className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <Activity className="w-4 h-4 mr-2" />
                    View Details
                  </Link>
                  {machine.status === MachineStatus.PENDING && (
                    <Link
                      href="/provider/gpus/register"
                      className="px-3 py-2 border border-purple-300 dark:border-purple-600 rounded-md text-sm font-medium text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                      title="Complete Registration"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
