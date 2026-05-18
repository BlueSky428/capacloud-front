import { NextRequest, NextResponse } from 'next/server';
import { getUserBalance, updateUserBalance } from '@/lib/db/users';
import { createTransaction, updateTransactionStatus } from '@/lib/db/transactions';
import { TransactionType, TransactionStatus } from '@/lib/models/Transaction';

export async function GET(request: NextRequest) {
  try {
    const walletAddress = request.nextUrl.searchParams.get('walletAddress');

    if (!walletAddress) {
      return NextResponse.json(
        { error: 'Wallet address is required' },
        { status: 400 }
      );
    }

    const balance = await getUserBalance(walletAddress);

    return NextResponse.json({
      success: true,
      balance,
    });
  } catch (error) {
    console.error('Get balance error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { walletAddress, action, amount } = await request.json();

    if (!walletAddress || !action || !amount) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (amount <= 0) {
      return NextResponse.json(
        { error: 'Amount must be greater than 0' },
        { status: 400 }
      );
    }

    if (action === 'topup') {
      // Top up account balance
      // TODO: Verify Solana transaction before updating balance
      // For now, we'll create a transaction record and update balance
      const transaction = await createTransaction({
        walletAddress,
        type: TransactionType.TOP_UP,
        amount,
        description: `Top up ${amount} USDT`,
      });

      await updateUserBalance(walletAddress, amount);
      await updateTransactionStatus(transaction.transactionId, TransactionStatus.COMPLETED);

      return NextResponse.json({
        success: true,
        message: 'Balance topped up successfully',
        transactionId: transaction.transactionId,
      });
    } else if (action === 'claim') {
      // Claim balance to wallet
      const currentBalance = await getUserBalance(walletAddress);

      if (amount > currentBalance) {
        return NextResponse.json(
          { error: 'Insufficient balance' },
          { status: 400 }
        );
      }

      // TODO: Execute Solana transaction to send funds to user's wallet
      // For now, we'll create a transaction record and update balance
      const transaction = await createTransaction({
        walletAddress,
        type: TransactionType.CLAIM,
        amount: -amount,
        description: `Claim ${amount} USDT to wallet`,
      });

      await updateUserBalance(walletAddress, -amount);
      await updateTransactionStatus(transaction.transactionId, TransactionStatus.COMPLETED);

      return NextResponse.json({
        success: true,
        message: 'Balance claimed successfully',
        transactionId: transaction.transactionId,
      });
    } else {
      return NextResponse.json(
        { error: 'Invalid action. Use "topup" or "claim"' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Balance operation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

