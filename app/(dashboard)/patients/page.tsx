"use client";
import { useQuery, gql } from "@apollo/client";

interface Patient {
  phn: string;
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

interface GetPatients {
  patients: Patient[];
}

const GET_PATIENTS = gql`
  query GetPatients {
    patients {
      phn
      firstName
      lastName
      city
      province
      gender
      age
      birthday
      primaryDoctorId
      familyDoctorId
      allergies
      primaryCondition
      secondaryCondition
      medications {
        id
        genericName
      }
    }
  }
`;

export default function PatientsPage() {
  const { loading, error, data } = useQuery<GetPatients>(GET_PATIENTS);

  if (loading) return <p> Loading Patients...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const patients = data?.patients || [];
  return (
    <div>
      <ul>
        {patients.map((patient) => (
          <li key={patient.phn}>
            {patient.firstName} {patient.lastName} {patient.age} {patient.city}{" "}
            {patient.primaryDoctorId} {patient.primaryCondition}
          </li>
        ))}
      </ul>
    </div>
  );
}
