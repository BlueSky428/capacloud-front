import { getDb } from '../mongodb';
import { User, UserCreateInput, UserUpdateInput } from '../models/User';
import { v4 as uuidv4 } from 'uuid';

const COLLECTION_NAME = 'users';

export async function getUserByWallet(walletAddress: string): Promise<User | null> {
  const db = await getDb();
  const user = await db.collection<User>(COLLECTION_NAME).findOne({ walletAddress });
  return user;
}

export async function getUserByAccountId(accountId: string): Promise<User | null> {
  const db = await getDb();
  const user = await db.collection<User>(COLLECTION_NAME).findOne({ accountId });
  return user;
}

export async function createUser(input: UserCreateInput): Promise<User> {
  const db = await getDb();
  
  // Generate account ID if not provided
  const accountId = input.accountId || `acc_${uuidv4().replace(/-/g, '')}`;
  
  const user: User = {
    walletAddress: input.walletAddress,
    accountId,
    fundWalletAddress: input.fundWalletAddress,
    fundWalletPrivateKey: input.fundWalletPrivateKey,
    accountBalance: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const result = await db.collection<User>(COLLECTION_NAME).insertOne(user);
  return { ...user, _id: result.insertedId };
}

export async function updateUser(
  walletAddress: string,
  input: UserUpdateInput
): Promise<User | null> {
  const db = await getDb();
  
  const updateData = {
    ...input,
    updatedAt: new Date(),
  };

  const result = await db.collection<User>(COLLECTION_NAME).findOneAndUpdate(
    { walletAddress },
    { $set: updateData },
    { returnDocument: 'after' }
  );

  return result || null;
}

export async function updateUserBalance(
  walletAddress: string,
  amount: number
): Promise<User | null> {
  const db = await getDb();
  
  const result = await db.collection<User>(COLLECTION_NAME).findOneAndUpdate(
    { walletAddress },
    { 
      $inc: { accountBalance: amount },
      $set: { updatedAt: new Date() }
    },
    { returnDocument: 'after' }
  );

  return result || null;
}

export async function getUserBalance(walletAddress: string): Promise<number> {
  const user = await getUserByWallet(walletAddress);
  return user?.accountBalance || 0;
}

