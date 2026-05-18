import { ObjectId } from 'mongodb';

export enum RentalStatus {
  ACTIVE = 'active',
  PAUSED = 'paused',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export interface Rental {
  _id?: ObjectId;
  rentalId: string; // Unique rental identifier
  machineId: ObjectId; // Reference to Machine
  renterWalletAddress: string; // Renter's wallet address
  providerAccountId: string; // Provider's account ID
  status: RentalStatus;
  startedAt: Date;
  pausedAt?: Date;
  resumedAt?: Date;
  endedAt?: Date;
  totalCost: number; // Total cost in USDT
  hoursUsed: number; // Total hours used
  ratePerHour: number; // Rate at time of rental
  lastPaymentAt?: Date; // Last time payment was processed (for prepay mode)
  sshHost: string; // SSH connection host
  sshPort: number; // SSH connection port
  sshUser: string; // SSH username
  selectedSshKeyIds?: string[]; // IDs of user's SSH keys selected for this rental
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date; // Soft delete timestamp
}

export interface RentalCreateInput {
  machineId: ObjectId;
  renterWalletAddress: string;
  providerAccountId: string;
  ratePerHour: number;
  sshHost: string;
  sshPort: number;
  sshUser: string;
  selectedSshKeyIds?: string[]; // IDs of user's SSH keys selected for this rental
}

