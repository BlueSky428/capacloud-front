'use client';

import Link from 'next/link';
import { ArrowLeft, AlertTriangle, HelpCircle, Wallet, Server, Terminal, DollarSign, CheckCircle2, Code } from 'lucide-react';
import CodeBlock from '@/components/CodeBlock';

export default function TroubleshootingPage() {
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
          <AlertTriangle className="w-10 h-10 mr-4 text-red-500" />
          Troubleshooting
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Common issues and their solutions
        </p>
      </div>

      <div className="space-y-12">
        {/* Common Issues */}
        <section className="bg-white dark:bg-gray-800 shadow rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Common Issues</h2>
          
          <div className="space-y-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 dark:border-blue-400 rounded-lg p-5">
              <div className="flex items-center mb-3">
                <Wallet className="w-5 h-5 text-blue-500 mr-2" />
                <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-200">Wallet Connection Issues</h3>
              </div>
              <p className="font-semibold text-blue-900 dark:text-blue-200 mb-2">Problem: Cannot connect wallet</p>
              <ul className="space-y-1 text-sm text-blue-800 dark:text-blue-300">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Make sure your wallet extension is installed and unlocked</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Try refreshing the page</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Check that your wallet supports Solana</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Verify you're on a supported network (mainnet/devnet)</span>
                </li>
              </ul>
            </div>

            <div className="bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-500 dark:border-orange-400 rounded-lg p-5">
              <div className="flex items-center mb-3">
                <Server className="w-5 h-5 text-orange-500 mr-2" />
                <h3 className="text-lg font-semibold text-orange-900 dark:text-orange-200">Worker Installation Issues</h3>
              </div>
              <p className="font-semibold text-orange-900 dark:text-orange-200 mb-2">Problem: Installation fails</p>
              <ul className="space-y-1 text-sm text-orange-800 dark:text-orange-300">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Verify NVIDIA drivers are installed: <code className="bg-orange-100 dark:bg-orange-900/30 px-1 rounded">nvidia-smi</code></span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Check you have sudo/root access</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Ensure internet connection is stable</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Check system logs: <code className="bg-orange-100 dark:bg-orange-900/30 px-1 rounded">sudo journalctl -u capa-worker</code></span>
                </li>
              </ul>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 dark:border-purple-400 rounded-lg p-5">
              <div className="flex items-center mb-3">
                <Server className="w-5 h-5 text-purple-500 mr-2" />
                <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-200">Machine Not Appearing</h3>
              </div>
              <p className="font-semibold text-purple-900 dark:text-purple-200 mb-2">Problem: Machine not in pending list</p>
              <ul className="space-y-1 text-sm text-purple-800 dark:text-purple-300">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Verify worker is running: <code className="bg-purple-100 dark:bg-purple-900/30 px-1 rounded">sudo systemctl status capa-worker</code></span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Check Account ID matches in worker config</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Verify worker can reach API: <code className="bg-purple-100 dark:bg-purple-900/30 px-1 rounded">curl https://capa.cloud/api/worker/register</code></span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Check worker logs for errors</span>
                </li>
              </ul>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 dark:border-green-400 rounded-lg p-5">
              <div className="flex items-center mb-3">
                <Terminal className="w-5 h-5 text-green-500 mr-2" />
                <h3 className="text-lg font-semibold text-green-900 dark:text-green-200">SSH Connection Issues</h3>
              </div>
              <p className="font-semibold text-green-900 dark:text-green-200 mb-2">Problem: Cannot connect via SSH</p>
              <ul className="space-y-1 text-sm text-green-800 dark:text-green-300">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Verify SSH key permissions: <code className="bg-green-100 dark:bg-green-900/30 px-1 rounded">chmod 600 key.pem</code></span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Check SSH port is correct</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Verify rental is still active</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Test connection: <code className="bg-green-100 dark:bg-green-900/30 px-1 rounded">ssh -v username@host -p port</code></span>
                </li>
              </ul>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 dark:border-yellow-400 rounded-lg p-5">
              <div className="flex items-center mb-3">
                <DollarSign className="w-5 h-5 text-yellow-500 mr-2" />
                <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-200">Balance Issues</h3>
              </div>
              <p className="font-semibold text-yellow-900 dark:text-yellow-200 mb-2">Problem: Cannot rent GPU - insufficient balance</p>
              <ul className="space-y-1 text-sm text-yellow-800 dark:text-yellow-300">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Check your account balance on the Account Balance page</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Top up your balance before renting</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Ensure balance covers at least 1 hour of rental</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Wait for top-up transaction to confirm</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Checking Worker Status */}
        <section className="bg-white dark:bg-gray-800 shadow rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <Server className="w-6 h-6 mr-3 text-blue-500" />
            Checking Worker Status
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">Use these commands to diagnose worker issues:</p>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Check Service Status</h3>
              <CodeBlock code="sudo systemctl status capa-worker" />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">View Logs</h3>
              <CodeBlock code="sudo journalctl -u capa-worker -f" />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Check GPU</h3>
              <CodeBlock code="nvidia-smi" />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Check Docker</h3>
              <CodeBlock code="sudo systemctl status docker" />
              <CodeBlock code="docker ps" />
            </div>
          </div>
        </section>

        {/* Getting Help */}
        <section className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <HelpCircle className="w-6 h-6 mr-3 text-blue-500" />
            Getting Help
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            If you can't resolve an issue:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/help" className="bg-white dark:bg-gray-800 rounded-lg p-5 hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Help & Support</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Check the Help & Support page</p>
            </Link>
            <Link href="/docs" className="bg-white dark:bg-gray-800 rounded-lg p-5 hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Documentation</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Review detailed guides</p>
            </Link>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-5 mt-4 border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Contact Support</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">When contacting support, include:</p>
            <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400 ml-6 list-disc">
              <li>Error messages</li>
              <li>Relevant logs</li>
              <li>Steps to reproduce</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
