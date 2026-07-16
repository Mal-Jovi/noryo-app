import { Resolvers } from "../__generated__/resolvers-types";
import { Prisma } from "@prisma/client";

export const medicationResolvers: Pick<
  Resolvers,
  "Query" | "Mutation" | "Medication"
> = {
  Query: {
    // Fetches all medications for a patient
    medication: async (_parent, args, context) => {
      const {
        drugIdentificationNumber,
        genericName,
        brandName,
        drugClass,
        type,
      } = args;

      return await context.prisma.medication.findMany({
        where: {
          drugIdentificationNumber: drugIdentificationNumber ?? undefined,
          genericName: genericName ? { contains: genericName } : undefined,
          brandName: brandName ? { contains: brandName } : undefined,
          drugClass: drugClass ? { contains: drugClass } : undefined,
          type: type ?? undefined,
        },
      });
    },
  },

  Mutation: {
    // CRUD Operations

    // 1. Create a new Medication with patient relations
    createMedication: async (_parent, args, context) => {
      const input = args.input || {};

      // Extract patientIds if provided
      const { patientIds, ...restInput } = input;

      return await context.prisma.medication.create({
        data: {
          ...restInput,
          patients:
            patientIds && patientIds.length > 0
              ? { connect: patientIds.map((id: number) => ({ id })) }
              : undefined,
        },
      });
    },

    // 2. Update an existing Medication with patient relations
    updateMedication: async (_parent, args, context) => {
      const input = args.input || {};

      // Extract patientIds if provided
      const { patientIds, ...restInput } = input;

      return await context.prisma.medication.update({
        where: { id: args.id },
        data: {
          ...Object.fromEntries(
            Object.entries(restInput).map(([key, value]) => [
              key,
              value === null ? undefined : value,
            ]),
          ),
          // Update medication patients relation if patientIds is provided
          ...(patientIds && patientIds.length > 0
            ? { patients: { set: patientIds.map((id: number) => ({ id })) } }
            : {}),
        },
      });
    },

    // 3. Delete a Medication
    deleteMedication: async (_parent, args, context) => {
      try {
        await context.prisma.medication.delete({
          where: { id: args.id },
        });
        return true;
      } catch (error) {
        console.error("Failed to delete medication:", error);
        return false;
      }
    },
  },

  Medication: {
    patients: async (parentMedication, _args, context) => {
      const medicationWithPatients = await context.prisma.medication.findUnique(
        {
          where: { id: parentMedication.id },
          include: { patients: true },
        },
      );
      return medicationWithPatients?.patients || [];
    },
  },
};
