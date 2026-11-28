import "dotenv/config";
import { faker } from "@faker-js/faker";
import { Gender } from "../lib/generated/prisma";
import { prisma } from "../lib/prisma";

faker.seed(20261122);

interface DoctorSeed {
  licenseNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  specialty: string;
}

interface MedicationSeed {
  drugIdentificationNumber: string;
  genericName: string;
  brandName: string;
  type:
    | "Tablet"
    | "Capsule"
    | "Inhaler"
    | "Injection"
    | "Topical Cream"
    | "Oral Solution";
  drugClass: string;
  controlledSubstance: boolean;
}

interface PatientSeed {
  phn: string;
  firstName: string;
  lastName: string;
  city: string;
  province: string;
  gender: Gender;
  birthday: Date;
  age: number;
  primaryDoctorLicense: string;
  familyDoctorLicense: string | null;
  lastClinicVisit: Date | null;
  nextClinicVisit: Date | null;
  allergies: string[];
  primaryCondition: string[];
  secondaryCondition: string[];
  medicationDins: string[];
}

const REFERENCE_DATE = new Date("2026-11-22T12:00:00.000Z");

function computeAge(birthday: Date, reference: Date = REFERENCE_DATE): number {
  let age = reference.getUTCFullYear() - birthday.getUTCFullYear();
  const monthDiff = reference.getUTCMonth() - birthday.getUTCMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && reference.getUTCDate() < birthday.getUTCDate())
  ) {
    age--;
  }
  return age;
}

function mustGet<K, V>(map: Map<K, V>, key: K, label: string): V {
  const value = map.get(key);
  if (value === undefined) {
    throw new Error(`Missing ${label} for key: ${String(key)}`);
  }
  return value;
}

const DOCTORS: DoctorSeed[] = [
  {
    licenseNumber: "100001",
    firstName: "Gregory",
    lastName: "House",
    email: "gregory.house@noryoclinic.ca",
    specialty: "Internal Medicine",
  },
  {
    licenseNumber: "100002",
    firstName: "Éloïse",
    lastName: "Tremblay",
    email: "eloise.tremblay@noryoclinic.ca",
    specialty: "Family Medicine",
  },
  {
    licenseNumber: "100003",
    firstName: "Marcus",
    lastName: "Chen",
    email: "marcus.chen@noryoclinic.ca",
    specialty: "Cardiology",
  },
  {
    licenseNumber: "100004",
    firstName: "Priya",
    lastName: "Patel",
    email: "priya.patel@noryoclinic.ca",
    specialty: "Endocrinology",
  },
  {
    licenseNumber: "100005",
    firstName: "Liam",
    lastName: "O'Connor",
    email: "liam.oconnor@noryoclinic.ca",
    specialty: "Family Medicine",
  },
  {
    licenseNumber: "100006",
    firstName: "Sofia",
    lastName: "Rossi",
    email: "sofia.rossi@noryoclinic.ca",
    specialty: "Pediatrics",
  },
  {
    licenseNumber: "100007",
    firstName: "David",
    lastName: "Kowalski",
    email: "david.kowalski@noryoclinic.ca",
    specialty: "Neurology",
  },
  {
    // Doctor with 0 patients (edge case)
    licenseNumber: "100008",
    firstName: "Claire",
    lastName: "Bouchard",
    email: "claire.bouchard@noryoclinic.ca",
    specialty: "Dermatology",
  },
];

const MEDICATIONS: MedicationSeed[] = [
  {
    drugIdentificationNumber: "02242907",
    genericName: "Acetaminophen",
    brandName: "Tylenol",
    type: "Tablet",
    drugClass: "Analgesic",
    controlledSubstance: false,
  },
  {
    drugIdentificationNumber: "02239834",
    genericName: "Acetaminophen",
    brandName: "Atasol",
    type: "Tablet",
    drugClass: "Analgesic",
    controlledSubstance: false,
  },
  {
    drugIdentificationNumber: "02351201",
    genericName: "Metformin",
    brandName: "Glucophage",
    type: "Tablet",
    drugClass: "Biguanide",
    controlledSubstance: false,
  },
  {
    drugIdentificationNumber: "02389104",
    genericName: "Metformin",
    brandName: "Glumetza",
    type: "Tablet",
    drugClass: "Biguanide",
    controlledSubstance: false,
  },
  {
    drugIdentificationNumber: "02245611",
    genericName: "Salbutamol",
    brandName: "Ventolin",
    type: "Inhaler",
    drugClass: "Bronchodilator",
    controlledSubstance: false,
  },
  {
    drugIdentificationNumber: "02248120",
    genericName: "Lisinopril",
    brandName: "Prinivil",
    type: "Tablet",
    drugClass: "ACE Inhibitor",
    controlledSubstance: false,
  },
  {
    drugIdentificationNumber: "02241990",
    genericName: "Atorvastatin",
    brandName: "Lipitor",
    type: "Tablet",
    drugClass: "Statin",
    controlledSubstance: false,
  },
  {
    drugIdentificationNumber: "02247302",
    genericName: "Amoxicillin",
    brandName: "Amoxil",
    type: "Capsule",
    drugClass: "Penicillin Antibiotic",
    controlledSubstance: false,
  },
  {
    drugIdentificationNumber: "02249015",
    genericName: "Omeprazole",
    brandName: "Losec",
    type: "Capsule",
    drugClass: "Proton Pump Inhibitor",
    controlledSubstance: false,
  },
  {
    drugIdentificationNumber: "02243318",
    genericName: "Insulin Glargine",
    brandName: "Lantus",
    type: "Injection",
    drugClass: "Long-Acting Insulin",
    controlledSubstance: false,
  },
  {
    drugIdentificationNumber: "02246089",
    genericName: "Hydrocortisone",
    brandName: "Cortef",
    type: "Topical Cream",
    drugClass: "Corticosteroid",
    controlledSubstance: false,
  },
  {
    drugIdentificationNumber: "02240112",
    genericName: "Lorazepam",
    brandName: "Ativan",
    type: "Tablet",
    drugClass: "Benzodiazepine",
    controlledSubstance: true,
  },
  {
    drugIdentificationNumber: "02240455",
    genericName: "Methylphenidate",
    brandName: "Ritalin",
    type: "Tablet",
    drugClass: "CNS Stimulant",
    controlledSubstance: true,
  },
  {
    // Unlinked medication #1 (0 patients)
    drugIdentificationNumber: "02240788",
    genericName: "Hydromorphone",
    brandName: "Dilaudid",
    type: "Oral Solution",
    drugClass: "Opioid Analgesic",
    controlledSubstance: true,
  },
  {
    // Unlinked medication #2 (0 patients)
    drugIdentificationNumber: "02240999",
    genericName: "Zopiclone",
    brandName: "Imovane",
    type: "Tablet",
    drugClass: "Sedative-Hypnotic",
    controlledSubstance: true,
  },
];

const CITIES_BY_PROVINCE: Array<{ city: string; province: string }> = [
  { city: "Vancouver", province: "BC" },
  { city: "Toronto", province: "ON" },
  { city: "Calgary", province: "AB" },
  { city: "Montréal", province: "QC" },
  { city: "Québec", province: "QC" },
  { city: "Halifax", province: "NS" },
  { city: "Winnipeg", province: "MB" },
];

const ALLERGY_POOL = [
  "Penicillin",
  "Peanuts",
  "Sulfa Drugs",
  "Latex",
  "Shellfish",
  "Aspirin",
];

const PRIMARY_CONDITION_POOL = [
  "Hypertension",
  "Type 2 Diabetes",
  "Asthma",
  "Hyperlipidemia",
  "Hypothyroidism",
  "Migraine",
  "Osteoarthritis",
];

const SECONDARY_CONDITION_POOL = [
  "Seasonal Allergies",
  "GERD",
  "Insomnia",
  "Vitamin D Deficiency",
  "Mild Anxiety",
  "Eczema",
];

const LINKED_MED_DINS = MEDICATIONS.slice(0, 13).map(
  (m) => m.drugIdentificationNumber,
);

function buildPatients(): PatientSeed[] {
  const genders: Gender[] = [
    ...Array(9).fill(Gender.MALE),
    ...Array(10).fill(Gender.FEMALE),
    ...Array(3).fill(Gender.OTHER),
    ...Array(2).fill(Gender.NOT_SPECIFIED),
  ];

  // Family doctor distribution: 6 null, 10 same as primary, 8 different
  const familyModes: Array<"null" | "same" | "different"> = [
    ...Array(6).fill("null"),
    ...Array(10).fill("same"),
    ...Array(8).fill("different"),
  ];

  // Visit date distribution: 3 both null, 5 past only, 4 future only, 12 both
  const visitModes: Array<"none" | "past" | "future" | "both"> = [
    ...Array(3).fill("none"),
    ...Array(5).fill("past"),
    ...Array(4).fill("future"),
    ...Array(12).fill("both"),
  ];

  // Medication count distribution: 3 with 0, 16 with 1-3, 5 with 4-5
  const medCounts: number[] = [
    0, 0, 0,
    1, 1, 2, 2, 2, 3, 3, 2, 1, 2, 3, 2, 1, 3, 2, 3,
    4, 4, 5, 4, 5,
  ];

  const activeDoctors = DOCTORS.slice(0, 7).map((d) => d.licenseNumber);
  const familyDoctors = ["100002", "100005"];

  // Specific boundary birthdays for first 5 patients, faker for the rest
  const boundaryBirthdays: Date[] = [
    new Date("2025-06-15T00:00:00.000Z"), // age 1 (pediatric)
    new Date("2018-04-10T00:00:00.000Z"), // age 8 (pediatric)
    new Date("1996-02-29T00:00:00.000Z"), // leap-day birthday
    new Date("1935-08-20T00:00:00.000Z"), // age 91 (senior)
    new Date("1982-11-22T00:00:00.000Z"), // exact birthday today
  ];

  return Array.from({ length: 24 }, (_, idx) => {
    const phn = String(900100001 + idx);
    const location = CITIES_BY_PROVINCE[idx % CITIES_BY_PROVINCE.length];

    // Ensure Unicode / French-Canadian names & shared lastName across 2 patients
    let firstName = faker.person.firstName();
    let lastName = faker.person.lastName();
    if (idx === 3) {
      firstName = "Éloïse";
      lastName = "Côté";
    } else if (idx === 4) {
      firstName = "Jean-Luc";
      lastName = "Côté";
    }

    const birthday =
      idx < boundaryBirthdays.length
        ? boundaryBirthdays[idx]
        : faker.date.birthdate({ min: 18, max: 85, mode: "age" });
    const normalizedBirthday = new Date(
      Date.UTC(
        birthday.getUTCFullYear(),
        birthday.getUTCMonth(),
        birthday.getUTCDate(),
      ),
    );
    const age = computeAge(normalizedBirthday);

    const primaryDoctorLicense = activeDoctors[idx % activeDoctors.length];
    const familyMode = familyModes[idx];
    let familyDoctorLicense: string | null = null;
    if (familyMode === "same") {
      familyDoctorLicense = primaryDoctorLicense;
    } else if (familyMode === "different") {
      const candidate = familyDoctors[idx % familyDoctors.length];
      familyDoctorLicense =
        candidate === primaryDoctorLicense
          ? activeDoctors[(idx + 1) % activeDoctors.length]
          : candidate;
    }

    const visitMode = visitModes[idx];
    let lastClinicVisit: Date | null = null;
    let nextClinicVisit: Date | null = null;

    if (visitMode === "past" || visitMode === "both") {
      const daysAgo = idx === 0 ? 1 : idx === 1 ? 400 : faker.number.int({ min: 5, max: 180 });
      lastClinicVisit = new Date(
        REFERENCE_DATE.getTime() - daysAgo * 24 * 60 * 60 * 1000,
      );
    }
    if (visitMode === "future" || visitMode === "both") {
      const daysAhead = idx === 0 ? 1 : idx === 2 ? 180 : faker.number.int({ min: 7, max: 120 });
      nextClinicVisit = new Date(
        REFERENCE_DATE.getTime() + daysAhead * 24 * 60 * 60 * 1000,
      );
    }

    const allergies =
      idx % 4 === 0
        ? []
        : faker.helpers.arrayElements(ALLERGY_POOL, { min: 1, max: 3 });
    const primaryCondition = faker.helpers.arrayElements(
      PRIMARY_CONDITION_POOL,
      { min: 1, max: 2 },
    );
    const secondaryCondition =
      idx % 3 === 0
        ? []
        : faker.helpers.arrayElements(SECONDARY_CONDITION_POOL, {
            min: 1,
            max: 3,
          });

    const medCount = medCounts[idx];
    const medicationDins =
      medCount === 0
        ? []
        : faker.helpers.arrayElements(LINKED_MED_DINS, medCount);

    return {
      phn,
      firstName,
      lastName,
      city: location.city,
      province: location.province,
      gender: genders[idx],
      birthday: normalizedBirthday,
      age,
      primaryDoctorLicense,
      familyDoctorLicense,
      lastClinicVisit,
      nextClinicVisit,
      allergies,
      primaryCondition,
      secondaryCondition,
      medicationDins,
    };
  });
}

async function main() {
  console.log("Seeding database...");

  const doctorIdByLicense = new Map<string, number>();
  for (const doc of DOCTORS) {
    const saved = await prisma.doctor.upsert({
      where: { licenseNumber: doc.licenseNumber },
      create: doc,
      update: {
        firstName: doc.firstName,
        lastName: doc.lastName,
        email: doc.email,
        specialty: doc.specialty,
      },
    });
    doctorIdByLicense.set(saved.licenseNumber, saved.id);
  }

  const medicationIdByDin = new Map<string, number>();
  for (const med of MEDICATIONS) {
    const saved = await prisma.medication.upsert({
      where: { drugIdentificationNumber: med.drugIdentificationNumber },
      create: med,
      update: {
        genericName: med.genericName,
        brandName: med.brandName,
        type: med.type,
        drugClass: med.drugClass,
        controlledSubstance: med.controlledSubstance,
      },
    });
    medicationIdByDin.set(saved.drugIdentificationNumber, saved.id);
  }

  const patients = buildPatients();
  let totalMedLinks = 0;

  for (const p of patients) {
    const primaryDoctorId = mustGet(
      doctorIdByLicense,
      p.primaryDoctorLicense,
      "primaryDoctor",
    );
    const familyDoctorId = p.familyDoctorLicense
      ? mustGet(doctorIdByLicense, p.familyDoctorLicense, "familyDoctor")
      : null;

    const medConnect = [...new Set(p.medicationDins)].map((din) => ({
      id: mustGet(medicationIdByDin, din, "medication"),
    }));
    totalMedLinks += medConnect.length;

    await prisma.patient.upsert({
      where: { phn: p.phn },
      create: {
        phn: p.phn,
        firstName: p.firstName,
        lastName: p.lastName,
        city: p.city,
        province: p.province,
        gender: p.gender,
        birthday: p.birthday,
        age: p.age,
        primaryDoctorId,
        familyDoctorId,
        lastClinicVisit: p.lastClinicVisit,
        nextClinicVisit: p.nextClinicVisit,
        allergies: p.allergies,
        primaryCondition: p.primaryCondition,
        secondaryCondition: p.secondaryCondition,
        medications: {
          connect: medConnect,
        },
      },
      update: {
        firstName: p.firstName,
        lastName: p.lastName,
        city: p.city,
        province: p.province,
        gender: p.gender,
        birthday: p.birthday,
        age: p.age,
        primaryDoctorId,
        familyDoctorId,
        lastClinicVisit: p.lastClinicVisit,
        nextClinicVisit: p.nextClinicVisit,
        allergies: p.allergies,
        primaryCondition: p.primaryCondition,
        secondaryCondition: p.secondaryCondition,
        medications: {
          set: medConnect,
        },
      },
    });
  }

  const [doctorCount, medicationCount, patientCount] = await Promise.all([
    prisma.doctor.count(),
    prisma.medication.count(),
    prisma.patient.count(),
  ]);

  console.log("Seed complete:");
  console.log(`  Doctors:     ${doctorCount}`);
  console.log(`  Medications: ${medicationCount}`);
  console.log(`  Patients:    ${patientCount}`);
  console.log(`  Med Links:   ${totalMedLinks}`);
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
