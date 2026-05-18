'use client';

import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { DollarSign, TrendingUp, Download, Wallet } from 'lucide-react';
import { notifications } from '@/lib/notifications';

// Mock data - replace with actual API calls
const mockEarnings = [
  {
    id: 'earn-001',
    gpuId: 'GPU-001',
    rentalId: 'rental-001',
    amount: 0.02,
    date: '2024-01-15T10:30:00Z',
    status: 'paid',
    hours: 2.0,
  },
  {
    id: 'earn-002',
    gpuId: 'GPU-001',
    rentalId: 'rental-002',
    amount: 0.03,
    date: '2024-01-14T15:20:00Z',
    status: 'paid',
    hours: 3.0,
  },
  {
    id: 'earn-003',
    gpuId: 'GPU-002',
    rentalId: 'rental-003',
    amount: 0.015,
    date: '2024-01-14T12:10:00Z',
    status: 'paid',
    hours: 1.5,
  },
];

const mockEarningsByGPU = {
  'GPU-001': 0.15,
  'GPU-002': 0.08,
  'GPU-003': 0.0,
};

export default function EarningsPage() {
  const { connected } = useWallet();
  const [totalEarnings] = useState(0.23);
  const [pendingEarnings] = useState(0.05);

  const handleWithdraw = async () => {
    if (!connected) {
      notifications.warning('Please connect your wallet first');
      return;
    }
    // TODO: Implement withdrawal transaction
    console.log('Withdrawing earnings');
    notifications.info('Withdrawal will be implemented with Solana transaction');
  };

  if (!connected) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
          <h2 className="text-lg font-medium text-yellow-800 dark:text-yellow-200 mb-2">
            Wallet Not Connected
          </h2>
          <p className="text-yellow-700 dark:text-yellow-300">
            Please connect your Solana wallet to view earnings.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Earnings Dashboard</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Track your earnings and manage payouts
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Earnings</p>
              <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                {totalEarnings}
              </p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">USDT</p>
            </div>
            <DollarSign className="w-12 h-12 text-green-500" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Pending Payout
              </p>
              <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                {pendingEarnings}
              </p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">USDT</p>
            </div>
            <TrendingUp className="w-12 h-12 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Available</p>
              <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                {totalEarnings - pendingEarnings}
              </p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">USDT</p>
            </div>
            <Wallet className="w-12 h-12 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Earnings by GPU */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-8">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Earnings by GPU
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(mockEarningsByGPU).map(([gpuId, amount]) => (
            <div key={gpuId} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">{gpuId}</p>
              <p className="mt-1 text-xl font-bold text-gray-900 dark:text-white">
                {amount} USDT
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Withdraw Button */}
      <div className="mb-8 flex justify-end">
        <button
          onClick={handleWithdraw}
          className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700"
        >
          <Download className="w-5 h-5 mr-2" />
          Withdraw Earnings
        </button>
      </div>

      {/* Payout History */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
          Payout History
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  GPU
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Rental ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {mockEarnings.map((earning) => (
                <tr key={earning.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {earning.gpuId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {earning.rentalId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600 dark:text-green-400">
                    +{earning.amount} USDT
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {new Date(earning.date).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">
                      {earning.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

