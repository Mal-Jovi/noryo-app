import { Resolvers } from "../__generated__/resolvers-types";
import { patientResolvers } from "./patients";
import { doctorResolvers } from "./doctors";
import { medicationResolvers } from "./medications";

export const resolvers: Resolvers = {
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
