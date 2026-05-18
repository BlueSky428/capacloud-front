import { NextRequest, NextResponse } from 'next/server';
import { getMachineById, updateMachine, deleteMachine } from '@/lib/db/machines';
import { getRentalsByMachine, cancelRentalsByMachine } from '@/lib/db/rentals';
import { MachineStatus } from '@/lib/models/Machine';
import { RentalStatus } from '@/lib/models/Rental';
import { getUserByWallet, updateUserBalance } from '@/lib/db/users';

/**
 * Machine uninstallation endpoint
 * Handles rental cleanup when a machine is uninstalled
 * DELETE /api/machines/[machineId]/uninstall
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ machineId: string }> }
) {
  try {
    const { machineId } = await params;
    const body = await request.json().catch(() => ({}));
    const { force, deleteRecord } = body;

    // Get machine
    const machine = await getMachineById(machineId);
    if (!machine) {
      return NextResponse.json(
        { error: 'Machine not found' },
        { status: 404 }
      );
    }

    // Get all rentals for this machine
    const rentals = await getRentalsByMachine(machine._id!);
    const activeRentals = rentals.filter(
      r => r.status === RentalStatus.ACTIVE || r.status === RentalStatus.PAUSED
    );

    // If there are active rentals and not forced, return error
    if (activeRentals.length > 0 && !force) {
      return NextResponse.json(
        {
          error: 'Cannot uninstall machine with active rentals',
          activeRentals: activeRentals.length,
          rentals: activeRentals.map(r => ({
            rentalId: r.rentalId,
            renterWalletAddress: r.renterWalletAddress,
            status: r.status,
            startedAt: r.startedAt,
          })),
        },
        { status: 400 }
      );
    }

    // Handle active rentals - cancel them and refund users
    const processedRentals = [];
    let totalRefunded = 0;

    if (activeRentals.length > 0) {
      // Cancel all active rentals
      const cancellationResult = await cancelRentalsByMachine(machine._id!, 'Machine uninstalled');

      // Process refunds for cancelled rentals
      for (const rental of cancellationResult.rentals) {
        try {
          // Refund the user (add back to their balance)
          // Only refund if they were charged (totalCost > 0)
          if (rental.totalCost > 0) {
            const renter = await getUserByWallet(rental.renterWalletAddress);
            if (renter) {
              // Refund the cost
              await updateUserBalance(rental.renterWalletAddress, rental.totalCost);
              totalRefunded += rental.totalCost;
            }
          }

          processedRentals.push({
            rentalId: rental.rentalId,
            status: 'cancelled',
            refunded: rental.totalCost || 0,
            hoursUsed: rental.hoursUsed || 0,
          });
        } catch (error) {
          console.error(`Error processing refund for rental ${rental.rentalId}:`, error);
          processedRentals.push({
            rentalId: rental.rentalId,
            status: 'cancelled_no_refund',
            error: error instanceof Error ? error.message : 'Refund failed',
          });
        }
      }
    }

    // Soft delete the machine (sets deletedAt timestamp)
    // This preserves the record for audit trail and history
    const machineDeleted = await deleteMachine(machineId);
    
    if (!machineDeleted) {
      // Machine might already be deleted or not found
      console.warn(`Machine ${machineId} not found or already deleted`);
    }

    return NextResponse.json({
      success: true,
      message: 'Machine soft deleted successfully (preserved for audit trail)',
      processedRentals,
      rentalsCancelled: processedRentals.filter(r => r.status === 'cancelled').length,
      totalRefunded,
      machineId: machineId,
      machineDeleted: machineDeleted,
      softDelete: true, // Indicates soft delete was used
    });
  } catch (error) {
    console.error('Machine uninstall error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * Check if machine can be uninstalled (no active rentals)
 * GET /api/machines/[machineId]/uninstall
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ machineId: string }> }
) {
  try {
    const { machineId } = await params;

    // Get machine
    const machine = await getMachineById(machineId);
    if (!machine) {
      return NextResponse.json(
        { error: 'Machine not found' },
        { status: 404 }
      );
    }

    // Get active rentals
    const rentals = await getRentalsByMachine(machine._id!);
    const activeRentals = rentals.filter(
      r => r.status === RentalStatus.ACTIVE || r.status === RentalStatus.PAUSED
    );

    return NextResponse.json({
      success: true,
      canUninstall: activeRentals.length === 0,
      activeRentals: activeRentals.length,
      rentals: activeRentals.map(r => ({
        rentalId: r.rentalId,
        renterWalletAddress: r.renterWalletAddress,
        status: r.status,
        startedAt: r.startedAt,
        hoursUsed: r.hoursUsed,
      })),
    });
  } catch (error) {
    console.error('Check uninstall error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

