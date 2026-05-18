import Link from 'next/link';
import { ArrowLeft, DollarSign, TrendingUp, BarChart3, Lightbulb, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function PricingPage() {
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
          <DollarSign className="w-10 h-10 mr-4 text-green-500" />
          Pricing Guide
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Set competitive prices and understand rental costs
        </p>
      </div>

      <div className="space-y-12">
        {/* Setting Your Price */}
        <section className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border border-green-200 dark:border-green-800 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Setting Your Price</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            As a provider, you set the hourly rate for your GPU. Pricing is flexible and market-driven, 
            so you can adjust based on demand and competition.
          </p>
        </section>

        {/* Recommended Pricing */}
        <section className="bg-white dark:bg-gray-800 shadow rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <BarChart3 className="w-6 h-6 mr-3 text-blue-500" />
            Recommended Pricing
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Here are suggested hourly rates based on GPU type:
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">GPU Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Recommended Rate</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Notes</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">RTX 3090 / RTX 4090</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">0.05 - 0.10 USDT/hour</td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">High-end consumer GPUs</td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">A100 (40GB)</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">0.15 - 0.30 USDT/hour</td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Professional data center GPU</td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">RTX 3080 / RTX 4070</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">0.03 - 0.06 USDT/hour</td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Mid-range GPUs</td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">RTX 3060 / RTX 4060</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">0.01 - 0.03 USDT/hour</td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Entry-level GPUs</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Pricing Factors */}
        <section className="bg-white dark:bg-gray-800 shadow rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <TrendingUp className="w-6 h-6 mr-3 text-purple-500" />
            Pricing Factors
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Consider these factors when setting your price:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 dark:border-blue-400 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">GPU Performance</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Newer, faster GPUs command higher rates</p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 dark:border-purple-400 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Memory</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">More VRAM allows for larger models and workloads</p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 dark:border-green-400 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Uptime</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Machines with high uptime can charge premium</p>
            </div>
            <div className="bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-500 dark:border-orange-400 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Location</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Geographic location may affect demand</p>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 dark:border-yellow-400 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Market Rates</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Check competitor pricing</p>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 dark:border-red-400 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Power Costs</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Consider your electricity costs</p>
            </div>
          </div>
        </section>

        {/* Dynamic Pricing Strategy */}
        <section className="bg-white dark:bg-gray-800 shadow rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <Lightbulb className="w-6 h-6 mr-3 text-yellow-500" />
            Dynamic Pricing Strategy
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            You can adjust your pricing based on:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: 'Demand', desc: 'Increase rates during high demand periods', icon: TrendingUp },
              { title: 'Competition', desc: 'Lower rates if you\'re not getting rentals', icon: BarChart3 },
              { title: 'Performance', desc: 'Higher rates for proven reliable machines', icon: CheckCircle2 },
              { title: 'Time of Day', desc: 'Adjust for peak usage hours', icon: DollarSign },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Icon className="w-5 h-5 text-yellow-500 mr-2" />
                    <h3 className="font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* For Users */}
        <section className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">For Users: Understanding Costs</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            When renting GPUs, consider:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Hourly rate is fixed per machine',
              'Total cost = hourly rate × hours used',
              'Billing is automatic and continuous',
              'You can pause/stop anytime to control costs',
            ].map((item, idx) => (
              <div key={idx} className="flex items-center bg-white dark:bg-gray-800 rounded-lg p-4">
                <CheckCircle2 className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Updating Prices */}
        <section className="bg-white dark:bg-gray-800 shadow rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <DollarSign className="w-6 h-6 mr-3 text-green-500" />
            Updating Prices
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            You can update your machine's hourly rate:
          </p>
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
            <ol className="space-y-3 text-gray-700 dark:text-gray-300 ml-6 list-decimal">
              <li>Go to your machine details page</li>
              <li>Update the rate per hour</li>
              <li>Save changes</li>
            </ol>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mt-6">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-yellow-800 dark:text-yellow-300">
                <strong>Note:</strong> Price updates are only allowed when there are no active rentals.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
