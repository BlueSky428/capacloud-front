import { getDb } from '../mongodb';
import { Transaction, TransactionCreateInput, TransactionStatus } from '../models/Transaction';
import { v4 as uuidv4 } from 'uuid';
import { ObjectId } from 'mongodb';

const COLLECTION_NAME = 'transactions';

export async function createTransaction(input: TransactionCreateInput): Promise<Transaction> {
  const db = await getDb();
  
  // Convert rentalId string to ObjectId if provided
  let relatedRentalId = input.relatedRentalId;
  if (input.rentalId && !relatedRentalId) {
    // Try to find rental by rentalId to get its _id
    const { getRentalById } = await import('./rentals');
    const rental = await getRentalById(input.rentalId);
    if (rental && rental._id) {
      relatedRentalId = rental._id;
    }
  }
  
  const transaction: Transaction = {
    transactionId: `tx_${uuidv4().replace(/-/g, '')}`,
    walletAddress: input.walletAddress,
    type: input.type,
    status: TransactionStatus.PENDING,
    amount: input.amount,
    description: input.description,
    relatedRentalId,
    createdAt: new Date(),
  };

  const result = await db.collection<Transaction>(COLLECTION_NAME).insertOne(transaction);
  return { ...transaction, _id: result.insertedId };
}

export async function updateTransactionStatus(
  transactionId: string,
  status: TransactionStatus,
  solanaTxSignature?: string
): Promise<Transaction | null> {
  const db = await getDb();
  
  const updateData: any = {
    status,
    updatedAt: new Date(),
  };

  if (status === TransactionStatus.COMPLETED) {
    updateData.completedAt = new Date();
  }

  if (solanaTxSignature) {
    updateData.solanaTxSignature = solanaTxSignature;
  }

  const result = await db.collection<Transaction>(COLLECTION_NAME).findOneAndUpdate(
    { transactionId },
    { $set: updateData },
    { returnDocument: 'after' }
  );

  return result || null;
}

export async function getTransactionsByWallet(
  walletAddress: string,
  limit: number = 50
): Promise<Transaction[]> {
  const db = await getDb();
  return await db.collection<Transaction>(COLLECTION_NAME)
    .find({ walletAddress })
    .sort({ createdAt: -1 })
    .limit(limit)
    .toArray();
}

