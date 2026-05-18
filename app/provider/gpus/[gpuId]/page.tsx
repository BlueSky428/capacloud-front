'use client';

import { useState, useEffect } from 'react';
import { use } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import Link from 'next/link';
import { ArrowLeft, Cpu, DollarSign, Activity, Edit, TrendingUp, RefreshCw, AlertCircle, Zap, Thermometer } from 'lucide-react';
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
  uptime?: number;
  lastHeartbeat?: Date;
  createdAt: Date;
  totalRentals?: number;
}

interface StatusHistory {
  _id: string;
  timestamp: Date;
  gpuUtilization: number;
  temperature: number;
  powerUsage: number;
  uptime: number;
  status: string;
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

export default function GPUDetailsPage({ params }: { params: Promise<{ gpuId: string }> }) {
  const { gpuId } = use(params);
  const { connected, publicKey } = useWallet();
  const [loading, setLoading] = useState(true);
  const [machine, setMachine] = useState<Machine | null>(null);
  const [statusHistory, setStatusHistory] = useState<StatusHistory[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  useEffect(() => {
    if (connected) {
      loadMachine();
      loadStatusHistory();
    } else {
      setLoading(false);
    }
  }, [connected, gpuId]);

  const loadMachine = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/machines/${gpuId}`);
      const data = await response.json();

      if (data.success) {
        setMachine(data.machine);
      } else {
        notifications.error(data.error || 'Failed to load machine');
      }
    } catch (error) {
      console.error('Error loading machine:', error);
      notifications.error('Failed to load machine');
    } finally {
      setLoading(false);
    }
  };

  const loadStatusHistory = async () => {
    try {
      setLoadingHistory(true);
      const response = await fetch(`/api/machines/${gpuId}/status?limit=100`);
      const data = await response.json();

      if (data.success) {
        setStatusHistory(data.history || []);
      }
    } catch (error) {
      console.error('Error loading status history:', error);
    } finally {
      setLoadingHistory(false);
    }
  };

  const isMachineOffline = (machine: Machine | null): boolean => {
    if (!machine || !machine.lastHeartbeat) return true;
    const lastHeartbeat = new Date(machine.lastHeartbeat);
    const now = new Date();
    const minutesSinceHeartbeat = (now.getTime() - lastHeartbeat.getTime()) / (1000 * 60);
    return minutesSinceHeartbeat > 5;
  };

  const getEffectiveStatus = (machine: Machine | null): MachineStatus => {
    if (!machine) return MachineStatus.OFFLINE;
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
            Please connect your Solana wallet to view GPU details.
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
          <p className="text-red-700 dark:text-red-300">
            The requested machine could not be found.
          </p>
          <Link
            href="/provider/gpus/list"
            className="mt-4 inline-flex items-center text-sm text-red-600 dark:text-red-400 hover:underline"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to GPUs
          </Link>
        </div>
      </div>
    );
  }

  const effectiveStatus = getEffectiveStatus(machine);
  const isOffline = isMachineOffline(machine);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href="/provider/gpus/list"
        className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to GPUs
      </Link>

      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{machine.gpuType}</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Worker ID: {machine.workerId}</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`px-3 py-1 text-sm font-medium rounded-full ${statusColors[effectiveStatus]}`}>
              {getStatusLabel(effectiveStatus)}
            </span>
            <button
              onClick={() => {
                loadMachine();
                loadStatusHistory();
              }}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center"
            >
              <RefreshCw className={`w-4 h-4 ${loadingHistory ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* GPU Metadata */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              GPU Information
            </h2>
            <dl className="grid grid-cols-2 gap-4">
              <div>
                <dt className="text-sm text-gray-500 dark:text-gray-400">GPU Type</dt>
                <dd className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                  {machine.gpuType}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500 dark:text-gray-400">Memory</dt>
                <dd className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                  {machine.gpuMemory > 1000 ? (machine.gpuMemory / 1024).toFixed(1) : machine.gpuMemory.toFixed(1)} GB
                </dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500 dark:text-gray-400">CPU Cores</dt>
                <dd className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                  {machine.cpuCores}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500 dark:text-gray-400">RAM</dt>
                <dd className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                  {machine.ramSize} GB
                </dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500 dark:text-gray-400">Disk</dt>
                <dd className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                  {machine.diskSize} GB
                </dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500 dark:text-gray-400">Price per Hour</dt>
                <dd className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                  {machine.ratePerHour} USDT
                </dd>
              </div>
            </dl>
          </div>

          {/* Usage History Chart */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                <Activity className="w-5 h-5 mr-2" />
                Usage History
            </h2>
              <button
                onClick={loadStatusHistory}
                disabled={loadingHistory}
                className="text-sm text-purple-600 dark:text-purple-400 hover:underline flex items-center"
              >
                <RefreshCw className={`w-4 h-4 mr-1 ${loadingHistory ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>
            
            {statusHistory.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <Activity className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No usage history available yet</p>
                <p className="text-xs mt-1">History will appear after the worker sends heartbeats</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* GPU Utilization Chart */}
              <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">GPU Utilization</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {machine.gpuUtilization?.toFixed(1) || 0}%
                    </span>
                  </div>
                  <div className="h-32 bg-gray-100 dark:bg-gray-700 rounded-lg p-2 flex items-end space-x-1">
                    {statusHistory.slice(-20).map((entry, idx) => (
                      <div
                        key={idx}
                        className="flex-1 bg-purple-600 rounded-t"
                        style={{ height: `${Math.min(entry.gpuUtilization, 100)}%` }}
                        title={`${entry.gpuUtilization.toFixed(1)}% at ${new Date(entry.timestamp).toLocaleTimeString()}`}
                      />
                    ))}
                  </div>
              </div>

                {/* Temperature Chart */}
              <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                      <Thermometer className="w-4 h-4 mr-1" />
                      Temperature
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {machine.temperature?.toFixed(0) || 0}°C
                    </span>
                  </div>
                  <div className="h-32 bg-gray-100 dark:bg-gray-700 rounded-lg p-2 flex items-end space-x-1">
                    {statusHistory.slice(-20).map((entry, idx) => {
                      const maxTemp = 100; // Assume max temp is 100°C
                      const height = Math.min((entry.temperature / maxTemp) * 100, 100);
                      return (
                        <div
                          key={idx}
                          className="flex-1 bg-red-500 rounded-t"
                          style={{ height: `${height}%` }}
                          title={`${entry.temperature.toFixed(0)}°C at ${new Date(entry.timestamp).toLocaleTimeString()}`}
                        />
                      );
                    })}
              </div>
          </div>

                {/* Power Usage Chart */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                      <Zap className="w-4 h-4 mr-1" />
                      Power Usage
                  </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {machine.powerUsage?.toFixed(1) || 0}W
                  </span>
                </div>
                  <div className="h-32 bg-gray-100 dark:bg-gray-700 rounded-lg p-2 flex items-end space-x-1">
                    {statusHistory.slice(-20).map((entry, idx) => {
                      const maxPower = 500; // Assume max power is 500W
                      const height = Math.min((entry.powerUsage / maxPower) * 100, 100);
                      return (
                        <div
                          key={idx}
                          className="flex-1 bg-yellow-500 rounded-t"
                          style={{ height: `${height}%` }}
                          title={`${entry.powerUsage.toFixed(1)}W at ${new Date(entry.timestamp).toLocaleTimeString()}`}
                        />
                      );
                    })}
                  </div>
                </div>

                <div className="text-xs text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-200 dark:border-gray-700">
                  Showing last {Math.min(statusHistory.length, 20)} data points
            </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Worker Health */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
              <Activity className="w-5 h-5 mr-2" />
              Worker Health
            </h2>
            <dl className="space-y-3">
              <div>
                <dt className="text-sm text-gray-500 dark:text-gray-400">Status</dt>
                <dd className="mt-1">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[effectiveStatus]}`}>
                    {getStatusLabel(effectiveStatus)}
                  </span>
                </dd>
              </div>
              {machine.lastHeartbeat && (
              <div>
                <dt className="text-sm text-gray-500 dark:text-gray-400">Last Heartbeat</dt>
                <dd className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                    {isOffline ? (
                      <span className="text-red-600 dark:text-red-400 flex items-center">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        Offline
                      </span>
                    ) : (
                      new Date(machine.lastHeartbeat).toLocaleString()
                    )}
                </dd>
              </div>
              )}
              {machine.uptime !== undefined && (
              <div>
                <dt className="text-sm text-gray-500 dark:text-gray-400">Uptime</dt>
                <dd className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                    {formatUptime(machine.uptime)}
                  </dd>
                </div>
              )}
              {machine.gpuUtilization !== undefined && (
                <div>
                  <dt className="text-sm text-gray-500 dark:text-gray-400">GPU Utilization</dt>
                  <dd className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                    {machine.gpuUtilization.toFixed(1)}%
                  </dd>
                </div>
              )}
              {machine.temperature !== undefined && (
                <div>
                  <dt className="text-sm text-gray-500 dark:text-gray-400">Temperature</dt>
                  <dd className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                    {machine.temperature.toFixed(0)}°C
                  </dd>
                </div>
              )}
              {machine.powerUsage !== undefined && (
                <div>
                  <dt className="text-sm text-gray-500 dark:text-gray-400">Power Usage</dt>
                  <dd className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                    {machine.powerUsage.toFixed(1)}W
                </dd>
              </div>
              )}
              <div>
                <dt className="text-sm text-gray-500 dark:text-gray-400">Rentals Handled</dt>
                <dd className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                  {machine.totalRentals || 0}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500 dark:text-gray-400">Registered</dt>
                <dd className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                  {new Date(machine.createdAt).toLocaleDateString()}
                </dd>
              </div>
            </dl>
          </div>

          {/* Quick Stats */}
          {statusHistory.length > 0 && (
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Statistics (24h)
            </h2>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm text-gray-500 dark:text-gray-400">Avg GPU Usage</dt>
                  <dd className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                    {statusHistory.length > 0
                      ? (statusHistory.reduce((sum, h) => sum + h.gpuUtilization, 0) / statusHistory.length).toFixed(1)
                      : 0}%
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500 dark:text-gray-400">Avg Temperature</dt>
                  <dd className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                    {statusHistory.length > 0
                      ? (statusHistory.reduce((sum, h) => sum + h.temperature, 0) / statusHistory.length).toFixed(0)
                      : 0}°C
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500 dark:text-gray-400">Avg Power</dt>
                  <dd className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                    {statusHistory.length > 0
                      ? (statusHistory.reduce((sum, h) => sum + h.powerUsage, 0) / statusHistory.length).toFixed(1)
                      : 0}W
                  </dd>
            </div>
              </dl>
          </div>
          )}
        </div>
      </div>
    </div>
  );
}
