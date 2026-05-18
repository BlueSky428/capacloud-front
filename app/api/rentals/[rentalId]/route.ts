import { NextRequest, NextResponse } from 'next/server';
import { getRentalById, updateRentalStatus } from '@/lib/db/rentals';
import { getMachineById, updateMachine } from '@/lib/db/machines';
import { RentalStatus } from '@/lib/models/Rental';
import { MachineStatus } from '@/lib/models/Machine';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ rentalId: string }> }
) {
  try {
    const { rentalId } = await params;
    const rental = await getRentalById(rentalId);

    if (!rental) {
      return NextResponse.json(
        { error: 'Rental not found' },
        { status: 404 }
      );
    }

    // Get machine details
    const machine = await getMachineById(rental.machineId);

    return NextResponse.json({
      success: true,
      rental,
      machine,
    });
  } catch (error) {
    console.error('Get rental error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ rentalId: string }> }
) {
  try {
    const { rentalId } = await params;
    const { action } = await request.json();

    const rental = await getRentalById(rentalId);
    if (!rental) {
      return NextResponse.json(
        { error: 'Rental not found' },
        { status: 404 }
      );
    }

    let updatedRental;

    switch (action) {
      case 'pause':
        if (rental.status !== RentalStatus.ACTIVE) {
          return NextResponse.json(
            { error: 'Can only pause active rentals' },
            { status: 400 }
          );
        }
        updatedRental = await updateRentalStatus(rentalId, RentalStatus.PAUSED, {
          pausedAt: new Date(),
        });
        break;

      case 'resume':
        if (rental.status !== RentalStatus.PAUSED) {
          return NextResponse.json(
            { error: 'Can only resume paused rentals' },
            { status: 400 }
          );
        }
        updatedRental = await updateRentalStatus(rentalId, RentalStatus.ACTIVE, {
          resumedAt: new Date(),
        });
        break;

      case 'stop':
      case 'delete':
        if (rental.status === RentalStatus.COMPLETED) {
          return NextResponse.json(
            { error: 'Rental already completed' },
            { status: 400 }
          );
        }
        
        // Calculate final cost
        const now = new Date();
        const hoursUsed = (now.getTime() - rental.startedAt.getTime()) / (1000 * 60 * 60);
        const totalCost = hoursUsed * rental.ratePerHour;

        updatedRental = await updateRentalStatus(rentalId, RentalStatus.COMPLETED, {
          endedAt: now,
          totalCost,
          hoursUsed,
        });

        // Update machine status back to active
        await updateMachine(rental.machineId.toString(), {
          status: MachineStatus.ACTIVE,
        });
        break;

      case 'reboot':
        // TODO: Implement reboot via worker API
        return NextResponse.json({
          success: true,
          message: 'Reboot command sent to machine',
        });

      case 'boot':
        // TODO: Implement boot via worker API
        return NextResponse.json({
          success: true,
          message: 'Boot command sent to machine',
        });

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      rental: updatedRental,
    });
  } catch (error) {
    console.error('Update rental error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

