import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ??
  new PrismaClient(
    process.env.NODE_ENV !== "production" ? { log: ["warn", "error"] } : undefined
  );

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;


