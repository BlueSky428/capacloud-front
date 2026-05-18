import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Cpu, Brain, Video, Zap, Wallet, List, Terminal, Play } from 'lucide-react';

export const metadata: Metadata = {
  title: 'GPU Rentals for AI, Rendering & Simulation | Pay-Per-Use GPU Rental | Capa.Cloud',
  description: 'Peer-to-peer GPU rentals and pay-per-use GPU rental. Climate friendly GPU compute for AI, green GPU for AI workloads, GPU for rendering & simulation, and eco-friendly GPU rental. Rent GPUs on Capa.Cloud.',
  openGraph: {
    title: 'GPU Rentals for AI, Rendering & Simulation | Capa.Cloud',
    description: 'Pay-per-use GPU rental for AI, rendering, and simulation. Climate friendly GPU compute and eco-friendly GPU rental.',
  },
};

export default function GpuRentalsPage() {
  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <nav className="text-sm text-gray-500 dark:text-gray-400 mb-8">
            <Link href="/" className="hover:text-purple-600 dark:hover:text-purple-400">
              Capa.Cloud
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-700 dark:text-gray-300">GPU Rentals</span>
          </nav>
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center justify-center p-4 bg-purple-500 rounded-xl shadow-lg">
                <Cpu className="h-10 w-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
              <span className="block">GPU Rentals for</span>
              <span className="block text-purple-600 dark:text-purple-400">AI, Rendering & Simulation</span>
            </h1>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-500 dark:text-gray-400 sm:text-xl">
              Peer-to-peer GPU rentals and pay-per-use GPU rental. Climate friendly GPU compute for AI, green GPU for AI workloads, and GPU for rendering & simulation. Full root access, hourly billing, eco-friendly GPU rental.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/user/rent"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 md:py-4 md:px-10 transition-colors"
              >
                Rent a GPU
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/user/rent"
                className="inline-flex items-center justify-center px-8 py-3 border border-purple-600 dark:border-purple-400 text-base font-medium rounded-md text-purple-600 dark:text-purple-400 bg-white dark:bg-gray-800 hover:bg-purple-50 dark:hover:bg-gray-700 md:py-4 md:px-10 transition-colors"
              >
                Start Computing
                <Play className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Why Rent GPUs - 4-card grid like How it works */}
      <div className="py-24 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Why Rent GPUs on Capa.Cloud?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400">
              Performance, pricing, and full control
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Cpu, title: 'Performance', text: 'Real consumer and prosumer GPUs, full root access. Run any stack—PyTorch, TensorFlow, CUDA, custom drivers. No artificial limits.' },
              { icon: Zap, title: 'Pay-per-use', text: 'Hourly billing in USDT. No long-term contracts. Stop anytime—billing stops. Peer-to-peer GPU rentals with transparent rates.' },
              { icon: Terminal, title: 'Full root access', text: 'SSH in, install any drivers and frameworks. Same control as your own machine, without the hardware cost.' },
              { icon: Brain, title: 'AI & rendering ready', text: 'Climate friendly GPU compute for AI, GPU for rendering & simulation. Eco-friendly GPU rental for any workload.' },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="pt-6 flex">
                <div className="flow-root bg-white dark:bg-gray-900 rounded-lg px-6 pb-8 flex flex-col w-full shadow">
                  <div className="-mt-6 flex flex-col flex-grow">
                    <div className="inline-flex items-center justify-center p-3 bg-purple-500 rounded-md shadow-lg">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 dark:text-white tracking-tight">
                      {title}
                    </h3>
                    <p className="mt-5 text-base text-gray-500 dark:text-gray-400 flex-grow">
                      {text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Workloads - gradient cards like Use Cases on home */}
      <div className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Workloads: AI, Rendering & Simulation
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400">
              Use decentralized cloud GPUs for any compute-intensive task
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="relative bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg mb-6">
                <Brain className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Climate friendly GPU compute for AI
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Train models, run inference, fine-tune LLMs. Green GPU for AI workloads without the carbon cost of big data centers.
              </p>
            </div>
            <div className="relative bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg mb-6">
                <Video className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                GPU for rendering & simulation
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                3D rendering, VFX, scientific simulation, video encoding. Full control, eco-friendly GPU rental.
              </p>
            </div>
            <div className="relative bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg mb-6">
                <Cpu className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Other compute-intensive workloads
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Research, crypto mining, algo trading, custom pipelines. All with pay-per-use GPU rental and peer-to-peer GPU rentals.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How to Start - 5 steps like How it works */}
      <div className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              How to Start: Simple Setup
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400">
              Get running in minutes
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { icon: Wallet, step: '1', title: 'Connect wallet', text: 'Connect your Solana wallet. No account signup.' },
              { icon: Zap, step: '2', title: 'Add balance', text: 'Add USDT to your balance for pay-per-use GPU rental.' },
              { icon: List, step: '3', title: 'Browse GPUs', text: 'Pick the right GPU for your workload.' },
              { icon: Terminal, step: '4', title: 'Rent & SSH', text: 'Rent and get SSH access within minutes—full root.' },
              { icon: Play, step: '5', title: 'Run your job', text: 'Billing is hourly; stop when done.' },
            ].map(({ icon: Icon, step, title, text }) => (
              <div key={step} className="pt-6 flex">
                <div className="flow-root bg-white dark:bg-gray-900 rounded-lg px-6 pb-8 flex flex-col w-full shadow">
                  <div className="-mt-6 flex flex-col flex-grow">
                    <div className="inline-flex items-center justify-center p-3 bg-purple-500 rounded-md shadow-lg">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 dark:text-white tracking-tight">
                      {step}. {title}
                    </h3>
                    <p className="mt-5 text-base text-gray-500 dark:text-gray-400 flex-grow">
                      {text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA strip - like Moonshots style */}
      <div className="py-24 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to use decentralized cloud GPUs?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join the best decentralized GPU platform for peer-to-peer GPU rentals and pay-per-use GPU rental.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/user/rent"
              className="inline-flex items-center px-8 py-3 bg-white text-purple-600 rounded-md hover:bg-gray-100 text-lg font-medium transition-colors"
            >
              Rent a GPU
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/user/rent"
              className="inline-flex items-center px-8 py-3 border-2 border-white text-white rounded-md hover:bg-white/10 text-lg font-medium transition-colors"
            >
              Start Computing
              <Play className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Explore more */}
      <div className="py-12 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Explore more: <Link href="/decentralized-gpu-platform" className="text-purple-600 dark:text-purple-400 hover:underline">Decentralized GPU platform</Link> · <Link href="/sustainable-cloud-gpu" className="text-purple-600 dark:text-purple-400 hover:underline">Sustainable cloud GPU</Link> · <Link href="/" className="text-purple-600 dark:text-purple-400 hover:underline">Capa.Cloud decentralized GPU platform</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
