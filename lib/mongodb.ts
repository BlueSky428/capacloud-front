import dns from 'dns';
import { MongoClient, Db } from 'mongodb';

// mongodb+srv:// requires SRV DNS lookups; some resolvers (common on Windows) refuse them.
function configureDnsForSrv(): void {
  const uri = process.env.MONGODB_URI;
  if (!uri?.startsWith('mongodb+srv://')) return;

  const configured = process.env.MONGODB_DNS_SERVERS;
  if (configured === 'false' || configured === '0') return;

  const servers = configured
    ? configured.split(',').map((s) => s.trim()).filter(Boolean)
    : ['8.8.8.8', '8.8.4.4', '1.1.1.1'];
  if (servers.length > 0) dns.setServers(servers);
}

const options = {};

let clientPromise: Promise<MongoClient> | null = null;

function getClientPromise(): Promise<MongoClient> {
  if (!process.env.MONGODB_URI) {
    throw new Error('Please add your Mongo URI to .env.local');
  }
  configureDnsForSrv();
  if (clientPromise) return clientPromise;
  const uri = process.env.MONGODB_URI;
  if (process.env.NODE_ENV === 'development') {
    const globalWithMongo = global as typeof globalThis & {
      _mongoClientPromise?: Promise<MongoClient>;
      _mongoUri?: string;
    };
    if (globalWithMongo._mongoUri !== uri) {
      globalWithMongo._mongoClientPromise = undefined;
      globalWithMongo._mongoUri = uri;
      clientPromise = null;
    }
    if (!globalWithMongo._mongoClientPromise) {
      const client = new MongoClient(uri, options);
      globalWithMongo._mongoClientPromise = client.connect();
    }
    clientPromise = globalWithMongo._mongoClientPromise;
  } else {
    const client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }
  return clientPromise;
}

export async function getDb(): Promise<Db> {
  const client = await getClientPromise();
  return client.db(process.env.MONGODB_DB_NAME || 'capacloud');
}

