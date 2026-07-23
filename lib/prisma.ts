import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import mariadb from "mariadb";
// Import from the custom generated client output folder
import { PrismaClient } from "./generated/prisma";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

// Parse connection details from DATABASE_URL
const databaseUrlString = process.env.DATABASE_URL;
if (!databaseUrlString) {
  throw new Error("DATABASE_URL is not defined in your environment variables");
}

// Extract credentials from connection string (e.g., mysql://user:pass@host:port/dbname)
const dbUrl = new URL(databaseUrlString);
const host = dbUrl.hostname || "localhost";
const port = Number(dbUrl.port) || 3306;
const user = dbUrl.username || "root";
const password = decodeURIComponent(dbUrl.password) || undefined;
const database = dbUrl.pathname.substring(1) || "mydb";

const adapter = new PrismaMariaDb({
  host,
  port,
  user,
  password,
  database,
  connectionLimit: 5,
});

//const adapter = new PrismaMariaDb(pool);

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter, // Required in Prisma 7
    log: process.env.NODE_ENV === "development" ? ["query"] : [],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
