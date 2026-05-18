import { NextRequest, NextResponse } from 'next/server';
import { getMachineByWorkerId, createMachine, getMachineByHostname, updateMachine } from '@/lib/db/machines';
import { getUserByAccountId } from '@/lib/db/users';
import { MachineStatus } from '@/lib/models/Machine';
import { v4 as uuidv4 } from 'uuid';

/**
 * Worker registration endpoint
 * Called by GPU worker when it starts up with account ID
 */
export async function POST(request: NextRequest) {
  try {
    const {
      accountId,
      workerId,
      gpuInfo,
      systemInfo,
      sshPort,
      hostname,
    } = await request.json();

    if (!accountId || !workerId || !gpuInfo) {
      return NextResponse.json(
        { error: 'Missing required fields: accountId, workerId, gpuInfo' },
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

    // Check for duplicate IP/hostname if provided
    if (hostname && hostname.trim() !== '') {
      const existingMachine = await getMachineByHostname(hostname);
      if (existingMachine) {
        return NextResponse.json(
          { error: `IP address or hostname "${hostname}" is already registered by another machine. Each machine must have a unique IP address.` },
          { status: 400 }
        );
      }
    }

    // Check if machine already exists
    let machine = await getMachineByWorkerId(workerId);

    if (machine) {
      // Update existing machine with new info if provided
      const { updateMachine } = await import('@/lib/db/machines');
      const updateData: any = {};
      
      if (sshPort !== undefined) updateData.sshPort = sshPort;
      if (gpuInfo?.type) updateData.gpuType = gpuInfo.type;
      if (gpuInfo?.memory !== undefined) {
        // Convert GPU memory from MB to GB if value is > 1000 (assume it's in MB)
        updateData.gpuMemory = gpuInfo.memory > 1000 
          ? gpuInfo.memory / 1024 
          : gpuInfo.memory;
      }
      if (systemInfo?.cpuCores) updateData.cpuCores = systemInfo.cpuCores;
      if (systemInfo?.ramSize) updateData.ramSize = systemInfo.ramSize;
      if (systemInfo?.diskSize) updateData.diskSize = systemInfo.diskSize;
      if (hostname) updateData.hostname = hostname;
      
      if (Object.keys(updateData).length > 0) {
        machine = await updateMachine(machine._id!, updateData);
      }
      
      return NextResponse.json({
        success: true,
        machine,
        message: 'Worker already registered',
      });
    }

    // Create pending machine with detected specs
    // Convert GPU memory from MB to GB if value is > 1000 (assume it's in MB)
    const gpuMemoryGB = gpuInfo.memory && gpuInfo.memory > 1000 
      ? gpuInfo.memory / 1024 
      : (gpuInfo.memory || 0);
    
    // Use provided hostname/IP or null (will be required during registration completion)
    machine = await createMachine({
      accountId,
      workerId,
      gpuType: gpuInfo.type || 'Unknown',
      gpuMemory: gpuMemoryGB,
      cpuCores: systemInfo?.cpuCores || 4,
      ramSize: systemInfo?.ramSize || 16,
      diskSize: systemInfo?.diskSize || 100,
      sshPort: sshPort || 2222, // Use provided port or default
      ratePerHour: 0.01, // Default, will be set during registration completion
      hostname: hostname || undefined, // IP address or hostname (will be required during registration)
      // Note: sshPublicKey and sshPrivateKey are no longer needed
    });

    return NextResponse.json({
      success: true,
      machine,
      message: 'Worker registered, waiting for registration completion',
    });
  } catch (error) {
    console.error('Worker registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * Worker heartbeat endpoint
 * Called periodically by GPU worker to update status
 */
export async function PUT(request: NextRequest) {
  try {
    const { workerId, gpuUtilization, temperature, powerUsage, uptime } = await request.json();

    if (!workerId) {
      return NextResponse.json(
        { error: 'Worker ID is required' },
        { status: 400 }
      );
    }

    const machine = await getMachineByWorkerId(workerId);
    if (!machine) {
      return NextResponse.json(
        { error: 'Machine not found' },
        { status: 404 }
      );
    }

    // Update machine metrics and heartbeat
    // If machine was offline, restore it to active status
    const updateData: any = {
      gpuUtilization,
      temperature,
      powerUsage,
      uptime,
      lastHeartbeat: new Date(),
    };
    
    // Restore machine to ACTIVE if it was OFFLINE (worker came back online)
    if (machine.status === MachineStatus.OFFLINE) {
      updateData.status = MachineStatus.ACTIVE;
    }
    
    await updateMachine(machine._id!, updateData);

    // Store status history
    try {
      const { createMachineStatusHistory } = await import('@/lib/db/machineStatus');
      await createMachineStatusHistory({
        machineId: machine._id!,
        workerId,
        gpuUtilization: gpuUtilization || 0,
        temperature: temperature || 0,
        powerUsage: powerUsage || 0,
        uptime: uptime || 0,
      });
    } catch (error) {
      console.error('Error storing status history:', error);
      // Don't fail the heartbeat if history storage fails
    }

    return NextResponse.json({
      success: true,
      message: 'Heartbeat updated',
    });
  } catch (error) {
    console.error('Worker heartbeat error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

