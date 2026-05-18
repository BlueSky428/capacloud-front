import Link from 'next/link';
import { ArrowLeft, Code2, AlertCircle, CheckCircle2, ArrowRight, Zap } from 'lucide-react';

export default function SmartContractsPage() {
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
          <Code2 className="w-10 h-10 mr-4 text-purple-500" />
          Smart Contracts
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Future blockchain integration plans
        </p>
      </div>

      <div className="space-y-12">
        {/* Note */}
        <section className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-8">
          <div className="flex items-start">
            <AlertCircle className="w-6 h-6 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <h2 className="text-xl font-semibold text-yellow-900 dark:text-yellow-200 mb-2">Current Status</h2>
              <p className="text-yellow-800 dark:text-yellow-300 leading-relaxed">
                Smart contract integration is planned for a future version. Currently, 
                the platform uses a centralized backend for payments and coordination. Real blockchain integration 
                will enable trustless payments and automated escrow.
              </p>
            </div>
          </div>
        </section>

        {/* Planned Features */}
        <section className="bg-white dark:bg-gray-800 shadow rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <Zap className="w-6 h-6 mr-3 text-blue-500" />
            Planned Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Escrow smart contracts for secure payments',
              'Automated hourly billing via on-chain transactions',
              'Provider earnings distribution',
              'Trustless rental agreements',
            ].map((item, idx) => (
              <div key={idx} className="flex items-start bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <CheckCircle2 className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 dark:text-gray-300">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Current Implementation */}
        <section className="bg-white dark:bg-gray-800 shadow rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Current Implementation</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Currently, payments and balance management are handled by the backend API:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Account balances stored in MongoDB',
              'Top-up and claim operations via API',
              'Hourly billing calculated and deducted automatically',
              'Transaction history tracked in database',
            ].map((item, idx) => (
              <div key={idx} className="flex items-start bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <ArrowRight className="w-5 h-5 text-gray-500 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 dark:text-gray-300">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Future Roadmap */}
        <section className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Future Roadmap</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Smart contract integration will include:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Solana Program (SPL) for escrow',
              'Automated payment execution',
              'On-chain rental verification',
              'Decentralized dispute resolution',
            ].map((item, idx) => (
              <div key={idx} className="flex items-start bg-white dark:bg-gray-800 rounded-lg p-4">
                <CheckCircle2 className="w-5 h-5 text-purple-500 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 dark:text-gray-300">{item}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
