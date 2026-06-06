import { Resolvers } from "../__generated__/resolvers-types";
import { patientResolvers } from "./patients";

//TODO: import individual resolvers here once made

export const resolvers: Resolvers = {
  Query: {
    ...patientResolvers.Query,

    patients: () => [],
    patient: () => [],

    doctors: () => [],
    doctor: () => null,

    medication: () => [],
  },
  Mutation: {
    // TODO: mutations added here
  },

  Patient: patientResolvers.Patient,
};
