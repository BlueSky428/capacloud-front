import type { Metadata } from 'next';
import { Zap, Shield, Coins, Users, Leaf, Cpu, Palette, FlaskConical } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Capa.Cloud | Decentralized Neocloud GPU Platform',
  description:
    'Learn about Capa.Cloud, a decentralized GPU computing platform and peer-to-peer neocloud offering pay-per-use, sustainable, carbon-neutral cloud GPU solutions.',
};

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          About CapaCloud - A Decentralized Neocloud GPU Platform
        </h1>
        <p className="mt-4 text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto">
          CapaCloud is a decentralized GPU computing platform and peer-to-peer neocloud designed to
          make high-performance GPU compute accessible, sustainable, and pay-per-use. By connecting
          GPU owners and users directly, CapaCloud enables decentralized cloud GPU solutions without
          centralized data centers, offering a carbon-neutral cloud alternative to AWS for AI,
          rendering, and compute workloads.
        </p>
      </div>

      {/* Mission */}
      <div className="mb-12">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
            CapaCloud democratizes access to GPU computing power by creating a decentralized
            marketplace where anyone can rent out their GPUs or access powerful computing resources
            on demand.
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Built on Solana blockchain, we ensure transparent, automated payments and trustless
            interactions between GPU providers and users.
          </p>
        </div>
      </div>

      {/* How We're Different */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          How We're Different
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Zap className="w-8 h-8 text-purple-600 dark:text-purple-400 mr-3" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Decentralized Neocloud Infrastructure
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              A decentralized neocloud, with GPUs distributed across a peer-to-peer network. This
              removes single points of failure and enables resilient, scalable decentralized cloud
              GPU solutions.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Shield className="w-8 h-8 text-purple-600 dark:text-purple-400 mr-3" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Trustless Blockchain Payments
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Solana-based smart contracts automatically manage usage and payments, enabling a
              transparent blockchain GPU marketplace with USDT transactions, no intermediaries, and
              trustless, verifiable settlement globally secure.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Coins className="w-8 h-8 text-purple-600 dark:text-purple-400 mr-3" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Pay-Per-Use GPU Rental with USDT
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Access pay-per-use GPU rentals where users pay only for consumed compute, while
              providers earn USDT automatically through secure, trustless, blockchain-enforced
              usage-based transactions without manual billing.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Users className="w-8 h-8 text-purple-600 dark:text-purple-400 mr-3" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Open, Community-Driven Platform
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Anyone can join as a GPU provider or user, forming an open, community-driven,
              peer-to-peer neocloud ecosystem that expands decentralized GPU supply and global
              compute access.
            </p>
          </div>
        </div>
      </div>

      {/* Sustainable & Climate-Friendly GPU Computing */}
      <div id="sustainability" className="mb-12 scroll-mt-24">
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 shadow rounded-lg p-8">
          <div className="flex items-center gap-3 mb-4">
            <Leaf className="w-8 h-8 text-green-600 dark:text-green-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Sustainable & Climate-Friendly GPU Computing
            </h2>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            CapaCloud is a climate-friendly neocloud designed to reduce the environmental impact of
            GPU computing. By using existing consumer GPUs distributed across a decentralized
            network, CapaCloud can deliver up to 99% less carbon footprint per compute compared to
            traditional, energy-intensive data center clouds. This approach supports energy-efficient
            cloud GPUs, net-zero GPU infrastructure goals, and positions CapaCloud as a carbon-neutral
            cloud alternative to AWS for AI and high-performance compute workloads.
          </p>
        </div>
      </div>

      {/* Who We Serve */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Who We Serve
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Cpu className="w-8 h-8 text-purple-600 dark:text-purple-400 mr-3" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Developers & AI Teams
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              CapaCloud supports developers and AI teams who need flexible, pay-per-use GPU rentals
              for model training, inference, and experimentation. Run climate-friendly GPU compute
              for AI with full system control and decentralized cloud GPU solutions.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Palette className="w-8 h-8 text-purple-600 dark:text-purple-400 mr-3" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Studios & Compute-Intensive Workloads
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Creative studios and technical teams use CapaCloud for GPU-intensive tasks such as 3D
              rendering, simulation, video processing, and high-performance workloads, without
              investing in costly, energy-heavy infrastructure.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <div className="flex items-center mb-4">
              <FlaskConical className="w-8 h-8 text-purple-600 dark:text-purple-400 mr-3" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Researchers & Decentralized Cloud Builders
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Researchers, startups, and infrastructure innovators use CapaCloud to explore
              peer-to-peer neocloud computing, sustainable cloud GPU models, and decentralized
              alternatives to traditional data-center-based cloud platforms.
            </p>
          </div>
        </div>
      </div>

      {/* Technology Stack */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Technology Stack
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          CapaCloud is built on modern blockchain and distributed computing technologies designed
          for performance, transparency, and scalability.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Blockchain</h3>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
              <li>Solana - High-performance blockchain</li>
              <li>Smart Contracts - Automated payments</li>
              <li>USDT - Platform currency</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Infrastructure</h3>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
              <li>Distributed GPU Workers</li>
              <li>Load Balancing & Scheduling</li>
              <li>Real-time Monitoring</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

