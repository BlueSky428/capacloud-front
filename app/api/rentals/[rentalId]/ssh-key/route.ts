import { NextRequest, NextResponse } from 'next/server';
import { getRentalById } from '@/lib/db/rentals';
import { getMachineById } from '@/lib/db/machines';
import { RentalStatus } from '@/lib/models/Rental';
import { decrypt } from '@/lib/crypto';

/**
 * Generate and download SSH private key for rental
 * GET /api/rentals/[rentalId]/ssh-key
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
        { error: 'Wallet address is required for authentication' },
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
        { error: 'Rental is not active. SSH keys are only available for active rentals.' },
        { status: 400 }
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

    // With the new system, users use their own SSH keys
    // Return information about selected SSH keys instead of downloading a key
    const { getUserByWallet } = await import('@/lib/db/users');
    const user = await getUserByWallet(rental.renterWalletAddress);
    
    if (!user || !user.sshKeys) {
      return NextResponse.json(
        { error: 'User SSH keys not found' },
        { status: 404 }
      );
    }

    const selectedKeys = rental.selectedSshKeyIds 
      ? user.sshKeys.filter(key => rental.selectedSshKeyIds!.includes(key.id))
      : [];

    if (selectedKeys.length === 0) {
      return NextResponse.json(
        { error: 'No SSH keys selected for this rental. Please update your rental to select SSH keys.' },
        { status: 404 }
      );
    }

    // Return information about the selected keys
    return NextResponse.json({
      message: 'This rental uses your own SSH keys. Use the keys you added to your profile.',
      selectedKeys: selectedKeys.map(key => ({
        id: key.id,
        name: key.name,
        publicKey: key.publicKey,
      })),
      instructions: [
        'Use your own SSH private key that corresponds to one of the selected public keys above.',
        `SSH command: ssh -i /path/to/your/private/key ${rental.sshUser}@${rental.sshHost} -p ${rental.sshPort}`,
      ],
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('SSH key download error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

