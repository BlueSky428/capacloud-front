import { NextRequest, NextResponse } from 'next/server';
import { getRentalById, restoreRental } from '@/lib/db/rentals';

/**
 * Restore a soft-deleted rental
 * POST /api/rentals/[rentalId]/restore
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ rentalId: string }> }
) {
  try {
    const { rentalId } = await params;

    // Check if rental exists (including deleted ones)
    const rental = await getRentalById(rentalId, true);
    if (!rental) {
      return NextResponse.json(
        { error: 'Rental not found' },
        { status: 404 }
      );
    }

    // Check if rental is actually deleted
    if (!rental.deletedAt) {
      return NextResponse.json(
        { error: 'Rental is not deleted. Nothing to restore.' },
        { status: 400 }
      );
    }

    // Restore the rental
    const restored = await restoreRental(rentalId);
    if (!restored) {
      return NextResponse.json(
        { error: 'Failed to restore rental' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Rental restored successfully',
      rental: restored,
    });
  } catch (error) {
    console.error('Restore rental error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

