// codegen.ts
import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "lib/graphql/schema.graphql",

  generates: {
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
        contextType: "../context#GraphQLContext",
        useIndexSignature: true,
        scalars: {
          DateTime: "string",
        },
        // Clean Prisma mapping without 'as ...'
        mappers: {
          Patient: "@prisma/client#Patient",
          Doctor: "@prisma/client#Doctor",
          Medication: "@prisma/client#Medication",
        },
      },
    },
  },
};

export default config;
