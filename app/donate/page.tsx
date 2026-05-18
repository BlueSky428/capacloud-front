'use client';

import { useState } from 'react';
import { Copy, Check, Rocket, ExternalLink, Wallet, X } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import { useConnection } from '@solana/wallet-adapter-react';
import { notifications } from '@/lib/notifications';
import { getSolanaCluster } from '@/lib/solana-config';

// Moonshot wallet addresses (update these with actual addresses)
const MOONSHOT_WALLETS = {
  moonshot1: 'AViVWZ7qtgsemgGw3bZ94aQoTBRgainwitfAxHhJMMmR', // Update with actual address
  moonshot2: 'AViVWZ7qtgsemgGw3bZ94aQoTBRgainwitfAxHhJMMmR', // Update with actual address
  moonshot3: 'AViVWZ7qtgsemgGw3bZ94aQoTBRgainwitfAxHhJMMmR', // Update with actual address
};

interface Moonshot {
  id: string;
  title: string;
  description: string;
  walletAddress: string;
}

const moonshots: Moonshot[] = [
  {
    id: 'moonshot1',
    title: 'Using Butterfly Effect to Control Formation of El Nino and La Nina',
    description: 'Research project exploring global climate control through computational modeling and analysis.',
    walletAddress: MOONSHOT_WALLETS.moonshot1,
  },
  {
    id: 'moonshot2',
    title: 'Teleporting a single photon to Voyager 1',
    description: 'Cutting-edge quantum physics research project for free-space communication.',
    walletAddress: MOONSHOT_WALLETS.moonshot2,
  },
  {
    id: 'moonshot3',
    title: 'Read/Write using focused ultrasound on a virtual amygdala',
    description: 'Pioneering neuroscience research project exploring brain-computer interfaces using focused ultrasound technology.',
    walletAddress: MOONSHOT_WALLETS.moonshot3,
  },
];

export default function DonatePage() {
  const [selectedMoonshot, setSelectedMoonshot] = useState<Moonshot | null>(null);
  const [copied, setCopied] = useState(false);
  const { connected, publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();

  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    notifications.success('Wallet address copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const openInWallet = async (moonshot: Moonshot) => {
    if (!connected || !publicKey) {
      notifications.warning('Please connect your wallet first to send a donation', {
        duration: 5000,
      });
      return;
    }

    try {
      const donationPubkey = new PublicKey(moonshot.walletAddress);
      const loadingToast = notifications.loading('Preparing transaction...');

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: donationPubkey,
          lamports: 100_000_000, // 0.1 SOL (user can modify in wallet)
        })
      );

      transaction.feePayer = publicKey;

      try {
        const { blockhash: latestBlockhash } = await connection.getLatestBlockhash('confirmed');
        transaction.recentBlockhash = latestBlockhash;
      } catch (rpcError: any) {
        notifications.dismiss(loadingToast);
        const errorMessage = rpcError?.message || String(rpcError);
        const isRpcError = errorMessage.includes('403') || 
                          errorMessage.includes('Access forbidden') ||
                          errorMessage.includes('429') ||
                          errorMessage.includes('rate limit');
        
        if (isRpcError) {
          notifications.error(
            'RPC endpoint error. Please configure a custom RPC endpoint (NEXT_PUBLIC_SOLANA_RPC_ENDPOINT) or copy the address to send manually.',
            { duration: 7000 }
          );
          return;
        }
        throw rpcError;
      }

      try {
        const simulation = await connection.simulateTransaction(transaction);
        if (simulation.value.err) {
          notifications.dismiss(loadingToast);
          notifications.error(
            `Transaction simulation failed: ${JSON.stringify(simulation.value.err)}. Please check your balance and try again.`,
            { duration: 6000 }
          );
          return;
        }
      } catch (simError: any) {
        console.warn('Transaction simulation failed, but continuing:', simError);
      }

      const signature = await sendTransaction(transaction, connection, {
        skipPreflight: false,
        maxRetries: 3,
      });
      
      notifications.update(loadingToast, 'Transaction sent! Check your wallet for confirmation.', 'success');
      console.log('Transaction sent:', signature);
    } catch (error: any) {
      console.error('Error sending transaction:', error);
      
      if (error.name === 'UserRejectedRequestError') {
        notifications.info('Transaction cancelled');
        return;
      }
      
      const errorMessage = error?.message || String(error);
      const isRpcError = errorMessage.includes('403') || 
                        errorMessage.includes('Access forbidden') ||
                        errorMessage.includes('429') ||
                        errorMessage.includes('rate limit') ||
                        errorMessage.includes('failed to get recent blockhash');
      
      if (isRpcError) {
        notifications.error(
          'RPC endpoint error. Please configure a custom RPC endpoint (NEXT_PUBLIC_SOLANA_RPC_ENDPOINT) or copy the address to send manually from your wallet.',
          { duration: 7000 }
        );
      } else {
        notifications.error('Failed to send transaction. Please try copying the address instead.', {
          duration: 5000,
        });
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <div className="bg-purple-100 dark:bg-purple-900/20 rounded-full p-4">
            <Rocket className="w-12 h-12 text-purple-600 dark:text-purple-400" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Donate for CapaCloud Moonshots
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          CapaCloud Moonshots are non-profit projects for humanity. Your donation will be used for accessing computational resources (GPUs) for these projects. Donations are always anonymous.
        </p>
      </div>

      {/* Moonshots List */}
      <div className="space-y-6 mb-8">
        {moonshots.map((moonshot, index) => (
          <div
            key={moonshot.id}
            className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-3">
                  <div className="bg-purple-100 dark:bg-purple-900/20 rounded-full p-2 mr-3">
                    <Rocket className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    Moonshot {index + 1}: {moonshot.title}
                  </h2>
                </div>
                <p className="text-gray-600 dark:text-gray-400 ml-12">
                  {moonshot.description}
                </p>
              </div>
            </div>
            <div className="mt-4 ml-12">
              <button
                onClick={() => setSelectedMoonshot(moonshot)}
                className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors font-medium"
              >
                <Wallet className="w-5 h-5 mr-2" />
                Donate
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Donation Modal */}
      {selectedMoonshot && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedMoonshot(null)}>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Donate to {selectedMoonshot.title}
              </h3>
              <button
                onClick={() => setSelectedMoonshot(null)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Wallet Address */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Donation Wallet Address
              </label>
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <p className="font-mono text-sm text-gray-900 dark:text-white break-all">
                    {selectedMoonshot.walletAddress}
                  </p>
                </div>
                <button
                  onClick={() => copyAddress(selectedMoonshot.walletAddress)}
                  className="flex-shrink-0 p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  title="Copy wallet address"
                >
                  {copied ? (
                    <Check className="w-5 h-5 text-green-200" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* QR Code */}
            <div className="mb-6 flex flex-col items-center">
              <div className="bg-white rounded-lg p-6 border-2 border-gray-200 shadow-sm">
                <QRCodeSVG
                  value={selectedMoonshot.walletAddress}
                  size={256}
                  level="H"
                  includeMargin={true}
                  fgColor="#000000"
                  bgColor="#ffffff"
                />
              </div>
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center">
                Scan with your wallet app to donate
              </p>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => openInWallet(selectedMoonshot)}
                className="flex items-center justify-center space-x-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!connected}
              >
                <Wallet className="w-5 h-5" />
                <span>{connected ? 'Send via Wallet' : 'Connect Wallet'}</span>
                {connected && <ExternalLink className="w-4 h-4" />}
              </button>
              <a
                href={`https://solscan.io/account/${selectedMoonshot.walletAddress}?cluster=${getSolanaCluster()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <span>View on Solscan</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Note */}
            <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>Note:</strong> All donations are anonymous and will be used exclusively for computational resources (GPUs) for this moonshot project.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
