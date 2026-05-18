import { ObjectId } from 'mongodb';

export enum MachineStatus {
  PENDING = 'pending', // Waiting for registration completion
  ACTIVE = 'active', // Available for rent
  RENTED = 'rented', // Currently rented
  OFFLINE = 'offline', // Worker not responding
  MAINTENANCE = 'maintenance', // Under maintenance
}

export interface Machine {
  _id?: ObjectId;
  accountId: string; // Provider's account ID (owner)
  workerId: string; // Unique identifier from GPU worker
  gpuType: string; // e.g., "RTX 4090", "A100"
  gpuMemory: number; // Memory in GB
  cudaCores?: number;
  cpuCores: number;
  ramSize: number; // RAM in GB
  diskSize: number; // Disk space in GB
  sshPort: number; // SSH port for connection
  sshPublicKey?: string; // SSH public key (deprecated - no longer used)
  sshPrivateKey?: string; // SSH private key (deprecated - no longer used)
  ratePerHour: number; // Rental rate in USDT
  status: MachineStatus;
  hostname?: string; // Machine hostname/IP
  location?: string; // Geographic location
  gpuUtilization?: number; // Current GPU utilization %
  temperature?: number; // GPU temperature
  powerUsage?: number; // Power usage in watts
  uptime?: number; // Uptime percentage
  totalRentals?: number; // Total number of rentals
  rating?: number; // Average rating
  createdAt: Date;
  updatedAt: Date;
  lastHeartbeat?: Date; // Last worker heartbeat
  deletedAt?: Date; // Soft delete timestamp
}

export interface MachineCreateInput {
  accountId: string;
  workerId: string;
  gpuType: string;
  gpuMemory: number;
  cpuCores: number;
  ramSize: number;
  diskSize: number;
  sshPort: number;
  sshPublicKey?: string; // Deprecated - no longer used
  sshPrivateKey?: string; // Deprecated - no longer used
  ratePerHour: number;
  hostname?: string;
  location?: string;
}

export interface MachineUpdateInput {
  status?: MachineStatus;
  gpuType?: string;
  gpuMemory?: number;
  cudaCores?: number;
  cpuCores?: number;
  ramSize?: number;
  diskSize?: number;
  sshPort?: number;
  sshPublicKey?: string; // Deprecated - no longer used
  sshPrivateKey?: string; // Deprecated - no longer used
  ratePerHour?: number;
  hostname?: string;
  location?: string;
  gpuUtilization?: number;
  temperature?: number;
  powerUsage?: number;
  uptime?: number;
  lastHeartbeat?: Date;
}

