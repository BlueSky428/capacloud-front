import { NextRequest, NextResponse } from 'next/server';
import { getMachineById, restoreMachine } from '@/lib/db/machines';

/**
 * Restore a soft-deleted machine
 * POST /api/machines/[machineId]/restore
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ machineId: string }> }
) {
  try {
    const { machineId } = await params;

    // Check if machine exists (including deleted ones)
    const machine = await getMachineById(machineId, true);
    if (!machine) {
      return NextResponse.json(
        { error: 'Machine not found' },
        { status: 404 }
      );
    }

    // Check if machine is actually deleted
    if (!machine.deletedAt) {
      return NextResponse.json(
        { error: 'Machine is not deleted. Nothing to restore.' },
        { status: 400 }
      );
    }

    // Restore the machine
    const restored = await restoreMachine(machineId);
    if (!restored) {
      return NextResponse.json(
        { error: 'Failed to restore machine' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Machine restored successfully',
      machine: restored,
    });
  } catch (error) {
    console.error('Restore machine error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

