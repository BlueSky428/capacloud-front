import Link from 'next/link';
import { ArrowLeft, Terminal, Cpu, Clock, Wallet, Key, CheckCircle, AlertCircle, DollarSign, Search, ExternalLink } from 'lucide-react';
import CodeBlock from '@/components/CodeBlock';

export default function RentingGPUsPage() {
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
          <Cpu className="w-10 h-10 mr-4 text-purple-500" />
          Complete Guide to Renting GPUs
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Step-by-step guide from setup to connection - perfect for beginners
        </p>
      </div>

      <div className="space-y-12">
        {/* Overview */}
        <section className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Overview</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            This guide will walk you through the complete process of renting a GPU on CapaCloud, from setup to connection. 
            Even if you're a complete beginner, follow these steps and you'll be running GPU workloads in no time!
          </p>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-purple-200 dark:border-purple-700">
            <p className="text-purple-800 dark:text-purple-300">
              <strong>What you get:</strong> Full root access to a GPU machine where you can install any libraries, 
              run any workload, and have complete control over the environment.
            </p>
          </div>
        </section>

        {/* Prerequisites */}
        <section className="bg-white dark:bg-gray-800 shadow rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Prerequisites - Before You Rent</h2>
          <p>
            Before you can rent a GPU, you need to complete these three essential steps:
          </p>

          <div className="space-y-6 mt-6">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Wallet className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Step 1: Connect Your Wallet</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    You need a Solana wallet to use CapaCloud. If you don't have one, you can create one using:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1 mb-3">
                    <li><strong>Phantom</strong> - Popular browser extension wallet</li>
                    <li><strong>Solflare</strong> - Another great option</li>
                    <li><strong>Backpack</strong> - Modern wallet with great UX</li>
                  </ul>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Once installed, click "Connect Wallet" in the top right corner of the CapaCloud website.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Step 2: Add Balance to Your Account</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    CapaCloud uses a prepaid balance system. You need to add USDT to your account before renting.
                  </p>
                  <ol className="list-decimal list-inside text-gray-600 dark:text-gray-400 space-y-1 mb-3">
                    <li>Go to <Link href="/user/escrow" className="text-purple-600 dark:text-purple-400 hover:underline">Escrow</Link> page</li>
                    <li>Click "Add Funds" or "Top Up"</li>
                    <li>Follow the instructions to transfer USDT</li>
                    <li>Wait for the transaction to confirm</li>
                  </ol>
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3 mt-3">
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                      <strong>Minimum Balance:</strong> For your first rental, you need either <strong>10 USDT</strong> or enough balance for 1 hour of the machine's rate, whichever is higher. 
                      For example, if a machine costs 0.5 USDT/hour, you need at least 10 USDT. If a machine costs 15 USDT/hour, you need at least 15 USDT.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Key className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Step 3: Add Your SSH Public Key</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    <strong>This is required!</strong> You must add at least one SSH public key to your account before you can rent a machine.
                  </p>
                  
                  <h4 className="text-md font-semibold text-gray-900 dark:text-white mt-4 mb-2">3a. Generate SSH Key (If You Don't Have One)</h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    If you don't have an SSH key pair, generate one on your local machine:
                  </p>
                  <CodeBlock code={'ssh-keygen -t ed25519 -C "your_email@example.com"'} />
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Press Enter to accept default location. Optionally set a passphrase for extra security.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    Or for RSA (if your system doesn't support Ed25519):
                  </p>
                  <CodeBlock code={'ssh-keygen -t rsa -b 4096 -C "your_email@example.com"'} />

                  <h4 className="text-md font-semibold text-gray-900 dark:text-white mt-4 mb-2">3b. Get Your Public Key</h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    Copy your public key to clipboard:
                  </p>
                  <CodeBlock code="cat ~/.ssh/id_ed25519.pub" />
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Or if you used RSA: <code>cat ~/.ssh/id_rsa.pub</code>
                  </p>

                  <h4 className="text-md font-semibold text-gray-900 dark:text-white mt-4 mb-2">3c. Add Key to Your Account</h4>
                  <ol className="list-decimal list-inside text-gray-600 dark:text-gray-400 space-y-1 mb-3">
                    <li>Go to <Link href="/user/settings" className="text-purple-600 dark:text-purple-400 hover:underline">Account Settings</Link></li>
                    <li>Scroll to the "SSH Keys" section</li>
                    <li>Click "Add SSH Key" button</li>
                    <li>Enter a name (e.g., "My Laptop" or "Work Computer")</li>
                    <li>Paste your public key (the one you copied above)</li>
                    <li>Click "Add Key"</li>
                  </ol>
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 mt-3">
                    <p className="text-sm text-green-800 dark:text-green-200">
                      <strong>Tip:</strong> You can add multiple SSH keys if you want to access machines from different devices. 
                      Each key should have a descriptive name.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mt-6">
            <div className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-green-800 dark:text-green-200 mb-1">
                  Ready to Rent Checklist
                </p>
                <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                  <li>✓ Wallet connected</li>
                  <li>✓ Account balance ≥ 10 USDT or 1 hour rate (whichever is higher)</li>
                  <li>✓ At least one SSH key added to account</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* How to Rent */}
        <section className="bg-white dark:bg-gray-800 shadow rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">How to Rent a GPU - Step by Step</h2>
          
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Step 1: Browse Available GPUs</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li>Go to <Link href="/user/rent" className="text-purple-600 dark:text-purple-400 hover:underline">Browse GPUs</Link></li>
            <li>You'll see a list of all available GPU machines</li>
            <li>Each card shows:
              <ul className="list-disc list-inside ml-6 mt-1">
                <li><strong>GPU Type:</strong> e.g., RTX 4090, A100, RTX A4000</li>
                <li><strong>Memory:</strong> GPU memory in GB</li>
                <li><strong>CPU Cores:</strong> Number of CPU cores</li>
                <li><strong>Disk Size:</strong> Available storage</li>
                <li><strong>Rate/Hour:</strong> Cost in USDT per hour</li>
                <li><strong>Status:</strong> Available, Rented, or Offline</li>
              </ul>
            </li>
            <li>Use filters to find machines by GPU type or sort by price</li>
          </ol>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-6">Step 2: View Machine Details</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li>Click "Detail Info" on a machine card (or "Rent GPU" - both lead to details)</li>
            <li>You'll see a detailed page with:
              <ul className="list-disc list-inside ml-6 mt-1">
                <li>Complete specifications (GPU, CPU, RAM, Disk)</li>
                <li>Current performance metrics (if available)</li>
                <li>Provider information</li>
                <li>Pricing details</li>
                <li>Your current balance</li>
              </ul>
            </li>
            <li>Review the machine to ensure it meets your needs</li>
            <li>Check that you have sufficient balance (shown on the page)</li>
          </ol>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-6">Step 3: Select SSH Keys</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li>Click the "Rent This GPU" button</li>
            <li>If you haven't selected SSH keys yet, a selection dialog will appear</li>
            <li>Select at least one SSH key from your account (check the boxes)</li>
            <li>You can select multiple keys if you want to access from different devices</li>
            <li>Click "Continue" to proceed</li>
          </ol>
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mt-3">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>Note:</strong> The keys you select will be automatically registered to the machine. 
              You can change them later from the rental details page.
            </p>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-6">Step 4: Confirm Rental</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li>The system will verify:
              <ul className="list-disc list-inside ml-6 mt-1">
                <li>Your wallet is connected</li>
                <li>You have sufficient balance (10 USDT or 1 hour rate, whichever is higher)</li>
                <li>At least one SSH key is selected</li>
                <li>The machine is available</li>
              </ul>
            </li>
            <li>If everything checks out, the rental is created</li>
            <li>You'll be redirected to the rental details page</li>
            <li>A success notification will appear</li>
          </ol>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mt-4">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-1">
                  What Happens Next?
                </p>
                <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                  <li>The worker automatically registers your SSH keys to the machine (takes up to 1 minute)</li>
                  <li>Your rental starts immediately</li>
                  <li>Billing begins (hourly deductions from your balance)</li>
                  <li>You can connect via SSH once keys are registered</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Connecting */}
        <section className="bg-white dark:bg-gray-800 shadow rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Connecting to Your Rented GPU</h2>
          
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Step 1: Wait for Key Registration</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            After renting, the worker needs to register your SSH keys. This usually takes less than 1 minute. 
            You can check the rental details page - once your keys are registered, you'll see the connection information.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Step 2: Get Connection Details</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li>Go to your rental details page (you'll be redirected there after renting)</li>
            <li>Find the "Connect to Machine" section</li>
            <li>You'll see:
              <ul className="list-disc list-inside ml-6 mt-1">
                <li><strong>Host:</strong> IP address or hostname</li>
                <li><strong>Port:</strong> SSH port (usually 2222)</li>
                <li><strong>Username:</strong> Usually "root"</li>
                <li><strong>Connection Command:</strong> A template command with <code>~/.ssh/your_key</code></li>
              </ul>
            </li>
          </ol>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-6">Step 3: Connect via SSH</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li>Copy the connection command from the rental details page</li>
            <li>Replace <code>~/.ssh/your_key</code> with your actual private key path:
              <ul className="list-disc list-inside ml-6 mt-1">
                <li>If you used Ed25519: <code>~/.ssh/id_ed25519</code></li>
                <li>If you used RSA: <code>~/.ssh/id_rsa</code></li>
                <li>Or whatever path you used when generating your key</li>
              </ul>
            </li>
            <li>Open your terminal (Command Prompt, PowerShell, or Terminal)</li>
            <li>Paste and run the modified command</li>
            <li>If your key has a passphrase, enter it when prompted</li>
            <li>You should now be connected!</li>
          </ol>

          <div className="bg-gray-900 dark:bg-black rounded-lg p-4 mt-4">
            <p className="text-sm text-gray-400 mb-2">Example connection command:</p>
            <code className="text-sm text-green-400">
              ssh -i ~/.ssh/id_ed25519 root@192.168.1.100 -p 2222
            </code>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-6">Step 4: Verify GPU Access</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            Once connected, verify that you have GPU access:
          </p>
          <CodeBlock code="nvidia-smi" />
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            This should display your GPU information, utilization, memory usage, and temperature. 
            If you see this output, you're all set!
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-6">What You Can Do</h3>
          <ul className="text-gray-700 dark:text-gray-300 space-y-1">
            <li>✓ Install any libraries and dependencies (pip, apt, conda, etc.)</li>
            <li>✓ Run GPU-accelerated workloads (PyTorch, TensorFlow, CUDA, etc.)</li>
            <li>✓ Train machine learning models</li>
            <li>✓ Run inference jobs</li>
            <li>✓ Access GPU via CUDA, cuDNN, and other GPU libraries</li>
            <li>✓ Run any Linux commands and scripts</li>
            <li>✓ Transfer files using SCP or SFTP</li>
          </ul>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-4">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>Need help connecting?</strong> See our detailed <Link href="/docs/ssh-connection" className="underline">SSH Connection Guide</Link> for more information, 
              including troubleshooting steps and platform-specific instructions.
            </p>
          </div>
        </section>

        {/* Managing Your Rental */}
        <section className="bg-white dark:bg-gray-800 shadow rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Managing Your Rental</h2>
          
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Viewing Your Rentals</h3>
          <p className="text-gray-700 dark:text-gray-300">
            Go to <Link href="/user/rentals/list" className="text-purple-600 dark:text-purple-400 hover:underline">My Rentals</Link> to see all your active and completed rentals. 
            Each rental shows:
          </p>
          <ul className="text-gray-700 dark:text-gray-300 space-y-1">
            <li>GPU type and provider</li>
            <li>Status (Active, Paused, Completed)</li>
            <li>Start time and duration</li>
            <li>Current cost</li>
            <li>Quick access to rental details</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-6">Rental Details Page</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            Click on any rental to see detailed information:
          </p>
          <ul className="text-gray-700 dark:text-gray-300 space-y-1">
            <li><strong>Connection Information:</strong> SSH host, port, username, and connection command</li>
            <li><strong>Real-time GPU Metrics:</strong> Utilization, temperature, power usage, memory</li>
            <li><strong>SSH Key Management:</strong> View and change which SSH keys are registered</li>
            <li><strong>Payment Details:</strong> Hourly rate, hours used, total cost</li>
            <li><strong>Rental Actions:</strong> Pause, resume, or end rental</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-6">Changing SSH Keys</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            You can change which SSH keys are registered to an active rental:
          </p>
          <ol className="list-decimal list-inside space-y-1 text-gray-700 dark:text-gray-300">
            <li>Go to the rental details page</li>
            <li>Scroll to "SSH Keys for This Rental" section</li>
            <li>Click "Change Keys"</li>
            <li>Select the keys you want to use</li>
            <li>Click "Update Keys"</li>
          </ol>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Changes are applied immediately (within 1 minute). You can use the new keys right away.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-6">Rental Actions</h3>
          <div className="space-y-3 mt-4">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Pause Rental</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Temporarily stop billing while keeping the machine state. Your data and running processes remain intact. 
                Billing resumes when you unpause.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Resume Rental</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Continue a paused rental. Billing resumes immediately.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-1">End Rental</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Stop the rental permanently. Final cost is calculated and deducted from your balance. 
                The machine becomes available for others to rent.
              </p>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-6">Understanding Billing</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            CapaCloud uses a prepaid, hourly billing system:
          </p>
          <ul className="text-gray-700 dark:text-gray-300 space-y-1">
            <li><strong>Prepaid Balance:</strong> You add USDT to your account before renting</li>
            <li><strong>Hourly Deductions:</strong> Your balance is deducted every hour while the rental is active</li>
            <li><strong>Paused Rentals:</strong> No charges while paused</li>
            <li><strong>Minimum Balance:</strong> For your first rental, you need 10 USDT or 1 hour rate (whichever is higher)</li>
            <li><strong>Automatic Payments:</strong> Providers receive payments automatically from your balance</li>
          </ul>
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mt-3">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>Example:</strong> If a machine costs 0.5 USDT/hour and you rent it for 5 hours, 
              you'll be charged 2.5 USDT total (0.5 × 5).
            </p>
          </div>
        </section>

        {/* Common Issues */}
        <section className="bg-white dark:bg-gray-800 shadow rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Common Issues & Solutions</h2>
          
          <div className="space-y-4 mt-4">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                "You must add at least one SSH key"
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Solution:</strong> Go to <Link href="/user/settings" className="text-purple-600 dark:text-purple-400 hover:underline">Account Settings</Link> and add an SSH public key. 
                See Step 3 in the Prerequisites section above for detailed instructions.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                "Insufficient balance"
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Solution:</strong> You need at least 10 USDT or 1 hour rate (whichever is higher). 
                Go to <Link href="/user/escrow" className="text-purple-600 dark:text-purple-400 hover:underline">Escrow</Link> to add more USDT to your account.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                "Permission denied (publickey)" when connecting
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                <strong>Possible causes:</strong>
              </p>
              <ul className="text-sm text-gray-600 dark:text-gray-400 list-disc list-inside ml-4 space-y-1">
                <li>Your SSH keys haven't been registered yet (wait up to 1 minute)</li>
                <li>You're using the wrong private key (use the one matching your public key in account settings)</li>
                <li>Key permissions are wrong (run: <code>chmod 600 ~/.ssh/your_key</code>)</li>
              </ul>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                <strong>Solution:</strong> Check the rental details page to see which keys are registered. 
                Try changing keys if needed. See <Link href="/docs/ssh-connection" className="text-purple-600 dark:text-purple-400 hover:underline">SSH Connection Guide</Link> for more help.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                "Connection refused"
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Solution:</strong> The machine might be offline or the IP address might be incorrect. 
                Check the rental status on the details page. If the issue persists, contact support.
              </p>
            </div>
          </div>
        </section>

        {/* Important Notes */}
        <section className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Important Notes</h2>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <ul className="text-gray-700 dark:text-gray-300 space-y-2">
              <li><strong>You cannot rent your own machines</strong> - The system prevents you from renting machines you own</li>
              <li><strong>Data is ephemeral</strong> - Save important files! Data on the machine is not permanent and may be lost when the rental ends</li>
              <li><strong>Billing is automatic</strong> - Your balance is deducted hourly. Make sure you have enough balance</li>
              <li><strong>SSH keys are required</strong> - You must add SSH keys before renting. No exceptions!</li>
              <li><strong>Minimum balance</strong> - You need 10 USDT or 1 hour rate (whichever is higher) for your first rental</li>
              <li><strong>Key registration takes time</strong> - Wait up to 1 minute after renting for your SSH keys to be registered</li>
            </ul>
          </div>
        </section>

        {/* Quick Reference */}
        <section className="bg-white dark:bg-gray-800 shadow rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Quick Reference</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Before Renting</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>✓ Connect wallet</li>
                <li>✓ Add balance (≥10 USDT or 1 hour rate)</li>
                <li>✓ Add SSH key(s)</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">After Renting</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>✓ Wait for key registration (~1 min)</li>
                <li>✓ Get connection details</li>
                <li>✓ Connect via SSH</li>
                <li>✓ Verify GPU: <code>nvidia-smi</code></li>
              </ul>
            </div>
          </div>
        </section>

        {/* Need More Help */}
        <section className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Need More Help?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Link href="/docs/ssh-connection" className="block bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-purple-500 dark:hover:border-purple-500 transition-colors">
              <div className="flex items-center mb-2">
                <Terminal className="w-5 h-5 text-purple-600 dark:text-purple-400 mr-2" />
                <h3 className="font-semibold text-gray-900 dark:text-white">SSH Connection Guide</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Detailed instructions for connecting via SSH, troubleshooting connection issues, and managing SSH keys.
              </p>
            </Link>
            <Link href="/docs/troubleshooting" className="block bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-purple-500 dark:hover:border-purple-500 transition-colors">
              <div className="flex items-center mb-2">
                <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
                <h3 className="font-semibold text-gray-900 dark:text-white">Troubleshooting</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Common issues and solutions for renting, connecting, and using rented GPUs.
              </p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

