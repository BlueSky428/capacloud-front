'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { ArrowRight, Zap, Shield, Coins, Cpu, Rocket, Leaf, Brain, Video, Pickaxe, ShieldHalf, EyeOff, ChevronDown, ChevronUp, Network } from 'lucide-react';

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <button
        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-semibold text-gray-900 dark:text-white pr-4">{question}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
        )}
      </button>
      {isOpen && (
        <div className="px-6 pb-4 text-base text-gray-600 dark:text-gray-400 leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <Image
                src="/logo.jpg"
                alt="CapaCloud Logo"
                width={240}
                height={240}
                className="h-48 w-auto"
                priority
              />
            </div>
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
              <span className="block">Best Decentralized</span>
              <span className="block text-purple-600 dark:text-purple-400">GPU Platform</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              CapaCloud is a peer-to-peer neocloud platform for pay-per-use GPU rentals. Rent or monetize GPU power with blockchain payments, full system control, and a climate-friendly, carbon-neutral cloud alternative to AWS.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <Link
                  href="/user/rent"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 md:py-4 md:text-lg md:px-10 transition-colors"
                >
                  Rent a GPU
                  <ArrowRight className="ml-2 w-7 h-7 md:w-8 md:h-8" />
                </Link>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <Link
                  href="/provider/onboarding"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-purple-600 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:text-purple-400 dark:hover:bg-gray-700 md:py-4 md:text-lg md:px-10 transition-colors"
                >
                  Monetize your GPU
                  <Cpu className="ml-2 w-7 h-7 md:w-8 md:h-8" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Neocloud Platform Section */}
      <div className="py-16 sm:py-24 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white sm:text-3xl md:text-4xl">
              CapaCloud Neocloud Platform
            </h2>
            <p className="mt-4 text-base text-gray-600 dark:text-gray-400 sm:text-lg md:text-xl">
              CapaCloud is a decentralized GPU rental marketplace that connects users who need compute power with GPU owners through a peer-to-peer neocloud network. It enables pay-per-use GPU rentals with USDT and Solana wallet payments, offering a sustainable, carbon-neutral cloud alternative for AI, rendering, and high-performance workloads.
            </p>
            <p className="mt-8 text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Explore
            </p>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
              <Link
                href="/decentralized-gpu-platform"
                className="group flex items-center gap-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/80 p-5 text-left hover:border-purple-500 dark:hover:border-purple-400 hover:shadow-lg transition-all duration-200"
              >
                <div className="flex-shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                  <Cpu className="w-6 h-6" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="block font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    Decentralized GPU platform
                  </span>
                  <span className="block text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                    How the neocloud works
                  </span>
                </div>
                <ArrowRight className="w-5 h-5 flex-shrink-0 text-gray-400 group-hover:text-purple-500 group-hover:translate-x-1 transition-all" aria-hidden="true" />
              </Link>
              <Link
                href="/sustainable-cloud-gpu"
                className="group flex items-center gap-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/80 p-5 text-left hover:border-green-500 dark:hover:border-green-400 hover:shadow-lg transition-all duration-200"
              >
                <div className="flex-shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 group-hover:bg-green-500 group-hover:text-white transition-colors">
                  <Leaf className="w-6 h-6" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="block font-semibold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                    Sustainable cloud GPU
                  </span>
                  <span className="block text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                    Carbon-neutral compute
                  </span>
                </div>
                <ArrowRight className="w-5 h-5 flex-shrink-0 text-gray-400 group-hover:text-green-500 group-hover:translate-x-1 transition-all" aria-hidden="true" />
              </Link>
              <Link
                href="/gpu-rentals"
                className="group flex items-center gap-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/80 p-5 text-left hover:border-purple-500 dark:hover:border-purple-400 hover:shadow-lg transition-all duration-200"
              >
                <div className="flex-shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                  <Zap className="w-6 h-6" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="block font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    GPU rentals for AI & rendering
                  </span>
                  <span className="block text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                    Pay-per-use, full root access
                  </span>
                </div>
                <ArrowRight className="w-5 h-5 flex-shrink-0 text-gray-400 group-hover:text-purple-500 group-hover:translate-x-1 transition-all" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                Peer-to-Peer Neocloud Infrastructure
              </h2>
              <p className="mt-3 text-lg text-gray-500 dark:text-gray-400">
                Built on decentralized sustainable cloud computing principles, CapaCloud removes middlemen and central pricing authorities through blockchain smart contracts.
              </p>
              <div className="mt-10 space-y-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Pay-Per-Use GPU Rental
                  </h3>
                  <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                    Access GPUs on-demand, only when you need them and pay per hour using USDT through automated blockchain payments.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Privacy-First Compute
                  </h3>
                  <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                    No personal data is stored or shared. All data is deleted after you end your rental.{' '}
                    <Link href="/docs/security" className="text-purple-600 dark:text-purple-400 hover:underline">
                      See more.
                    </Link>
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Full System Control
                  </h3>
                  <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                    Get root access to install drivers, frameworks, and tools for AI training, rendering, algo trading or mining workloads.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-10 -mx-4 relative lg:mt-0">
              <div className="relative mx-auto w-full max-w-sm px-4">
                <div className="absolute inset-0 bg-purple-500 rounded-lg shadow-lg transform rotate-3"></div>
                <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
                  <div className="space-y-4">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-4 bg-purple-200 dark:bg-purple-900 rounded w-5/6"></div>
                    <div className="h-32 bg-gray-100 dark:bg-gray-700 rounded mt-4"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400">
              Get started with decentralized GPU compute in minutes
            </p>
          </div>
          <div className="mt-20">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="pt-6 flex">
                <div className="flow-root bg-white dark:bg-gray-900 rounded-lg px-6 pb-8 flex flex-col w-full">
                  <div className="-mt-6 flex flex-col flex-grow">
                    <div className="inline-flex items-center justify-center p-3 bg-purple-500 rounded-md shadow-lg">
                      <Zap className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 dark:text-white tracking-tight">
                      1. Connect Your Wallet
                    </h3>
                    <p className="mt-5 text-base text-gray-500 dark:text-gray-400 flex-grow">
                      Sign in using your Solana wallet (Phantom, Solflare, and others supported). No accounts or personal data required.
                    </p>
                  </div>
                </div>
              </div>
              <div className="pt-6 flex">
                <div className="flow-root bg-white dark:bg-gray-900 rounded-lg px-6 pb-8 flex flex-col w-full">
                  <div className="-mt-6 flex flex-col flex-grow">
                    <div className="inline-flex items-center justify-center p-3 bg-purple-500 rounded-md shadow-lg">
                      <Cpu className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 dark:text-white tracking-tight">
                      2. Rent GPU
                    </h3>
                    <p className="mt-5 text-base text-gray-500 dark:text-gray-400 flex-grow">
                      Browse available peer-to-peer GPUs on the CapaCloud neocloud platform. Find the right pay-per-use GPU rental for your workload.
                    </p>
                  </div>
                </div>
              </div>
              <div className="pt-6 flex">
                <div className="flow-root bg-white dark:bg-gray-900 rounded-lg px-6 pb-8 flex flex-col w-full">
                  <div className="-mt-6 flex flex-col flex-grow">
                    <div className="inline-flex items-center justify-center p-3 bg-purple-500 rounded-md shadow-lg">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 dark:text-white tracking-tight">
                      3. Deploy Instantly
                    </h3>
                    <p className="mt-5 text-base text-gray-500 dark:text-gray-400 flex-grow">
                      Connect securely via SSH and get full root access. Install any drivers, frameworks, or tools you need for AI training, rendering, or simulation.
                    </p>
                  </div>
                </div>
              </div>
              <div className="pt-6 flex">
                <div className="flow-root bg-white dark:bg-gray-900 rounded-lg px-6 pb-8 flex flex-col w-full">
                  <div className="-mt-6 flex flex-col flex-grow">
                    <div className="inline-flex items-center justify-center p-3 bg-purple-500 rounded-md shadow-lg">
                      <Coins className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 dark:text-white tracking-tight">
                      4. Run Your Workload
                    </h3>
                    <p className="mt-5 text-base text-gray-500 dark:text-gray-400 flex-grow">
                      Use decentralized cloud GPU solutions for AI training, 3D rendering, crypto-mining or other compute-intensive tasks.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Powerful Use Cases
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400">
              Unlock high-performance, pay-per-use GPU compute for AI, rendering, and simulation workloads.
            </p>
          </div>
          <div className="mt-20">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {/* AI/ML Training & Inference */}
              <div className="relative bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg mb-6">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  AI/ML Training & Inference
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Train deep learning models, run inference workloads, and experiment with cutting-edge AI frameworks. 
                  Full root access lets you install PyTorch, TensorFlow, or any ML library you need. Perfect for researchers, 
                  data scientists, and AI developers who need powerful GPU resources on demand.
                </p>
                <ul className="mt-6 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-start">
                    <ArrowRight className="h-4 w-4 mr-2 mt-1 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                    <span>Deep learning model training</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-4 w-4 mr-2 mt-1 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                    <span>Real-time inference pipelines</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-4 w-4 mr-2 mt-1 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                    <span>LLM fine-tuning and deployment</span>
                  </li>
                </ul>
              </div>

              {/* Rendering/Simulation/Video Transcoding */}
              <div className="relative bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg mb-6">
                  <Video className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Rendering, Simulation & Algorithmic Trading
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Accelerate 3D rendering, run complex simulations, and transcode video files at scale. 
                  Whether you're creating visual effects, running algorithmic trading, or processing video content, 
                  our GPU infrastructure delivers the performance you need without the upfront hardware investment.
                </p>
                <ul className="mt-6 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-start">
                    <ArrowRight className="h-4 w-4 mr-2 mt-1 text-orange-600 dark:text-orange-400 flex-shrink-0" />
                    <span>3D rendering and animation</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-4 w-4 mr-2 mt-1 text-orange-600 dark:text-orange-400 flex-shrink-0" />
                    <span>Scientific simulations</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-4 w-4 mr-2 mt-1 text-orange-600 dark:text-orange-400 flex-shrink-0" />
                    <span>High-speed video transcoding</span>
                  </li>
                </ul>
              </div>

              {/* Crypto Mining */}
              <div className="relative bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg mb-6">
                  <Pickaxe className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Crypto Mining
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Install and run cryptocurrency miners with full system control. Deploy your preferred mining software, 
                  configure optimization settings, and monitor performance in real-time. With root access, you have complete 
                  flexibility to set up any mining operation exactly as you need it.
                </p>
                <ul className="mt-6 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-start">
                    <ArrowRight className="h-4 w-4 mr-2 mt-1 text-green-600 dark:text-green-400 flex-shrink-0" />
                    <span>Install any mining software</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-4 w-4 mr-2 mt-1 text-green-600 dark:text-green-400 flex-shrink-0" />
                    <span>Full configuration control</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-4 w-4 mr-2 mt-1 text-green-600 dark:text-green-400 flex-shrink-0" />
                    <span>Real-time monitoring and optimization</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Powered by Modern Compute & Web3 */}
      <div className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Powered by Modern Compute & Web3 Infrastructure
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="flex flex-col">
              <div className="inline-flex items-center justify-center p-3 bg-purple-500 rounded-md shadow-lg w-fit mb-6">
                <Cpu className="h-6 w-6 text-white" aria-hidden />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                NVIDIA-Powered Compute
              </h3>
              <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed flex-grow">
                Access high-performance GPUs from leading manufacturers like NVIDIA. Run AI training, rendering, and
                compute-heavy workloads on powerful hardware without owning or maintaining infrastructure.
              </p>
            </div>
            <div className="flex flex-col">
              <div className="inline-flex items-center justify-center p-3 bg-purple-500 rounded-md shadow-lg w-fit mb-6">
                <Network className="h-6 w-6 text-white" aria-hidden />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Built on DePIN
              </h3>
              <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed flex-grow">
                CapaCloud operates as a Decentralized Physical Infrastructure Network (DePIN), connecting distributed GPU
                providers into a unified compute layer without centralized control.
              </p>
            </div>
            <div className="flex flex-col">
              <div className="inline-flex items-center justify-center p-3 bg-purple-500 rounded-md shadow-lg w-fit mb-6">
                <Coins className="h-6 w-6 text-white" aria-hidden />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Smart Contract Payments
              </h3>
              <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed flex-grow">
                All GPU rentals are secured through blockchain-based smart contract systems. Payments are automated,
                transparent, and trustless, eliminating intermediaries and reducing risk.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Climate Friendly */}
      <div className="py-24 bg-green-50 dark:bg-green-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-green-100 dark:bg-green-900/20 rounded-full p-4">
                <Leaf className="w-12 h-12 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl mb-4">
              Climate-Friendly Neocloud Infrastructure
            </h2>
            <p className="text-2xl font-semibold text-green-700 dark:text-green-400 mb-6">
              Planet positive from day one — 99% less carbon footprint per compute
            </p>
            <p className="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-400">
              Traditional cloud GPU providers rely on energy-intensive data centers. CapaCloud uses existing consumer GPUs in a decentralized network, reducing energy use for cooling and infrastructure. This makes CapaCloud a sustainable cloud GPU platform and a carbon-neutral cloud alternative to AWS for AI and compute workloads.
            </p>
            <div className="mt-8">
              <Link
                href="/sustainable-cloud-gpu"
                className="inline-flex items-center text-base font-medium text-green-700 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300"
              >
                Learn More
                <ArrowRight className="ml-1 w-5 h-5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Moonshots CTA */}
      <div className="py-24 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Rocket className="w-12 h-12 text-white mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-4">
            Donate for CapaCloud Moonshots
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            CapaCloud Moonshots are non-profit projects for humanity. Your donation will be used for accessing computational resources (GPUs) for these projects. Donations are always anonymous.
          </p>
          <Link
            href="/donate"
            className="inline-flex items-center px-8 py-3 bg-white text-purple-600 rounded-md hover:bg-gray-100 text-lg font-medium transition-colors"
          >
            <Rocket className="w-5 h-5 mr-2" />
            View Moonshots
          </Link>
        </div>
      </div>

      {/* FAQs */}
      <div className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl text-center mb-12">
            FAQs
          </h2>
          <div className="space-y-4">
            <FAQItem
              question="What is a decentralized GPU platform?"
              answer="A decentralized GPU platform is a peer-to-peer neocloud where GPU owners rent compute directly to users without hyperscale data centers. CapaCloud connects wallets and machines with Solana and USDT, pay-per-use hourly billing, and full root access to rented GPUs."
            />
            <FAQItem
              question="How does CapaCloud differ from AWS or traditional cloud GPU providers?"
              answer="Unlike traditional providers that rely on large data centers, CapaCloud uses a decentralized, peer-to-peer GPU marketplace. This makes it a carbon-neutral cloud alternative to AWS by reducing energy consumption from cooling and infrastructure while offering full system control and blockchain-based payments."
            />
            <FAQItem
              question="Is CapaCloud a sustainable or climate-friendly GPU platform?"
              answer="Yes. CapaCloud is designed as a sustainable cloud GPU platform that leverages existing consumer GPUs instead of energy-intensive data centers. This decentralized approach supports climate-friendly GPU rentals, net-zero GPU infrastructure goals, and energy-efficient cloud computing for AI and high-performance workloads."
            />
            <FAQItem
              question="How do payments work for GPU rentals on CapaCloud?"
              answer="CapaCloud supports GPU rental with Solana wallet payment and USDT transactions. Payments are handled automatically using smart contracts on the blockchain, enabling transparent, trustless, and pay-per-use GPU rentals with no intermediaries or central pricing authority."
            />
            <FAQItem
              question="What can I use decentralized cloud GPUs for?"
              answer="Decentralized cloud GPUs can be used for AI and machine learning training, LLM fine-tuning, 3D rendering, algorithmic trading, scientific simulations, crypto mining and other compute-intensive workloads. CapaCloud also supports GPU compute for rendering and simulation while offering an eco-friendly GPU rental alternative to traditional cloud servers."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
