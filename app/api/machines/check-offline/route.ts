import { NextRequest, NextResponse } from 'next/server';
import { markOfflineMachines } from '@/lib/db/machines';

/**
 * Check for machines that haven't sent heartbeat and mark them as offline
 * This endpoint should be called periodically by a cron job
 * 
 * Query params:
 * - timeoutMinutes: Heartbeat timeout in minutes (default: 10)
 * - cronSecret: Optional secret for cron job authentication
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const timeoutMinutes = parseInt(searchParams.get('timeoutMinutes') || '10', 10);
    
    // Optional: Verify cron secret if provided (for production security)
    const cronSecret = searchParams.get('cronSecret');
    const expectedSecret = process.env.CRON_SECRET;
    if (expectedSecret && cronSecret !== expectedSecret) {
      return NextResponse.json(
        { error: 'Unauthorized. Valid cron secret required.' },
        { status: 401 }
      );
    }

    // Mark machines as offline if they haven't sent heartbeat
    const offlineCount = await markOfflineMachines(timeoutMinutes);

    return NextResponse.json({
      success: true,
      machinesMarkedOffline: offlineCount,
      timeoutMinutes,
      message: `Checked machines and marked ${offlineCount} as offline`,
    });
  } catch (error) {
    console.error('Check offline machines error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST endpoint for cron jobs (can use Bearer token authentication)
 */
export async function POST(request: NextRequest) {
  try {
    const { timeoutMinutes = 10 } = await request.json();
    
    // Optional: Verify Bearer token if CRON_SECRET is set
    const cronSecret = process.env.CRON_SECRET;
    if (cronSecret) {
      const authHeader = request.headers.get('authorization');
      if (authHeader !== `Bearer ${cronSecret}`) {
        return NextResponse.json(
          { error: 'Unauthorized. Valid Bearer token required.' },
          { status: 401 }
        );
      }
    }

    // Mark machines as offline if they haven't sent heartbeat
    const offlineCount = await markOfflineMachines(timeoutMinutes);

    return NextResponse.json({
      success: true,
      machinesMarkedOffline: offlineCount,
      timeoutMinutes,
      message: `Checked machines and marked ${offlineCount} as offline`,
    });
  } catch (error) {
    console.error('Check offline machines error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

