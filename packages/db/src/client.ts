import { PrismaClient } from "../generated/prisma/client.js";
import "dotenv/config";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
        log:
            process.env.NODE_ENV === "production"
                ? []
                : ["query", "error", "warn"],
    });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// Re-exporte les types Prisma (optionnel, pratique)
export * from "../generated/prisma/client.js";
