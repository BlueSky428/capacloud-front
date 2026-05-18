import { NextRequest, NextResponse } from 'next/server';
import { getRentalById } from '@/lib/db/rentals';
import { getMachineById } from '@/lib/db/machines';
import { getMachineByWorkerId } from '@/lib/db/machines';

/**
 * Check SSH connection status for a rental
 * GET /api/rentals/[rentalId]/ssh-status
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
        { error: 'Wallet address is required' },
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

    if (rental.renterWalletAddress !== walletAddress) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
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

    // Check if SSH key has been added to worker
    const workerKeysResponse = await fetch(
      `${request.nextUrl.origin}/api/worker/add-ssh-key?workerId=${machine.workerId}`
    );
    let keysStatus = null;
    if (workerKeysResponse.ok) {
      const keysData = await workerKeysResponse.json();
      if (keysData.success) {
        const rentalKey = keysData.keys?.find((k: any) => k.rentalId === rentalId);
        keysStatus = {
          found: !!rentalKey,
          publicKey: rentalKey?.publicKey || null,
        };
      }
    }

    return NextResponse.json({
      success: true,
      status: {
        rentalId: rental.rentalId,
        sshHost: rental.sshHost || machine.hostname,
        sshPort: rental.sshPort || machine.sshPort,
        sshUser: rental.sshUser || 'root',
        machineStatus: machine.status,
        workerId: machine.workerId,
        keyInWorker: keysStatus?.found || false,
        connectionInfo: {
          host: rental.sshHost || machine.hostname,
          port: rental.sshPort || machine.sshPort,
          user: rental.sshUser || 'root',
          command: `ssh -i capacloud_${rentalId}.pem ${rental.sshUser || 'root'}@${rental.sshHost || machine.hostname} -p ${rental.sshPort || machine.sshPort}`,
        },
        troubleshooting: {
          connectionRefused: {
            possibleCauses: [
              'SSH server not running in container',
              'Port not properly forwarded',
              'Firewall blocking connection',
              'SSH key not added to authorized_keys',
            ],
            steps: [
              '1. Verify the worker is running and has processed the SSH key',
              '2. Check if SSH server is installed in the container',
              '3. Verify port forwarding is correct (host:container)',
              '4. Check firewall rules on the host machine',
              '5. Try connecting from the host machine to verify SSH is accessible',
            ],
          },
        },
      },
    });
  } catch (error) {
    console.error('Get SSH status error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

