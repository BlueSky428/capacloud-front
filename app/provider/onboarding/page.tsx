import Link from 'next/link';
import { Check, Cpu, Download, Settings, DollarSign, ArrowRight } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: 'Install Worker Software',
    description: 'Download and install the CapaCloud worker software on your GPU machine.',
    icon: Download,
    details: [
      'Compatible with Linux and Windows',
      'Requires CUDA drivers',
      'Minimal system requirements',
    ],
  },
  {
    id: 2,
    title: 'Register GPU on Blockchain',
    description: 'Register your GPU on the Solana blockchain with your wallet.',
    icon: Cpu,
    details: [
      'Connect your Solana wallet',
      'Set your GPU specifications',
      'Choose your pricing',
    ],
  },
  {
    id: 3,
    title: 'Start Worker',
    description: 'Run the worker software and connect to the network.',
    icon: Settings,
    details: [
      'Worker connects to backend',
      'Automatic rental management',
      'Real-time monitoring',
    ],
  },
  {
    id: 4,
    title: 'Earn USDT',
    description: 'Get paid automatically for every hour your GPU is rented.',
    icon: DollarSign,
    details: [
      'Automatic payment distribution',
      'Track earnings in dashboard',
      'Withdraw anytime',
    ],
  },
];

const requirements = [
  { item: 'NVIDIA GPU with CUDA support', checked: true },
  { item: 'CUDA drivers installed', checked: true },
  { item: 'Stable internet connection', checked: true },
  { item: 'Solana wallet (Phantom, Solflare, etc.)', checked: true },
  { item: 'Minimum 4GB GPU memory', checked: false },
];

export default function OnboardingPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Become a GPU Provider
        </h1>
        <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
          Earn USDT by sharing your GPU resources with the network
        </p>
      </div>

      {/* Steps */}
      <div className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.id} className="relative">
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-purple-200 dark:bg-purple-800 -z-10" />
                )}
                <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 h-full">
                  <div className="flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg mb-4">
                    <Icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Step {step.id}
                  </h3>
                  <h4 className="text-md font-medium text-gray-900 dark:text-white mb-2">
                    {step.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {step.description}
                  </p>
                  <ul className="space-y-2">
                    {step.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start text-sm text-gray-500 dark:text-gray-400">
                        <Check className="w-4 h-4 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Requirements */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          System Requirements
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {requirements.map((req, index) => (
            <div key={index} className="flex items-center">
              {req.checked ? (
                <Check className="w-5 h-5 text-green-500 mr-3" />
              ) : (
                <div className="w-5 h-5 border-2 border-gray-300 dark:border-gray-600 rounded mr-3" />
              )}
              <span className="text-gray-700 dark:text-gray-300">{req.item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <Link
          href="/provider/gpus/register"
          className="inline-flex items-center px-8 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 text-lg font-medium"
        >
          Get Started
          <ArrowRight className="ml-2 w-5 h-5" />
        </Link>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          <Link href="/docs" className="text-purple-600 dark:text-purple-400 hover:underline">
            View documentation
          </Link>{' '}
          for detailed setup instructions
        </p>
      </div>
    </div>
  );
}

