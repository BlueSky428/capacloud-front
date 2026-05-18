import { getDb } from '../mongodb';
import { MachineStatusHistory, MachineStatusHistoryCreateInput } from '../models/MachineStatus';
import { ObjectId } from 'mongodb';

const COLLECTION_NAME = 'machine_status_history';

export async function createMachineStatusHistory(
  input: MachineStatusHistoryCreateInput
): Promise<MachineStatusHistory> {
  const db = await getDb();
  
  const machineId = typeof input.machineId === 'string' 
    ? new ObjectId(input.machineId) 
    : input.machineId;
  
  // Determine status based on metrics
  let status: 'online' | 'offline' | 'busy' | 'idle' = input.status || 'online';
  if (input.gpuUtilization > 50) {
    status = 'busy';
  } else if (input.gpuUtilization > 0) {
    status = 'idle';
  }
  
  const statusHistory: MachineStatusHistory = {
    machineId,
    workerId: input.workerId,
    timestamp: new Date(),
    gpuUtilization: input.gpuUtilization,
    temperature: input.temperature,
    powerUsage: input.powerUsage,
    uptime: input.uptime,
    status,
    createdAt: new Date(),
  };

  const result = await db.collection<MachineStatusHistory>(COLLECTION_NAME).insertOne(statusHistory);
  return { ...statusHistory, _id: result.insertedId };
}

export async function getMachineStatusHistory(
  machineId: string | ObjectId,
  limit: number = 100,
  startDate?: Date,
  endDate?: Date
): Promise<MachineStatusHistory[]> {
  const db = await getDb();
  const id = typeof machineId === 'string' ? new ObjectId(machineId) : machineId;
  
  const query: any = { machineId: id };
  
  if (startDate || endDate) {
    query.timestamp = {};
    if (startDate) query.timestamp.$gte = startDate;
    if (endDate) query.timestamp.$lte = endDate;
  }
  
  return await db.collection<MachineStatusHistory>(COLLECTION_NAME)
    .find(query)
    .sort({ timestamp: -1 })
    .limit(limit)
    .toArray();
}

export async function getMachineStatusHistoryByWorkerId(
  workerId: string,
  limit: number = 100
): Promise<MachineStatusHistory[]> {
  const db = await getDb();
  
  return await db.collection<MachineStatusHistory>(COLLECTION_NAME)
    .find({ workerId })
    .sort({ timestamp: -1 })
    .limit(limit)
    .toArray();
}

export async function getLatestMachineStatus(
  machineId: string | ObjectId
): Promise<MachineStatusHistory | null> {
  const db = await getDb();
  const id = typeof machineId === 'string' ? new ObjectId(machineId) : machineId;
  
  return await db.collection<MachineStatusHistory>(COLLECTION_NAME)
    .findOne(
      { machineId: id },
      { sort: { timestamp: -1 } }
    );
}

export async function deleteOldMachineStatusHistory(olderThanDays: number = 30): Promise<number> {
  const db = await getDb();
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - olderThanDays);
  
  const result = await db.collection<MachineStatusHistory>(COLLECTION_NAME)
    .deleteMany({ timestamp: { $lt: cutoffDate } });
  
  return result.deletedCount || 0;
}

