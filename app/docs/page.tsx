import Link from 'next/link';
import { FileText, Code, Book, Settings } from 'lucide-react';

const docSections = [
  {
    title: 'Getting Started',
    icon: Book,
    links: [
      { href: '/docs/getting-started', label: 'Introduction' },
      { href: '/docs/quick-start', label: 'Quick Start Guide' },
      { href: '/docs/wallet-setup', label: 'Wallet Setup' },
    ],
  },
  {
    title: 'For Users',
    icon: Code,
    links: [
      { href: '/docs/renting-gpus', label: 'Renting GPUs' },
      { href: '/docs/ssh-connection', label: 'SSH Connection Guide' },
      { href: '/docs/escrow', label: 'Escrow & Billing' },
      { href: '/docs/api', label: 'API Reference' },
    ],
  },
  {
    title: 'For Providers',
    icon: Settings,
    links: [
      { href: '/docs/provider-setup', label: 'Provider Setup' },
      { href: '/docs/worker-installation', label: 'Worker Installation' },
      { href: '/docs/gpu-registration', label: 'GPU Registration' },
      { href: '/docs/pricing', label: 'Pricing Guide' },
    ],
  },
  {
    title: 'Technical',
    icon: FileText,
    links: [
      { href: '/docs/architecture', label: 'Architecture' },
      { href: '/docs/smart-contracts', label: 'Smart Contracts' },
      { href: '/docs/security', label: 'Security' },
      { href: '/docs/troubleshooting', label: 'Troubleshooting' },
    ],
  },
];

export default function DocsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Documentation</h1>
        <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
          Complete guide to using CapaCloud
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {docSections.map((section) => {
          const Icon = section.icon;
          return (
            <div
              key={section.title}
              className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-4">
                <Icon className="w-6 h-6 text-purple-600 dark:text-purple-400 mr-3" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {section.title}
                </h2>
              </div>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <div className="mt-12 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-200 mb-2">
          Need Help?
        </h3>
        <p className="text-purple-800 dark:text-purple-300">
          Can't find what you're looking for? Check out our{' '}
          <Link href="/help" className="underline">
            Help & Support
          </Link>{' '}
          page for FAQs and contact information.
        </p>
      </div>
    </div>
  );
}

