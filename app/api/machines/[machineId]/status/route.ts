import { NextRequest, NextResponse } from 'next/server';
import { getMachineStatusHistory, getLatestMachineStatus } from '@/lib/db/machineStatus';
import { ObjectId } from 'mongodb';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ machineId: string }> }
) {
  try {
    const { machineId } = await params;
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '100');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    if (!ObjectId.isValid(machineId)) {
      return NextResponse.json(
        { error: 'Invalid machine ID' },
        { status: 400 }
      );
    }

    const start = startDate ? new Date(startDate) : undefined;
    const end = endDate ? new Date(endDate) : undefined;

    const history = await getMachineStatusHistory(machineId, limit, start, end);
    const latest = await getLatestMachineStatus(machineId);

    return NextResponse.json({
      success: true,
      history: history.reverse(), // Return in chronological order
      latest,
    });
  } catch (error) {
    console.error('Get machine status history error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

