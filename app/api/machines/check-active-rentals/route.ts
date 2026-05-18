import { NextRequest, NextResponse } from 'next/server';
import { getMachineByWorkerId, getMachinesByAccountId } from '@/lib/db/machines';
import { getActiveRentalByMachine } from '@/lib/db/rentals';
import { ObjectId } from 'mongodb';

/**
 * Check if machines have active rentals
 * Query params:
 * - workerId: Check specific worker
 * - accountId: Check all machines for an account
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const workerId = searchParams.get('workerId');
    const accountId = searchParams.get('accountId');

    if (!workerId && !accountId) {
      return NextResponse.json(
        { error: 'Either workerId or accountId is required' },
        { status: 400 }
      );
    }

    let machines;
    if (workerId) {
      const machine = await getMachineByWorkerId(workerId);
      machines = machine ? [machine] : [];
    } else {
      machines = await getMachinesByAccountId(accountId!);
    }

    // Check each machine for active rentals
    const results = await Promise.all(
      machines.map(async (machine) => {
        const activeRental = await getActiveRentalByMachine(machine._id!);
        return {
          machineId: machine._id?.toString(),
          workerId: machine.workerId,
          accountId: machine.accountId,
          hasActiveRental: !!activeRental,
          activeRentalId: activeRental?.rentalId || null,
        };
      })
    );

    const hasAnyActiveRental = results.some((r) => r.hasActiveRental);

    return NextResponse.json({
      success: true,
      hasActiveRental: hasAnyActiveRental,
      machines: results,
      // Include machine IDs for easier lookup
      machineIds: results.map(r => r.machineId).filter(Boolean),
    });
  } catch (error) {
    console.error('Check active rentals error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

