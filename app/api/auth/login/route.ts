import { NextRequest, NextResponse } from 'next/server';
import { getUserByWallet, createUser } from '@/lib/db/users';
import { generateFundWallet } from '@/lib/solana-wallet';

export async function POST(request: NextRequest) {
  try {
    const { walletAddress } = await request.json();

    if (!walletAddress || typeof walletAddress !== 'string') {
      return NextResponse.json(
        { error: 'Wallet address is required' },
        { status: 400 }
      );
    }

    // Check if user exists
    let user = await getUserByWallet(walletAddress);

    if (!user) {
      // Create new user with fund wallet
      const { publicKey: fundWalletAddress, privateKey: fundWalletPrivateKey } = generateFundWallet();

      user = await createUser({
        walletAddress,
        fundWalletAddress,
        fundWalletPrivateKey,
      });
    }

    // Return user data (excluding sensitive private key)
    const { fundWalletPrivateKey, ...userData } = user;

    return NextResponse.json({
      success: true,
      user: userData,
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

