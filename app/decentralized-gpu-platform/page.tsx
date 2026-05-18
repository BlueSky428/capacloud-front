import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Cpu, Shield, Coins, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Best Decentralized GPU Platform | Decentralized Cloud GPU Solutions | Capa.Cloud',
  description: 'Capa.Cloud is the best decentralized GPU platform and blockchain GPU marketplace. Get decentralized cloud GPU solutions with trustless payments, root access, and peer-to-peer GPU compute. A decentralized sustainable cloud computing alternative to AWS.',
  openGraph: {
    title: 'Best Decentralized GPU Platform | Capa.Cloud',
    description: 'Decentralized cloud GPU solutions and blockchain GPU marketplace. Peer-to-peer GPU compute with trustless payments and full root access.',
  },
};

export default function DecentralizedGpuPlatformPage() {
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
            <span className="text-gray-700 dark:text-gray-300">Decentralized GPU Platform</span>
          </nav>
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center justify-center p-4 bg-purple-500 rounded-xl shadow-lg">
                <Cpu className="h-10 w-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
              <span className="block">Best Decentralized</span>
              <span className="block text-purple-600 dark:text-purple-400">GPU Platform</span>
            </h1>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-500 dark:text-gray-400 sm:text-xl">
              Capa.Cloud is a decentralized cloud GPU solution and blockchain GPU marketplace—a GPU compute marketplace platform built on decentralized sustainable cloud computing. Peer-to-peer, trustless, full root access. No centralized data centers, no lock-in.
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
                href="/"
                className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 md:py-4 md:px-10 transition-colors"
              >
                Capa.Cloud home
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* What Is Decentralized GPU Computing */}
      <div className="py-24 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              What Is Decentralized GPU Computing?
            </h2>
            <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">
              A peer-to-peer neocloud where GPU owners rent compute directly to users
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              A decentralized GPU platform is a peer-to-peer neocloud where GPU owners rent computing power directly to users—no centralized data centers or single vendor. Capa.Cloud operates as a decentralized cloud GPU solution: a true GPU compute marketplace platform that enables pay-per-use GPU rentals through blockchain payments while reducing reliance on traditional cloud infrastructure. You get decentralized sustainable cloud computing with transparent pricing and full control.
            </p>
          </div>
        </div>
      </div>

      {/* How the Neocloud Works + Why Decentralized Beats Centralized */}
      <div className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-start">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                How the Capa.Cloud Neocloud Works
              </h2>
              <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
                Our neocloud connects renters and providers on a blockchain GPU marketplace. Users browse available GPUs, rent by the hour with USDT, and get instant SSH access. Providers earn from idle hardware. Smart contracts handle payments automatically—no intermediaries. That&apos;s why we&apos;re known as one of the best decentralized GPU platform options for developers and teams who want decentralized cloud GPU solutions without vendor lock-in.
              </p>
            </div>
            <div className="mt-12 lg:mt-0">
              <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-6">
                Why Decentralized Beats Centralized Cloud GPUs
              </h2>
              <ul className="space-y-4">
                {[
                  { icon: Shield, title: 'Trustless payments', text: 'Blockchain settles payments automatically; no chargebacks or payment disputes.' },
                  { icon: Cpu, title: 'Root access', text: 'Full system control. Install any drivers, frameworks, or tools—unlike restricted managed clouds.' },
                  { icon: Zap, title: 'Peer-to-peer model', text: 'No single point of failure. Our GPU compute marketplace platform is distributed by design.' },
                  { icon: Coins, title: 'No central pricing authority', text: 'Market-driven rates and transparent costs on our blockchain GPU marketplace.' },
                ].map(({ icon: Icon, title, text }) => (
                  <li key={title} className="flex gap-4">
                    <div className="flex-shrink-0 inline-flex items-center justify-center p-2 bg-purple-500 rounded-md">
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-gray-900 dark:text-white">{title}</h3>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Capa.Cloud vs AWS */}
      <div className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Capa.Cloud vs. AWS and Traditional Cloud
            </h2>
          </div>
          <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Traditional clouds lock you into their stack and regions. Capa.Cloud gives you a decentralized cloud GPU solution: pay-per-use GPU rental, full root access, and blockchain-based payments. As a decentralized sustainable cloud computing platform, we also reduce environmental impact compared to large data centers. For teams looking for the best decentralized GPU platform with a real blockchain GPU marketplace and GPU compute marketplace platform benefits, Capa.Cloud is built for you.
            </p>
          </div>
        </div>
      </div>

      {/* CTA + Explore more */}
      <div className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Link
              href="/user/rent"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 md:py-4 md:px-10 transition-colors"
            >
              Rent a GPU
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <p className="mt-8 text-sm text-gray-500 dark:text-gray-400">
              Explore more: <Link href="/sustainable-cloud-gpu" className="text-purple-600 dark:text-purple-400 hover:underline">Sustainable cloud GPU</Link> · <Link href="/gpu-rentals" className="text-purple-600 dark:text-purple-400 hover:underline">GPU rentals for AI & rendering</Link> · <Link href="/" className="text-purple-600 dark:text-purple-400 hover:underline">Capa.Cloud decentralized GPU platform</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
