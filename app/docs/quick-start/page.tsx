'use client';

import Link from 'next/link';
import { ArrowLeft, Zap, Wallet, DollarSign, Search, Cpu, Terminal, CheckCircle2, ArrowRight, Settings, Key } from 'lucide-react';
import CodeBlock from '@/components/CodeBlock';

export default function QuickStartPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href="/docs"
        className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 mb-8"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Documentation
      </Link>

      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
          <Zap className="w-10 h-10 mr-4 text-yellow-500" />
          Quick Start Guide
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Get started with CapaCloud in just 5 minutes
        </p>
      </div>

      <div className="space-y-12">
        {/* For Users */}
        <section className="bg-white dark:bg-gray-800 shadow rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <Wallet className="w-6 h-6 mr-3 text-purple-500" />
            For Users: Rent Your First GPU
          </h2>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mr-4 mt-1">
                <span className="text-purple-600 dark:text-purple-400 font-bold">1</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Connect Your Wallet</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Click "Connect Wallet" in the navbar and select your Solana wallet (Phantom, Solflare, etc.)
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mr-4 mt-1">
                <span className="text-purple-600 dark:text-purple-400 font-bold">2</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Top Up Your Balance</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Go to <Link href="/user/escrow" className="text-purple-600 dark:text-purple-400 hover:underline">Account Balance</Link> and top up your account. 
                  For your first rental, you'll need 10 USDT or enough for 1 hour (whichever is higher).
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mr-4 mt-1">
                <span className="text-purple-600 dark:text-purple-400 font-bold">3</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Browse Available GPUs</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Go to <Link href="/user/rent" className="text-purple-600 dark:text-purple-400 hover:underline">Browse GPUs</Link> to see available machines. 
                  Filter by GPU type, memory, or price.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mr-4 mt-1">
                <span className="text-purple-600 dark:text-purple-400 font-bold">4</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Rent a GPU</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Click "Rent GPU" on a machine you want. You'll be redirected to the rental details page with SSH connection information.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mr-4 mt-1">
                <span className="text-purple-600 dark:text-purple-400 font-bold">5</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Connect via SSH</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Use your SSH private key to connect to your rented GPU using the provided connection details.
                </p>
                <Link href="/docs/ssh-connection" className="text-purple-600 dark:text-purple-400 hover:underline text-sm font-medium mt-2 inline-block">
                  SSH Connection Guide →
                </Link>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mr-4 mt-1">
                <span className="text-purple-600 dark:text-purple-400 font-bold">6</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Start Working</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Install libraries, run your workloads, and use the GPU as needed. Billing is automatic and hourly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* For Providers */}
        <section className="bg-white dark:bg-gray-800 shadow rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <Cpu className="w-6 h-6 mr-3 text-green-500" />
            For Providers: Share Your GPU
          </h2>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mr-4 mt-1">
                <span className="text-green-600 dark:text-green-400 font-bold">1</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Connect Your Wallet</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Connect your Solana wallet to create an account and get your Account ID.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mr-4 mt-1">
                <span className="text-green-600 dark:text-green-400 font-bold">2</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Get Your Account ID</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Go to <Link href="/user/settings" className="text-green-600 dark:text-green-400 hover:underline">Account Settings</Link> to view your Account ID. 
                  Copy it - you'll need it for the worker installation.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mr-4 mt-1">
                <span className="text-green-600 dark:text-green-400 font-bold">3</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Install GPU Worker</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  Run this command on your GPU machine:
                </p>
                <CodeBlock code="curl -s https://capa.cloud/install.sh | sudo bash" />
                <p className="text-gray-700 dark:text-gray-300 mt-2">
                  When prompted, enter your Account ID from step 2.
                </p>
                <Link href="/docs/worker-installation" className="text-green-600 dark:text-green-400 hover:underline text-sm font-medium mt-2 inline-block">
                  Detailed Installation Guide →
                </Link>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mr-4 mt-1">
                <span className="text-green-600 dark:text-green-400 font-bold">4</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Register Your Machine</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Go to <Link href="/provider/gpus/register" className="text-green-600 dark:text-green-400 hover:underline">Register GPU</Link> to complete 
                  machine registration. Set SSH port, IP address, and hourly rate.
                </p>
                <Link href="/docs/gpu-registration" className="text-green-600 dark:text-green-400 hover:underline text-sm font-medium mt-2 inline-block">
                  Registration Guide →
                </Link>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mr-4 mt-1">
                <span className="text-green-600 dark:text-green-400 font-bold">5</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Start Earning</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Once registered, your GPU will be available for rent. You'll earn USDT automatically 
                  for every hour your GPU is rented.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Common First Steps */}
        <section className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Common First Steps</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center bg-white dark:bg-gray-800 rounded-lg p-4">
              <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
              <span className="text-gray-700 dark:text-gray-300">Make sure your Solana wallet is connected</span>
            </div>
            <div className="flex items-center bg-white dark:bg-gray-800 rounded-lg p-4">
              <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
              <span className="text-gray-700 dark:text-gray-300">Check your account balance (users) or Account ID (providers)</span>
            </div>
            <div className="flex items-center bg-white dark:bg-gray-800 rounded-lg p-4">
              <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
              <span className="text-gray-700 dark:text-gray-300">
                Review the <Link href="/docs/escrow" className="text-blue-600 dark:text-blue-400 hover:underline">Escrow & Billing</Link> guide
              </span>
            </div>
            <div className="flex items-center bg-white dark:bg-gray-800 rounded-lg p-4">
              <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
              <span className="text-gray-700 dark:text-gray-300">
                Read the <Link href="/docs/ssh-connection" className="text-blue-600 dark:text-blue-400 hover:underline">SSH Connection Guide</Link> (for users)
              </span>
            </div>
          </div>
        </section>

        {/* Need Help */}
        <section className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <Terminal className="w-6 h-6 mr-3 text-yellow-500" />
            Need Help?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            If you encounter any issues, check out:
          </p>
          <div className="space-y-3">
            <Link href="/docs/troubleshooting" className="flex items-center text-yellow-800 dark:text-yellow-200 hover:text-yellow-900 dark:hover:text-yellow-100 font-medium">
              <ArrowRight className="w-4 h-4 mr-2" />
              Troubleshooting Guide
            </Link>
            <Link href="/help" className="flex items-center text-yellow-800 dark:text-yellow-200 hover:text-yellow-900 dark:hover:text-yellow-100 font-medium">
              <ArrowRight className="w-4 h-4 mr-2" />
              Help & Support
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
