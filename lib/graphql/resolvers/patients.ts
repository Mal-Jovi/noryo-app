import { Resolvers } from "../__generated__/resolvers-types";

export const patientResolvers: Pick<
  Resolvers,
  "Query" | "Mutation" | "Patient"
> = {
  Query: {
    // Fetches all patients
    patients: async (_parent, _args, context) => {
      return await context.prisma.patient.findMany();
    },

    patient: async (_parent, args, context) => {
      const { phn, firstName, lastName, city } = args;

      return await context.prisma.patient.findMany({
        where: {
          phn: phn ?? undefined,
          firstName: firstName ? { contains: firstName } : undefined,
          lastName: lastName ? { contains: lastName } : undefined,
          city: city ? { contains: city } : undefined,
        },
      });
    },
  },

  Mutation: {
    // TODO: Patient CUD mutations
  },
  Patient: {
    primaryDoctor: async (parentPatient, _args, context) => {
      return await context.prisma.doctor.findUniqueOrThrow({
        where: { id: parentPatient.primaryDoctorId },
      });
    },
    familyDoctor: async (parentPatient, _args, context) => {
      if (!parentPatient.familyDoctorId) return null;
      return await context.prisma.doctor.findUnique({
        where: { id: parentPatient.familyDoctorId },
      });
    },
    medications: async (parentPatient, _args, context) => {
      const patient = await context.prisma.patient.findUnique({
        where: { id: parentPatient.id },
        include: { medications: true },
      });

      return patient?.medications || [];
    },
  },
};
