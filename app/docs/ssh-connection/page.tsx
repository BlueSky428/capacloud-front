'use client';

import Link from 'next/link';
import { ArrowLeft, Terminal, Key, CheckCircle2, AlertCircle, Monitor, Smartphone, Laptop, Server, Cpu } from 'lucide-react';
import CodeBlock from '@/components/CodeBlock';

export default function SSHConnectionPage() {
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
          <Terminal className="w-10 h-10 mr-4 text-blue-500" />
          SSH Connection Guide
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Connect to your rented GPU with full root access
        </p>
      </div>

      <div className="space-y-12">
        {/* Overview */}
        <section className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Overview</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            When you rent a GPU on CapaCloud, you get full root access to the machine. This guide will help 
            you connect and start using your rented GPU.
          </p>
        </section>

        {/* Getting Connection Details */}
        <section className="bg-white dark:bg-gray-800 shadow rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Getting Your Connection Details</h2>
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
            <ol className="space-y-3 text-gray-700 dark:text-gray-300 ml-6 list-decimal">
              <li>Go to your rental details page (from <Link href="/user/rentals/list" className="text-blue-600 dark:text-blue-400 hover:underline">My Rentals</Link>)</li>
              <li>Find the "Connect to Machine" section</li>
              <li>You'll see:
                <ul className="list-disc ml-6 mt-2 space-y-1">
                  <li>SSH Host (IP address or hostname)</li>
                  <li>SSH Port</li>
                  <li>SSH Username (usually "root")</li>
                  <li>SSH connection command (template with your key path)</li>
                </ul>
              </li>
            </ol>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-4">
            <p className="text-sm text-blue-800 dark:text-blue-300">
              <strong>Note:</strong> You'll need to have added SSH keys to your account settings before renting.
            </p>
          </div>
        </section>

        {/* Connecting via SSH */}
        <section className="bg-white dark:bg-gray-800 shadow rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Connecting via SSH</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Step 1: Add Your SSH Key to Your Account</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Before renting a machine, you need to add at least one SSH public key to your account:
              </p>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
                <ol className="space-y-2 text-gray-700 dark:text-gray-300 ml-6 list-decimal">
                  <li>Go to <Link href="/user/settings" className="text-blue-600 dark:text-blue-400 hover:underline">Account Settings</Link></li>
                  <li>Navigate to the "SSH Keys" section</li>
                  <li>Click "Add SSH Key"</li>
                  <li>Enter a name for your key (e.g., "My Laptop")</li>
                  <li>Paste your SSH public key (usually from <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">~/.ssh/id_rsa.pub</code> or <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">~/.ssh/id_ed25519.pub</code>)</li>
                  <li>Click "Add Key"</li>
                </ol>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Step 2: Select SSH Keys When Renting</h3>
              <p className="text-gray-700 dark:text-gray-300">
                When you rent a machine, you'll be prompted to select which SSH keys to use. 
                You can select one or more keys. These keys will be automatically registered to the machine.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Step 3: Connect Using Your Private Key</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Use the SSH command from your rental details page. Replace <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">~/.ssh/your_key</code> 
                with the path to your private key:
              </p>
              <CodeBlock code="ssh -i ~/.ssh/id_rsa root@hostname -p port" />
              <p className="text-gray-700 dark:text-gray-300 mt-4 mb-2">
                Or if you use a different key:
              </p>
              <CodeBlock code="ssh -i ~/.ssh/id_ed25519 root@hostname -p port" />
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mt-4">
                <p className="text-sm text-yellow-800 dark:text-yellow-300">
                  <strong>Note:</strong> Make sure your private key has correct permissions: <code className="bg-yellow-100 dark:bg-yellow-900/30 px-1 rounded">chmod 600 ~/.ssh/id_rsa</code>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Using SSH on Different Systems */}
        <section className="bg-white dark:bg-gray-800 shadow rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Using SSH on Different Systems</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Monitor className="w-6 h-6 text-blue-500 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Linux / macOS</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                Use the terminal and SSH command directly. Most systems have SSH pre-installed.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Laptop className="w-6 h-6 text-purple-500 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Windows</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                You can use:
              </p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  <span><strong>PowerShell:</strong> Built-in SSH client (Windows 10+)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  <span><strong>Windows Terminal:</strong> Modern terminal with SSH support</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  <span><strong>PuTTY:</strong> Traditional SSH client</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  <span><strong>WSL:</strong> Windows Subsystem for Linux</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Managing SSH Keys */}
        <section className="bg-white dark:bg-gray-800 shadow rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Managing SSH Keys</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Adding Multiple Keys</h3>
              <p className="text-gray-700 dark:text-gray-300">
                You can add multiple SSH keys to your account. This is useful if you want to access 
                rented machines from different devices (laptop, desktop, etc.). Each key should have 
                a descriptive name.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Changing Keys for Active Rentals</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                You can change which SSH keys are registered to an active rental:
              </p>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
                <ol className="space-y-2 text-gray-700 dark:text-gray-300 ml-6 list-decimal">
                  <li>Go to your rental details page</li>
                  <li>Scroll to the "SSH Keys for This Rental" section</li>
                  <li>Click "Change Keys"</li>
                  <li>Select the keys you want to use</li>
                  <li>Click "Update Keys"</li>
                </ol>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mt-4">
                Changes are applied immediately. You can use the new keys right away.
              </p>
            </div>
          </div>
        </section>

        {/* Generating SSH Keys */}
        <section className="bg-white dark:bg-gray-800 shadow rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Generating SSH Keys</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            If you don't have an SSH key pair yet, you can generate one:
          </p>
          <div className="space-y-4">
            <div>
              <p className="text-gray-700 dark:text-gray-300 mb-2 font-medium">For Ed25519 (Recommended):</p>
              <CodeBlock code={'ssh-keygen -t ed25519 -C "your_email@example.com"'} />
            </div>
            <div>
              <p className="text-gray-700 dark:text-gray-300 mb-2 font-medium">For RSA (if Ed25519 not supported):</p>
              <CodeBlock code={'ssh-keygen -t rsa -b 4096 -C "your_email@example.com"'} />
            </div>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mt-4">
            Your public key will be saved at <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">~/.ssh/id_ed25519.pub</code> (or <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">~/.ssh/id_rsa.pub</code>).
            Copy this file's contents and add it to your account settings.
          </p>
        </section>

        {/* Verifying GPU Access */}
        <section className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <Cpu className="w-6 h-6 mr-3 text-green-500" />
            Verifying GPU Access
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Once connected, verify GPU access:
          </p>
          <CodeBlock code="nvidia-smi" />
          <p className="text-gray-700 dark:text-gray-300 mt-4">
            This should display your GPU information, utilization, and memory usage.
          </p>
        </section>

        {/* Troubleshooting */}
        <section className="bg-white dark:bg-gray-800 shadow rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <AlertCircle className="w-6 h-6 mr-3 text-red-500" />
            Troubleshooting
          </h2>
          
          <div className="space-y-6">
            <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 dark:border-red-400 rounded-lg p-4">
              <h3 className="font-semibold text-red-900 dark:text-red-200 mb-2">Connection Refused</h3>
              <ul className="space-y-1 text-sm text-red-800 dark:text-red-300">
                <li>• Verify the SSH port is correct</li>
                <li>• Check that the rental is still active</li>
                <li>• Ensure your firewall allows SSH connections</li>
              </ul>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 dark:border-yellow-400 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-900 dark:text-yellow-200 mb-2">Permission Denied</h3>
              <ul className="space-y-1 text-sm text-yellow-800 dark:text-yellow-300">
                <li>• Verify SSH key permissions (should be 600): <code className="bg-yellow-100 dark:bg-yellow-900/30 px-1 rounded">chmod 600 ~/.ssh/your_key</code></li>
                <li>• Make sure you're using the private key that corresponds to the public key in your account</li>
                <li>• Check that your public key is registered to the rental (check rental details page)</li>
                <li>• Verify the username is correct (usually "root")</li>
              </ul>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 dark:border-blue-400 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">Key Not Registered</h3>
              <ul className="space-y-1 text-sm text-blue-800 dark:text-blue-300">
                <li>• Make sure you selected at least one SSH key when renting the machine</li>
                <li>• Check that your key is in your account settings</li>
                <li>• Wait up to 1 minute for the worker to register keys (worker polls every minute)</li>
                <li>• Try changing keys on the rental details page to trigger immediate update</li>
              </ul>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-gray-700 dark:text-gray-300">
              For more help, see <Link href="/docs/troubleshooting" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">Troubleshooting Guide</Link>.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
