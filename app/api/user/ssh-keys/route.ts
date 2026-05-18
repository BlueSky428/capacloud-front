import { NextRequest, NextResponse } from 'next/server';
import { getUserByWallet, updateUser } from '@/lib/db/users';
import { UserSSHKey } from '@/lib/models/User';
import { v4 as uuidv4 } from 'uuid';

/**
 * Get user's SSH keys
 * GET /api/user/ssh-keys?walletAddress=...
 */
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

    return NextResponse.json({
      success: true,
      sshKeys: user.sshKeys || [],
    });
  } catch (error) {
    console.error('Get SSH keys error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * Add SSH key to user profile
 * POST /api/user/ssh-keys
 * Body: { walletAddress: string, name: string, publicKey: string }
 */
export async function POST(request: NextRequest) {
  try {
    const { walletAddress, name, publicKey } = await request.json();

    if (!walletAddress || !name || !publicKey) {
      return NextResponse.json(
        { error: 'Wallet address, name, and public key are required' },
        { status: 400 }
      );
    }

    // Validate SSH public key format (basic check)
    if (!publicKey.startsWith('ssh-rsa ') && !publicKey.startsWith('ssh-ed25519 ') && !publicKey.startsWith('ecdsa-sha2-')) {
      return NextResponse.json(
        { error: 'Invalid SSH public key format' },
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

    const existingKeys = user.sshKeys || [];
    
    // Check if key already exists
    if (existingKeys.some(key => key.publicKey === publicKey)) {
      return NextResponse.json(
        { error: 'This SSH key is already added' },
        { status: 400 }
      );
    }

    const newKey: UserSSHKey = {
      id: uuidv4(),
      name,
      publicKey,
      createdAt: new Date(),
    };

    const updatedKeys = [...existingKeys, newKey];
    
    const updatedUser = await updateUser(walletAddress, {
      sshKeys: updatedKeys,
    });

    if (!updatedUser) {
      return NextResponse.json(
        { error: 'Failed to add SSH key' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      sshKey: newKey,
      message: 'SSH key added successfully',
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
 * Update SSH key
 * PUT /api/user/ssh-keys
 * Body: { walletAddress: string, keyId: string, name?: string, publicKey?: string }
 */
export async function PUT(request: NextRequest) {
  try {
    const { walletAddress, keyId, name, publicKey } = await request.json();

    if (!walletAddress || !keyId) {
      return NextResponse.json(
        { error: 'Wallet address and key ID are required' },
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

    const existingKeys = user.sshKeys || [];
    const keyIndex = existingKeys.findIndex(key => key.id === keyId);

    if (keyIndex === -1) {
      return NextResponse.json(
        { error: 'SSH key not found' },
        { status: 404 }
      );
    }

    // Validate public key if provided
    if (publicKey && !publicKey.startsWith('ssh-rsa ') && !publicKey.startsWith('ssh-ed25519 ') && !publicKey.startsWith('ecdsa-sha2-')) {
      return NextResponse.json(
        { error: 'Invalid SSH public key format' },
        { status: 400 }
      );
    }

    // Check if new public key already exists (if changed)
    if (publicKey && publicKey !== existingKeys[keyIndex].publicKey) {
      if (existingKeys.some(key => key.id !== keyId && key.publicKey === publicKey)) {
        return NextResponse.json(
          { error: 'This SSH key is already added' },
          { status: 400 }
        );
      }
    }

    const updatedKeys = [...existingKeys];
    updatedKeys[keyIndex] = {
      ...updatedKeys[keyIndex],
      name: name !== undefined ? name : updatedKeys[keyIndex].name,
      publicKey: publicKey !== undefined ? publicKey : updatedKeys[keyIndex].publicKey,
    };

    const updatedUser = await updateUser(walletAddress, {
      sshKeys: updatedKeys,
    });

    if (!updatedUser) {
      return NextResponse.json(
        { error: 'Failed to update SSH key' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      sshKey: updatedKeys[keyIndex],
      message: 'SSH key updated successfully',
    });
  } catch (error) {
    console.error('Update SSH key error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * Delete SSH key
 * DELETE /api/user/ssh-keys?walletAddress=...&keyId=...
 */
export async function DELETE(request: NextRequest) {
  try {
    const walletAddress = request.nextUrl.searchParams.get('walletAddress');
    const keyId = request.nextUrl.searchParams.get('keyId');

    if (!walletAddress || !keyId) {
      return NextResponse.json(
        { error: 'Wallet address and key ID are required' },
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

    const existingKeys = user.sshKeys || [];
    const updatedKeys = existingKeys.filter(key => key.id !== keyId);

    if (updatedKeys.length === existingKeys.length) {
      return NextResponse.json(
        { error: 'SSH key not found' },
        { status: 404 }
      );
    }

    const updatedUser = await updateUser(walletAddress, {
      sshKeys: updatedKeys,
    });

    if (!updatedUser) {
      return NextResponse.json(
        { error: 'Failed to delete SSH key' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'SSH key deleted successfully',
    });
  } catch (error) {
    console.error('Delete SSH key error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

