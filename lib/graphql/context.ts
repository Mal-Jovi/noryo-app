import { PrismaClient } from "@prisma/client";
import { prisma } from "../prisma"; // Import your central Prisma client!

export interface GraphQLContext {
  prisma: PrismaClient;
}

export const createContext = async (): Promise<GraphQLContext> => {
  return {
    prisma,
  };
};
