import "dotenv/config";

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg"; // Assuming you're using pg for the adapter

// Setup the connection pool and adapter
const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

// efine a function to create the client instance
const prismaClientSingleton = () => {
  return new PrismaClient({
    adapter,
    log: ["query"],
  });
};

// Tell TypeScript about the global prisma variable
declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

// Use the global instance if it exists, otherwise create a new one
export const prisma = globalThis.prisma ?? prismaClientSingleton();

// In development, save the instance to globalThis to survive HMR
if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}