'use client';

import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import Link from 'next/link';
import { Plus, Search, Filter, Clock, CheckCircle, XCircle, Loader, Terminal, Cpu } from 'lucide-react';
import { notifications } from '@/lib/notifications';

interface Rental {
  rentalId: string;
  gpuType?: string;
  providerAccountId?: string;
  providerName?: string;
  status: string;
  startedAt: string;
  endedAt?: string;
  totalCost: number;
  hoursUsed: number;
  sshHost?: string;
  sshPort?: number;
  sshUser?: string;
  machineId?: string;
}

const statusColors = {
  active: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
  paused: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300',
  completed: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300',
  cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300',
};

const statusIcons = {
  active: Loader,
  paused: Clock,
  completed: CheckCircle,
  cancelled: XCircle,
};

export default function RentalsListPage() {
  const { connected, publicKey } = useWallet();
  const [loading, setLoading] = useState(true);
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    if (connected && publicKey) {
      loadRentals();
    } else {
      setLoading(false);
    }
  }, [connected, publicKey]);

  const loadRentals = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/rentals/list?walletAddress=${publicKey?.toString()}`);
      const data = await response.json();

      if (data.success) {
        setRentals(data.rentals || []);
      } else {
        notifications.error('Failed to load rentals', { duration: 4000 });
      }
    } catch (error) {
      console.error('Error loading rentals:', error);
      notifications.error('Failed to load rentals', { duration: 4000 });
    } finally {
      setLoading(false);
    }
  };

  const filteredRentals = rentals.filter((rental) => {
    const matchesSearch = 
      (rental.gpuType?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
      (rental.providerAccountId?.toLowerCase().includes(searchTerm.toLowerCase()) || false);
    const matchesFilter = filterStatus === 'all' || rental.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  if (!connected) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
          <h2 className="text-lg font-medium text-yellow-800 dark:text-yellow-200 mb-2">
            Wallet Not Connected
          </h2>
          <p className="text-yellow-700 dark:text-yellow-300">
            Please connect your Solana wallet to view your rentals.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Rentals</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            View and manage your active GPU rental sessions
          </p>
        </div>
        <Link
          href="/user/rent"
          className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Rent GPU
        </Link>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search rentals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-800 dark:text-white"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-800 dark:text-white appearance-none"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Rentals Table */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading rentals...</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
          {filteredRentals.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">No rentals found</p>
              <Link
                href="/user/rent"
                className="mt-4 inline-block text-purple-600 dark:text-purple-400 hover:underline"
              >
                Rent your first GPU
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredRentals.map((rental) => {
                const StatusIcon = statusIcons[rental.status as keyof typeof statusIcons] || CheckCircle;
                return (
                  <li key={rental.rentalId}>
                    <Link
                      href={`/user/rentals/${rental.rentalId}`}
                      className="block hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                          <div className="flex items-start sm:items-center flex-1 min-w-0">
                            <div className="flex-shrink-0">
                              <StatusIcon
                                className={`w-5 h-5 text-gray-400 ${
                                  rental.status === 'active' ? 'animate-spin' : ''
                                }`}
                              />
                            </div>
                            <div className="ml-4 flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-2">
                                <Cpu className="w-4 h-4 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                  {rental.gpuType || 'Unknown GPU'}
                                </p>
                                {rental.providerName && (
                                  <span className="text-xs text-gray-500 dark:text-gray-400">
                                    ({rental.providerName})
                                  </span>
                                )}
                                <span
                                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    statusColors[rental.status as keyof typeof statusColors] ||
                                    statusColors.completed
                                  }`}
                                >
                                  {rental.status}
                                </span>
                              </div>
                              <div className="mt-2 flex flex-col sm:flex-row sm:items-center text-sm text-gray-500 dark:text-gray-400 gap-2 sm:gap-4">
                                <span className="flex items-center">
                                  <Clock className="w-4 h-4 mr-1 flex-shrink-0" />
                                  <span className="break-words">Started: {new Date(rental.startedAt).toLocaleString()}</span>
                                </span>
                                {rental.status === 'active' && rental.sshHost && rental.sshHost !== 'localhost' && (
                                  <span className="flex items-center">
                                    <Terminal className="w-4 h-4 mr-1 flex-shrink-0" />
                                    <span className="break-all">SSH: {rental.sshUser || 'root'}@{rental.sshHost}:{rental.sshPort || 2222}</span>
                                  </span>
                                )}
                                {rental.status === 'active' && (
                                  <span className="flex items-center">
                                    Hours: {rental.hoursUsed.toFixed(1)}h
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="text-left sm:text-right mt-2 sm:mt-0 sm:ml-4">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {rental.totalCost.toFixed(4)} USDT
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {rental.status === 'active' ? 'Running cost' : 'Total cost'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
