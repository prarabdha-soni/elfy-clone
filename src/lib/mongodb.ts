// Server-only. Never import this from client components — it is only ever
// pulled in dynamically inside createServerFn handlers.
import { readFileSync } from "node:fs";
import { MongoClient, type Collection } from "mongodb";

export type ProductDoc = {
  _id?: unknown;
  name: string;
  price: string;
  compare?: string;
  img: string;
  tag?: string;
  section: string;
  createdAt: Date;
};

// Vite/Nitro don't always inject non-VITE_ vars into process.env in dev, so
// fall back to parsing the project .env file directly.
function readEnv(key: string): string | undefined {
  if (process.env[key]) return process.env[key];
  try {
    const raw = readFileSync(new URL("../../.env", import.meta.url), "utf8");
    for (const line of raw.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      if (trimmed.slice(0, eq).trim() === key) {
        return trimmed.slice(eq + 1).trim();
      }
    }
  } catch {
    // .env missing (e.g. prod) — rely on process.env only.
  }
  return undefined;
}

export function getAdminPassword(): string {
  return readEnv("ADMIN_PASSWORD") ?? "rajshrimahal";
}

const DB_NAME = "rajshrimahal";
const COLLECTION = "products";

// Cache the client across hot reloads / invocations.
const globalForMongo = globalThis as unknown as { _mongoClient?: Promise<MongoClient> };

function getClient(): Promise<MongoClient> {
  if (!globalForMongo._mongoClient) {
    const uri = readEnv("MONGODB_URI");
    if (!uri) throw new Error("MONGODB_URI is not configured");
    globalForMongo._mongoClient = new MongoClient(uri).connect();
  }
  return globalForMongo._mongoClient;
}

export async function getProductsCollection(): Promise<Collection<ProductDoc>> {
  const client = await getClient();
  return client.db(DB_NAME).collection<ProductDoc>(COLLECTION);
}
