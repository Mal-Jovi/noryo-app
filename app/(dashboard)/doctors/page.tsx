"use client";
import { useQuery, gql } from "@apollo/client";

interface Doctor {
  id: number;
  firstName: string;
  lastName: string;
  licenseNumber: string;
  specialty: string;
  email: string;
}

interface GetDoctorsData {
  doctors: Doctor[];
}

const GET_DOCTORS = gql`
  query GetDoctor {
    doctors {
      id
      firstName
      lastName
      licenseNumber
      specialty
      email
    }
  }
`;

export default function DoctorsPage() {
  const { loading, error, data } = useQuery<GetDoctorsData>(GET_DOCTORS);

  if (loading) return <p>Loading doctors...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const doctors = data?.doctors || [];
  return (
    <div>
      <h1 className="title">Doctors</h1>
      <ul>
        {doctors.map((doctor) => (
          <li key={doctor.id}>
            {doctor.firstName} {doctor.lastName} - {doctor.specialty}
          </li>
        ))}
      </ul>
    </div>
  );
}
