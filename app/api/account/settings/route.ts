import { NextRequest, NextResponse } from 'next/server';
import { getUserByWallet, updateUser } from '@/lib/db/users';

export async function GET(request: NextRequest) {
  try {
    const walletAddress = request.nextUrl.searchParams.get('walletAddress');

    if (!walletAddress) {
      return NextResponse.json(
        { error: 'Wallet address is required' },
        { status: 400 }
      );
    }

    const user = await getUserByWallet(walletAddress);

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Return user settings (excluding sensitive data)
    const { fundWalletPrivateKey, ...userData } = user;

    return NextResponse.json({
      success: true,
      user: userData,
    });
  } catch (error) {
    console.error('Get settings error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { walletAddress, contactEmail, contactDiscord, contactTelegram } = await request.json();

    if (!walletAddress) {
      return NextResponse.json(
        { error: 'Wallet address is required' },
        { status: 400 }
      );
    }

    const updateData: any = {};
    if (contactEmail !== undefined) updateData.contactEmail = contactEmail;
    if (contactDiscord !== undefined) updateData.contactDiscord = contactDiscord;
    if (contactTelegram !== undefined) updateData.contactTelegram = contactTelegram;

    const user = await updateUser(walletAddress, updateData);

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const { fundWalletPrivateKey, ...userData } = user;

    return NextResponse.json({
      success: true,
      user: userData,
    });
  } catch (error) {
    console.error('Update settings error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

