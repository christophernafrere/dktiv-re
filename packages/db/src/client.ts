import { PrismaClient } from "../generated/prisma/client.js";
import dotenv from "dotenv";
dotenv.config();

const accelerateUrl = process.env.PRISMA_ACCELERATE_URL;
if (!accelerateUrl) {
    throw new Error(
        "PRISMA_ACCELERATE_URL environment variable is required to initialize PrismaClient.",
    );
}
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
        accelerateUrl,
        log:
            process.env.NODE_ENV === "production"
                ? []
                : ["query", "error", "warn"],
    });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// Re-exporte les types Prisma (optionnel, pratique)
export * from "../generated/prisma/client.js";
