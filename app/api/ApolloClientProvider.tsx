"use client";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";
import { ReactNode } from "react";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://localhost:4000/",
  }),
  cache: new InMemoryCache(),
});

export function ApolloClientProvider({ children }: { children: ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
