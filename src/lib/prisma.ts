import { PrismaClient } from "@prisma/client";
import { PrismaMysql } from "@prisma/adapter-mysql";
import mysql from "mysql2/promise";

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

    const pool = mysql.createPool(connectionString);
    const adapter = new PrismaMysql(pool);
    const client = new PrismaClient({
        adapter,
        log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    });

    if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = client;
    return client;
};

export const prisma = setupPrisma();
