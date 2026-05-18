/**
 * SSH Client utility
 * This file uses runtime require() to load ssh2, avoiding Turbopack bundling issues
 * Using Function constructor to prevent static analysis
 */

let ssh2Module: any = null;

export function getSSHClient() {
  if (!ssh2Module) {
    // Use Function constructor to prevent Turbopack from analyzing this require
    // This ensures ssh2 is only loaded at runtime, not during build
    const requireSSH2 = new Function('moduleName', 'return require(moduleName)');
    ssh2Module = requireSSH2('ssh2');
  }
  return ssh2Module.Client;
}

export type SSHClient = ReturnType<typeof getSSHClient>;

