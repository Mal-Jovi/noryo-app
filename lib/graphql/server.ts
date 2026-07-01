import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { resolvers } from "./resolvers/index";
import { createContext } from "./context";
import fs from "fs";
import path from "path";

// 1. Read the GraphQL schema file cleanly from the disk as a UTF-8 string
const typeDefs = fs.readFileSync(
  path.resolve(process.cwd(), "lib/graphql/schema.graphql"),
  "utf-8",
);

// Convert PORT to number
const port = Number(process.env.PORT || 4000);

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

await startStandaloneServer(server, {
  listen: { port },
});

console.log(`🚀 Server ready at http://localhost:${port}`);
