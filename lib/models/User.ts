import { ObjectId } from 'mongodb';

export interface UserSSHKey {
  id: string; // Unique identifier for the key
  name: string; // User-friendly name for the key
  publicKey: string; // SSH public key
  createdAt: Date;
}

export interface User {
  _id?: ObjectId;
  walletAddress: string; // Primary key - Solana wallet address
  accountId: string; // Unique account identifier for machine ownership
  fundWalletAddress: string; // Platform-created Solana wallet for account balance
  fundWalletPrivateKey: string; // Encrypted private key for fund wallet
  accountBalance: number; // Account balance in USDT
  contactEmail?: string; // Optional contact email
  contactDiscord?: string; // Optional Discord handle
  contactTelegram?: string; // Optional Telegram handle
  sshKeys?: UserSSHKey[]; // User's SSH public keys
  createdAt: Date;
  updatedAt: Date;
}

export interface UserCreateInput {
  walletAddress: string;
  accountId?: string; // Auto-generated if not provided
  fundWalletAddress: string;
  fundWalletPrivateKey: string;
}

export interface UserUpdateInput {
  contactEmail?: string;
  contactDiscord?: string;
  contactTelegram?: string;
  sshKeys?: UserSSHKey[];
}

