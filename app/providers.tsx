'use client';

import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import { useMemo, useEffect, useState, ReactNode } from 'react';
import { getSolanaNetwork, getSolanaRpcEndpoint } from '@/lib/solana-config';

export function Providers({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const network = getSolanaNetwork();
  const endpoint = useMemo(() => {
    // Use custom RPC endpoint if provided, otherwise use cluster API URL
    const customRpc = getSolanaRpcEndpoint();
    return customRpc || clusterApiUrl(network);
  }, [network]);
  
  const wallets = useMemo(
    () => {
      try {
        const walletAdapters = [
          new PhantomWalletAdapter(),
          new SolflareWalletAdapter(),
        ];
        
        // Ensure unique wallets by filtering duplicates based on name
        // This prevents duplicate keys in WalletModalProvider
        const seen = new Set<string>();
        const uniqueWallets = walletAdapters.filter((wallet) => {
          const name = wallet.name || wallet.constructor.name;
          if (seen.has(name)) {
            console.warn(`Duplicate wallet detected: ${name}`);
            return false;
          }
          seen.add(name);
          return true;
        });
        
        return uniqueWallets;
      } catch (error) {
        console.error('Error initializing wallets:', error);
        return [];
      }
    },
    []
  );

  // Always render providers to ensure context is available
  // Only enable autoConnect after mounting to avoid SSR issues
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect={mounted}>
        <WalletModalProvider>
          {children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

