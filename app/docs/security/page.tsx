import Link from 'next/link';
import { ArrowLeft, Shield, Lock, Key, AlertTriangle, CheckCircle2, Users } from 'lucide-react';

export default function SecurityPage() {
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
          <Shield className="w-10 h-10 mr-4 text-red-500" />
          Security
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Learn about CapaCloud's security measures and best practices
        </p>
      </div>

      <div className="space-y-12">
        {/* Authentication */}
        <section className="bg-white dark:bg-gray-800 shadow rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <Key className="w-6 h-6 mr-3 text-purple-500" />
            Authentication
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            CapaCloud uses wallet-based authentication:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-5">
              <h3 className="font-semibold text-purple-900 dark:text-purple-200 mb-2">No Passwords</h3>
              <p className="text-sm text-purple-800 dark:text-purple-300">Your Solana wallet is your identity</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-5">
              <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">Message Signing</h3>
              <p className="text-sm text-blue-800 dark:text-blue-300">Login requires signing a message with your private key</p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-5">
              <h3 className="font-semibold text-green-900 dark:text-green-200 mb-2">Auto Registration</h3>
              <p className="text-sm text-green-800 dark:text-green-300">New users are registered on first login</p>
            </div>
          </div>
        </section>

        {/* Data Protection */}
        <section className="bg-white dark:bg-gray-800 shadow rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <Lock className="w-6 h-6 mr-3 text-blue-500" />
            Data Protection
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">HTTPS/TLS</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">All API communication encrypted</p>
              </div>
            </div>
            <div className="flex items-start bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Secure Storage</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Wallet addresses stored securely</p>
              </div>
            </div>
            <div className="flex items-start bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">No Private Keys</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Never stored on servers</p>
              </div>
            </div>
            <div className="flex items-start bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Local SSH Keys</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Generated and managed locally</p>
              </div>
            </div>
          </div>
        </section>

        {/* Container Isolation */}
        <section className="bg-white dark:bg-gray-800 shadow rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <Shield className="w-6 h-6 mr-3 text-green-500" />
            Container Isolation
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            Each rental gets an isolated Docker container:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 dark:border-green-400 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 dark:text-green-200 mb-2">Full Isolation</h3>
              <p className="text-sm text-green-800 dark:text-green-300">Complete separation from host system</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 dark:border-blue-400 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">Network Namespace</h3>
              <p className="text-sm text-blue-800 dark:text-blue-300">Separate network isolation</p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 dark:border-purple-400 rounded-lg p-4">
              <h3 className="font-semibold text-purple-900 dark:text-purple-200 mb-2">Resource Limits</h3>
              <p className="text-sm text-purple-800 dark:text-purple-300">Quotas and limits enforced</p>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 dark:border-yellow-400 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-900 dark:text-yellow-200 mb-2">Auto Cleanup</h3>
              <p className="text-sm text-yellow-800 dark:text-yellow-300">Automatic cleanup on rental end</p>
            </div>
          </div>
        </section>

        {/* SSH Security */}
        <section className="bg-white dark:bg-gray-800 shadow rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <Key className="w-6 h-6 mr-3 text-orange-500" />
            SSH Security
          </h2>
          <div className="space-y-4">
            <div className="flex items-center bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Key-based Authentication Only</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">No password authentication</p>
              </div>
            </div>
            <div className="flex items-center bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Unique Keys Per Rental</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Each rental gets its own SSH keys</p>
              </div>
            </div>
            <div className="flex items-center bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Automatic Revocation</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Keys automatically revoked when rental ends</p>
              </div>
            </div>
          </div>
        </section>

        {/* Payment Security */}
        <section className="bg-white dark:bg-gray-800 shadow rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <Lock className="w-6 h-6 mr-3 text-green-500" />
            Payment Security
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            Payment security measures:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Secure Tracking</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Account balances tracked securely</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Immutable History</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Transaction history cannot be altered</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Wallet Verification</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">All operations require wallet verification</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Balance Checks</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Balance verified before rental creation</p>
            </div>
          </div>
        </section>

        {/* Best Practices for Users */}
        <section className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <Users className="w-6 h-6 mr-3 text-blue-500" />
            Best Practices for Users
          </h2>
          <div className="space-y-4">
            <div className="flex items-start bg-white dark:bg-gray-800 rounded-lg p-4 border border-red-200 dark:border-red-800">
              <AlertTriangle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Never share your seed phrase</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">CapaCloud will never ask for it</p>
              </div>
            </div>
            <div className="flex items-start bg-white dark:bg-gray-800 rounded-lg p-4 border border-yellow-200 dark:border-yellow-800">
              <CheckCircle2 className="w-5 h-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Verify transactions before approving</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Always check transaction details</p>
              </div>
            </div>
            <div className="flex items-start bg-white dark:bg-gray-800 rounded-lg p-4 border border-green-200 dark:border-green-800">
              <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Use hardware wallets for large amounts</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Extra security for significant balances</p>
              </div>
            </div>
            <div className="flex items-start bg-white dark:bg-gray-800 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
              <CheckCircle2 className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Keep your wallet software updated</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Latest security patches and features</p>
              </div>
            </div>
            <div className="flex items-start bg-white dark:bg-gray-800 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
              <CheckCircle2 className="w-5 h-5 text-purple-500 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Secure your SSH keys properly</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Use proper file permissions (chmod 600)</p>
              </div>
            </div>
          </div>
        </section>

        {/* Best Practices for Providers */}
        <section className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border border-green-200 dark:border-green-800 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <Users className="w-6 h-6 mr-3 text-green-500" />
            Best Practices for Providers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Keep worker updated</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Regularly update worker software</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Monitor logs</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Watch for suspicious activity</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Use firewall rules</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Restrict access appropriately</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Rotate SSH keys</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Regularly rotate SSH keys</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 md:col-span-2">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Monitor system resources</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Keep an eye on GPU health and system performance</p>
            </div>
          </div>
        </section>

        {/* Reporting Security Issues */}
        <section className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <AlertTriangle className="w-6 h-6 mr-3 text-red-500" />
            Reporting Security Issues
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            If you discover a security vulnerability, please report it responsibly. Contact us through 
            the <Link href="/help" className="text-red-600 dark:text-red-400 hover:underline font-semibold">Help & Support</Link> page.
          </p>
        </section>
      </div>
    </div>
  );
}
