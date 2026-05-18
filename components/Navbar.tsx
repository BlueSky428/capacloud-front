'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useWallet } from '@solana/wallet-adapter-react';
import { Search, Cpu, Wallet, Settings, Rocket, FileText, Menu, X, Moon, Sun } from 'lucide-react';
import clsx from 'clsx';
import WalletMultiButton from './WalletButton';

export default function Navbar() {
  const pathname = usePathname();
  const { connected, publicKey } = useWallet();
  const [balance, setBalance] = useState<number | null>(null);
  const [loadingBalance, setLoadingBalance] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Initialize dark mode - default to light mode
  useEffect(() => {
    // Check localStorage for saved preference
    const stored = localStorage.getItem('darkMode');
    if (stored !== null) {
      const isDark = stored === 'true';
      setDarkMode(isDark);
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else {
      // Default to light mode (false)
      setDarkMode(false);
      localStorage.setItem('darkMode', 'false');
      document.documentElement.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    if (connected && publicKey) {
      loadBalance();
      
      // Poll balance every 1 minute
      const interval = setInterval(() => {
        loadBalance();
      }, 60000); // 60 seconds = 1 minute
      
      // Listen for immediate balance updates (from top-up/claim)
      const handleBalanceUpdate = () => {
        loadBalance();
      };
      
      window.addEventListener('balanceUpdated', handleBalanceUpdate);
      
      return () => {
        clearInterval(interval);
        window.removeEventListener('balanceUpdated', handleBalanceUpdate);
      };
    } else {
      setBalance(null);
    }
  }, [connected, publicKey]);

  const loadBalance = async () => {
    try {
      setLoadingBalance(true);
      const response = await fetch(`/api/account/balance?walletAddress=${publicKey?.toString()}`);
      const data = await response.json();
      if (data.success) {
        setBalance(data.balance || 0);
      }
    } catch (error) {
      console.error('Error loading balance:', error);
    } finally {
      setLoadingBalance(false);
    }
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', String(newDarkMode));
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const navItems = [
    { href: '/user/rent', label: 'Browse GPUs', icon: Search },
    { href: '/provider/gpus/list', label: 'Provider', icon: Cpu },
    { href: '/docs', label: 'Docs', icon: FileText },
    { href: '/donate', label: 'Moonshots', icon: Rocket },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center" onClick={() => setMobileMenuOpen(false)}>
                <Image
                  src="/logo.jpg"
                  alt="CapaCloud Logo"
                  width={32}
                  height={32}
                  className="h-8 w-auto"
                  priority
                />
              </Link>
            </div>
            {/* Desktop Navigation - Icons only below xl, icons + text at xl+ */}
            <div className="hidden sm:ml-4 md:ml-6 sm:flex sm:space-x-2 md:space-x-4 xl:space-x-6">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={clsx(
                      'inline-flex items-center justify-center px-2 md:px-3 xl:px-1 pt-1 border-b-2 text-sm font-medium transition-colors',
                      isActive
                        ? 'border-purple-500 text-gray-900 dark:text-gray-100'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    )}
                    title={item.label}
                  >
                    <Icon className="w-5 h-5 xl:w-4 xl:h-4 xl:mr-2" />
                    <span className="hidden xl:inline">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
          
          {/* Right side - Desktop - Icons only below xl, icons + text at xl+ */}
          <div className="hidden sm:flex items-center space-x-1 md:space-x-2 xl:space-x-4">
            <button
              onClick={toggleDarkMode}
              className="inline-flex items-center justify-center px-2 xl:px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? (
                <Sun className="w-5 h-5 xl:w-4 xl:h-4" />
              ) : (
                <Moon className="w-5 h-5 xl:w-4 xl:h-4" />
              )}
            </button>
            {connected && (
              <>
                <Link
                  href="/user/escrow"
                  className="inline-flex items-center justify-center px-2 xl:px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  title="Account Balance"
                >
                  <Wallet className="w-5 h-5 xl:w-4 xl:h-4 xl:mr-2" />
                  <span className="hidden xl:inline">
                    {loadingBalance ? (
                      <span className="animate-pulse">...</span>
                    ) : (
                      <span>{balance !== null ? balance.toFixed(4) : '0.0000'}</span>
                    )}
                  </span>
                </Link>
                <Link
                  href="/dashboard"
                  className={clsx(
                    'inline-flex items-center justify-center px-2 xl:px-3 py-2 rounded-md text-sm font-medium',
                    pathname === '/dashboard'
                      ? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                  )}
                  title="Dashboard"
                >
                  <Cpu className="w-5 h-5 xl:w-4 xl:h-4 xl:mr-2" />
                  <span className="hidden xl:inline">Dashboard</span>
                </Link>
                <Link
                  href="/user/settings"
                  className={clsx(
                    'inline-flex items-center justify-center px-2 xl:px-3 py-2 rounded-md text-sm font-medium',
                    pathname === '/user/settings'
                      ? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                  )}
                  title="Account Settings & SSH Keys"
                >
                  <Settings className="w-5 h-5 xl:w-4 xl:h-4 xl:mr-2" />
                  <span className="hidden xl:inline">Settings</span>
                </Link>
              </>
            )}
            <div className="ml-1 xl:ml-2">
              <WalletMultiButton />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden space-x-1">
            <button
              onClick={toggleDarkMode}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            {connected && (
              <>
                <Link
                  href="/user/escrow"
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  title="Balance"
                >
                  <Wallet className="w-5 h-5" />
                </Link>
                <Link
                  href="/user/settings"
                  className={clsx(
                    'inline-flex items-center justify-center p-2 rounded-md',
                    pathname === '/user/settings'
                      ? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                  )}
                  title="Settings"
                >
                  <Settings className="w-5 h-5" />
                </Link>
              </>
            )}
            <div className="ml-1">
              <WalletMultiButton />
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
              aria-expanded="false"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-gray-200 dark:border-gray-800">
          <div className="pt-2 pb-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={clsx(
                    'flex items-center px-4 py-2 text-base font-medium',
                    isActive
                      ? 'bg-purple-50 border-purple-500 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300 border-l-4'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300'
                  )}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.label}
                </Link>
              );
            })}
            {connected && (
              <>
                <div className="border-t border-gray-200 dark:border-gray-800 mt-2 pt-2">
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className={clsx(
                      'flex items-center px-4 py-2 text-base font-medium',
                      pathname === '/dashboard'
                        ? 'bg-purple-50 border-purple-500 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300 border-l-4'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300'
                    )}
                  >
                    <Cpu className="w-5 h-5 mr-3" />
                    Dashboard
                  </Link>
                  <Link
                    href="/user/escrow"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center px-4 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                  >
                    <Wallet className="w-5 h-5 mr-3" />
                    Balance: {loadingBalance ? (
                      <span className="animate-pulse">...</span>
                    ) : (
                      <span>{balance !== null ? balance.toFixed(4) : '0.0000'}</span>
                    )}
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

