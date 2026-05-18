import { Keypair } from '@solana/web3.js';
import bs58 from 'bs58';

// Note: bs58 is used for encoding/decoding Solana keys
// If bs58 is not available, we can use Buffer.from() instead

/**
 * Generate a new Solana keypair for fund wallet
 * Returns the public key (address) and encrypted private key
 * In production, the private key should be encrypted before storage
 */
export function generateFundWallet(): { publicKey: string; privateKey: string } {
  const keypair = Keypair.generate();
  const publicKey = keypair.publicKey.toBase58();
  const privateKey = bs58.encode(keypair.secretKey);
  
  return {
    publicKey,
    privateKey, // TODO: Encrypt this before storing in database
  };
}

