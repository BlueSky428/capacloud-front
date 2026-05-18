import { NextRequest, NextResponse } from 'next/server';
import { getTransactionsByWallet } from '@/lib/db/transactions';

/**
 * GET /api/transactions?walletAddress={address}
 * Get transaction history for a wallet address
 */
export async function GET(request: NextRequest) {
  try {
    const walletAddress = request.nextUrl.searchParams.get('walletAddress');
    const limitParam = request.nextUrl.searchParams.get('limit');
    const limit = limitParam ? parseInt(limitParam, 10) : 50;

    if (!walletAddress) {
      return NextResponse.json(
        { error: 'Wallet address is required' },
        { status: 400 }
      );
    }

    if (isNaN(limit) || limit < 1 || limit > 100) {
      return NextResponse.json(
        { error: 'Limit must be between 1 and 100' },
        { status: 400 }
      );
    }

    const transactions = await getTransactionsByWallet(walletAddress, limit);

    return NextResponse.json({
      success: true,
      transactions: transactions.map(tx => ({
        transactionId: tx.transactionId,
        type: tx.type,
        amount: tx.amount,
        status: tx.status,
        createdAt: tx.createdAt,
        description: tx.description,
        completedAt: tx.completedAt,
      })),
      count: transactions.length,
    });
  } catch (error) {
    console.error('Get transactions error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

