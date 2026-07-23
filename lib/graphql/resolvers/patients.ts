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
    //1. Create new patient mutation
    createPatient: async (_parent, args, context) => {
      const input = args.input || {};

      try {
        // Step 1: Validate required fields
        const requiredFields = [
          "phn",
          "firstName",
          "lastName",
          "city",
          "province",
          "gender",
          "birthday",
          "age",
          "primaryDoctorId",
          //as const here tells typescript these are exact keys, not generic strings, avoiding the 'any' string flag on input[field]
        ] as const;

        for (const field of requiredFields) {
          if (!input[field]) {
            throw new Error(`Missing required field: ${field}`);
          }
        }

        // Step 2: Validate primary doctor exists
        const existingDoctor = await context.prisma.doctor.findUnique({
          where: { id: input.primaryDoctorId },
        });

        if (!existingDoctor) {
          throw new Error(
            `Primary doctor with ID ${input.primaryDoctorId} not found`,
          );
        }

        // Step 3: Validate and deduplicate medicationIds
        const {
          medicationIds,
          allergies,
          primaryCondition,
          secondaryCondition,
          ...patientData
        } = input;
        const finalMedicationIds = medicationIds ?? [];

        if (finalMedicationIds.length !== new Set(finalMedicationIds).size) {
          throw new Error("Duplicate medication IDs detected");
        }

        // Verify all medications exist before connecting
        for (const medId of finalMedicationIds) {
          const medication = await context.prisma.medication.findUnique({
            where: { id: medId },
          });
          if (!medication) {
            throw new Error(`Medication with ID ${medId} does not exist`);
          }
        }

        // Step 4: Create patient with proper medication connection
        return await context.prisma.patient.create({
          data: {
            ...patientData,
            // Simply default to an empty array and cast as string[]
            allergies: (allergies ?? []) as string[],
            primaryCondition: (primaryCondition ?? []) as string[],
            secondaryCondition: (secondaryCondition ?? []) as string[],
            medications: {
              connect: finalMedicationIds.map((id) => ({ id })),
            },
          },
        });
      } catch (error) {
        // Step 5: Handle errors gracefully
        if (error instanceof Error) {
          console.error("Patient creation failed:", error.message);
          throw new Error(`Failed to create patient: ${error.message}`);
        }

        // Re-throw for unexpected errors
        throw new Error(
          `Unexpected error creating patient: ${JSON.stringify(error)}`,
        );
      }
    },

    // 2. Update existing patient mutation
    updatePatient: async (_parent, args, context) => {
      const id = args.id;
      const input = args.input || {};

      try {
        // Step 1: Ensure patient exists
        const existingPatient = await context.prisma.patient.findUnique({
          where: { id },
        });

        if (!existingPatient) {
          throw new Error(`Patient with ID ${id} not found`);
        }

        // Step 2: Validate doctor if primaryDoctorId is being updated
        if (input.primaryDoctorId) {
          const doctorExists = await context.prisma.doctor.findUnique({
            where: { id: input.primaryDoctorId },
          });
          if (!doctorExists) {
            throw new Error(
              `Primary doctor with ID ${input.primaryDoctorId} not found`,
            );
          }
        }

        // Step 3: Extract relation-linked and JSON fields to separate from raw Prisma update
        const {
          medicationIds,
          allergies,
          primaryCondition,
          secondaryCondition,
          ...patientData
        } = input;

        // Clean arrays of null/undefined values using Boolean filter to satisfy Prisma JSON constraints
        const cleanAllergies = allergies
          ? (allergies.filter(Boolean) as string[])
          : undefined;

        const cleanPrimaryCondition = primaryCondition
          ? (primaryCondition.filter(Boolean) as string[])
          : undefined;

        const cleanSecondaryCondition = secondaryCondition
          ? (secondaryCondition.filter(Boolean) as string[])
          : undefined;

        // Step 4: Validate medication IDs if they are being updated
        let medicationConnectDisconnect = undefined;
        if (medicationIds) {
          const deduplicatedMedIds = [...new Set(medicationIds)];

          for (const medId of deduplicatedMedIds) {
            const medExists = await context.prisma.medication.findUnique({
              where: { id: medId },
            });
            if (!medExists) {
              throw new Error(`Medication with ID ${medId} does not exist`);
            }
          }

          // Use 'set' to overwrite existing medication connections with the new list
          medicationConnectDisconnect = {
            set: deduplicatedMedIds.map((medId) => ({ id: medId })),
          };
        }

        // Step 5: Perform the update safely
        return await context.prisma.patient.update({
          where: { id },
          data: {
            ...Object.fromEntries(
              Object.entries(patientData).map(([key, value]) => [
                key,
                value === null ? undefined : value, // prevents crashing on setting required fields to null
              ]),
            ),
            ...(cleanAllergies !== undefined && { allergies: cleanAllergies }),
            ...(cleanPrimaryCondition !== undefined && {
              primaryCondition: cleanPrimaryCondition,
            }),
            ...(cleanSecondaryCondition !== undefined && {
              secondaryCondition: cleanSecondaryCondition,
            }),
            ...(medicationConnectDisconnect && {
              medications: medicationConnectDisconnect,
            }),
          },
        });
      } catch (error) {
        if (error instanceof Error) {
          console.error("Patient update failed:", error.message);
          throw new Error(`Failed to update patient: ${error.message}`);
        }
        throw new Error(
          `Unexpected error updating patient: ${JSON.stringify(error)}`,
        );
      }
    },

    // 3. Delete existing patient mutation
    deletePatient: async (_parent, args, context) => {
      const id = args.id;

      try {
        // Step 1: Ensure patient exists
        const existingPatient = await context.prisma.patient.findUnique({
          where: { id },
        });

        if (!existingPatient) {
          throw new Error(`Patient with ID ${id} not found`);
        }

        // Step 2: Delete patient (Prisma automatically handles disconnecting
        // the join table relations in many-to-many configurations)
        await context.prisma.patient.delete({
          where: { id },
        });

        return true;
      } catch (error) {
        if (error instanceof Error) {
          console.error("Patient deletion failed:", error.message);
          throw new Error(`Failed to delete patient: ${error.message}`);
        }
        return false;
      }
    },
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
      const medications = await context.prisma.patient.findUnique({
        where: { id: parentPatient.id },
        include: { medications: true },
      });

      return medications?.medications || [];
    },
  },
};
