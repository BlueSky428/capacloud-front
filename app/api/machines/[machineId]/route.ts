import { NextRequest, NextResponse } from 'next/server';
import { getMachineById, updateMachine } from '@/lib/db/machines';
import { MachineStatus } from '@/lib/models/Machine';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ machineId: string }> }
) {
  try {
    const { machineId } = await params;
    const machine = await getMachineById(machineId);

    if (!machine) {
      return NextResponse.json(
        { error: 'Machine not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      machine,
    });
  } catch (error) {
    console.error('Get machine error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ machineId: string }> }
) {
  try {
    const { machineId } = await params;
    const updateData = await request.json();

    const machine = await updateMachine(machineId, updateData);

    if (!machine) {
      return NextResponse.json(
        { error: 'Machine not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      machine,
    });
  } catch (error) {
    console.error('Update machine error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

