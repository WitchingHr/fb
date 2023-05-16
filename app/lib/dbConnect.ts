import { PrismaClient } from "@prisma/client";

// create global variable for prisma client
declare global {
  var prisma: PrismaClient | undefined;
}

// check to use existing prisma client or create a new one
const client = globalThis.prisma || new PrismaClient();

// if in development, set global prisma to client
if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = client;
}

export default client;
