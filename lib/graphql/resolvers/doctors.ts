import { Resolvers } from "../__generated__/resolvers-types";

export const doctorResolvers: Pick<Resolvers, "Query" | "Mutation" | "Doctor"> =
  {
    Query: {
      // Fetches all doctors
      doctors: async (_parent, _args, context) => {
        return await context.prisma.doctor.findMany();
      },

      doctor: async (_parent, args, context) => {
        const { licenseNumber, firstName, lastName, specialty } = args;

        // If absolutely no search criteria are supplied, return null
        // instead of matching the first random doctor in the database.
        if (
          licenseNumber === undefined &&
          firstName === undefined &&
          lastName === undefined &&
          specialty === undefined
        ) {
          return null;
        }

        return await context.prisma.doctor.findFirst({
          where: {
            licenseNumber: licenseNumber ?? undefined,
            firstName: firstName ? { contains: firstName } : undefined,
            lastName: lastName ? { contains: lastName } : undefined,
            specialty: specialty ? { contains: specialty } : undefined,
          },
        });
      },
    },

    Mutation: {
      // CRUD Operations

      // 1. Create a new Doctor
      createDoctor: async (_parent, args, context) => {
        return await context.prisma.doctor.create({
          data: args.input,
        });
      },

      // 2. Update an existing Doctor
      updateDoctor: async (_parent, args, context) => {
        return await context.prisma.doctor.update({
          where: { id: args.id },
          data: Object.fromEntries(
            // This mapping operation address an issue with prisma wher enull mappings would set db columns to NULL causing a crash on required fields, instead
            //  we blanket set them to undefined if null
            Object.entries(args.input).map(([key, value]) => [
              key,
              value === null ? undefined : value,
            ]),
          ),
        });
      },

      // 3. Delete a Doctor
      deleteDoctor: async (_parent, args, context) => {
        try {
          await context.prisma.doctor.delete({
            where: { id: args.id },
          });
          return true;
        } catch (error) {
          console.error("Failed to delete doctor:", error);
          return false;
        }
      },
    },

    // Relation resolvers so frontend can fetch a doctor's patients
    Doctor: {
      familyPatients: async (parent, _args, context) => {
        return await context.prisma.patient.findMany({
          where: { familyDoctorId: parent.id },
        });
      },
      primaryPatients: async (parent, _args, context) => {
        return await context.prisma.patient.findMany({
          where: { primaryDoctorId: parent.id },
        });
      },
    },
  };
