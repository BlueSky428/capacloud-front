'use client';

import Link from 'next/link';
import { ArrowLeft, Code, Terminal, Key, Database, Server, Wallet, CheckCircle2, AlertCircle, Zap } from 'lucide-react';
import CodeBlock from '@/components/CodeBlock';

export default function APIPage() {
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
          <Code className="w-10 h-10 mr-4 text-purple-500" />
          API Reference
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Programmatic access to the CapaCloud platform
        </p>
      </div>

      <div className="space-y-12">
        {/* Overview */}
        <section className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Overview</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            CapaCloud provides a REST API for programmatic access to the platform. All API endpoints 
            are prefixed with <code className="bg-white dark:bg-gray-800 px-2 py-1 rounded">/api</code>.
          </p>
        </section>

        {/* Authentication */}
        <section className="bg-white dark:bg-gray-800 shadow rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <Key className="w-6 h-6 mr-3 text-yellow-500" />
            Authentication
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Most API endpoints require wallet authentication. Include your wallet address in requests 
            as specified by each endpoint.
          </p>
        </section>

        {/* Endpoints */}
        <section className="bg-white dark:bg-gray-800 shadow rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Endpoints</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Key className="w-5 h-5 mr-2 text-blue-500" />
                Authentication
              </h3>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 space-y-2">
                <div className="flex items-start">
                  <code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded text-sm font-mono">POST /api/auth/login</code>
                  <span className="ml-3 text-gray-600 dark:text-gray-400">- Login/register with wallet</span>
                </div>
                <div className="flex items-start">
                  <code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded text-sm font-mono">GET /api/auth/user</code>
                  <span className="ml-3 text-gray-600 dark:text-gray-400">- Get user information</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Wallet className="w-5 h-5 mr-2 text-green-500" />
                Account
              </h3>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 space-y-2">
                <div className="flex items-start">
                  <code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded text-sm font-mono">GET /api/account/balance</code>
                  <span className="ml-3 text-gray-600 dark:text-gray-400">- Get account balance</span>
                </div>
                <div className="flex items-start">
                  <code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded text-sm font-mono">POST /api/account/balance</code>
                  <span className="ml-3 text-gray-600 dark:text-gray-400">- Top up or claim balance</span>
                </div>
                <div className="flex items-start">
                  <code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded text-sm font-mono">GET /api/account/settings</code>
                  <span className="ml-3 text-gray-600 dark:text-gray-400">- Get account settings</span>
                </div>
                <div className="flex items-start">
                  <code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded text-sm font-mono">PUT /api/account/settings</code>
                  <span className="ml-3 text-gray-600 dark:text-gray-400">- Update account settings</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Server className="w-5 h-5 mr-2 text-purple-500" />
                Machines
              </h3>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 space-y-2">
                <div className="flex items-start">
                  <code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded text-sm font-mono">GET /api/machines/list</code>
                  <span className="ml-3 text-gray-600 dark:text-gray-400">- List available machines</span>
                </div>
                <div className="flex items-start">
                  <code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded text-sm font-mono">GET /api/machines/pending</code>
                  <span className="ml-3 text-gray-600 dark:text-gray-400">- List pending machines</span>
                </div>
                <div className="flex items-start">
                  <code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded text-sm font-mono">POST /api/machines/register</code>
                  <span className="ml-3 text-gray-600 dark:text-gray-400">- Register a machine</span>
                </div>
                <div className="flex items-start">
                  <code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded text-sm font-mono">GET /api/machines/[machineId]</code>
                  <span className="ml-3 text-gray-600 dark:text-gray-400">- Get machine details</span>
                </div>
                <div className="flex items-start">
                  <code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded text-sm font-mono">GET /api/machines/check-active-rentals</code>
                  <span className="ml-3 text-gray-600 dark:text-gray-400">- Check for active rentals</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Database className="w-5 h-5 mr-2 text-orange-500" />
                Rentals
              </h3>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 space-y-2">
                <div className="flex items-start">
                  <code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded text-sm font-mono">GET /api/rentals/list</code>
                  <span className="ml-3 text-gray-600 dark:text-gray-400">- List user rentals</span>
                </div>
                <div className="flex items-start">
                  <code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded text-sm font-mono">POST /api/rentals/create</code>
                  <span className="ml-3 text-gray-600 dark:text-gray-400">- Create a rental</span>
                </div>
                <div className="flex items-start">
                  <code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded text-sm font-mono">GET /api/rentals/[rentalId]</code>
                  <span className="ml-3 text-gray-600 dark:text-gray-400">- Get rental details</span>
                </div>
                <div className="flex items-start">
                  <code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded text-sm font-mono">PATCH /api/rentals/[rentalId]</code>
                  <span className="ml-3 text-gray-600 dark:text-gray-400">- Update rental (pause/resume/stop)</span>
                </div>
                <div className="flex items-start">
                  <code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded text-sm font-mono">POST /api/rentals/[rentalId]/console</code>
                  <span className="ml-3 text-gray-600 dark:text-gray-400">- Execute console command</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Zap className="w-5 h-5 mr-2 text-yellow-500" />
                Worker
              </h3>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <div className="flex items-start">
                  <code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded text-sm font-mono">POST /api/worker/register</code>
                  <span className="ml-3 text-gray-600 dark:text-gray-400">- Register worker (heartbeat)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Example Requests */}
        <section className="bg-white dark:bg-gray-800 shadow rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Example Requests</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Get Account Balance</h3>
              <CodeBlock code="GET /api/account/balance?walletAddress=YOUR_WALLET_ADDRESS" />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">List Available Machines</h3>
              <CodeBlock code="GET /api/machines/list" />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Create Rental</h3>
              <CodeBlock code={`POST /api/rentals/create\n{\n  "machineId": "machine_id",\n  "renterWalletAddress": "wallet_address"\n}`} />
            </div>
          </div>
        </section>

        {/* Response Format */}
        <section className="bg-white dark:bg-gray-800 shadow rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Response Format</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            All API responses follow a consistent format:
          </p>
          <CodeBlock code={`{\n  "success": true,\n  "data": { ... },\n  "error": null\n}`} />
        </section>

        {/* Error Handling */}
        <section className="bg-white dark:bg-gray-800 shadow rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Error Handling</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Errors are returned with appropriate HTTP status codes:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { code: '400', desc: 'Bad Request (missing/invalid parameters)', color: 'red' },
              { code: '401', desc: 'Unauthorized (wallet not connected)', color: 'yellow' },
              { code: '403', desc: 'Forbidden (insufficient permissions)', color: 'orange' },
              { code: '404', desc: 'Not Found', color: 'blue' },
              { code: '500', desc: 'Internal Server Error', color: 'red' },
            ].map((item) => (
              <div key={item.code} className={`bg-${item.color}-50 dark:bg-${item.color}-900/20 border-l-4 border-${item.color}-500 dark:border-${item.color}-400 rounded-lg p-4`}>
                <code className="font-mono font-bold text-gray-900 dark:text-white">{item.code}</code>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Rate Limiting */}
        <section className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <Zap className="w-6 h-6 mr-3 text-yellow-500" />
            Rate Limiting
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            API rate limiting may apply to prevent abuse. Contact support if you need higher limits.
          </p>
        </section>
      </div>
    </div>
  );
}
