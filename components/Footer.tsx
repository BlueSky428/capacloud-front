import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex flex-col items-start mb-4">
              <Image
                src="/logo.jpg"
                alt="CapaCloud Logo"
                width={40}
                height={40}
                className="h-10 w-auto mb-2"
              />
              <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 tracking-wider uppercase">
                CAPACLOUD CORP
              </h3>
            </Link>
            <p className="text-base text-gray-500 dark:text-gray-400">
              1309 Coffeen Avenue STE 1200 Sheridan Wyoming 82801
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 tracking-wider uppercase">
              Resources
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/decentralized-gpu-platform" className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
                  Decentralized GPU platform
                </Link>
              </li>
              <li>
                <Link href="/sustainable-cloud-gpu" className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
                  Sustainable cloud GPU
                </Link>
              </li>
              <li>
                <Link href="/gpu-rentals" className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
                  GPU rentals
                </Link>
              </li>
              <li>
                <Link href="/docs" className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
                  About
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
                  Help & Support
                </Link>
              </li>
              <li>
                <Link href="/donate" className="text-base text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 font-medium">
                  Moonshots
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 tracking-wider uppercase">
              For Users
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/user/rent" className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
                  Browse GPUs
                </Link>
              </li>
              <li>
                <Link href="/user/rentals/list" className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
                  My Rentals
                </Link>
              </li>
              <li>
                <Link href="/user/escrow" className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
                  Escrow
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 tracking-wider uppercase">
              For Providers
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/provider/onboarding" className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
                  Get Started
                </Link>
              </li>
              <li>
                <Link href="/provider/gpus/register" className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
                  Register GPU
                </Link>
              </li>
              <li>
                <Link href="/provider/earnings" className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
                  Earnings
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
          <p className="text-base text-gray-400 text-center">
            By the people. For the people.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <Link
              href="/terms"
              className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            >
              Terms of Use
            </Link>
            <Link
              href="/privacy"
              className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

