import { NextRequest, NextResponse } from 'next/server';
import { getActiveMachines, getMachinesByAccountId } from '@/lib/db/machines';

export async function GET(request: NextRequest) {
  try {
    const accountId = request.nextUrl.searchParams.get('accountId');
    const gpuType = request.nextUrl.searchParams.get('gpuType');
    const minMemory = request.nextUrl.searchParams.get('minMemory');
    const maxRate = request.nextUrl.searchParams.get('maxRate');

    if (accountId) {
      // Get machines for a specific provider
      const machines = await getMachinesByAccountId(accountId);
      return NextResponse.json({
        success: true,
        machines,
      });
    } else {
      // Get available machines for rent
      const filters: any = {};
      if (gpuType) filters.gpuType = gpuType;
      if (minMemory) filters.minMemory = parseInt(minMemory);
      if (maxRate) filters.maxRate = parseFloat(maxRate);

      const machines = await getActiveMachines(filters);
      return NextResponse.json({
        success: true,
        machines,
      });
    }
  } catch (error) {
    console.error('List machines error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

