import { NextRequest, NextResponse } from 'next/server';
import { getRentalById, updateRentalStatus } from '@/lib/db/rentals';
import { getUserByWallet } from '@/lib/db/users';
import { RentalStatus } from '@/lib/models/Rental';

/**
 * Update SSH keys for a rental
 * PUT /api/rentals/[rentalId]/ssh-keys
 * Body: { walletAddress: string, selectedSshKeyIds: string[] }
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ rentalId: string }> }
) {
  try {
    const { rentalId } = await params;
    const { walletAddress, selectedSshKeyIds } = await request.json();

    if (!walletAddress || !selectedSshKeyIds || !Array.isArray(selectedSshKeyIds) || selectedSshKeyIds.length === 0) {
      return NextResponse.json(
        { error: 'Wallet address and at least one SSH key ID are required' },
        { status: 400 }
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

    // Verify user owns this rental
    if (rental.renterWalletAddress !== walletAddress) {
      return NextResponse.json(
        { error: 'Unauthorized: You do not own this rental' },
        { status: 403 }
      );
    }

    // Check if rental is active
    if (rental.status !== RentalStatus.ACTIVE && rental.status !== RentalStatus.PAUSED) {
      return NextResponse.json(
        { error: 'SSH keys can only be changed for active or paused rentals' },
        { status: 400 }
      );
    }

    // Get user and verify SSH keys belong to them
    const user = await getUserByWallet(walletAddress);
    if (!user || !user.sshKeys || user.sshKeys.length === 0) {
      return NextResponse.json(
        { error: 'User not found or has no SSH keys' },
        { status: 404 }
      );
    }

    // Verify all selected SSH key IDs belong to the user
    const userSshKeyIds = user.sshKeys.map(key => key.id);
    const invalidKeys = selectedSshKeyIds.filter(id => !userSshKeyIds.includes(id));
    if (invalidKeys.length > 0) {
      return NextResponse.json(
        { error: 'One or more selected SSH keys do not belong to you' },
        { status: 400 }
      );
    }

    // Update rental with new SSH keys
    const { updateRental } = await import('@/lib/db/rentals');
    const updatedRental = await updateRental(rentalId, {
      selectedSshKeyIds: selectedSshKeyIds,
    } as any);

    if (!updatedRental) {
      return NextResponse.json(
        { error: 'Failed to update rental SSH keys' },
        { status: 500 }
      );
    }

    // The worker will poll and update authorized_keys automatically
    return NextResponse.json({
      success: true,
      message: 'SSH keys updated successfully. The worker will update the machine shortly.',
      rental: updatedRental,
    });
  } catch (error) {
    console.error('Update rental SSH keys error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

