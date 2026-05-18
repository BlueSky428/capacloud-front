import Link from 'next/link';
import { ArrowLeft, Book, Wallet, Cpu, CheckCircle2, ArrowRight, Info } from 'lucide-react';

export default function GettingStartedPage() {
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
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Getting Started
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Your comprehensive guide to CapaCloud's decentralized GPU computing platform
        </p>
      </div>

      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-6 mb-12">
        <div className="flex items-start">
          <Info className="w-6 h-6 text-purple-600 dark:text-purple-400 mr-3 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-200 mb-2">
              Welcome to CapaCloud!
            </h3>
            <p className="text-purple-800 dark:text-purple-300">
              This guide will help you get started with our decentralized GPU computing platform. Whether you're looking to rent GPU resources or share your own, we've got you covered.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-12">

        {/* What is CapaCloud */}
        <section className="bg-white dark:bg-gray-800 shadow rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <Book className="w-6 h-6 mr-3 text-purple-600 dark:text-purple-400" />
            What is CapaCloud?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            CapaCloud is a decentralized GPU rental marketplace powered by Solana. Users can rent GPU resources 
            on-demand with full root access, while providers can earn USDT by sharing their GPU resources.
          </p>
        </section>

        {/* Quick Overview */}
        <section className="bg-white dark:bg-gray-800 shadow rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Quick Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-2 border-purple-200 dark:border-purple-800 rounded-xl p-6 hover:border-purple-400 dark:hover:border-purple-600 transition-colors">
              <div className="flex items-center mb-4">
                <div className="bg-purple-100 dark:bg-purple-900/30 rounded-lg p-3 mr-4">
                  <Wallet className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">For Users</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Rent GPUs, run your workloads, pay by the hour. Full root access included.
              </p>
              <Link 
                href="/docs/renting-gpus" 
                className="inline-flex items-center mt-4 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium"
              >
                Learn more <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <div className="border-2 border-green-200 dark:border-green-800 rounded-xl p-6 hover:border-green-400 dark:hover:border-green-600 transition-colors">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-3 mr-4">
                  <Cpu className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">For Providers</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Share your GPU resources and earn USDT automatically.
              </p>
              <Link 
                href="/docs/provider-setup" 
                className="inline-flex items-center mt-4 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium"
              >
                Learn more <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </section>

        {/* Getting Started Steps */}
        <section className="bg-white dark:bg-gray-800 shadow rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Getting Started Steps</h2>
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mr-4 mt-1">
                <span className="text-purple-600 dark:text-purple-400 font-bold">1</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Connect Your Wallet</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Connect your Solana wallet (Phantom, Solflare, etc.) to access the platform. 
                  Your wallet is used for authentication and payments.
                </p>
                <Link href="/docs/wallet-setup" className="text-purple-600 dark:text-purple-400 hover:underline text-sm font-medium mt-2 inline-block">
                  Wallet Setup Guide →
                </Link>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mr-4 mt-1">
                <span className="text-purple-600 dark:text-purple-400 font-bold">2</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Choose Your Role</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <p className="font-semibold text-gray-900 dark:text-white mb-1">User</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Browse available GPUs, top up your account balance, and rent GPUs
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <p className="font-semibold text-gray-900 dark:text-white mb-1">Provider</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Install the GPU worker, register your machines, and start earning
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mr-4 mt-1">
                <span className="text-purple-600 dark:text-purple-400 font-bold">3</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Start Using</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                  <Link href="/docs/renting-gpus" className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4 hover:border-purple-400 dark:hover:border-purple-600 transition-colors">
                    <p className="font-semibold text-purple-900 dark:text-purple-200 mb-1">For Users</p>
                    <p className="text-sm text-purple-700 dark:text-purple-300">
                      Learn how to rent GPUs →
                    </p>
                  </Link>
                  <Link href="/docs/provider-setup" className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 hover:border-green-400 dark:hover:border-green-600 transition-colors">
                    <p className="font-semibold text-green-900 dark:text-green-200 mb-1">For Providers</p>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Learn how to become a provider →
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Concepts */}
        <section className="bg-white dark:bg-gray-800 shadow rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Key Concepts</h2>
          <div className="space-y-6">
            <div className="border-l-4 border-purple-500 dark:border-purple-400 pl-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Account Balance</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Your account balance is used for hourly billing when renting GPUs. You can top up your balance 
                and claim it back to your wallet when needed.
              </p>
              <Link href="/docs/escrow" className="text-purple-600 dark:text-purple-400 hover:underline text-sm font-medium mt-2 inline-block">
                Learn about Escrow & Billing →
              </Link>
            </div>
            
            <div className="border-l-4 border-blue-500 dark:border-blue-400 pl-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Rentals</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                A rental is a session where you're using a GPU. You pay by the hour, and can pause, resume, 
                or end the rental at any time.
              </p>
            </div>
            
            <div className="border-l-4 border-green-500 dark:border-green-400 pl-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Account ID</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                A unique identifier for providers to claim ownership of their GPU machines. You can find your 
                Account ID in your account settings.
              </p>
            </div>
          </div>
        </section>

        {/* Next Steps */}
        <section className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Next Steps</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link 
              href="/docs/quick-start" 
              className="bg-white dark:bg-gray-800 rounded-lg p-5 hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center mb-2">
                <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
                <h3 className="font-semibold text-gray-900 dark:text-white">Quick Start Guide</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Get started in 5 minutes</p>
            </Link>
            
            <Link 
              href="/docs/wallet-setup" 
              className="bg-white dark:bg-gray-800 rounded-lg p-5 hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center mb-2">
                <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
                <h3 className="font-semibold text-gray-900 dark:text-white">Wallet Setup</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Configure your Solana wallet</p>
            </Link>
            
            <Link 
              href="/docs/renting-gpus" 
              className="bg-white dark:bg-gray-800 rounded-lg p-5 hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center mb-2">
                <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
                <h3 className="font-semibold text-gray-900 dark:text-white">Renting GPUs</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Learn how to rent GPUs</p>
            </Link>
            
            <Link 
              href="/docs/provider-setup" 
              className="bg-white dark:bg-gray-800 rounded-lg p-5 hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center mb-2">
                <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
                <h3 className="font-semibold text-gray-900 dark:text-white">Provider Setup</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Learn how to become a provider</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

