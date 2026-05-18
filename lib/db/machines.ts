import { getDb } from '../mongodb';
import { Machine, MachineCreateInput, MachineUpdateInput, MachineStatus } from '../models/Machine';
import { ObjectId } from 'mongodb';

const COLLECTION_NAME = 'machines';

export async function getMachineById(machineId: string | ObjectId, includeDeleted: boolean = false): Promise<Machine | null> {
  const db = await getDb();
  const id = typeof machineId === 'string' ? new ObjectId(machineId) : machineId;
  const query: any = { _id: id };
  if (!includeDeleted) {
    query.deletedAt = { $exists: false };
  }
  return await db.collection<Machine>(COLLECTION_NAME).findOne(query);
}

export async function getMachineByWorkerId(workerId: string, includeDeleted: boolean = false): Promise<Machine | null> {
  const db = await getDb();
  const query: any = { workerId };
  if (!includeDeleted) {
    query.deletedAt = { $exists: false };
  }
  return await db.collection<Machine>(COLLECTION_NAME).findOne(query);
}

export async function getPendingMachinesByAccountId(accountId: string): Promise<Machine[]> {
  const db = await getDb();
  return await db.collection<Machine>(COLLECTION_NAME)
    .find({ 
      accountId, 
      status: MachineStatus.PENDING,
      deletedAt: { $exists: false }
    })
    .toArray();
}

export async function getActiveMachines(filters?: {
  gpuType?: string;
  minMemory?: number;
  maxRate?: number;
}): Promise<Machine[]> {
  const db = await getDb();
  
  const query: any = { 
    status: MachineStatus.ACTIVE,
    deletedAt: { $exists: false }
    // Explicitly exclude OFFLINE machines (status must be ACTIVE, not OFFLINE)
  };
  
  if (filters?.gpuType) {
    query.gpuType = { $regex: filters.gpuType, $options: 'i' };
  }
  
  if (filters?.minMemory) {
    query.gpuMemory = { $gte: filters.minMemory };
  }
  
  if (filters?.maxRate) {
    query.ratePerHour = { $lte: filters.maxRate };
  }
  
  return await db.collection<Machine>(COLLECTION_NAME).find(query).toArray();
}

export async function getMachinesByAccountId(accountId: string, includeDeleted: boolean = false): Promise<Machine[]> {
  const db = await getDb();
  const query: any = { accountId };
  if (!includeDeleted) {
    query.deletedAt = { $exists: false };
  }
  return await db.collection<Machine>(COLLECTION_NAME)
    .find(query)
    .toArray();
}

export async function createMachine(input: MachineCreateInput): Promise<Machine> {
  const db = await getDb();
  
  const machine: Machine = {
    ...input,
    status: MachineStatus.PENDING,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const result = await db.collection<Machine>(COLLECTION_NAME).insertOne(machine);
  return { ...machine, _id: result.insertedId };
}

export async function updateMachine(
  machineId: string | ObjectId,
  input: MachineUpdateInput,
  allowDeleted: boolean = false
): Promise<Machine | null> {
  const db = await getDb();
  const id = typeof machineId === 'string' ? new ObjectId(machineId) : machineId;
  
  const query: any = { _id: id };
  if (!allowDeleted) {
    query.deletedAt = { $exists: false };
  }
  
  const updateData = {
    ...input,
    updatedAt: new Date(),
  };

  const result = await db.collection<Machine>(COLLECTION_NAME).findOneAndUpdate(
    query,
    { $set: updateData },
    { returnDocument: 'after' }
  );

  return result || null;
}

export async function updateMachineHeartbeat(workerId: string): Promise<void> {
  const db = await getDb();
  await db.collection<Machine>(COLLECTION_NAME).updateOne(
    { workerId, deletedAt: { $exists: false } },
    { $set: { lastHeartbeat: new Date(), updatedAt: new Date() } }
  );
}

/**
 * Soft delete a machine (sets deletedAt timestamp instead of removing)
 * @param machineId Machine ID to soft delete
 * @returns true if machine was soft deleted, false if not found
 */
export async function deleteMachine(machineId: string | ObjectId): Promise<boolean> {
  const db = await getDb();
  const id = typeof machineId === 'string' ? new ObjectId(machineId) : machineId;
  
  const result = await db.collection<Machine>(COLLECTION_NAME).findOneAndUpdate(
    { _id: id, deletedAt: { $exists: false } },
    { 
      $set: { 
        deletedAt: new Date(),
        updatedAt: new Date(),
        status: MachineStatus.OFFLINE // Set to offline when deleted
      } 
    },
    { returnDocument: 'after' }
  );
  
  return result !== null;
}

/**
 * Hard delete a machine (permanently removes from database)
 * Use with caution - this cannot be undone
 */
export async function hardDeleteMachine(machineId: string | ObjectId): Promise<boolean> {
  const db = await getDb();
  const id = typeof machineId === 'string' ? new ObjectId(machineId) : machineId;
  
  const result = await db.collection<Machine>(COLLECTION_NAME).deleteOne({ _id: id });
  return result.deletedCount > 0;
}

/**
 * Restore a soft-deleted machine
 */
export async function restoreMachine(machineId: string | ObjectId): Promise<Machine | null> {
  const db = await getDb();
  const id = typeof machineId === 'string' ? new ObjectId(machineId) : machineId;
  
  const result = await db.collection<Machine>(COLLECTION_NAME).findOneAndUpdate(
    { _id: id, deletedAt: { $exists: true } },
    { 
      $unset: { deletedAt: '' },
      $set: { updatedAt: new Date() }
    },
    { returnDocument: 'after' }
  );
  
  return result || null;
}

/**
 * Check if a hostname/IP address is already registered by another machine
 * @param hostname IP address or hostname to check
 * @param excludeMachineId Optional machine ID to exclude from check (for updates)
 * @returns Machine with this hostname if found, null otherwise
 */
export async function getMachineByHostname(
  hostname: string, 
  excludeMachineId?: string | ObjectId
): Promise<Machine | null> {
  const db = await getDb();
  const query: any = { 
    hostname,
    deletedAt: { $exists: false }
  };
  
  // Exclude a specific machine (useful when updating existing machine)
  if (excludeMachineId) {
    const excludeId = typeof excludeMachineId === 'string' ? new ObjectId(excludeMachineId) : excludeMachineId;
    query._id = { $ne: excludeId };
  }
  
  return await db.collection<Machine>(COLLECTION_NAME).findOne(query);
}

/**
 * Mark machines as offline if they haven't sent heartbeat within the timeout period
 * Note: Does NOT mark RENTED machines as offline (they might be in use)
 * @param heartbeatTimeoutMinutes Number of minutes to wait before marking as offline (default: 10 minutes)
 * @returns Number of machines marked as offline
 */
export async function markOfflineMachines(heartbeatTimeoutMinutes: number = 10): Promise<number> {
  const db = await getDb();
  const timeoutMs = heartbeatTimeoutMinutes * 60 * 1000;
  const cutoffTime = new Date(Date.now() - timeoutMs);
  
  const result = await db.collection<Machine>(COLLECTION_NAME).updateMany(
    {
      // Only check ACTIVE and PENDING machines (not RENTED - they might be in use)
      status: { $in: [MachineStatus.ACTIVE, MachineStatus.PENDING] },
      deletedAt: { $exists: false },
      $or: [
        { lastHeartbeat: { $exists: false } }, // Never sent heartbeat
        { lastHeartbeat: { $lt: cutoffTime } } // Last heartbeat too old
      ]
    },
    {
      $set: {
        status: MachineStatus.OFFLINE,
        updatedAt: new Date()
      }
    }
  );
  
  return result.modifiedCount;
}

