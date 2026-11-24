"use client";
import { useQuery, gql } from "@apollo/client";

interface Patient {
  firstName: string;
  lastName: string;
  city: string;
  province: string;
  gender: string;
  age: number;
  birthday: string;
  primaryDoctorId: number;
  familyDoctorId: number | null;
  allergies: string[];
  primaryCondition: string[];
  secondaryCondition: string[];
  medications: { id: number; genericName: string }[];
}

interface GetPatients =  {
  patients: Patients[]
}

const GET_PATIENTS =  {
  gql 
}

export default function PatientsPage() {
  return (
    <div>
      <h1 className="title">Patients</h1>
    </div>
  );
}
