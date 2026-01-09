import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import mariadb from "mariadb";

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

const setupPrisma = () => {
    if (globalForPrisma.prisma) return globalForPrisma.prisma;

    const connectionString = process.env.DATABASE_URL;
    // In production (build time), we might not have the URL yet if strictly static, 
    // but for runtime it is needed. We'll handle the missing case gracefully for build.
    if (!connectionString && process.env.NODE_ENV === "production") {
        // Return a client that might fail on query but passes build
        return new PrismaClient();
    }

    if (!connectionString) {
        throw new Error("DATABASE_URL is not set");
    }

    const pool = mariadb.createPool(connectionString);
    const adapter = new PrismaMariaDb(pool);
    const client = new PrismaClient({
        adapter,
        log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    });

    if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = client;
    return client;
};

export const prisma = setupPrisma();
