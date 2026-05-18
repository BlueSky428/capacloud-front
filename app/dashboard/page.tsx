'use client';

import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import Link from 'next/link';
import { Cpu, Terminal, DollarSign, Wallet, ArrowRight, Settings, Key } from 'lucide-react';

interface DashboardStats {
  activeRentals: number;
  activeGpus: number;
  escrowBalance: number;
  earnings: number;
}

export default function DashboardPage() {
  const { connected, publicKey } = useWallet();
  const [stats, setStats] = useState<DashboardStats>({
    activeRentals: 0,
    activeGpus: 0,
    escrowBalance: 0,
    earnings: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (connected && publicKey) {
      loadDashboardStats();
    } else {
      setLoading(false);
    }
  }, [connected, publicKey]);

  const loadDashboardStats = async () => {
    try {
      setLoading(true);
      
      // Load active rentals
      const rentalsResponse = await fetch(`/api/rentals/list?walletAddress=${publicKey?.toString()}&activeOnly=true`);
      const rentalsData = await rentalsResponse.json();
      const activeRentals = rentalsData.success ? (rentalsData.rentals || []).length : 0;

      // Load account balance (escrow)
      let escrowBalance = 0;
      try {
        const balanceResponse = await fetch(`/api/account/balance?walletAddress=${publicKey?.toString()}`);
        const balanceData = await balanceResponse.json();
        if (balanceData.success) {
          escrowBalance = balanceData.balance || 0;
        }
      } catch (error) {
        console.error('Error loading balance:', error);
      }

      // Load active GPUs (for providers)
      let activeGpus = 0;
      let earnings = 0;
      try {
        const accountResponse = await fetch(`/api/account/settings?walletAddress=${publicKey?.toString()}`);
        const accountData = await accountResponse.json();
        if (accountData.success && accountData.user?.accountId) {
          const machinesResponse = await fetch(`/api/machines/list?accountId=${accountData.user.accountId}`);
          const machinesData = await machinesResponse.json();
          if (machinesData.success) {
            activeGpus = (machinesData.machines || []).filter((m: any) => m.status === 'active').length;
            // TODO: Calculate earnings from completed rentals
            earnings = 0;
          }
        }
      } catch (error) {
        console.error('Error loading machines:', error);
      }

      setStats({
        activeRentals,
        activeGpus,
        escrowBalance,
        earnings,
      });
    } catch (error) {
      console.error('Error loading dashboard stats:', error);
    } finally {
      setLoading(false);
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
            Please connect your Solana wallet to view your dashboard.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
          Overview of your activity and resources
        </p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading dashboard...</p>
        </div>
      ) : (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Rentals</p>
                  <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                    {stats.activeRentals}
                  </p>
                </div>
                <Terminal className="w-12 h-12 text-blue-500" />
              </div>
              <Link
                href="/user/rentals/list"
                className="mt-4 inline-flex items-center text-sm text-purple-600 dark:text-purple-400 hover:underline"
              >
                View all rentals
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Active GPUs</p>
                  <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                    {stats.activeGpus}
                  </p>
                </div>
                <Cpu className="w-12 h-12 text-green-500" />
              </div>
              <Link
                href="/provider/gpus/list"
                className="mt-4 inline-flex items-center text-sm text-purple-600 dark:text-purple-400 hover:underline"
              >
                Manage GPUs
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Escrow Balance</p>
                  <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                    {stats.escrowBalance.toFixed(4)}
                  </p>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">USDT</p>
                </div>
                <Wallet className="w-12 h-12 text-purple-500" />
              </div>
              <Link
                href="/user/escrow"
                className="mt-4 inline-flex items-center text-sm text-purple-600 dark:text-purple-400 hover:underline"
              >
                Manage escrow
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Earnings</p>
                  <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                    {stats.earnings.toFixed(4)}
                  </p>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">USDT</p>
                </div>
                <DollarSign className="w-12 h-12 text-yellow-500" />
              </div>
              <Link
                href="/provider/earnings"
                className="mt-4 inline-flex items-center text-sm text-purple-600 dark:text-purple-400 hover:underline"
              >
                View earnings
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link
              href="/user/rent"
              className="block w-full px-4 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 text-center font-medium"
            >
              Rent GPU
            </Link>
            <Link
              href="/provider/gpus/register"
              className="block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 text-center font-medium"
            >
              Register GPU
            </Link>
            <Link
              href="/user/settings"
              className="block w-full px-4 py-3 border border-purple-300 dark:border-purple-600 text-purple-700 dark:text-purple-300 rounded-md hover:bg-purple-50 dark:hover:bg-purple-900/20 text-center font-medium flex items-center justify-center"
            >
              <Key className="w-4 h-4 mr-2" />
              Manage SSH Keys
            </Link>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Recent Activity
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
              <span className="text-sm text-gray-600 dark:text-gray-400">Rental started</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
              <span className="text-sm text-gray-600 dark:text-gray-400">GPU registered</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">1 day ago</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Escrow funded</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">2 days ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

