import { NextRequest, NextResponse } from 'next/server';
import { getMachineById, updateMachine } from '@/lib/db/machines';
import { createRental } from '@/lib/db/rentals';
import { getActiveRentalByMachine } from '@/lib/db/rentals';
import { getUserByWallet, updateUserBalance } from '@/lib/db/users';
import { createTransaction, updateTransactionStatus } from '@/lib/db/transactions';
import { MachineStatus } from '@/lib/models/Machine';
import { RentalStatus } from '@/lib/models/Rental';
import { TransactionType, TransactionStatus } from '@/lib/models/Transaction';

export async function POST(request: NextRequest) {
  try {
    const { machineId, renterWalletAddress, selectedSshKeyIds } = await request.json();

    if (!machineId || !renterWalletAddress) {
      return NextResponse.json(
        { error: 'Machine ID and wallet address are required' },
        { status: 400 }
      );
    }

    if (!selectedSshKeyIds || !Array.isArray(selectedSshKeyIds) || selectedSshKeyIds.length === 0) {
      return NextResponse.json(
        { error: 'At least one SSH key must be selected' },
        { status: 400 }
      );
    }

    // Get machine
    const machine = await getMachineById(machineId);
    if (!machine) {
      return NextResponse.json(
        { error: 'Machine not found' },
        { status: 404 }
      );
    }

    // Check if machine is available (must be ACTIVE, not OFFLINE or other statuses)
    if (machine.status === MachineStatus.OFFLINE) {
      return NextResponse.json(
        { error: 'Machine is offline and cannot be rented. Please select an active machine.' },
        { status: 400 }
      );
    }
    
    if (machine.status !== MachineStatus.ACTIVE) {
      return NextResponse.json(
        { error: 'Machine is not available for rent. Machine must be active.' },
        { status: 400 }
      );
    }

    // Check if machine is already rented
    const activeRental = await getActiveRentalByMachine(machine._id!);
    if (activeRental) {
      return NextResponse.json(
        { error: 'Machine is already rented' },
        { status: 400 }
      );
    }

    // Check if user is trying to rent their own machine
    const renter = await getUserByWallet(renterWalletAddress);
    if (renter && renter.accountId === machine.accountId) {
      return NextResponse.json(
        { error: 'Cannot rent your own machine' },
        { status: 400 }
      );
    }

    // Verify user has at least one SSH key
    if (!renter || !renter.sshKeys || renter.sshKeys.length === 0) {
      return NextResponse.json(
        { error: 'You must have at least one SSH key in your profile to rent a machine. Please add an SSH key in your settings.' },
        { status: 400 }
      );
    }

    // Verify all selected SSH key IDs belong to the user
    const userSshKeyIds = renter.sshKeys.map(key => key.id);
    const invalidKeys = selectedSshKeyIds.filter(id => !userSshKeyIds.includes(id));
    if (invalidKeys.length > 0) {
      return NextResponse.json(
        { error: 'One or more selected SSH keys do not belong to you' },
        { status: 400 }
      );
    }

    // Check if user has sufficient balance (minimum 10 USDT for first rent)
    const MINIMUM_BALANCE = 10;
    const userBalance = renter.accountBalance || 0;
    if (userBalance < MINIMUM_BALANCE) {
      return NextResponse.json(
        { error: `Insufficient balance. Minimum ${MINIMUM_BALANCE} USDT required for first rent. Please top up your account.` },
        { status: 400 }
      );
    }
    
    // Also check if user has enough for at least 1 hour
    if (userBalance < machine.ratePerHour) {
      return NextResponse.json(
        { error: `Insufficient balance. You need at least ${machine.ratePerHour} USDT (1 hour rate) to rent this machine.` },
        { status: 400 }
      );
    }

    // Get selected SSH public keys
    const selectedSshKeys = renter.sshKeys.filter(key => selectedSshKeyIds.includes(key.id));
    const sshPublicKeys = selectedSshKeys.map(key => key.publicKey);

    // Ensure hostname is configured (not localhost)
    const sshHost = machine.hostname && machine.hostname !== 'localhost' 
      ? machine.hostname 
      : machine.hostname || 'localhost';

    // Get provider user to track earnings
    const { getUserByAccountId } = await import('@/lib/db/users');
    const provider = await getUserByAccountId(machine.accountId);
    
    // Create rental with selected SSH keys
    const rental = await createRental({
      machineId: machine._id!,
      renterWalletAddress,
      providerAccountId: machine.accountId,
      ratePerHour: machine.ratePerHour,
      sshHost,
      sshPort: machine.sshPort,
      sshUser: 'root', // Default SSH user
      selectedSshKeyIds: selectedSshKeyIds,
    });

    // Note: In prepay mode, we don't deduct balance upfront
    // Hourly deductions will be handled by a background job/cron
    // Transaction records will be created for tracking purposes

    // The worker will poll for rentals and add the selected SSH keys to authorized_keys
    console.log(`Rental ${rental.rentalId} created with ${selectedSshKeyIds.length} SSH key(s). Worker will add keys to machine.`);

    // Update machine status
    await updateMachine(machineId, {
      status: MachineStatus.RENTED,
    });

    return NextResponse.json({
      success: true,
      rental,
      message: 'Machine rented successfully',
    });
  } catch (error) {
    console.error('Create rental error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

