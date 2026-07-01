import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  // 1. Point to GraphQL schema file
  schema: "lib/graphql/schema.graphql",

  generates: {
    // The output file path for generated TypeScript types
    "lib/graphql/__generated__/resolvers-types.ts": {
      plugins: [
        {
          add: {
            content: "/* eslint-disable */\n// @ts-nocheck",
          },
        },
        "typescript",
        "typescript-resolvers",
      ],
      config: {
        // Tell codegen what type to use for the "context" argument in resolvers.
        // Format: 'path/to/file#InterfaceName'
        contextType: "../context#GraphQLContext",

        // Force avoid using 'any' on resolvers that aren't fully typed
        useIndexSignature: true,

        // Map custom scalar types
        scalars: {
          DateTime: "string", // GraphQL DateTime maps to an ISO string in TypeScript
        },

        // Prisma mapping
        mappers: {
          Patient: "@prisma/client#Patient as PrismaPatient",
          Doctor: "@prisma/client#Doctor as PrismaDoctor",
          Medication: "@prisma/client#Medication as PrismaMedication",
        },
      },
    },
  },
};

export default config;
