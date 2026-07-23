// src/graphql.ts
import { makeExecutableSchema } from "@graphql-tools/schema";
import { resolvers } from "./resolvers";

const schema = makeExecutableSchema({
  typeDefs: "/*", // Your existing GraphQL schema definition
  resolvers,
});

export const graphql = async (req: any) => {
  return req.graphql(schema);
};
