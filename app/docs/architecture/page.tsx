import Link from 'next/link';
import { ArrowLeft, Server, Database, Network, Code, Cpu, Shield, ArrowRight } from 'lucide-react';

export default function ArchitecturePage() {
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
          <Network className="w-10 h-10 mr-4 text-blue-500" />
          Architecture
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Understanding CapaCloud's system architecture
        </p>
      </div>

      <div className="space-y-12">
        {/* System Overview */}
        <section className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">System Overview</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            CapaCloud is built on a decentralized architecture leveraging Solana blockchain for payments 
            and authentication, with a centralized backend for coordination and metadata.
          </p>
        </section>

        {/* Components */}
        <section className="bg-white dark:bg-gray-800 shadow rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Components</h2>
          
          <div className="space-y-8">
            <div className="border-l-4 border-blue-500 dark:border-blue-400 pl-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Code className="w-6 h-6 mr-3 text-blue-500" />
                Frontend (Next.js)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  'Next.js 16 with React 19',
                  'Solana Wallet Adapter for wallet integration',
                  'TypeScript for type safety',
                  'Tailwind CSS for styling',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                    <ArrowRight className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-l-4 border-green-500 dark:border-green-400 pl-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Server className="w-6 h-6 mr-3 text-green-500" />
                Backend (Next.js API Routes)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  'RESTful API endpoints',
                  'User authentication via wallet signatures',
                  'Machine and rental management',
                  'Balance and transaction tracking',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                    <ArrowRight className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-l-4 border-purple-500 dark:border-purple-400 pl-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Database className="w-6 h-6 mr-3 text-purple-500" />
                Database (MongoDB)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  'User accounts and settings',
                  'Machine metadata and status',
                  'Rental sessions and history',
                  'Transaction records',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                    <ArrowRight className="w-4 h-4 text-purple-500 mr-2 flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-l-4 border-orange-500 dark:border-orange-400 pl-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Cpu className="w-6 h-6 mr-3 text-orange-500" />
                GPU Workers
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  'Python-based worker script',
                  'Docker container management',
                  'NVIDIA GPU access via Container Toolkit',
                  'SSH server for user access',
                  'Heartbeat system for monitoring',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                    <ArrowRight className="w-4 h-4 text-orange-500 mr-2 flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Data Flow */}
        <section className="bg-white dark:bg-gray-800 shadow rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Data Flow</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">User Rental Flow</h3>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
                <ol className="space-y-3 text-gray-700 dark:text-gray-300 ml-6 list-decimal">
                  <li>User connects wallet and tops up balance</li>
                  <li>User selects and rents a GPU</li>
                  <li>Backend creates rental record and updates machine status</li>
                  <li>User receives SSH connection details</li>
                  <li>Worker creates Docker container with GPU access</li>
                  <li>Hourly billing automatically deducted</li>
                </ol>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Provider Setup Flow</h3>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
                <ol className="space-y-3 text-gray-700 dark:text-gray-300 ml-6 list-decimal">
                  <li>Provider installs GPU worker with Account ID</li>
                  <li>Worker registers with backend and sends heartbeats</li>
                  <li>Machine appears as "pending" in registration page</li>
                  <li>Provider completes registration (IP, SSH port, pricing)</li>
                  <li>Machine becomes available for rent</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* Security */}
        <section className="bg-white dark:bg-gray-800 shadow rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <Shield className="w-6 h-6 mr-3 text-red-500" />
            Security
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Wallet-based authentication (no passwords)',
              'Message signing for authentication',
              'SSH key-based access for GPU containers',
              'Isolated Docker containers per rental',
              'Encrypted communication (TLS/HTTPS)',
            ].map((item, idx) => (
              <div key={idx} className="flex items-start bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <Shield className="w-5 h-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 dark:text-gray-300">{item}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
