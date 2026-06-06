import { PrismaClient } from "@prisma/client";
import { prisma } from "../prisma"; // This is a singleton pattern to ensure only one Prisma client instance exists per process (preventing connection

// 1. Define the TypeScript interface for our context
export interface GraphQLContext {
  prisma: PrismaClient;
  // In the future, add things like:
  // currentUser?: User;
}

// 2. Create a function that builds the context for every incoming request.
// Next.js Route Handlers pass the Request object, which we can use if we need headers/cookies.
export async function createContext(req?: Request): Promise<GraphQLContext> {
  return {
    prisma,
  };
}
