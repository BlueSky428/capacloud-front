'use client';

import Link from 'next/link';
import { ArrowLeft, Terminal, Download, CheckCircle2, Server, Cpu, Network, Settings, AlertCircle, RefreshCw, Trash2 } from 'lucide-react';
import CodeBlock from '@/components/CodeBlock';

export default function WorkerInstallationPage() {
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
          Worker Installation
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Install and configure the CapaCloud GPU worker on your machine
        </p>
      </div>

      <div className="space-y-12">
        {/* Quick Installation */}
        <section className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <Download className="w-6 h-6 mr-3 text-blue-500" />
            Quick Installation
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            The easiest way to install the GPU worker is using our one-command installer:
          </p>
          <CodeBlock code="curl -s https://capa.cloud/install.sh | sudo bash" />
          <p className="text-gray-700 dark:text-gray-300 mt-4">
            This script will automatically install all dependencies and set up the worker service.
          </p>
        </section>

        {/* What the Installer Does */}
        <section className="bg-white dark:bg-gray-800 shadow rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">What the Installer Does</h2>
          <div className="space-y-4">
            {[
              { icon: CheckCircle2, text: 'Checks prerequisites: Verifies NVIDIA GPU and drivers', color: 'green' },
              { icon: Server, text: 'Installs Docker: Sets up Docker Engine if not already installed', color: 'blue' },
              { icon: Cpu, text: 'Installs NVIDIA Container Toolkit: Enables GPU access in containers', color: 'purple' },
              { icon: Download, text: 'Downloads worker script: Gets the latest worker software', color: 'orange' },
              { icon: Settings, text: 'Installs Python dependencies: Sets up required Python packages', color: 'yellow' },
              { icon: Network, text: 'Detects IP address: Automatically detects your machine\'s public IP', color: 'cyan' },
              { icon: Settings, text: 'Configures service: Sets up systemd service for auto-start', color: 'indigo' },
              { icon: CheckCircle2, text: 'Starts worker: Launches the worker service', color: 'green' },
            ].map((item, idx) => {
              const Icon = item.icon;
              const colorClasses = {
                green: 'text-green-500 bg-green-100 dark:bg-green-900/30',
                blue: 'text-blue-500 bg-blue-100 dark:bg-blue-900/30',
                purple: 'text-purple-500 bg-purple-100 dark:bg-purple-900/30',
                orange: 'text-orange-500 bg-orange-100 dark:bg-orange-900/30',
                yellow: 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30',
                cyan: 'text-cyan-500 bg-cyan-100 dark:bg-cyan-900/30',
                indigo: 'text-indigo-500 bg-indigo-100 dark:bg-indigo-900/30',
              };
              return (
                <div key={idx} className="flex items-start bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <div className={`rounded-lg p-2 mr-4 flex-shrink-0 ${colorClasses[item.color as keyof typeof colorClasses]}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-700 dark:text-gray-300">{item.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Installation Requirements */}
        <section className="bg-white dark:bg-gray-800 shadow rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <CheckCircle2 className="w-6 h-6 mr-3 text-green-500" />
            Installation Requirements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Ubuntu 20.04+ or Windows 10 Pro+ with WSL2',
              'NVIDIA GPU with CUDA support',
              'NVIDIA drivers installed',
              'Sudo/root access',
              'Internet connection',
            ].map((req, idx) => (
              <div key={idx} className="flex items-center bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">{req}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Installation Process */}
        <section className="bg-white dark:bg-gray-800 shadow rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Installation Process</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Step 1: Run the Installer</h3>
              <CodeBlock code="curl -s https://capa.cloud/install.sh | sudo bash" />
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Step 2: Enter Account ID</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                When prompted, enter your Account ID. You can find it:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/user/settings" className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors">
                  <p className="font-semibold text-blue-900 dark:text-blue-200">Account Settings</p>
                  <p className="text-sm text-blue-700 dark:text-blue-300">View your Account ID</p>
                </Link>
                <Link href="/provider/gpus/register" className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 hover:border-green-400 dark:hover:border-green-600 transition-colors">
                  <p className="font-semibold text-green-900 dark:text-green-200">Register GPU Page</p>
                  <p className="text-sm text-green-700 dark:text-green-300">Also shows Account ID</p>
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Step 3: Verify IP Address Detection</h3>
              <p className="text-gray-700 dark:text-gray-300">
                The installer automatically detects your machine's public IP address. This will be used for SSH connections.
                Make sure it's correct and accessible from the internet.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Step 4: Verify Installation</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                After installation, verify the service is running:
              </p>
              <CodeBlock code="sudo systemctl status capa-worker" />
            </div>
          </div>
        </section>

        {/* Manual Installation */}
        <section className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <AlertCircle className="w-6 h-6 mr-3 text-yellow-500" />
            Manual Installation
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            If you prefer to install manually or the automated installer doesn't work, see the 
            <Link href="/docs/troubleshooting" className="text-yellow-600 dark:text-yellow-400 hover:underline font-semibold ml-1">Troubleshooting Guide</Link> for manual setup instructions.
          </p>
        </section>

        {/* Verifying Worker Registration */}
        <section className="bg-white dark:bg-gray-800 shadow rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Verifying Worker Registration</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            After installation:
          </p>
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
            <ol className="space-y-3 text-gray-700 dark:text-gray-300 ml-6 list-decimal">
              <li>Go to <Link href="/provider/gpus/register" className="text-blue-600 dark:text-blue-400 hover:underline">Register GPU</Link></li>
              <li>Your machine should appear in the "Pending Machines" list</li>
              <li>Complete registration to make it available for rent</li>
            </ol>
          </div>
        </section>

        {/* Worker Management */}
        <section className="bg-white dark:bg-gray-800 shadow rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <Settings className="w-6 h-6 mr-3 text-purple-500" />
            Worker Management
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                <CheckCircle2 className="w-5 h-5 mr-2 text-green-500" />
                Checking Status
              </h3>
              <CodeBlock code="sudo systemctl status capa-worker" />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                <Terminal className="w-5 h-5 mr-2 text-blue-500" />
                Viewing Logs
              </h3>
              <CodeBlock code="sudo journalctl -u capa-worker -f" />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                <RefreshCw className="w-5 h-5 mr-2 text-purple-500" />
                Restarting Worker
              </h3>
              <CodeBlock code="sudo systemctl restart capa-worker" />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                <Download className="w-5 h-5 mr-2 text-orange-500" />
                Updating Worker
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                To update to the latest version:
              </p>
              <CodeBlock code="curl -s https://capa.cloud/update.sh | sudo bash" />
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3 mt-3">
                <p className="text-sm text-yellow-800 dark:text-yellow-300">
                  <strong>Note:</strong> Update will only proceed if you have no active rentals.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                <Trash2 className="w-5 h-5 mr-2 text-red-500" />
                Uninstalling Worker
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                To remove the worker:
              </p>
              <CodeBlock code="curl -s https://capa.cloud/uninstall.sh | sudo bash" />
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3 mt-3">
                <p className="text-sm text-yellow-800 dark:text-yellow-300">
                  <strong>Note:</strong> Uninstall will only proceed if you have no active rentals.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SSH Key Management */}
        <section className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <CheckCircle2 className="w-6 h-6 mr-3 text-blue-500" />
            SSH Key Management
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              <strong>Important:</strong> You don't need to provide SSH keys during registration. 
              Consumers (renters) use their own SSH keys, which are automatically registered to your machine 
              when they rent it. The worker handles all SSH key management automatically.
            </p>
          </div>
        </section>

        {/* Troubleshooting */}
        <section className="bg-white dark:bg-gray-800 shadow rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <AlertCircle className="w-6 h-6 mr-3 text-red-500" />
            Troubleshooting
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            If you encounter issues during installation:
          </p>
          <div className="space-y-3">
            <Link href="/docs/troubleshooting" className="flex items-center text-blue-600 dark:text-blue-400 hover:underline font-medium">
              <CheckCircle2 className="w-5 h-5 mr-2" />
              Check Troubleshooting Guide
            </Link>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <p className="font-semibold text-gray-900 dark:text-white mb-2">Quick Checks:</p>
              <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                <li>• Verify NVIDIA drivers: <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">nvidia-smi</code></li>
                <li>• Check Docker: <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">sudo systemctl status docker</code></li>
                <li>• Review worker logs for errors</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
