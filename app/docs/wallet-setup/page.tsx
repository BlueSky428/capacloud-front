import Link from 'next/link';
import { ArrowLeft, Wallet, ExternalLink, CheckCircle2, Shield, Key } from 'lucide-react';

export default function WalletSetupPage() {
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
          <Wallet className="w-10 h-10 mr-4 text-purple-600 dark:text-purple-400" />
          Wallet Setup
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Connect your Solana wallet to get started with CapaCloud
        </p>
      </div>

      <div className="space-y-12">
        {/* Supported Wallets */}
        <section className="bg-white dark:bg-gray-800 shadow rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <CheckCircle2 className="w-6 h-6 mr-3 text-green-500" />
            Supported Wallets
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            CapaCloud supports all Solana-compatible wallets. The most popular options are:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-5 hover:border-purple-400 dark:hover:border-purple-600 transition-colors">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Phantom</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Most popular Solana wallet</p>
            </div>
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-5 hover:border-purple-400 dark:hover:border-purple-600 transition-colors">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Solflare</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Feature-rich wallet</p>
            </div>
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-5 hover:border-purple-400 dark:hover:border-purple-600 transition-colors">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Backpack</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Developer-friendly wallet</p>
            </div>
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-5 hover:border-purple-400 dark:hover:border-purple-600 transition-colors">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Others</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Any wallet supporting Solana Wallet Adapter</p>
            </div>
          </div>
        </section>

        {/* Installing a Wallet */}
        <section className="bg-white dark:bg-gray-800 shadow rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Installing a Wallet</h2>
          
          <div className="space-y-8">
            <div className="border-l-4 border-purple-500 dark:border-purple-400 pl-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Phantom Wallet</h3>
              <ol className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="font-semibold mr-2">1.</span>
                  <span>Visit <a href="https://phantom.app" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:underline">
                    phantom.app <ExternalLink className="w-3 h-3 ml-1" />
                  </a></span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold mr-2">2.</span>
                  <span>Click "Download" and install the browser extension</span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold mr-2">3.</span>
                  <span>Create a new wallet or import an existing one</span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold mr-2">4.</span>
                  <span>Save your seed phrase securely</span>
                </li>
              </ol>
            </div>

            <div className="border-l-4 border-blue-500 dark:border-blue-400 pl-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Solflare Wallet</h3>
              <ol className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="font-semibold mr-2">1.</span>
                  <span>Visit <a href="https://solflare.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline">
                    solflare.com <ExternalLink className="w-3 h-3 ml-1" />
                  </a></span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold mr-2">2.</span>
                  <span>Click "Get Started" and install the extension</span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold mr-2">3.</span>
                  <span>Follow the setup wizard</span>
                </li>
              </ol>
            </div>
          </div>
        </section>

        {/* Connecting Your Wallet */}
        <section className="bg-white dark:bg-gray-800 shadow rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Connecting Your Wallet</h2>
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-6">
            <ol className="space-y-3 text-gray-700 dark:text-gray-300">
              <li className="flex items-start">
                <span className="font-semibold text-blue-600 dark:text-blue-400 mr-3">1.</span>
                <span>Click "Connect Wallet" in the navbar</span>
              </li>
              <li className="flex items-start">
                <span className="font-semibold text-blue-600 dark:text-blue-400 mr-3">2.</span>
                <span>Select your wallet from the list</span>
              </li>
              <li className="flex items-start">
                <span className="font-semibold text-blue-600 dark:text-blue-400 mr-3">3.</span>
                <span>Approve the connection in your wallet</span>
              </li>
              <li className="flex items-start">
                <span className="font-semibold text-green-600 dark:text-green-400 mr-3">4.</span>
                <span className="font-semibold">You're now connected!</span>
              </li>
            </ol>
          </div>
        </section>

        {/* Fund Your Wallet */}
        <section className="bg-white dark:bg-gray-800 shadow rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Fund Your Wallet</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            To use CapaCloud, you'll need USDT in your wallet. You can:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Buy SOL</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">From exchanges like Coinbase, Binance, etc.</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Transfer</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">From another wallet</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Faucet</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Use a faucet on devnet (for testing)</p>
            </div>
          </div>
        </section>

        {/* Account Creation */}
        <section className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border border-green-200 dark:border-green-800 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <Key className="w-6 h-6 mr-3 text-green-600 dark:text-green-400" />
            Account Creation
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            When you connect your wallet for the first time, CapaCloud will automatically:
          </p>
          <div className="space-y-3">
            <div className="flex items-center bg-white dark:bg-gray-800 rounded-lg p-4">
              <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
              <span className="text-gray-700 dark:text-gray-300">Create your user account</span>
            </div>
            <div className="flex items-center bg-white dark:bg-gray-800 rounded-lg p-4">
              <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
              <span className="text-gray-700 dark:text-gray-300">Generate a unique Account ID (for providers)</span>
            </div>
            <div className="flex items-center bg-white dark:bg-gray-800 rounded-lg p-4">
              <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
              <span className="text-gray-700 dark:text-gray-300">Create a fund wallet for managing rental payments</span>
            </div>
          </div>
          <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg p-4 border border-green-200 dark:border-green-800">
            <p className="text-green-800 dark:text-green-300 font-medium">
              ✓ No additional registration steps are required - it's all automatic!
            </p>
          </div>
        </section>

        {/* Security Tips */}
        <section className="bg-white dark:bg-gray-800 shadow rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <Shield className="w-6 h-6 mr-3 text-red-500" />
            Security Tips
          </h2>
          <div className="space-y-4">
            <div className="flex items-start bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 dark:border-red-400 rounded-lg p-4">
              <div className="flex-1">
                <p className="font-semibold text-red-900 dark:text-red-200 mb-1">Never share your seed phrase</p>
                <p className="text-sm text-red-800 dark:text-red-300">CapaCloud will never ask for it</p>
              </div>
            </div>
            <div className="flex items-start bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 dark:border-yellow-400 rounded-lg p-4">
              <div className="flex-1">
                <p className="font-semibold text-yellow-900 dark:text-yellow-200 mb-1">Use hardware wallets</p>
                <p className="text-sm text-yellow-800 dark:text-yellow-300">For large amounts</p>
              </div>
            </div>
            <div className="flex items-start bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 dark:border-blue-400 rounded-lg p-4">
              <div className="flex-1">
                <p className="font-semibold text-blue-900 dark:text-blue-200 mb-1">Verify transactions</p>
                <p className="text-sm text-blue-800 dark:text-blue-300">Before approving</p>
              </div>
            </div>
            <div className="flex items-start bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 dark:border-green-400 rounded-lg p-4">
              <div className="flex-1">
                <p className="font-semibold text-green-900 dark:text-green-200 mb-1">Keep your wallet updated</p>
                <p className="text-sm text-green-800 dark:text-green-300">To the latest version</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

