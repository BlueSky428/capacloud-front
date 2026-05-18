import { NextRequest, NextResponse } from 'next/server';
import { getAllRentalsByWallet, getActiveRentalsByWallet } from '@/lib/db/rentals';
import { getMachineById } from '@/lib/db/machines';
import { getUserByAccountId } from '@/lib/db/users';

export async function GET(request: NextRequest) {
  try {
    const walletAddress = request.nextUrl.searchParams.get('walletAddress');
    const activeOnly = request.nextUrl.searchParams.get('activeOnly') === 'true';

    if (!walletAddress) {
      return NextResponse.json(
        { error: 'Wallet address is required' },
        { status: 400 }
      );
    }

    const rentals = activeOnly
      ? await getActiveRentalsByWallet(walletAddress)
      : await getAllRentalsByWallet(walletAddress);

    // Enrich rentals with machine and provider information
    const enrichedRentals = await Promise.all(
      rentals.map(async (rental) => {
        const machine = rental.machineId ? await getMachineById(rental.machineId) : null;
        const provider = rental.providerAccountId ? await getUserByAccountId(rental.providerAccountId) : null;
        
        return {
          ...rental,
          gpuType: machine?.gpuType || 'Unknown GPU',
          gpuMemory: machine?.gpuMemory || 0,
          providerName: provider?.walletAddress ? `${provider.walletAddress.slice(0, 4)}...${provider.walletAddress.slice(-4)}` : rental.providerAccountId,
          sshHost: rental.sshHost || machine?.hostname || 'localhost',
          sshPort: rental.sshPort || machine?.sshPort || 2222,
          sshUser: rental.sshUser || 'root',
        };
      })
    );

    return NextResponse.json({
      success: true,
      rentals: enrichedRentals,
    });
  } catch (error) {
    console.error('List rentals error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

