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
    <div className="patient-table-wrap">
      <table className="patient-table">
        <thead className="patient-table-header">
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Province</th>
            <th className="city-cell-label">City</th>
            <th>Conditions</th>
            <th>Allergies</th>
            <th>Medications</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.phn}>
              <td className="name-cell">
                {patient.firstName} {patient.lastName}
              </td>
              <td>{patient.age}</td>
              <td className="gender-cell">{patient.gender}</td>
              <td>{patient.province}</td>
              <td>{patient.city}</td>
              <td className="tag-cell">
                {[
                  ...patient.primaryCondition,
                  ...patient.secondaryCondition,
                ].map((condition) => (
                  <span key={condition} className="tag-basic">
                    {condition}
                  </span>
                ))}
              </td>
              <td className="tag-cell">
                {patient.allergies.map((allergy) => (
                  <span key={allergy} className="tag-basic tag-warning">
                    {allergy}
                  </span>
                ))}
              </td>
              <td className="tag-cell">
                {patient.medications.map((medication) => (
                  <span
                    key={medication.id}
                    className="tag-basic tag-medication"
                  >
                    {medication.genericName}
                  </span>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
