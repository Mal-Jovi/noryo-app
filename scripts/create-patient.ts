import "dotenv/config";
import { prisma } from "../lib/prisma";
import { Gender } from "@prisma/client";

async function main() {
  console.log("Inserting a new patient...");

  const patient = await prisma.patient.create({
    data: {
      phn: 987654321, // Personal Health Number (must be unique)
      firstName: "Jovi",
      lastName: "Sidhu",
      city: "Vancouver",
      province: "BC",
      gender: Gender.MALE,
      age: 29,
      birthday: new Date("1997-03-15"),
      primaryDoctorId: 1, // Gregory House
      familyDoctorId: 1, // Gregory House
      allergies: ["None"], // JSON fields
      primaryCondition: ["tummy trouble"], // JSON fields
      secondaryCondition: ["near sighted"], // JSON fields
      medications: {
        connect: [{ id: 1 }], // Tylenol (ID 1)
      },
    },
    include: {
      primaryDoctor: true,
      medications: true,
    },
  });

  console.log("✅ Patient inserted successfully!");
  console.log(JSON.stringify(patient, null, 2));
}

main()
  .catch((e) => {
    console.error("❌ Error inserting patient:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
