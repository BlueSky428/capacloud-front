import { ObjectId } from 'mongodb';

export enum TransactionType {
  TOP_UP = 'top_up', // User adds funds to account
  CLAIM = 'claim', // User withdraws funds to wallet
  RENTAL_PAYMENT = 'rental_payment', // Payment for rental
  RENTAL_EARNING = 'rental_earning', // Provider earns from rental
}

export enum TransactionStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

export interface Transaction {
  _id?: ObjectId;
  transactionId: string; // Unique transaction identifier
  walletAddress: string; // User's wallet address
  type: TransactionType;
  status: TransactionStatus;
  amount: number; // Amount in USDT
  description?: string;
  relatedRentalId?: ObjectId; // If related to a rental
  solanaTxSignature?: string; // Solana transaction signature (when blockchain integrated)
  createdAt: Date;
  completedAt?: Date;
}

export interface TransactionCreateInput {
  walletAddress: string;
  type: TransactionType;
  amount: number;
  description?: string;
  relatedRentalId?: ObjectId;
  rentalId?: string; // Rental ID string for easier lookup
}

