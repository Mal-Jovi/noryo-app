import { NextResponse } from "next/server";
import { handler as graphqlHandler } from "@/lib/graphql/server";

// GET - Query operations
export const GET = async (request: Request) => {
  try {
    return await graphqlHandler(request);
  } catch (error) {
    console.error("GraphQL Error:", error);
    return NextResponse.json(
      { errors: [{ message: "Internal server error" }] },
      { status: 500 },
    );
  }
};

// POST - Mutations
export const POST = async (request: Request) => {
  try {
    return await graphqlHandler(request);
  } catch (error) {
    console.error("GraphQL Error:", error);
    return NextResponse.json(
      { errors: [{ message: "Internal server error" }] },
      { status: 500 },
    );
  }
};
