import { NextRequest, NextResponse } from 'next/server';
import { getPendingMachinesByAccountId } from '@/lib/db/machines';

export async function GET(request: NextRequest) {
  try {
    const accountId = request.nextUrl.searchParams.get('accountId');

    if (!accountId) {
      return NextResponse.json(
        { error: 'Account ID is required' },
        { status: 400 }
      );
    }

    const machines = await getPendingMachinesByAccountId(accountId);

    return NextResponse.json({
      success: true,
      machines,
    });
  } catch (error) {
    console.error('Get pending machines error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

