import { NextRequest, NextResponse } from 'next/server';
import { getRentalById } from '@/lib/db/rentals';
import { getMachineById } from '@/lib/db/machines';

/**
 * Comprehensive SSH connection diagnosis
 * GET /api/rentals/[rentalId]/diagnose-ssh
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ rentalId: string }> }
) {
  try {
    const { rentalId } = await params;
    const walletAddress = request.nextUrl.searchParams.get('walletAddress');

    if (!walletAddress) {
      return NextResponse.json(
        { error: 'Wallet address is required' },
        { status: 401 }
      );
    }

    // Get rental and verify ownership
    const rental = await getRentalById(rentalId);
    if (!rental) {
      return NextResponse.json(
        { error: 'Rental not found' },
        { status: 404 }
      );
    }

    if (rental.renterWalletAddress !== walletAddress) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    // Get machine details
    const machine = await getMachineById(rental.machineId);
    if (!machine) {
      return NextResponse.json(
        { error: 'Machine not found' },
        { status: 404 }
      );
    }

    const diagnosis = {
      rentalId: rental.rentalId,
      connectionInfo: {
        host: rental.sshHost || machine.hostname,
        port: rental.sshPort || machine.sshPort,
        user: rental.sshUser || 'root',
        command: `ssh -i capacloud_${rentalId}.pem ${rental.sshUser || 'root'}@${rental.sshHost || machine.hostname} -p ${rental.sshPort || machine.sshPort}`,
      },
      possibleIssues: [
        {
          issue: 'Container not running',
          check: 'docker ps | grep capa-gpu-1',
          fix: 'sudo systemctl restart capa-worker',
          description: 'The Docker container may not be running. Check with docker ps.',
        },
        {
          issue: 'SSH server not installed in container',
          check: 'docker exec capa-gpu-1 which sshd',
          fix: 'docker exec capa-gpu-1 sh -c "apt-get update && apt-get install -y openssh-server"',
          description: 'SSH server may not be installed in the container.',
        },
        {
          issue: 'SSH daemon not running',
          check: 'docker exec capa-gpu-1 pgrep sshd',
          fix: 'docker exec -d capa-gpu-1 /usr/sbin/sshd -D',
          description: 'SSH daemon may not be running inside the container.',
        },
        {
          issue: 'Port not properly forwarded',
          check: 'docker port capa-gpu-1 | grep 22',
          fix: 'Restart container: docker restart capa-gpu-1',
          description: 'Docker port mapping may not be working. Check with docker port.',
        },
        {
          issue: 'Port not listening on host',
          check: 'netstat -tlnp | grep 2222',
          fix: 'Check Docker port mapping and firewall',
          description: 'Port 2222 may not be listening on the host machine.',
        },
        {
          issue: 'Firewall blocking connection',
          check: 'sudo ufw status | grep 2222',
          fix: 'sudo ufw allow 2222/tcp',
          description: 'Firewall may be blocking the SSH port.',
        },
        {
          issue: 'SSH key not added to container',
          check: 'docker exec capa-gpu-1 cat /root/.ssh/authorized_keys | grep -i "capacloud-rental"',
          fix: 'Wait for worker to poll (1 minute) or manually add key',
          description: 'The rental SSH key may not have been added to authorized_keys yet.',
        },
        {
          issue: 'Container created with old method',
          check: 'docker inspect capa-gpu-1 | grep -i ssh',
          fix: 'Restart worker: sudo systemctl restart capa-worker',
          description: 'Container may have been created before SSH setup was improved.',
        },
        {
          issue: 'Docker networking issue',
          check: 'docker network inspect bridge | grep -A 10 capa-gpu-1',
          fix: 'Restart Docker: sudo systemctl restart docker',
          description: 'Docker networking may have issues.',
        },
        {
          issue: 'Host IP address incorrect',
          check: 'curl -s https://api.ipify.org',
          fix: 'Update machine hostname in provider settings',
          description: 'The IP address registered may not be correct or accessible.',
        },
      ],
      troubleshootingSteps: [
        {
          step: 1,
          action: 'Check if container is running',
          command: 'docker ps | grep capa-gpu-1',
          expected: 'Container should be listed and status should be "Up"',
        },
        {
          step: 2,
          action: 'Check if SSH is installed in container',
          command: 'docker exec capa-gpu-1 which sshd',
          expected: 'Should return /usr/sbin/sshd',
        },
        {
          step: 3,
          action: 'Check if SSH daemon is running',
          command: 'docker exec capa-gpu-1 pgrep sshd',
          expected: 'Should return a process ID',
        },
        {
          step: 4,
          action: 'Check port mapping',
          command: 'docker port capa-gpu-1',
          expected: 'Should show 0.0.0.0:2222->22/tcp',
        },
        {
          step: 5,
          action: 'Check if port is listening on host',
          command: 'netstat -tlnp | grep 2222',
          expected: 'Should show port 2222 listening',
        },
        {
          step: 6,
          action: 'Check firewall status',
          command: 'sudo ufw status (or sudo firewall-cmd --list-ports)',
          expected: 'Port 2222/tcp should be allowed',
        },
        {
          step: 7,
          action: 'Check if SSH key is in container',
          command: 'docker exec capa-gpu-1 cat /root/.ssh/authorized_keys',
          expected: 'Should contain the rental public key',
        },
        {
          step: 8,
          action: 'Check worker logs',
          command: 'tail -50 ~/capa-worker.log | grep -i ssh',
          expected: 'Should show SSH key addition messages',
        },
        {
          step: 9,
          action: 'Test SSH from host machine',
          command: 'ssh -p 2222 root@localhost',
          expected: 'Should connect (may need key)',
        },
        {
          step: 10,
          action: 'Check container logs',
          command: 'docker logs capa-gpu-1 | tail -20',
          expected: 'Should show SSH daemon starting',
        },
      ],
      quickFixes: [
        {
          name: 'Restart Worker Service',
          command: 'sudo systemctl restart capa-worker',
          description: 'Restarts the worker which will ensure SSH is properly configured',
        },
        {
          name: 'Restart Container',
          command: 'docker restart capa-gpu-1',
          description: 'Restarts the container which may fix networking issues',
        },
        {
          name: 'Reinstall SSH in Container',
          command: 'docker exec capa-gpu-1 sh -c "apt-get update && apt-get install -y openssh-server && /usr/sbin/sshd -D"',
          description: 'Installs and starts SSH server in the container',
        },
        {
          name: 'Fix Firewall',
          command: 'sudo ufw allow 2222/tcp && sudo ufw reload',
          description: 'Opens the SSH port in the firewall',
        },
        {
          name: 'Check and Fix Port Mapping',
          command: 'docker stop capa-gpu-1 && docker rm capa-gpu-1 && sudo systemctl restart capa-worker',
          description: 'Removes and recreates container with proper port mapping',
        },
      ],
    };

    return NextResponse.json({
      success: true,
      diagnosis,
    });
  } catch (error) {
    console.error('Diagnose SSH error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

