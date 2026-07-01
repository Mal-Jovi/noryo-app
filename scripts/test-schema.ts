import typeDefs from "../lib/graphql/schema.graphql";

console.log("✅ Schema imported successfully!");
console.log("First line:", typeDefs.split("\n")[0]);
console.log("Total lines:", typeDefs.split("\n").length);
