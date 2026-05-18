import { NextRequest, NextResponse } from 'next/server';
import { getRentalById } from '@/lib/db/rentals';
import { getMachineById } from '@/lib/db/machines';
import { RentalStatus } from '@/lib/models/Rental';
import { decrypt } from '@/lib/crypto';
import { getSSHClient } from '@/lib/ssh-client';

/**
 * Execute command in rented GPU container
 * POST /api/rentals/[rentalId]/console
 * Body: { command: string }
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ rentalId: string }> }
) {
  try {
    const { rentalId } = await params;
    const { command, walletAddress } = await request.json();

    if (!command) {
      return NextResponse.json(
        { error: 'Command is required' },
        { status: 400 }
      );
    }

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
    if (rental.status !== RentalStatus.ACTIVE) {
      return NextResponse.json(
        { error: 'Rental is not active. Only active rentals can execute commands.' },
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

    // Note: With the new system, users use their own SSH keys
    // Console access is not available via web interface anymore
    // Users should connect directly using their own SSH keys
    return NextResponse.json(
      { 
        error: 'Web console is not available. Please use your own SSH key to connect directly via SSH.',
        instructions: [
          'Use your SSH private key that corresponds to one of your selected public keys',
          `SSH command: ssh -i /path/to/your/private/key ${rental.sshUser}@${rental.sshHost} -p ${rental.sshPort}`,
        ]
      },
      { status: 501 } // Not Implemented
    );
  } catch (error) {
    console.error('Console command error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * Stream command execution (SSE)
 * GET /api/rentals/[rentalId]/console?command=...
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ rentalId: string }> }
) {
  try {
    const { rentalId } = await params;
    const searchParams = request.nextUrl.searchParams;
    const command = searchParams.get('command');
    const walletAddress = searchParams.get('walletAddress');

    if (!command) {
      return NextResponse.json(
        { error: 'Command is required' },
        { status: 400 }
      );
    }

    if (!walletAddress) {
      return NextResponse.json(
        { error: 'Wallet address is required' },
        { status: 401 }
      );
    }

    // Get rental and verify ownership
    const rental = await getRentalById(rentalId);
    if (!rental || rental.renterWalletAddress !== walletAddress) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    if (rental.status !== RentalStatus.ACTIVE) {
      return NextResponse.json(
        { error: 'Rental is not active' },
        { status: 400 }
      );
    }

    // Create SSE stream
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        
        const send = (data: string) => {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ data })}\n\n`));
        };

        try {
          // TODO: Implement actual command execution with streaming output
          // For now, send mock output
          send(`$ ${command}\n`);
          send(`[Executing command...]\n`);
          send(`[This is a placeholder. Actual streaming execution needs to be implemented]\n`);
          send(`[Command completed]\n`);
          
          controller.close();
        } catch (error: any) {
          send(`Error: ${error.message}\n`);
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Console stream error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

