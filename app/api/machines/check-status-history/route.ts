import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

/**
 * Debug endpoint to check machine status history collection
 * GET /api/machines/check-status-history?machineId=<id>
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const machineId = searchParams.get('machineId');
    const workerId = searchParams.get('workerId');

    const db = await getDb();
    const collection = db.collection('machine_status_history');

    // Get collection count
    const count = await collection.countDocuments();

    let query: any = {};
    let results: any[] = [];

    if (machineId && ObjectId.isValid(machineId)) {
      query.machineId = new ObjectId(machineId);
      results = await collection
        .find(query)
        .sort({ timestamp: -1 })
        .limit(10)
        .toArray();
    } else if (workerId) {
      query.workerId = workerId;
      results = await collection
        .find(query)
        .sort({ timestamp: -1 })
        .limit(10)
        .toArray();
    } else {
      // Get all recent entries
      results = await collection
        .find({})
        .sort({ timestamp: -1 })
        .limit(10)
        .toArray();
    }

    // Check if collection exists and has indexes
    const indexes = await collection.indexes();

    return NextResponse.json({
      success: true,
      collection: {
        name: 'machine_status_history',
        exists: true,
        count,
      },
      indexes,
      query,
      recentEntries: results.map((doc) => ({
        _id: doc._id,
        machineId: doc.machineId,
        workerId: doc.workerId,
        timestamp: doc.timestamp,
        gpuUtilization: doc.gpuUtilization,
        temperature: doc.temperature,
        powerUsage: doc.powerUsage,
        status: doc.status,
      })),
    });
  } catch (error) {
    console.error('Check status history error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}

