/**
 * Solana network configuration
 * Reads from environment variable with mainnet as default
 */
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';

export function getSolanaNetwork(): WalletAdapterNetwork {
  const networkEnv = process.env.NEXT_PUBLIC_SOLANA_NETWORK?.toLowerCase();
  
  switch (networkEnv) {
    case 'devnet':
      return WalletAdapterNetwork.Devnet;
    case 'testnet':
      return WalletAdapterNetwork.Testnet;
    case 'mainnet':
    case 'mainnet-beta':
      return WalletAdapterNetwork.Mainnet;
    default:
      // Default to mainnet
      return WalletAdapterNetwork.Mainnet;
  }
}

export function getSolanaCluster(): string {
  const networkEnv = process.env.NEXT_PUBLIC_SOLANA_NETWORK?.toLowerCase();
  
  switch (networkEnv) {
    case 'devnet':
      return 'devnet';
    case 'testnet':
      return 'testnet';
    case 'mainnet':
    case 'mainnet-beta':
    default:
      return 'mainnet';
  }
}

export function getSolanaRpcEndpoint(): string | undefined {
  return process.env.NEXT_PUBLIC_SOLANA_RPC_ENDPOINT;
}

