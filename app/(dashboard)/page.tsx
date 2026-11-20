"use client";
import { useQuery, gql } from "@apollo/client";

// Define the shape of a Doctor object
interface Doctor {
  id: number;
  firstName: string;
  lastName: string;
}

// Define the shape of the query results
interface GetDoctorsData {
  doctors: Doctor[];
}

// Test Query
const GET_DOCTORS = gql`
  query GetDoctors {
    doctors {
      id
      firstName
      lastName
      specialty
      email
    }
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery<GetDoctorsData>(GET_DOCTORS);

  if (loading) return <p>Loading Data</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {data?.doctors.map((doctor) => (
        <h1 key={doctor.id}>
          {doctor.firstName} {doctor.lastName}
        </h1>
      ))}
    </div>
  );
}
