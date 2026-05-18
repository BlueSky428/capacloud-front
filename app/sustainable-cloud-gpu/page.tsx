import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Leaf, Zap, Building2, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sustainable Cloud GPU | Carbon Neutral Cloud GPUs | Capa.Cloud',
  description: 'Capa.Cloud offers sustainable cloud GPU and carbon neutral cloud GPUs. A carbon neutral cloud alternative to AWS with net zero GPU infrastructure, eco-friendly cloud GPUs, and an ESG friendly GPU servers approach. Decentralized carbon neutral GPU marketplace.',
  openGraph: {
    title: 'Sustainable Cloud GPU | Carbon Neutral Cloud | Capa.Cloud',
    description: 'Sustainable cloud GPU and carbon neutral cloud GPUs. Net zero GPU infrastructure and eco-friendly cloud GPUs for AI and high-performance workloads.',
  },
};

export default function SustainableCloudGpuPage() {
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
            <span className="text-gray-700 dark:text-gray-300">Sustainable Cloud GPU</span>
          </nav>
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-4">
                <Leaf className="w-12 h-12 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
              <span className="block">Sustainable Cloud GPU</span>
              <span className="block text-green-600 dark:text-green-400">Carbon Neutral Cloud</span>
            </h1>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-500 dark:text-gray-400 sm:text-xl">
              Capa.Cloud delivers a sustainable cloud GPU platform and carbon neutral cloud GPUs—a true carbon neutral cloud alternative to AWS. Net zero GPU infrastructure, eco-friendly cloud GPUs, and an ESG friendly GPU servers approach through a decentralized carbon neutral GPU marketplace.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/user/rent"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 md:py-4 md:px-10 transition-colors"
              >
                Rent a sustainable GPU
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

      {/* How We Reduce Data Center Usage */}
      <div className="py-24 bg-green-50 dark:bg-green-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              How We Reduce Data Center Usage and Carbon Footprint
            </h2>
            <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">
              No mega data centers. No centralized cooling plants.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Traditional cloud runs on energy-intensive data centers with massive cooling. Our sustainable cloud GPU model uses existing consumer and prosumer GPUs in a peer-to-peer network. That&apos;s how we deliver carbon neutral cloud GPUs and move toward net zero GPU infrastructure—making Capa.Cloud an eco-friendly cloud GPUs provider and a carbon neutral cloud alternative to AWS for AI and compute.
            </p>
          </div>
        </div>
      </div>

      {/* Carbon comparison + Who benefits */}
      <div className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white sm:text-3xl">
                Carbon Footprint Comparison
              </h2>
              <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
                Per unit of compute, our decentralized carbon neutral GPU marketplace can achieve roughly 99% less carbon footprint than traditional data center GPU clouds. By leveraging ambient-cooled hardware and avoiding dedicated cooling infrastructure, we offer ESG friendly GPU servers and climate-friendly GPU compute.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white sm:text-3xl mb-6">
                Who Benefits from Sustainable Cloud GPU
              </h2>
              <ul className="space-y-4">
                {[
                  { icon: Building2, title: 'ESG-driven startups', text: 'Report lower Scope 3 and infrastructure-related emissions with our carbon neutral cloud alternative to AWS.' },
                  { icon: Zap, title: 'AI companies', text: 'Run training and inference on eco-friendly cloud GPUs without sacrificing performance.' },
                  { icon: Users, title: 'Climate-conscious devs', text: 'Choose a decentralized carbon neutral GPU marketplace and sustainable cloud GPU for personal and team projects.' },
                ].map(({ icon: Icon, title, text }) => (
                  <li key={title} className="flex gap-4">
                    <div className="flex-shrink-0 inline-flex items-center justify-center p-2 bg-green-500 rounded-md">
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

      {/* Thought leadership block */}
      <div className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Thought Leadership in Net Zero GPU Infrastructure
            </h2>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Capa.Cloud is committed to sustainable cloud GPU offerings and carbon neutral cloud GPUs. We believe the future of cloud is decentralized and climate-aware: net zero GPU infrastructure, eco-friendly cloud GPUs, and ESG friendly GPU servers. Our decentralized carbon neutral GPU marketplace supports backlinks and partnerships with organizations that care about a carbon neutral cloud alternative to AWS and sustainable cloud GPU solutions.
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
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 md:py-4 md:px-10 transition-colors"
            >
              Rent a sustainable GPU
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <p className="mt-8 text-sm text-gray-500 dark:text-gray-400">
              Explore more: <Link href="/decentralized-gpu-platform" className="text-purple-600 dark:text-purple-400 hover:underline">Decentralized GPU platform</Link> · <Link href="/gpu-rentals" className="text-purple-600 dark:text-purple-400 hover:underline">GPU rentals for AI & rendering</Link> · <Link href="/about#sustainability" className="text-purple-600 dark:text-purple-400 hover:underline">Sustainability</Link> · <Link href="/" className="text-purple-600 dark:text-purple-400 hover:underline">Capa.Cloud decentralized GPU platform</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
