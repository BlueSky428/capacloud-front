'use client';

import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Search, Filter, Cpu, Clock, DollarSign, Zap, HardDrive, CheckCircle, XCircle, Server, Info } from 'lucide-react';
import Link from 'next/link';
import { notifications } from '@/lib/notifications';

interface Machine {
  _id: string;
  gpuType: string;
  gpuMemory: number;
  cpuCores: number;
  diskSize: number;
  cudaCores?: number;
  ratePerHour: number;
  status: string;
  location?: string;
  uptime?: number;
  rating?: number;
  totalRentals?: number;
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
  offline: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300',
};

export default function RentGPUsPage() {
  const { connected, publicKey } = useWallet();
  const [loading, setLoading] = useState(true);
  const [machines, setMachines] = useState<Machine[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('active');
  const [sortBy, setSortBy] = useState('price');
  const [renting, setRenting] = useState<string | null>(null);

  useEffect(() => {
    if (connected) {
      loadMachines();
    } else {
      setLoading(false);
    }
  }, [connected]);

  const loadMachines = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/machines/list');
      const data = await response.json();

      if (data.success) {
        setMachines(data.machines || []);
      }
    } catch (error) {
      console.error('Error loading machines:', error);
      notifications.error('Failed to load available machines');
    } finally {
      setLoading(false);
    }
  };

  const handleRent = async (machineId: string) => {
    if (!connected || !publicKey) {
      notifications.warning('Please connect your wallet first');
      return;
    }

    try {
      setRenting(machineId);
      const loadingToast = notifications.loading('Creating rental...');
      const response = await fetch('/api/rentals/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          machineId,
          renterWalletAddress: publicKey.toString(),
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
      setRenting(null);
    }
  };

  const filteredMachines = machines
    .filter((machine) => {
      const matchesSearch =
        machine.gpuType.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || machine.gpuType.toLowerCase().includes(filterType.toLowerCase());
      const matchesStatus = filterStatus === 'all' || machine.status === filterStatus;
      return matchesSearch && matchesType && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'price') return a.ratePerHour - b.ratePerHour;
      if (sortBy === 'memory') return b.gpuMemory - a.gpuMemory;
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      return 0;
    });

  if (!connected) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
          <h2 className="text-lg font-medium text-yellow-800 dark:text-yellow-200 mb-2">
            Wallet Not Connected
          </h2>
          <p className="text-yellow-700 dark:text-yellow-300">
            Please connect your Solana wallet to browse and rent GPUs.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Browse GPUs</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Rent GPU resources with full root access. Install any libraries, run any workload.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by GPU type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-800 dark:text-white"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="relative flex-1 min-w-[140px]">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-800 dark:text-white text-sm"
              >
                <option value="all">All Types</option>
                <option value="rtx 4090">RTX 4090</option>
                <option value="rtx 3090">RTX 3090</option>
                <option value="a100">A100</option>
                <option value="v100">V100</option>
              </select>
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="flex-1 min-w-[120px] px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-800 dark:text-white text-sm"
            >
              <option value="all">All Status</option>
              <option value="active">Available</option>
              <option value="rented">Rented</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="flex-1 min-w-[140px] px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-800 dark:text-white text-sm"
            >
              <option value="price">Sort by Price</option>
              <option value="memory">Sort by Memory</option>
              <option value="rating">Sort by Rating</option>
            </select>
          </div>
        </div>
      </div>

      {/* GPUs Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading available GPUs...</p>
        </div>
      ) : (
        <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMachines.map((machine) => (
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
                </div>
              </div>
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${
                      statusColors[machine.status as keyof typeof statusColors] || statusColors.offline
                }`}
              >
                    {machine.status}
              </span>
            </div>

            <dl className="space-y-2 mb-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                  <HardDrive className="w-4 h-4 mr-1" />
                  Memory
                </dt>
                <dd className="text-sm font-medium text-gray-900 dark:text-white">
                      {machine.gpuMemory > 1000 ? (machine.gpuMemory / 1024).toFixed(1) : machine.gpuMemory.toFixed(1)} GB
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                  <Cpu className="w-4 h-4 mr-1" />
                  CPU Cores
                </dt>
                <dd className="text-sm font-medium text-gray-900 dark:text-white">
                      {machine.cpuCores || 'N/A'}
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                  <Server className="w-4 h-4 mr-1" />
                  Disk Size
                </dt>
                <dd className="text-sm font-medium text-gray-900 dark:text-white">
                      {machine.diskSize ? `${machine.diskSize} GB` : 'N/A'}
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                  <DollarSign className="w-4 h-4 mr-1" />
                  Price/Hour
                </dt>
                <dd className="text-sm font-medium text-gray-900 dark:text-white">
                      {machine.ratePerHour} USDT
                </dd>
              </div>
                  {machine.cudaCores && (
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                  <Zap className="w-4 h-4 mr-1" />
                  CUDA Cores
                </dt>
                <dd className="text-sm font-medium text-gray-900 dark:text-white">
                        {machine.cudaCores.toLocaleString()}
                </dd>
              </div>
                  )}
                  {machine.uptime && (
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

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <Link
                href={`/user/rent/${machine._id}`}
                className="w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <Info className="w-4 h-4" />
                Detail Info
              </Link>
            </div>
          </div>
        ))}
      </div>

          {filteredMachines.length === 0 && (
        <div className="text-center py-12">
          <Cpu className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No GPUs Found</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Try adjusting your search or filter criteria.
          </p>
        </div>
          )}
        </>
      )}
    </div>
  );
}
