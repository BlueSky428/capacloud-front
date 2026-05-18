import { getDb } from '../mongodb';
import { Rental, RentalCreateInput, RentalStatus } from '../models/Rental';
import { ObjectId } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';

const COLLECTION_NAME = 'rentals';

export async function getRentalById(rentalId: string, includeDeleted: boolean = false): Promise<Rental | null> {
  const db = await getDb();
  const query: any = { rentalId };
  if (!includeDeleted) {
    query.deletedAt = { $exists: false };
  }
  return await db.collection<Rental>(COLLECTION_NAME).findOne(query);
}

export async function getActiveRentalsByWallet(walletAddress: string): Promise<Rental[]> {
  const db = await getDb();
  return await db.collection<Rental>(COLLECTION_NAME)
    .find({
      renterWalletAddress: walletAddress,
      status: { $in: [RentalStatus.ACTIVE, RentalStatus.PAUSED] },
      deletedAt: { $exists: false }
    })
    .toArray();
}

export async function getAllRentalsByWallet(walletAddress: string, includeDeleted: boolean = false): Promise<Rental[]> {
  const db = await getDb();
  const query: any = { renterWalletAddress: walletAddress };
  if (!includeDeleted) {
    query.deletedAt = { $exists: false };
  }
  return await db.collection<Rental>(COLLECTION_NAME)
    .find(query)
    .sort({ createdAt: -1 })
    .toArray();
}

export async function getRentalsByMachine(machineId: ObjectId, includeDeleted: boolean = false): Promise<Rental[]> {
  const db = await getDb();
  const query: any = { machineId };
  if (!includeDeleted) {
    query.deletedAt = { $exists: false };
  }
  return await db.collection<Rental>(COLLECTION_NAME)
    .find(query)
    .sort({ createdAt: -1 })
    .toArray();
}

export async function createRental(input: RentalCreateInput): Promise<Rental> {
  const db = await getDb();
  
  const rental: Rental = {
    rentalId: `rental_${uuidv4().replace(/-/g, '')}`,
    machineId: input.machineId,
    renterWalletAddress: input.renterWalletAddress,
    providerAccountId: input.providerAccountId,
    status: RentalStatus.ACTIVE,
    startedAt: new Date(),
    totalCost: 0,
    hoursUsed: 0,
    ratePerHour: input.ratePerHour,
    sshHost: input.sshHost,
    sshPort: input.sshPort,
    sshUser: input.sshUser,
    selectedSshKeyIds: input.selectedSshKeyIds || [], // IDs of user's SSH keys
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const result = await db.collection<Rental>(COLLECTION_NAME).insertOne(rental);
  return { ...rental, _id: result.insertedId };
}

export async function updateRental(
  rentalId: string,
  updates: Partial<Rental>,
  allowDeleted: boolean = false
): Promise<Rental | null> {
  const db = await getDb();
  
  const updateData = {
    ...updates,
    updatedAt: new Date(),
  };

  const query: any = { rentalId };
  if (!allowDeleted) {
    query.deletedAt = { $exists: false };
  }

  const result = await db.collection<Rental>(COLLECTION_NAME).findOneAndUpdate(
    query,
    { $set: updateData },
    { returnDocument: 'after' }
  );

  return result || null;
}

export async function updateRentalStatus(
  rentalId: string,
  status: RentalStatus,
  additionalData?: {
    pausedAt?: Date;
    resumedAt?: Date;
    endedAt?: Date;
    totalCost?: number;
    hoursUsed?: number;
  },
  allowDeleted: boolean = false
): Promise<Rental | null> {
  return await updateRental(rentalId, {
    status,
    ...additionalData,
  } as any, allowDeleted);
}

export async function getActiveRentalByMachine(machineId: ObjectId): Promise<Rental | null> {
  const db = await getDb();
  return await db.collection<Rental>(COLLECTION_NAME).findOne({
    machineId,
    status: { $in: [RentalStatus.ACTIVE, RentalStatus.PAUSED] },
    deletedAt: { $exists: false }
  });
}

/**
 * Cancel all active rentals for a machine
 * Used when machine is uninstalled
 */
export async function cancelRentalsByMachine(
  machineId: ObjectId,
  reason?: string
): Promise<{ cancelled: number; rentals: Rental[] }> {
  const db = await getDb();
  
  const activeRentals = await db.collection<Rental>(COLLECTION_NAME)
    .find({
      machineId,
      status: { $in: [RentalStatus.ACTIVE, RentalStatus.PAUSED] }
    })
    .toArray();

  const now = new Date();
  const cancelledRentals: Rental[] = [];

  for (const rental of activeRentals) {
    const hoursUsed = (now.getTime() - rental.startedAt.getTime()) / (1000 * 60 * 60);
    const totalCost = hoursUsed * rental.ratePerHour;

    const updated = await updateRentalStatus(rental.rentalId, RentalStatus.CANCELLED, {
      endedAt: now,
      totalCost,
      hoursUsed,
    });

    if (updated) {
      cancelledRentals.push(updated);
    }
  }

  return {
    cancelled: cancelledRentals.length,
    rentals: cancelledRentals,
  };
}

/**
 * Soft delete a rental (sets deletedAt timestamp instead of removing)
 * @param rentalId Rental ID to soft delete
 * @returns true if rental was soft deleted, false if not found
 */
export async function deleteRental(rentalId: string): Promise<boolean> {
  const db = await getDb();
  
  const result = await db.collection<Rental>(COLLECTION_NAME).findOneAndUpdate(
    { rentalId, deletedAt: { $exists: false } },
    { 
      $set: { 
        deletedAt: new Date(),
        updatedAt: new Date()
      } 
    },
    { returnDocument: 'after' }
  );
  
  return result !== null;
}

/**
 * Hard delete a rental (permanently removes from database)
 * Use with caution - this cannot be undone
 */
export async function hardDeleteRental(rentalId: string): Promise<boolean> {
  const db = await getDb();
  
  const result = await db.collection<Rental>(COLLECTION_NAME).deleteOne({ rentalId });
  return result.deletedCount > 0;
}

/**
 * Restore a soft-deleted rental
 */
export async function restoreRental(rentalId: string): Promise<Rental | null> {
  const db = await getDb();
  
  const result = await db.collection<Rental>(COLLECTION_NAME).findOneAndUpdate(
    { rentalId, deletedAt: { $exists: true } },
    { 
      $unset: { deletedAt: '' },
      $set: { updatedAt: new Date() }
    },
    { returnDocument: 'after' }
  );
  
  return result || null;
}
