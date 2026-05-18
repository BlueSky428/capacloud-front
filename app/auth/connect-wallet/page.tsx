'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { Wallet, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import WalletMultiButton from '@/components/WalletButton';

const supportedWallets = [
  { name: 'Phantom', description: 'Popular Solana wallet' },
  { name: 'Solflare', description: 'Secure Solana wallet' },
  { name: 'Backpack', description: 'Multi-chain wallet' },
];

export default function ConnectWalletPage() {
  const { connected, publicKey } = useWallet();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Connect Wallet</h1>
        <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
          Connect your Solana wallet to get started
        </p>
      </div>

      {connected ? (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-600 dark:text-green-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-green-900 dark:text-green-200 mb-2">
            Wallet Connected!
          </h2>
          <p className="text-green-800 dark:text-green-300 mb-4">
            Your wallet address: <span className="font-mono">{publicKey?.toString()}</span>
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/dashboard"
              className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              Go to Dashboard
            </Link>
            <Link
              href="/"
              className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              Back to Home
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Connect Button */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-8 text-center">
            <Wallet className="w-16 h-16 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Connect Your Wallet
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Click the button below to connect your Solana wallet
            </p>
            <div className="flex justify-center">
              <WalletMultiButton />
            </div>
          </div>

          {/* Supported Wallets */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Supported Wallets
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {supportedWallets.map((wallet) => (
                <div
                  key={wallet.name}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center"
                >
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {wallet.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{wallet.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Why Connect */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-200 mb-2">
              Why do we ask for wallet connection?
            </h3>
            <ul className="list-disc list-inside text-blue-800 dark:text-blue-300 space-y-1">
              <li>Secure authentication without passwords</li>
              <li>Automatic hourly billing for GPU rentals</li>
              <li>Receive earnings as a GPU provider</li>
              <li>On-chain GPU registration</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

