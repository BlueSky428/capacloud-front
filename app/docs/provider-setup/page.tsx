'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Cpu, Terminal, Settings, Wallet, CheckCircle2, DollarSign, Monitor, TrendingUp, AlertCircle, MonitorSpeaker, Info } from 'lucide-react';
import CodeBlock from '@/components/CodeBlock';

export default function ProviderSetupPage() {
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
          <Cpu className="w-10 h-10 mr-4 text-green-500" />
          Provider Setup
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Learn how to become a GPU provider and start earning on CapaCloud
        </p>
      </div>

      <div className="space-y-12">
        {/* Becoming a Provider */}
        <section className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border border-green-200 dark:border-green-800 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Becoming a Provider</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            As a provider on CapaCloud, you can earn USDT by sharing your GPU resources. This guide will 
            walk you through the setup process step by step.
          </p>
        </section>

        {/* Requirements */}
        <section className="bg-white dark:bg-gray-800 shadow rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <CheckCircle2 className="w-6 h-6 mr-3 text-blue-500" />
            Requirements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">NVIDIA GPU</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">With CUDA support</p>
              </div>
            </div>
            <div className="flex items-start bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Linux System</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Ubuntu 20.04+ recommended (or Windows 10+ with WSL2)</p>
              </div>
            </div>
            <div className="flex items-start bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Docker & NVIDIA Toolkit</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">For container management</p>
              </div>
            </div>
            <div className="flex items-start bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">SSH Server</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">For user access</p>
              </div>
            </div>
            <div className="flex items-start bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Sudo/Root Access</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Required for installation</p>
              </div>
            </div>
            <div className="flex items-start bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Stable Internet</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">For worker communication</p>
              </div>
            </div>
          </div>
        </section>

        {/* Platform Selection */}
        <section className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <MonitorSpeaker className="w-6 h-6 mr-3 text-blue-500" />
            Choose Your Platform
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            CapaCloud supports both Linux and Windows providers. Choose the setup guide that matches your operating system:
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
                Linux Setup
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Native Linux installation with direct Docker support. Recommended for dedicated servers and VPS.
              </p>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                <li>✓ Ubuntu 20.04+ or similar</li>
                <li>✓ Direct Docker installation</li>
                <li>✓ No additional requirements</li>
              </ul>
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
                Windows Setup
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Windows 10/11 with WSL2 and Docker Desktop. Perfect for Windows users with NVIDIA GPUs.
              </p>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                <li>✓ Windows 10/11 required</li>
                <li>✓ Docker Desktop + WSL2</li>
                <li>✓ GPU support via WSL2</li>
              </ul>
            </button>
          </div>
        </section>

        {/* Linux Setup Steps */}
        {selectedPlatform === 'linux' && (
        <section className="bg-white dark:bg-gray-800 shadow rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Linux Setup Steps</h2>
          
          <div className="space-y-8">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mr-4 mt-1">
                <span className="text-green-600 dark:text-green-400 font-bold">1</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <Wallet className="w-5 h-5 mr-2 text-green-500" />
                  Connect Wallet and Get Account ID
                </h3>
                <ol className="space-y-2 text-gray-700 dark:text-gray-300 ml-6 list-decimal">
                  <li>Connect your Solana wallet</li>
                  <li>Go to <Link href="/user/settings" className="text-green-600 dark:text-green-400 hover:underline">Account Settings</Link></li>
                  <li>Copy your Account ID - you'll need it for worker installation</li>
                </ol>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mr-4 mt-1">
                <span className="text-green-600 dark:text-green-400 font-bold">2</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <Terminal className="w-5 h-5 mr-2 text-green-500" />
                  Install GPU Worker
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  Run the installation script on your GPU machine:
                </p>
                <CodeBlock code="curl -s https://capa.cloud/install.sh | sudo bash" />
                <p className="text-gray-700 dark:text-gray-300 mt-3">
                  When prompted, enter your Account ID from Step 1.
                </p>
                <Link href="/docs/worker-installation" className="text-green-600 dark:text-green-400 hover:underline text-sm font-medium mt-2 inline-block">
                  Detailed Installation Guide →
                </Link>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mr-4 mt-1">
                <span className="text-green-600 dark:text-green-400 font-bold">3</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <Settings className="w-5 h-5 mr-2 text-green-500" />
                  Register Your Machine
                </h3>
                <ol className="space-y-2 text-gray-700 dark:text-gray-300 ml-6 list-decimal">
                  <li>Go to <Link href="/provider/gpus/register" className="text-green-600 dark:text-green-400 hover:underline">Register GPU</Link></li>
                  <li>Your machine should appear in the pending machines list</li>
                  <li>Select the machine and complete registration:
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                      <li>Set IP address or hostname</li>
                      <li>Set SSH port</li>
                      <li>Set hourly rate (USDT per hour)</li>
                    </ul>
                  </li>
                  <li>Click "Complete Registration"</li>
                </ol>
                <Link href="/docs/gpu-registration" className="text-green-600 dark:text-green-400 hover:underline text-sm font-medium mt-3 inline-block">
                  Registration Guide →
                </Link>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mr-4 mt-1">
                <span className="text-green-600 dark:text-green-400 font-bold">4</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
                  Start Earning
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Once registered, your GPU will be available for rent. You'll automatically earn USDT 
                  for every hour your GPU is rented.
                </p>
              </div>
            </div>
          </div>
        </section>
        )}

        {/* Windows Setup Steps */}
        {selectedPlatform === 'windows' && (
        <section className="bg-white dark:bg-gray-800 shadow rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <MonitorSpeaker className="w-6 h-6 mr-3 text-blue-500" />
            Windows Setup Steps
          </h2>
          
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-1">
                  Important: Docker Desktop Required
                </p>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  Windows requires Docker Desktop with WSL2 backend for GPU support. This is the only supported method for GPU containers on Windows.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mr-4 mt-1">
                <span className="text-blue-600 dark:text-blue-400 font-bold">1</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <Wallet className="w-5 h-5 mr-2 text-blue-500" />
                  Connect Wallet and Get Account ID
                </h3>
                <ol className="space-y-2 text-gray-700 dark:text-gray-300 ml-6 list-decimal">
                  <li>Connect your Solana wallet</li>
                  <li>Go to <Link href="/user/settings" className="text-blue-600 dark:text-blue-400 hover:underline">Account Settings</Link></li>
                  <li>Copy your Account ID - you'll need it for worker installation</li>
                </ol>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mr-4 mt-1">
                <span className="text-blue-600 dark:text-blue-400 font-bold">2</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <MonitorSpeaker className="w-5 h-5 mr-2 text-blue-500" />
                  Install WSL2 and Docker Desktop
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Windows requires WSL2 (Windows Subsystem for Linux) and Docker Desktop for GPU container support.
                </p>
                
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Step 2a: Install WSL2</h4>
                  <ol className="space-y-2 text-gray-700 dark:text-gray-300 ml-6 list-decimal">
                    <li>Open PowerShell as Administrator</li>
                    <li>Run: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">wsl --install</code></li>
                    <li>Reboot your computer when prompted (this is required)</li>
                    <li>After reboot, WSL2 will be ready</li>
                  </ol>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
                    📖 <a href="https://learn.microsoft.com/en-us/windows/wsl/install" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Official WSL2 Installation Guide</a>
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Step 2b: Install Docker Desktop</h4>
                  <ol className="space-y-2 text-gray-700 dark:text-gray-300 ml-6 list-decimal">
                    <li>Download Docker Desktop from <a href="https://www.docker.com/products/docker-desktop" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">docker.com</a></li>
                    <li>Install Docker Desktop</li>
                    <li>During installation, ensure <strong>"Use WSL 2 based engine"</strong> is enabled</li>
                    <li>After installation, open Docker Desktop</li>
                    <li>Go to <strong>Settings → General</strong> and enable:
                      <ul className="list-disc ml-6 mt-1">
                        <li>✓ Use the WSL 2 based engine</li>
                        <li>✓ Enable integration with my default WSL distro</li>
                      </ul>
                    </li>
                    <li><strong>CRITICAL:</strong> Go to <strong>Settings → Resources → WSL Integration</strong> and enable integration for Ubuntu</li>
                    <li>Click <strong>Apply & Restart</strong></li>
                    <li>Close and reopen your WSL terminal</li>
                    <li>Verify Docker works in WSL: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">docker info</code></li>
                  </ol>
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3 mt-3">
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                      <strong>⚠️ Important:</strong> If you see "The command 'docker' could not be found in this WSL 2 distro" after installation, 
                      you must enable WSL Integration in Docker Desktop settings (step above). See the Troubleshooting section below for detailed steps.
                    </p>
                  </div>
                  <div className="mt-3 space-y-1">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      📖 <a href="https://docs.docker.com/desktop/setup/install/windows-install/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Docker Desktop Installation Guide</a>
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      📖 <a href="https://docs.docker.com/desktop/features/wsl/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Docker WSL2 Integration Guide</a>
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Step 2c: Verify GPU Support</h4>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    Open WSL Ubuntu (type <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">wsl</code> in PowerShell) and verify:
                  </p>
                  <CodeBlock code="docker info | grep -i runtime" />
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 mb-3">
                    You should see <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">nvidia</code> in the runtime list.
                  </p>
                  <CodeBlock code="docker run --rm --gpus all nvidia/cuda:12.2.0-base-ubuntu22.04 nvidia-smi" />
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    This should display your GPU information. If it fails, see the Troubleshooting section below.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mr-4 mt-1">
                <span className="text-blue-600 dark:text-blue-400 font-bold">3</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <Terminal className="w-5 h-5 mr-2 text-blue-500" />
                  Install GPU Worker
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Since WSL2 provides a Linux environment, you'll use the same installation script as Linux providers. 
                  Run it inside your WSL Ubuntu environment:
                </p>
                <ol className="space-y-3 text-gray-700 dark:text-gray-300 ml-6 list-decimal mb-4">
                  <li>Open WSL Ubuntu:
                    <CodeBlock code="wsl" />
                  </li>
                  <li>Run the installation script:
                    <CodeBlock code="curl -s https://capa.cloud/install.sh | sudo bash" />
                  </li>
                  <li>When prompted, enter your Account ID from Step 1</li>
                  <li>The script will:
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                      <li>Check for NVIDIA GPU (should work via WSL2)</li>
                      <li>Install Docker if needed (or use Docker Desktop integration)</li>
                      <li>Install NVIDIA Container Toolkit (if using Docker in WSL, not Docker Desktop)</li>
                      <li>Download and configure the worker</li>
                      <li>Create a systemd service to run the worker</li>
                    </ul>
                  </li>
                </ol>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3 mb-4">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200 mb-2">
                    <strong>Important Notes:</strong>
                  </p>
                  <ul className="text-sm text-yellow-800 dark:text-yellow-200 ml-4 list-disc space-y-1">
                    <li>If you're using Docker Desktop (recommended), the script may skip Docker installation since Docker Desktop is already managing Docker</li>
                    <li>The NVIDIA Container Toolkit installation may be skipped if Docker Desktop is handling GPU support</li>
                    <li>Make sure Docker Desktop is running and WSL integration is enabled before running the script</li>
                    <li>The worker will run inside WSL2, and containers will use Docker Desktop's GPU support</li>
                  </ul>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    <strong>Note:</strong> The installation script is the same as Linux because WSL2 provides a full Linux environment. 
                    The worker runs in WSL2 and uses Docker Desktop for container management with GPU support.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mr-4 mt-1">
                <span className="text-blue-600 dark:text-blue-400 font-bold">4</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <Settings className="w-5 h-5 mr-2 text-blue-500" />
                  Register Your Machine
                </h3>
                <ol className="space-y-2 text-gray-700 dark:text-gray-300 ml-6 list-decimal">
                  <li>Go to <Link href="/provider/gpus/register" className="text-blue-600 dark:text-blue-400 hover:underline">Register GPU</Link></li>
                  <li>Your machine should appear in the pending machines list</li>
                  <li>Select the machine and complete registration:
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                      <li>Set IP address or hostname (use your Windows machine's IP address)</li>
                      <li>Set SSH port (default is 2222, or use the port configured in WSL)</li>
                      <li>Set hourly rate (USDT per hour)</li>
                    </ul>
                  </li>
                  <li>Click "Complete Registration"</li>
                </ol>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3 mt-4">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    <strong>Important:</strong> Make sure your Windows firewall allows incoming connections on the SSH port you configure.
                  </p>
                </div>
                <Link href="/docs/gpu-registration" className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium mt-3 inline-block">
                  Registration Guide →
                </Link>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mr-4 mt-1">
                <span className="text-blue-600 dark:text-blue-400 font-bold">5</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-blue-500" />
                  Start Earning
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Once registered, your GPU will be available for rent. You'll automatically earn USDT 
                  for every hour your GPU is rented.
                </p>
              </div>
            </div>
          </div>
        </section>
        )}

        {/* Windows Troubleshooting */}
        {selectedPlatform === 'windows' && (
        <section className="bg-white dark:bg-gray-800 shadow rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <AlertCircle className="w-6 h-6 mr-3 text-orange-500" />
            Windows Troubleshooting
          </h2>
          
          <div className="space-y-6">
            <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 dark:border-red-400 rounded-lg p-4">
              <h3 className="font-semibold text-red-900 dark:text-red-200 mb-2">"could not select device driver with capabilities: [[gpu]]"</h3>
              <p className="text-sm text-red-800 dark:text-red-300 mb-2">
                This means Docker Desktop doesn't have GPU support enabled. Fix it:
              </p>
              <ol className="text-sm text-red-800 dark:text-red-300 ml-6 list-decimal space-y-1">
                <li>Open Docker Desktop</li>
                <li>Go to <strong>Settings → General</strong> and ensure WSL 2 backend is enabled</li>
                <li>Go to <strong>Settings → Resources → WSL Integration</strong> and enable for Ubuntu</li>
                <li>Restart Docker Desktop</li>
                <li>Verify with: <code className="bg-red-100 dark:bg-red-900/30 px-1 rounded">docker info | grep -i runtime</code> (should show nvidia)</li>
              </ol>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 dark:border-yellow-400 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-900 dark:text-yellow-200 mb-2">"nvidia-smi not found" in container</h3>
              <p className="text-sm text-yellow-800 dark:text-yellow-300 mb-2">
                Ensure NVIDIA drivers are installed on Windows:
              </p>
              <ol className="text-sm text-yellow-800 dark:text-yellow-300 ml-6 list-decimal space-y-1">
                <li>Download latest NVIDIA drivers from <a href="https://www.nvidia.com/drivers" target="_blank" rel="noopener noreferrer" className="underline">nvidia.com</a></li>
                <li>Install the drivers (Studio or Game Ready drivers both work)</li>
                <li>Reboot Windows</li>
                <li>Verify <code className="bg-yellow-100 dark:bg-yellow-900/30 px-1 rounded">nvidia-smi</code> works in WSL</li>
              </ol>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 dark:border-blue-400 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">"The command 'docker' could not be found in this WSL 2 distro"</h3>
              <p className="text-sm text-blue-800 dark:text-blue-300 mb-2">
                This means Docker Desktop WSL integration is not enabled. Fix it:
              </p>
              <ol className="text-sm text-blue-800 dark:text-blue-300 ml-6 list-decimal space-y-1">
                <li>Open Docker Desktop on Windows</li>
                <li>Go to <strong>Settings → Resources → WSL Integration</strong></li>
                <li>Enable the toggle for your Ubuntu distribution</li>
                <li>Click <strong>Apply & Restart</strong></li>
                <li>Close and reopen your WSL terminal</li>
                <li>Verify with: <code className="bg-blue-100 dark:bg-blue-900/30 px-1 rounded">docker info</code></li>
              </ol>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 dark:border-blue-400 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">Docker Desktop not starting</h3>
              <p className="text-sm text-blue-800 dark:text-blue-300 mb-2">
                Common fixes:
              </p>
              <ul className="text-sm text-blue-800 dark:text-blue-300 ml-6 list-disc space-y-1">
                <li>Ensure WSL2 is installed and updated: <code className="bg-blue-100 dark:bg-blue-900/30 px-1 rounded">wsl --update</code></li>
                <li>Check Windows features: Virtual Machine Platform and Windows Subsystem for Linux must be enabled</li>
                <li>Restart your computer if Docker Desktop fails to start</li>
              </ul>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 dark:border-purple-400 rounded-lg p-4">
              <h3 className="font-semibold text-purple-900 dark:text-purple-200 mb-2">SSH connection refused</h3>
              <p className="text-sm text-purple-800 dark:text-purple-300 mb-2">
                Check Windows Firewall:
              </p>
              <ol className="text-sm text-purple-800 dark:text-purple-300 ml-6 list-decimal space-y-1">
                <li>Open Windows Defender Firewall</li>
                <li>Click "Allow an app or feature through Windows Firewall"</li>
                <li>Ensure WSL and Docker are allowed, or add an inbound rule for your SSH port</li>
                <li>Verify the container is running: <code className="bg-purple-100 dark:bg-purple-900/30 px-1 rounded">docker ps</code> in WSL</li>
              </ol>
            </div>
          </div>
        </section>
        )}

        {/* Managing Your Machines */}
        <section className="bg-white dark:bg-gray-800 shadow rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <Monitor className="w-6 h-6 mr-3 text-blue-500" />
            Managing Your Machines
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Viewing Your Machines</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Go to <Link href="/provider/gpus/list" className="text-blue-600 dark:text-blue-400 hover:underline">My GPUs</Link> to see all your registered machines, 
                their status, and rental history.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Updating Settings</h3>
              <p className="text-gray-700 dark:text-gray-300">
                You can update machine settings such as hourly rate. Machines cannot be updated while they 
                have active rentals.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Monitoring</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                The worker automatically sends heartbeats with GPU metrics. You can monitor:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                  <p className="font-semibold text-gray-900 dark:text-white">GPU Utilization</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                  <p className="font-semibold text-gray-900 dark:text-white">Temperature</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                  <p className="font-semibold text-gray-900 dark:text-white">Power Usage</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                  <p className="font-semibold text-gray-900 dark:text-white">Machine Status</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Earnings */}
        <section className="bg-gradient-to-br from-purple-50 to-green-50 dark:from-purple-900/20 dark:to-green-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <DollarSign className="w-6 h-6 mr-3 text-purple-500" />
            Earnings
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            View your earnings on the <Link href="/provider/earnings" className="text-purple-600 dark:text-purple-400 hover:underline font-semibold">Earnings</Link> page. Earnings are 
            automatically added to your account balance and can be claimed to your wallet.
          </p>
        </section>

        {/* Best Practices */}
        <section className="bg-white dark:bg-gray-800 shadow rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <CheckCircle2 className="w-6 h-6 mr-3 text-yellow-500" />
            Best Practices
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 dark:border-yellow-400 rounded-lg p-4">
              <AlertCircle className="w-5 h-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Competitive Pricing</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Set prices based on GPU performance</p>
              </div>
            </div>
            <div className="flex items-start bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 dark:border-green-400 rounded-lg p-4">
              <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Keep Machines Online</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Ensure stable uptime</p>
              </div>
            </div>
            <div className="flex items-start bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 dark:border-blue-400 rounded-lg p-4">
              <CheckCircle2 className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Monitor GPU Health</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Watch temperature and utilization</p>
              </div>
            </div>
            <div className="flex items-start bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 dark:border-purple-400 rounded-lg p-4">
              <CheckCircle2 className="w-5 h-5 text-purple-500 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Stable Connection</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Ensure reliable internet</p>
              </div>
            </div>
            <div className="flex items-start bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-500 dark:border-orange-400 rounded-lg p-4 md:col-span-2">
              <CheckCircle2 className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Regular Updates</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Keep your worker software updated for best performance</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
