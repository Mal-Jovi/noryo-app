import { GraphQLScalarType, Kind } from "graphql";
import { Resolvers } from "../__generated__/resolvers-types";
import { patientResolvers } from "./patients";
import { doctorResolvers } from "./doctors";
import { medicationResolvers } from "./medications";

const dateTimeScalar = new GraphQLScalarType({
  name: "DateTime",
  description: "ISO-8601 DateTime scalar",
  serialize(value) {
    const date = value instanceof Date ? value : new Date(String(value));
    if (Number.isNaN(date.getTime())) {
      throw new TypeError(`Invalid DateTime value: ${String(value)}`);
    }
    return date.toISOString();
  },
  parseValue(value) {
    const date = value instanceof Date ? value : new Date(String(value));
    if (Number.isNaN(date.getTime())) {
      throw new TypeError(`Invalid DateTime input: ${String(value)}`);
    }
    return date.toISOString();
  },
  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new TypeError(`DateTime must be a string, got ${ast.kind}`);
    }
    const date = new Date(ast.value);
    if (Number.isNaN(date.getTime())) {
      throw new TypeError(`Invalid DateTime literal: ${ast.value}`);
    }
    return date.toISOString();
  },
});

export const resolvers: Resolvers = {
  DateTime: dateTimeScalar,
  Query: {
    // spreading in Query for patients
    ...patientResolvers.Query,
    // spreading in Query for doctors
    ...doctorResolvers.Query,
    // spreading in Query for medications
    ...medicationResolvers.Query,
  },
  Mutation: {
    // spreading in patient CRUD
    ...patientResolvers.Mutation,
    // spreading in doctor CRUD
    ...doctorResolvers.Mutation,
    // spreading in medication CRUD
    ...medicationResolvers.Mutation,
  },

  Patient: patientResolvers.Patient,
  Medication: medicationResolvers.Medication,
  Doctor: doctorResolvers.Doctor,
};
