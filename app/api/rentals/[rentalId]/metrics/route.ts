import { NextRequest, NextResponse } from 'next/server';
import { getRentalById } from '@/lib/db/rentals';
import { getMachineById } from '@/lib/db/machines';
import { getLatestMachineStatus } from '@/lib/db/machineStatus';

/**
 * Get real-time GPU metrics for a rental
 * GET /api/rentals/[rentalId]/metrics
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ rentalId: string }> }
) {
  try {
    const { rentalId } = await params;
    const walletAddress = request.nextUrl.searchParams.get('walletAddress');

    if (!walletAddress) {
      return NextResponse.json(
        { error: 'Wallet address is required' },
        { status: 401 }
      );
    }

    // Get rental and verify ownership
    const rental = await getRentalById(rentalId);
    if (!rental) {
      return NextResponse.json(
        { error: 'Rental not found' },
        { status: 404 }
      );
    }

    if (rental.renterWalletAddress !== walletAddress) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    // Get machine details
    const machine = await getMachineById(rental.machineId);
    if (!machine) {
      return NextResponse.json(
        { error: 'Machine not found' },
        { status: 404 }
      );
    }

    // Get latest machine status from history (most recent metrics)
    const latestStatus = await getLatestMachineStatus(machine._id!);

    // Use latest status if available, otherwise fall back to machine metrics
    const metrics = {
      gpuUtilization: latestStatus?.gpuUtilization ?? machine.gpuUtilization ?? 0,
      temperature: latestStatus?.temperature ?? machine.temperature ?? null,
      powerUsage: latestStatus?.powerUsage ?? machine.powerUsage ?? null,
      timestamp: latestStatus?.timestamp ?? machine.lastHeartbeat ?? new Date(),
    };

    return NextResponse.json({
      success: true,
      metrics,
    });
  } catch (error) {
    console.error('Get rental metrics error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

