'use client';

import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    question: 'How does GPU rental work?',
    answer:
      'Browse available GPUs on the platform, select one that fits your needs, and rent it. You\'ll receive root access credentials immediately. Connect via SSH and use the GPU with full control. Billing is automatic and hourly.',
  },
  {
    question: 'How does payment work?',
    answer:
      'Pay with USDT. Users deposit USDT into an escrow account. When you rent a GPU, funds are automatically deducted hourly from your escrow balance. You can stop the rental anytime and billing stops immediately. All payments are handled by on-chain smart contracts.',
  },
  {
    question: 'What are the security measures?',
    answer:
      'All communication is secured with TLS. Root access uses secure key-based authentication. Each rental gets an isolated user account. Payments are handled by on-chain smart contracts, ensuring trustless transactions. GPU workers are authenticated and monitored.',
  },
  {
    question: 'How do I become a GPU provider?',
    answer:
      'Install the worker daemon on your GPU machine, register your GPU on the blockchain, and set your hourly price. When users rent your GPU, you\'ll earn USDT automatically. Earnings are distributed to your wallet in real-time.',
  },
  {
    question: 'What GPU types are supported?',
    answer:
      'We support NVIDIA GPUs with CUDA support. Common models include RTX 3090, RTX 4090, A100, V100, and more. The worker daemon will detect your GPU capabilities automatically.',
  },
  {
    question: 'How is pricing determined?',
    answer:
      'GPU providers set their own prices per GPU-hour. Users can browse and compare prices before renting. The platform shows all available GPUs with their specs and pricing. You pay only for the hours you use.',
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg">
      <button
        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium text-gray-900 dark:text-white">{question}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>
      {isOpen && (
        <div className="px-6 pb-4 text-gray-600 dark:text-gray-400">{answer}</div>
      )}
    </div>
  );
}

export default function HelpPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Help & Support</h1>
        <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
          Find answers to common questions
        </p>
      </div>

      {/* FAQs */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>

      {/* Contact */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Need More Help?</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          If you can't find the answer you're looking for, we're here to help.
        </p>
        <div className="space-y-2">
          <p className="text-gray-600 dark:text-gray-400">
            <strong>Documentation:</strong>{' '}
            <a href="/docs" className="text-purple-600 dark:text-purple-400 hover:underline">
              View full documentation
            </a>
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            <strong>Email:</strong> ceo@capa.cloud or cto@capa.cloud
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            <strong>Discord:</strong>{' '}
            <a
              href="https://discord.gg/6rtPZy5Z"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 dark:text-purple-400 hover:underline"
            >
              Join our community
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

