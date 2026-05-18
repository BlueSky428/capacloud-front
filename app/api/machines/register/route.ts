import { NextRequest, NextResponse } from 'next/server';
import { getMachineByWorkerId, createMachine, updateMachine, getMachineByHostname } from '@/lib/db/machines';
import { getUserByAccountId } from '@/lib/db/users';
import { MachineStatus } from '@/lib/models/Machine';

export async function POST(request: NextRequest) {
  try {
    const {
      accountId,
      workerId,
      gpuType,
      gpuMemory,
      cpuCores,
      ramSize,
      diskSize,
      sshPort,
      sshPublicKey,
      ratePerHour,
      hostname,
      location,
    } = await request.json();

    // Validate required fields
    // Note: sshPublicKey is no longer required - only consumers need SSH access with their own keys
    if (!accountId || !workerId || !gpuType || !gpuMemory || !cpuCores || 
        !ramSize || !diskSize || !sshPort || !ratePerHour) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate accountId exists in database
    const user = await getUserByAccountId(accountId);
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid account ID. Account does not exist.' },
        { status: 404 }
      );
    }

    // Validate hostname/IP address (required for SSH connections)
    if (!hostname || hostname.trim() === '' || hostname === 'localhost') {
      return NextResponse.json(
        { error: 'IP address or hostname is required for SSH connections. Please provide a valid IP address or hostname.' },
        { status: 400 }
      );
    }

    // Basic IP/hostname validation
    const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
    const hostnameRegex = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!ipRegex.test(hostname) && !hostnameRegex.test(hostname) && !hostname.includes('.')) {
      return NextResponse.json(
        { error: 'Invalid IP address or hostname format. Please provide a valid IP address (e.g., 192.168.1.100) or hostname (e.g., machine.example.com).' },
        { status: 400 }
      );
    }

    // Check if machine with this workerId already exists
    const existingMachine = await getMachineByWorkerId(workerId);

    if (existingMachine) {
      // Verify accountId matches existing machine
      if (existingMachine.accountId !== accountId) {
        return NextResponse.json(
          { error: 'Account ID does not match the existing machine. Cannot register machine under different account.' },
          { status: 403 }
        );
      }

      // Update existing machine if it's pending
      if (existingMachine.status === MachineStatus.PENDING) {
        // Check for duplicate IP/hostname (exclude current machine)
        const duplicateMachine = await getMachineByHostname(hostname, existingMachine._id);
        if (duplicateMachine) {
          return NextResponse.json(
            { error: `IP address or hostname "${hostname}" is already registered by another machine. Each machine must have a unique IP address.` },
            { status: 400 }
          );
        }

        const updated = await updateMachine(existingMachine._id!, {
          gpuType,
          gpuMemory,
          cpuCores,
          ramSize,
          diskSize,
          sshPort,
          // sshPublicKey is optional - providers don't need SSH access
          ...(sshPublicKey && { sshPublicKey }),
          ratePerHour,
          hostname,
          location,
          status: MachineStatus.ACTIVE, // Activate after registration
        });

        return NextResponse.json({
          success: true,
          machine: updated,
          message: 'Machine registered successfully',
        });
      } else {
        return NextResponse.json(
          { error: 'Machine already registered' },
          { status: 400 }
        );
      }
    }

    // Check for duplicate IP/hostname before creating new machine
    const duplicateMachine = await getMachineByHostname(hostname);
    if (duplicateMachine) {
      return NextResponse.json(
        { error: `IP address or hostname "${hostname}" is already registered by another machine. Each machine must have a unique IP address.` },
        { status: 400 }
      );
    }

    // Create new machine (backward compatibility - normal flow is worker creates PENDING first)
    // Note: In normal workflow, the worker should have already created a PENDING machine
    // via POST /api/worker/register during installation
    const machine = await createMachine({
      accountId,
      workerId,
      gpuType,
      gpuMemory,
      cpuCores,
      ramSize,
      diskSize,
      sshPort,
      // sshPublicKey is optional - providers don't need SSH access
      ...(sshPublicKey && { sshPublicKey }),
      ratePerHour,
      hostname,
      location,
    });

    // Activate machine after registration
    const activated = await updateMachine(machine._id!, {
      status: MachineStatus.ACTIVE,
    });

    return NextResponse.json({
      success: true,
      machine: activated,
      message: 'Machine registered successfully',
    });
  } catch (error) {
    console.error('Register machine error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

