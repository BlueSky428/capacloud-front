'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Cpu, Key, DollarSign, CheckCircle2, Network, Server, AlertCircle, TrendingUp, Settings, Terminal, MonitorSpeaker } from 'lucide-react';
import CodeBlock from '@/components/CodeBlock';

export default function GPURegistrationPage() {
  const [selectedPlatform, setSelectedPlatform] = useState<'linux' | 'windows'>('linux');

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
          GPU Registration
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Complete machine registration to make your GPU available for rent
        </p>
      </div>

      <div className="space-y-12">
        {/* Overview */}
        <section className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Overview</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            After installing the GPU worker, you need to complete machine registration to make your GPU 
            available for rent. This process links your machine with your account and sets up the rental parameters.
          </p>
        </section>

        {/* Platform Selection */}
        <section className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <MonitorSpeaker className="w-6 h-6 mr-3 text-blue-500" />
            Choose Your Platform
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            Select your operating system to see platform-specific registration instructions:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => setSelectedPlatform('linux')}
              className={`bg-white dark:bg-gray-800 rounded-lg p-5 border-2 text-left transition-all hover:shadow-lg ${
                selectedPlatform === 'linux'
                  ? 'border-green-500 dark:border-green-400 shadow-md ring-2 ring-green-200 dark:ring-green-800'
                  : 'border-green-200 dark:border-green-800 hover:border-green-300 dark:hover:border-green-700'
              }`}
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                <Terminal className="w-5 h-5 mr-2 text-green-500" />
                Linux Registration
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Native Linux installation with systemd service management
              </p>
            </button>
            <button
              onClick={() => setSelectedPlatform('windows')}
              className={`bg-white dark:bg-gray-800 rounded-lg p-5 border-2 text-left transition-all hover:shadow-lg ${
                selectedPlatform === 'windows'
                  ? 'border-blue-500 dark:border-blue-400 shadow-md ring-2 ring-blue-200 dark:ring-blue-800'
                  : 'border-blue-200 dark:border-blue-800 hover:border-blue-300 dark:hover:border-blue-700'
              }`}
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                <MonitorSpeaker className="w-5 h-5 mr-2 text-blue-500" />
                Windows Registration
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Windows with WSL2 - worker runs in WSL environment
              </p>
            </button>
          </div>
        </section>

        {/* Registration Process */}
        <section className="bg-white dark:bg-gray-800 shadow rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Registration Process</h2>
          
          <div className="space-y-8">
            {/* Verify Worker Installation - Linux */}
            {selectedPlatform === 'linux' && (
            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mr-4 mt-1">
                <span className="text-purple-600 dark:text-purple-400 font-bold">1</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Verify Worker Installation</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  Make sure your GPU worker is installed and running:
                </p>
                <CodeBlock code="sudo systemctl status capa-worker" />
                <p className="text-gray-700 dark:text-gray-300 mt-3">
                  The worker should be sending heartbeats to the backend. Your machine will appear as "pending" 
                  once the worker is running.
                </p>
              </div>
            </div>
            )}

            {/* Verify Worker Installation - Windows */}
            {selectedPlatform === 'windows' && (
            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mr-4 mt-1">
                <span className="text-blue-600 dark:text-blue-400 font-bold">1</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Verify Worker Installation</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  Make sure your GPU worker is installed and running in WSL:
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  Open WSL Ubuntu and check the worker status:
                </p>
                <CodeBlock code="wsl" />
                <CodeBlock code="sudo systemctl status capa-worker" />
                <p className="text-gray-700 dark:text-gray-300 mt-3 mb-3">
                  The worker should be sending heartbeats to the backend. Your machine will appear as "pending" 
                  once the worker is running.
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                  <p className="text-sm text-blue-800 dark:text-blue-200 mb-2">
                    <strong>Note:</strong> The worker runs inside WSL2, so you need to check its status from within WSL, not from Windows PowerShell.
                  </p>
                  <div className="text-xs text-blue-700 dark:text-blue-300 space-y-1 mt-2">
                    <p>📖 <a href="https://learn.microsoft.com/en-us/windows/wsl/install" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-900 dark:hover:text-blue-100">WSL2 Installation Guide</a></p>
                    <p>📖 <a href="https://docs.docker.com/desktop/setup/install/windows-install/" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-900 dark:hover:text-blue-100">Docker Desktop Installation</a></p>
                    <p>📖 <a href="https://docs.docker.com/desktop/features/wsl/" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-900 dark:hover:text-blue-100">Docker WSL2 Integration</a></p>
                  </div>
                </div>
              </div>
            </div>
            )}

            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mr-4 mt-1">
                <span className="text-purple-600 dark:text-purple-400 font-bold">2</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Go to Registration Page</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Navigate to <Link href="/provider/gpus/register" className="text-purple-600 dark:text-purple-400 hover:underline">Register GPU</Link>. You should see your 
                  machine in the "Pending Machines" list.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mr-4 mt-1">
                <span className="text-purple-600 dark:text-purple-400 font-bold">3</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Select Your Machine</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Click on your machine from the pending list. The registration form will appear on the right.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mr-4 mt-1">
                <span className="text-purple-600 dark:text-purple-400 font-bold">4</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Complete Registration Form</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  Fill in the required information:
                </p>
                
                <div className="space-y-6">
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-5">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                      <Network className="w-5 h-5 mr-2 text-blue-500" />
                      IP Address or Hostname
                    </h4>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span><strong>Required:</strong> Enter your machine's public IP address or hostname</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span>Automatically detected during installation, but verify it's correct</span>
                      </li>
                      {selectedPlatform === 'windows' && (
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          <span><strong>Windows:</strong> Use your Windows machine's public IP address, not the WSL internal IP</span>
                        </li>
                      )}
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span>Must be accessible from the internet for SSH connections</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span>Examples: <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">192.168.1.100</code> or <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">gpu.example.com</code></span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-5">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                      <Server className="w-5 h-5 mr-2 text-green-500" />
                      SSH Port
                    </h4>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        <span><strong>Default:</strong> 2222 (automatically detected from worker)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        <span>Choose a port that's not in use</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        <span>Ensure the port is open in your firewall</span>
                        {selectedPlatform === 'windows' && (
                          <span className="ml-1">(both Windows Firewall and router firewall)</span>
                        )}
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        <span>Must be accessible from the internet</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-5">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                      <DollarSign className="w-5 h-5 mr-2 text-yellow-500" />
                      Rate per Hour
                    </h4>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                      <li className="flex items-start">
                        <span className="text-yellow-500 mr-2">•</span>
                        <span>Set your hourly rate in USDT</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-yellow-500 mr-2">•</span>
                        <span><strong>Recommended:</strong> 0.01 - 0.1 USDT/hour based on GPU performance</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-yellow-500 mr-2">•</span>
                        <span>Consider GPU type, memory, and market rates</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-yellow-500 mr-2">•</span>
                        <span>You can adjust this later (when no active rentals)</span>
                      </li>
                    </ul>
                    <Link href="/docs/pricing" className="text-yellow-600 dark:text-yellow-400 hover:underline text-sm font-medium mt-3 inline-block">
                      See Pricing Guide →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mr-4 mt-1">
                <span className="text-purple-600 dark:text-purple-400 font-bold">5</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Submit Registration</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Click "Complete Registration" to finalize. Your machine will now be available for rent!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* After Registration */}
        <section className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">After Registration</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Machine status changes from "pending" to "active"',
              'Machine appears in the "Browse GPUs" listing',
              'Users can now rent your GPU',
              'You\'ll start earning when rentals begin',
            ].map((item, idx) => (
              <div key={idx} className="flex items-center bg-white dark:bg-gray-800 rounded-lg p-4">
                <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Updating Machine Settings */}
        <section className="bg-white dark:bg-gray-800 shadow rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <Settings className="w-6 h-6 mr-3 text-blue-500" />
            Updating Machine Settings
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            You can update your machine settings (like rate per hour) from the machine details page. 
            However, updates are only allowed when there are no active rentals.
          </p>
        </section>

        {/* Important Notes */}
        <section className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <AlertCircle className="w-6 h-6 mr-3 text-yellow-500" />
            Important Notes
          </h2>
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border-l-4 border-yellow-500 dark:border-yellow-400">
              <p className="font-semibold text-gray-900 dark:text-white mb-2">SSH Keys</p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                You don't need to provide SSH keys. Consumers (renters) use their own SSH keys, which are automatically registered to your machine when they rent it.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border-l-4 border-blue-500 dark:border-blue-400">
              <p className="font-semibold text-gray-900 dark:text-white mb-2">IP Address</p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Make sure your machine's IP address is correct and accessible from the internet.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border-l-4 border-red-500 dark:border-red-400">
              <p className="font-semibold text-gray-900 dark:text-white mb-2">Firewall</p>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                Ensure the SSH port is open in your firewall.
              </p>
              {selectedPlatform === 'windows' && (
                <ul className="text-sm text-gray-700 dark:text-gray-300 ml-4 list-disc space-y-1">
                  <li>Open Windows Defender Firewall</li>
                  <li>Add an inbound rule for your SSH port (default: 2222)</li>
                  <li>Allow the connection for both Private and Public networks</li>
                  <li>Also ensure your router firewall allows the port if behind NAT</li>
                </ul>
              )}
            </div>
          </div>
        </section>

        {/* Tips */}
        <section className="bg-white dark:bg-gray-800 shadow rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <TrendingUp className="w-6 h-6 mr-3 text-purple-500" />
            Tips for Successful Registration
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Use a unique SSH port to avoid conflicts',
              'Verify IP address is correct and accessible',
              'Set competitive pricing to attract renters',
              'Monitor your machine status regularly',
              'Keep your worker updated for best performance',
            ].map((tip, idx) => (
              <div key={idx} className="flex items-start bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <CheckCircle2 className="w-5 h-5 text-purple-500 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 dark:text-gray-300">{tip}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
