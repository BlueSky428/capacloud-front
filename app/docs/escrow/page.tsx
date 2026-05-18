import Link from 'next/link';
import { ArrowLeft, Wallet, ArrowUp, ArrowDown, DollarSign, Clock, FileText, Lightbulb } from 'lucide-react';

export default function EscrowPage() {
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
          Escrow & Billing
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Manage your account balance and understand how billing works
        </p>
      </div>

      <div className="space-y-12">
        {/* Account Balance */}
        <section className="bg-white dark:bg-gray-800 shadow rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Account Balance</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            Your account balance is a platform-managed wallet used for GPU rental payments. It's separate 
            from your main Solana wallet and is automatically used for hourly billing.
          </p>
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <p className="text-blue-800 dark:text-blue-300 text-sm">
              <strong>💡 Tip:</strong> Pay with USDT. Your balance is automatically used for hourly billing when rentals are active.
            </p>
          </div>
        </section>

        {/* Topping Up */}
        <section className="bg-white dark:bg-gray-800 shadow rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <ArrowUp className="w-6 h-6 mr-3 text-green-500" />
            Topping Up Your Balance
          </h2>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mr-4 mt-1">
                <span className="text-green-600 dark:text-green-400 font-bold">1</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Navigate to Account Balance</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Go to <Link href="/user/escrow" className="text-purple-600 dark:text-purple-400 hover:underline">Account Balance</Link> page or click the balance in the navbar.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mr-4 mt-1">
                <span className="text-green-600 dark:text-green-400 font-bold">2</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Enter Amount</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Enter the amount you want to deposit and click "Top Up Balance".
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mr-4 mt-1">
                <span className="text-green-600 dark:text-green-400 font-bold">3</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Complete Transaction</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Approve the transaction in your wallet. Once confirmed, the balance will be added to your account.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mt-6">
            <p className="text-yellow-800 dark:text-yellow-300 text-sm">
              <strong>⚠️ Important:</strong> For your first rental, you need 10 USDT or enough balance for 1 hour of rental (whichever is higher). 
              It's recommended to top up enough for several hours of usage.
            </p>
          </div>
        </section>

        {/* Claiming Balance */}
        <section className="bg-white dark:bg-gray-800 shadow rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <ArrowDown className="w-6 h-6 mr-3 text-purple-500" />
            Claiming Your Balance
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            You can withdraw your account balance back to your wallet at any time:
          </p>
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
            <ol className="space-y-3 text-gray-700 dark:text-gray-300">
              <li className="flex items-start">
                <span className="font-semibold mr-3">1.</span>
                <span>Go to <Link href="/user/escrow" className="text-purple-600 dark:text-purple-400 hover:underline">Account Balance</Link></span>
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-3">2.</span>
                <span>Enter the amount you want to claim</span>
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-3">3.</span>
                <span>Click "Claim Balance"</span>
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-3">4.</span>
                <span>Approve the transaction</span>
              </li>
            </ol>
          </div>
        </section>

        {/* Billing Process */}
        <section className="bg-white dark:bg-gray-800 shadow rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <Clock className="w-6 h-6 mr-3 text-blue-500" />
            Billing Process
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">How Billing Works</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">Hourly Billing</h4>
                  <p className="text-sm text-blue-800 dark:text-blue-300">You're charged every hour your rental is active</p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <h4 className="font-semibold text-green-900 dark:text-green-200 mb-2">Automatic</h4>
                  <p className="text-sm text-green-800 dark:text-green-300">Charges are automatically deducted from your account balance</p>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-900 dark:text-purple-200 mb-2">Real-time</h4>
                  <p className="text-sm text-purple-800 dark:text-purple-300">Billing stops immediately when you end or pause a rental</p>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-900 dark:text-yellow-200 mb-2">Final Cost</h4>
                  <p className="text-sm text-yellow-800 dark:text-yellow-300">Final cost is calculated based on actual usage</p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Paused Rentals</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                When you pause a rental:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Billing stops immediately</span>
                </div>
                <div className="flex items-center bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Machine state is preserved</span>
                </div>
                <div className="flex items-center bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">You can resume at any time</span>
                </div>
                <div className="flex items-center bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Billing resumes when you unpause</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Transaction History */}
        <section className="bg-white dark:bg-gray-800 shadow rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <FileText className="w-6 h-6 mr-3 text-gray-500" />
            Transaction History
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            View all your transactions on the Account Balance page:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Top-up transactions</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Deposits to your account</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Claim transactions</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Withdrawals to your wallet</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Rental payments</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Charges for GPU usage</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Earnings</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">For providers</p>
            </div>
          </div>
        </section>

        {/* Understanding Costs */}
        <section className="bg-white dark:bg-gray-800 shadow rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <DollarSign className="w-6 h-6 mr-3 text-green-500" />
            Understanding Costs
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Rental Costs</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                The cost of renting a GPU depends on:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">GPU Type</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Performance and specifications</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Hourly Rate</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Set by the provider</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Duration</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Hours of usage</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Example Calculation</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                If you rent a GPU at 0.05 USDT/hour for 3 hours:
              </p>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-purple-200 dark:border-purple-700">
                <p className="text-lg font-mono text-gray-900 dark:text-white">
                  <strong>Total Cost:</strong> 0.05 × 3 = <span className="text-purple-600 dark:text-purple-400">0.15 USDT</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tips */}
        <section className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <Lightbulb className="w-6 h-6 mr-3 text-yellow-500" />
            Tips
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <p className="text-gray-700 dark:text-gray-300">Monitor your balance regularly to avoid running out</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <p className="text-gray-700 dark:text-gray-300">Top up more than you think you'll need to avoid interruptions</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <p className="text-gray-700 dark:text-gray-300">End rentals promptly when finished to avoid unnecessary charges</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <p className="text-gray-700 dark:text-gray-300">Check transaction history to track your spending</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
