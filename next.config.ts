import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    '@solana/wallet-adapter-base',
    '@solana/wallet-adapter-react',
    '@solana/wallet-adapter-react-ui',
    '@solana/wallet-adapter-wallets',
  ],
  // Turbopack configuration for Next.js 16
  turbopack: {
    resolveAlias: {
      // Add any alias configurations if needed
    },
  },
  // Webpack configuration for server-side
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Mark ssh2 as external for server-side bundling
      config.externals = config.externals || [];
      config.externals.push('ssh2');
    }
    return config;
  },
  // Allow cross-origin requests from network IP during development
  allowedDevOrigins: [
    'local-origin.dev',
    '*.local-origin.dev',
    '23.146.184.73',
    'http://23.146.184.73:3000',
  ],
};

export default nextConfig;
