'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { Wallet, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { notifications } from '@/lib/notifications';

// Mock data - replace with actual API calls
const mockTransactions = [
  {
    id: 'tx-001',
    type: 'deposit',
    amount: 10.0,
    date: '2024-01-15T10:00:00Z',
    status: 'confirmed',
  },
  {
    id: 'tx-002',
    type: 'transfer',
    amount: -0.05,
    date: '2024-01-15T10:30:00Z',
    status: 'confirmed',
    to: 'GPU Provider',
  },
  {
    id: 'tx-003',
    type: 'deposit',
    amount: 5.0,
    date: '2024-01-14T15:20:00Z',
    status: 'confirmed',
  },
];

export default function WalletPage() {
  const { connected, publicKey } = useWallet();
  const [copied, setCopied] = useState(false);
  const [tokenBalance] = useState(14.95); // Mock balance
  const [solBalance] = useState(2.5); // Mock SOL balance

  const copyAddress = () => {
    if (publicKey) {
      navigator.clipboard.writeText(publicKey.toString());
      setCopied(true);
      notifications.success('Wallet address copied', { duration: 2000 });
      setTimeout(() => setCopied(false), 2000);
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
            Please connect your Solana wallet to view wallet information.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Wallet</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          View your wallet address and USDT balances
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Wallet Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">Wallet Address</h2>
              <Wallet className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="mb-4">
              <div className="flex items-center space-x-2">
                <p className="text-sm font-mono text-gray-600 dark:text-gray-400 break-all">
                  {publicKey?.toString()}
                </p>
                <button
                  onClick={copyAddress}
                  className="flex-shrink-0 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded transition-colors"
                  title="Copy wallet address"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Balances */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Balances</h2>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm text-gray-500 dark:text-gray-400">USDT</dt>
                <dd className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                  {tokenBalance}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500 dark:text-gray-400">SOL</dt>
                <dd className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                  {solBalance}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Transaction History */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
              Transaction History
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Type
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
                  {mockTransactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white capitalize">
                        {transaction.type}
                        {transaction.to && (
                          <span className="text-gray-500 dark:text-gray-400 ml-2">
                            → {transaction.to}
                          </span>
                        )}
                      </td>
                      <td
                        className={`px-6 py-4 whitespace-nowrap text-sm ${
                          transaction.amount > 0
                            ? 'text-green-600 dark:text-green-400'
                            : 'text-red-600 dark:text-red-400'
                        }`}
                      >
                        {transaction.amount > 0 ? '+' : ''}
                        {transaction.amount} {transaction.type === 'transfer' ? 'USDT' : 'SOL'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {new Date(transaction.date).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">
                          {transaction.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

