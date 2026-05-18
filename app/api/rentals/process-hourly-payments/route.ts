import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { getAllRentalsByWallet } from '@/lib/db/rentals';
import { getActiveRentalsByWallet } from '@/lib/db/rentals';
import { updateRentalStatus, getRentalById } from '@/lib/db/rentals';
import { updateUserBalance, getUserByWallet } from '@/lib/db/users';
import { createTransaction, updateTransactionStatus } from '@/lib/db/transactions';
import { getUserByAccountId } from '@/lib/db/users';
import { updateMachine } from '@/lib/db/machines';
import { RentalStatus } from '@/lib/models/Rental';
import { MachineStatus } from '@/lib/models/Machine';
import { TransactionType, TransactionStatus } from '@/lib/models/Transaction';
import { getDb } from '@/lib/mongodb';

/**
 * Process hourly payments for active rentals (prepay mode)
 * 
 * Timer Strategy:
 * - Can be called every 5-10 minutes (more frequent) OR every hour
 * - Only processes rentals where: currentTime - lastPaymentTime > 1 hour
 * - This ensures payments are processed promptly even if timer runs more frequently
 * 
 * What it updates:
 * 1. ✅ Both users' balance (renter deducts, provider receives)
 * 2. ✅ Payment time (lastPaymentAt)
 * 3. ✅ Rental details (totalCost, hoursUsed)
 * 4. ✅ Machine status (ACTIVE when rental ends due to insufficient balance)
 * 5. ✅ Transaction records for both parties
 * 
 * POST /api/rentals/process-hourly-payments
 * Headers: Authorization: Bearer {CRON_SECRET}
 */
export async function POST(request: NextRequest) {
  try {
    // Security: Require Bearer token authentication
    // This endpoint should only be called by external cron services
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET || 'your-secret-key';
    
    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { error: 'Unauthorized. Valid Bearer token required.' },
        { status: 401 }
      );
    }

    const db = await getDb();
    
    // Get all active rentals
    const activeRentals = await db.collection('rentals').find({
      status: { $in: [RentalStatus.ACTIVE, RentalStatus.PAUSED] },
      deletedAt: { $exists: false }
    }).toArray();

    const results = {
      processed: 0,
      insufficientBalance: 0,
      completed: 0,
      errors: [] as string[],
    };

    const now = new Date();

    for (const rental of activeRentals) {
      try {
        // Skip paused rentals (don't charge for paused time)
        if (rental.status === RentalStatus.PAUSED) {
          continue;
        }

        // Calculate hours since last payment (or since rental started)
        const lastPaymentTime = rental.lastPaymentAt || rental.startedAt;
        const hoursElapsed = (now.getTime() - new Date(lastPaymentTime).getTime()) / (1000 * 60 * 60);
        
        // Only process if at least 1 hour has passed
        if (hoursElapsed < 1) {
          continue;
        }

        const hoursToCharge = Math.floor(hoursElapsed);
        const cost = hoursToCharge * rental.ratePerHour;

        // Get renter's current balance
        const renter = await getUserByWallet(rental.renterWalletAddress);
        const currentBalance = renter?.accountBalance || 0;

        if (currentBalance < cost) {
          // Insufficient balance - stop rental
          const totalHoursUsed = (now.getTime() - new Date(rental.startedAt).getTime()) / (1000 * 60 * 60);
          const totalCost = totalHoursUsed * rental.ratePerHour;
          
          await updateRentalStatus(rental.rentalId, RentalStatus.COMPLETED, {
            endedAt: now,
            totalCost,
            hoursUsed: totalHoursUsed,
          });

          // Update machine status back to ACTIVE (available for rent)
          const machineId = rental.machineId instanceof ObjectId ? rental.machineId : new ObjectId(rental.machineId);
          await updateMachine(machineId, {
            status: MachineStatus.ACTIVE,
          });

          // Deduct remaining balance
          if (currentBalance > 0) {
            await updateUserBalance(rental.renterWalletAddress, -currentBalance);
            
            // Get provider and pay them
            const provider = await getUserByAccountId(rental.providerAccountId);
            if (provider) {
              await updateUserBalance(provider.walletAddress, currentBalance);
              
              // Create transaction for provider
              await createTransaction({
                walletAddress: provider.walletAddress,
                type: TransactionType.RENTAL_EARNING,
                amount: currentBalance,
                description: `Partial payment from rental ${rental.rentalId} (insufficient balance)`,
                rentalId: rental.rentalId,
              });
            }
            
            // Create transaction for renter
            await createTransaction({
              walletAddress: rental.renterWalletAddress,
              type: TransactionType.RENTAL_PAYMENT,
              amount: -currentBalance,
              description: `Final payment for rental ${rental.rentalId} (insufficient balance)`,
              rentalId: rental.rentalId,
            });
          }

          results.insufficientBalance++;
          results.completed++;
          continue;
        }

        // Deduct from renter's balance
        await updateUserBalance(rental.renterWalletAddress, -cost);

        // Pay provider
        const provider = await getUserByAccountId(rental.providerAccountId);
        if (provider) {
          await updateUserBalance(provider.walletAddress, cost);
        }

        // Create transaction records
        await createTransaction({
          walletAddress: rental.renterWalletAddress,
          type: TransactionType.RENTAL_PAYMENT,
          amount: -cost,
          description: `Hourly payment for rental ${rental.rentalId} (${hoursToCharge} hours)`,
          rentalId: rental.rentalId,
        });

        if (provider) {
          await createTransaction({
            walletAddress: provider.walletAddress,
            type: TransactionType.RENTAL_EARNING,
            amount: cost,
            description: `Earning from rental ${rental.rentalId} (${hoursToCharge} hours)`,
            rentalId: rental.rentalId,
          });
        }

        // Update rental with last payment time and accumulated cost
        const totalHoursUsed = (now.getTime() - new Date(rental.startedAt).getTime()) / (1000 * 60 * 60);
        const totalCost = totalHoursUsed * rental.ratePerHour;
        
        await db.collection('rentals').updateOne(
          { rentalId: rental.rentalId },
          {
            $set: {
              lastPaymentAt: now,
              totalCost,
              hoursUsed: totalHoursUsed,
              updatedAt: now,
            }
          }
        );

        results.processed++;
      } catch (error: any) {
        results.errors.push(`Rental ${rental.rentalId}: ${error.message}`);
        console.error(`Error processing rental ${rental.rentalId}:`, error);
      }
    }

    return NextResponse.json({
      success: true,
      results,
      timestamp: now.toISOString(),
    });
  } catch (error) {
    console.error('Process hourly payments error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

