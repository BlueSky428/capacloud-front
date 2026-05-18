import { useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

export function useAutoLogin() {
  const { connected, publicKey } = useWallet();

  useEffect(() => {
    if (connected && publicKey) {
      // Auto-login/register when wallet connects
      fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          walletAddress: publicKey.toString(),
        }),
      }).catch((error) => {
        console.error('Auto-login error:', error);
      });
    }
  }, [connected, publicKey]);
}

