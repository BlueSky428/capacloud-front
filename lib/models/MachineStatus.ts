import { ObjectId } from 'mongodb';

export interface MachineStatusHistory {
  _id?: ObjectId;
  machineId: ObjectId; // Reference to Machine
  workerId: string; // For quick lookup
  timestamp: Date;
  gpuUtilization: number; // 0-100
  temperature: number; // Celsius
  powerUsage: number; // Watts
  uptime: number; // Percentage
  status: 'online' | 'offline' | 'busy' | 'idle';
  createdAt: Date;
}

export interface MachineStatusHistoryCreateInput {
  machineId: ObjectId | string;
  workerId: string;
  gpuUtilization: number;
  temperature: number;
  powerUsage: number;
  uptime: number;
  status?: 'online' | 'offline' | 'busy' | 'idle';
}

