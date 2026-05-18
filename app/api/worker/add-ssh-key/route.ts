import { NextRequest, NextResponse } from 'next/server';
import { getMachineByWorkerId, updateMachine } from '@/lib/db/machines';
import { getRentalsByMachine } from '@/lib/db/rentals';
import { RentalStatus } from '@/lib/models/Rental';

/**
 * Worker API endpoint to add SSH public keys to authorized_keys
 * POST /api/worker/add-ssh-key
 * Body: { workerId: string, publicKey: string }
 * 
 * This endpoint is called by the worker to add a public key to authorized_keys
 * The worker should authenticate using its worker ID
 */
export async function POST(request: NextRequest) {
  try {
    const { workerId, publicKey, rentalId } = await request.json();

    if (!workerId || !publicKey) {
      return NextResponse.json(
        { error: 'workerId and publicKey are required' },
        { status: 400 }
      );
    }

    // Get machine by worker ID
    const machine = await getMachineByWorkerId(workerId);
    if (!machine) {
      return NextResponse.json(
        { error: 'Machine not found' },
        { status: 404 }
      );
    }

    // If rentalId is provided, verify the rental exists and is active
    if (rentalId) {
      const rentals = await getRentalsByMachine(machine._id!);
      const rental = rentals.find(r => r.rentalId === rentalId);
      
      if (!rental) {
        return NextResponse.json(
          { error: 'Rental not found' },
          { status: 404 }
        );
      }

      if (rental.status !== RentalStatus.ACTIVE && rental.status !== RentalStatus.PAUSED) {
        return NextResponse.json(
          { error: 'Rental is not active' },
          { status: 400 }
        );
      }

      // Verify the public key belongs to the rental's selected keys
      if (rental.selectedSshKeyIds && rental.selectedSshKeyIds.length > 0) {
        const { getUserByWallet } = await import('@/lib/db/users');
        const renter = await getUserByWallet(rental.renterWalletAddress);
        if (renter && renter.sshKeys) {
          const rentalKeys = renter.sshKeys.filter(key => rental.selectedSshKeyIds!.includes(key.id));
          const keyMatches = rentalKeys.some(key => key.publicKey === publicKey);
          if (!keyMatches) {
            return NextResponse.json(
              { error: 'Public key does not match any of the rental\'s selected keys' },
              { status: 403 }
            );
          }
        }
      }
    }

    // Return success - the worker will add the key to authorized_keys
    // The actual key addition happens on the worker side
    return NextResponse.json({
      success: true,
      message: 'Public key approved for addition to authorized_keys',
      instructions: [
        `Add the following public key to ~/.ssh/authorized_keys on the machine:`,
        publicKey,
        '',
        'Or append to authorized_keys file:',
        `echo "${publicKey}" >> ~/.ssh/authorized_keys`,
        '',
        'For Docker containers, add to the container\'s authorized_keys:',
        `docker exec -i ${machine.workerId || 'capa-gpu-1'} sh -c "echo '${publicKey}' >> /root/.ssh/authorized_keys"`,
      ],
    });
  } catch (error) {
    console.error('Add SSH key error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * Get pending SSH keys for a worker
 * GET /api/worker/add-ssh-key?workerId=...
 * 
 * Returns list of active rentals with public keys that need to be added
 */
export async function GET(request: NextRequest) {
  try {
    const workerId = request.nextUrl.searchParams.get('workerId');

    if (!workerId) {
      return NextResponse.json(
        { error: 'workerId is required' },
        { status: 400 }
      );
    }

    // Get machine by worker ID
    const machine = await getMachineByWorkerId(workerId);
    if (!machine) {
      return NextResponse.json(
        { error: 'Machine not found' },
        { status: 404 }
      );
    }

    // Get all active rentals for this machine
    const rentals = await getRentalsByMachine(machine._id!);
    const activeRentals = rentals.filter(
      r => (r.status === RentalStatus.ACTIVE || r.status === RentalStatus.PAUSED) && r.selectedSshKeyIds && r.selectedSshKeyIds.length > 0
    );

    // Get user SSH keys for active rentals
    const { getUserByWallet } = await import('@/lib/db/users');
    const allPublicKeys: Array<{ rentalId: string; publicKey: string; sshUser: string }> = [];

    for (const rental of activeRentals) {
      if (rental.selectedSshKeyIds && rental.selectedSshKeyIds.length > 0) {
        const renter = await getUserByWallet(rental.renterWalletAddress);
        if (renter && renter.sshKeys) {
          const selectedKeys = renter.sshKeys.filter(key => rental.selectedSshKeyIds!.includes(key.id));
          for (const key of selectedKeys) {
            allPublicKeys.push({
              rentalId: rental.rentalId,
              publicKey: key.publicKey,
              sshUser: rental.sshUser || 'root',
            });
          }
        }
      }
    }

    return NextResponse.json({
      success: true,
      keys: allPublicKeys,
      // Also return cancelled/completed rentals so worker can clean up their keys
      keysToRemove: rentals
        .filter(r => (r.status === RentalStatus.CANCELLED || r.status === RentalStatus.COMPLETED) && r.selectedSshKeyIds && r.selectedSshKeyIds.length > 0)
        .map(rental => ({
          rentalId: rental.rentalId,
          keyIds: rental.selectedSshKeyIds || [],
        })),
    });
  } catch (error) {
    console.error('Get SSH keys error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

