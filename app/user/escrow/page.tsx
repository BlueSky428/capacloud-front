'use client';

import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Wallet, Plus, History, Info, ArrowUp, ArrowDown } from 'lucide-react';
import { notifications } from '@/lib/notifications';

interface Transaction {
  transactionId: string;
  type: string;
  amount: number;
  status: string;
  createdAt: string;
  description?: string;
}

export default function EscrowPage() {
  const { connected, publicKey } = useWallet();
  const [loading, setLoading] = useState(true);
  const [loadingTransactions, setLoadingTransactions] = useState(false);
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [fundAmount, setFundAmount] = useState('');
  const [claimAmount, setClaimAmount] = useState('');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (connected && publicKey) {
      loadBalance();
      loadTransactions();
    }
  }, [connected, publicKey]);

  const loadBalance = async () => {
    try {
      const response = await fetch(`/api/account/balance?walletAddress=${publicKey?.toString()}`);
      const data = await response.json();
      if (data.success) {
        setBalance(data.balance || 0);
      }
    } catch (error) {
      console.error('Error loading balance:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadTransactions = async () => {
    if (!publicKey) return;
    
    try {
      setLoadingTransactions(true);
      const response = await fetch(`/api/transactions?walletAddress=${publicKey.toString()}&limit=50`);
      const data = await response.json();
      
      if (data.success) {
        setTransactions(data.transactions || []);
      } else {
        console.error('Failed to load transactions:', data.error);
        setTransactions([]);
      }
    } catch (error) {
      console.error('Error loading transactions:', error);
      setTransactions([]);
    } finally {
      setLoadingTransactions(false);
    }
  };

  const handleTopUp = async () => {
    if (!connected || !publicKey) {
      notifications.warning('Please connect your wallet first');
      return;
    }
    if (!fundAmount || parseFloat(fundAmount) <= 0) {
      notifications.error('Please enter a valid amount');
      return;
    }

    try {
      setProcessing(true);
      const response = await fetch('/api/account/balance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          walletAddress: publicKey.toString(),
          action: 'topup',
          amount: parseFloat(fundAmount),
        }),
      });

      const data = await response.json();

      if (data.success) {
        notifications.success('Balance topped up successfully');
        setFundAmount('');
        loadBalance();
        loadTransactions();
        // Dispatch event to update navbar balance immediately
        window.dispatchEvent(new CustomEvent('balanceUpdated'));
      } else {
        notifications.error(data.error || 'Failed to top up balance');
      }
    } catch (error) {
      console.error('Error topping up:', error);
      notifications.error('Failed to top up balance');
    } finally {
      setProcessing(false);
    }
  };

  const handleClaim = async () => {
    if (!connected || !publicKey) {
      notifications.warning('Please connect your wallet first');
      return;
    }
    if (!claimAmount || parseFloat(claimAmount) <= 0) {
      notifications.error('Please enter a valid amount');
      return;
    }
    if (parseFloat(claimAmount) > balance) {
      notifications.error('Insufficient balance');
      return;
    }

    try {
      setProcessing(true);
      const response = await fetch('/api/account/balance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          walletAddress: publicKey.toString(),
          action: 'claim',
          amount: parseFloat(claimAmount),
        }),
      });

      const data = await response.json();

      if (data.success) {
        notifications.success('Balance claimed successfully');
        setClaimAmount('');
        loadBalance();
        loadTransactions();
        // Dispatch event to update navbar balance immediately
        window.dispatchEvent(new CustomEvent('balanceUpdated'));
      } else {
        notifications.error(data.error || 'Failed to claim balance');
      }
    } catch (error) {
      console.error('Error claiming:', error);
      notifications.error('Failed to claim balance');
    } finally {
      setProcessing(false);
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
            Please connect your Solana wallet to view and manage your account balance.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Account Balance</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Manage your account balance and transaction history
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Balance Card */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">Current Balance</h2>
              <Wallet className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="mb-6">
              {loading ? (
                <div className="animate-pulse">
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                </div>
              ) : (
                <>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {balance.toFixed(4)}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">USDT</p>
                </>
              )}
            </div>

            {/* Top Up */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mb-6">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                <ArrowUp className="w-4 h-4 mr-2 text-green-600" />
                Top Up Balance
              </h3>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="fundAmount"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Amount (USDT)
                  </label>
                  <input
                    type="number"
                    id="fundAmount"
                    min="0"
                    step="0.001"
                    value={fundAmount}
                    onChange={(e) => setFundAmount(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="0.00"
                  />
                </div>
                <button
                  onClick={handleTopUp}
                  disabled={processing}
                  className="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  {processing ? 'Processing...' : 'Top Up'}
                </button>
              </div>
            </div>

            {/* Claim */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                <ArrowDown className="w-4 h-4 mr-2 text-purple-600" />
                Claim to Wallet
              </h3>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="claimAmount"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Amount (USDT)
                  </label>
                  <input
                    type="number"
                    id="claimAmount"
                    min="0"
                    step="0.001"
                    max={balance}
                    value={claimAmount}
                    onChange={(e) => setClaimAmount(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="0.00"
                  />
                </div>
                <button
                  onClick={handleClaim}
                  disabled={processing || balance === 0}
                  className="w-full flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50"
                >
                  <ArrowDown className="w-5 h-5 mr-2" />
                  {processing ? 'Processing...' : 'Claim'}
                </button>
              </div>
            </div>

            {/* Info */}
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <div className="flex">
                <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                <div className="ml-3">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    Pay with USDT. Account balance is automatically used for hourly billing when your GPU rentals are active.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* History */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                <History className="w-5 h-5 mr-2" />
                Transaction History
              </h2>
            </div>
            {loadingTransactions ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
                <p className="mt-4 text-gray-500 dark:text-gray-400">Loading transactions...</p>
              </div>
            ) : transactions.length === 0 ? (
              <div className="text-center py-12">
                <History className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-4 text-gray-500 dark:text-gray-400">No transactions yet</p>
                <p className="mt-2 text-sm text-gray-400 dark:text-gray-500">
                  Your transaction history will appear here after you top up, claim, or rent GPUs.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {transactions.map((transaction) => (
                      <tr key={transaction.transactionId} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                        <td className="px-4 sm:px-6 py-4 text-sm">
                          <div className="font-medium text-gray-900 dark:text-white">
                            <span className="capitalize">
                              {transaction.type.replace(/_/g, ' ')}
                            </span>
                          </div>
                          {transaction.description && (
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-xs truncate">
                              {transaction.description}
                            </p>
                          )}
                        </td>
                        <td
                          className={`px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium ${
                            transaction.amount > 0
                              ? 'text-green-600 dark:text-green-400'
                              : 'text-red-600 dark:text-red-400'
                          }`}
                        >
                          {transaction.amount > 0 ? '+' : ''}
                          {transaction.amount.toFixed(4)} USDT
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          <span className="hidden sm:inline">
                            {new Date(transaction.createdAt).toLocaleString()}
                          </span>
                          <span className="sm:hidden">
                            {new Date(transaction.createdAt).toLocaleDateString()}
                          </span>
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            transaction.status === 'completed'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                              : transaction.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
                              : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
                          }`}>
                            {transaction.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
