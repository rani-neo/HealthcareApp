import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import S3Uploader from "./upload";

interface Patient {
  id: number;
  full_name: string;
  age: number;
}

function App() {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await fetch(
        "https://healthcare-app-pg83-rho.vercel.app/api/patients"
      );

      const data = await response.json();
      setPatients(data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  const handleDeletePatient = async (id: number) => {
    try {
      await fetch(
        `https://healthcare-app-pg83-rho.vercel.app/api/patients/${id}`,
        {
          method: "DELETE",
        }
      );

      fetchPatients();
    } catch (error) {
      console.error(`Error deleting patient with id ${id}:`, error);
    }
  };

  return (
    <Container className="mt-4">
      <h1 className="app-title">Healthcare App</h1>

      <S3Uploader />

      <Row className="mt-4">
        {patients.map((patient) => (
          <Col key={patient.id} sm={12} md={6} lg={4}>
            <Card className="mb-4 patient-card">
              <Card.Body>
                <Card.Title>{patient.full_name}</Card.Title>

                <Card.Text>
                  {patient.age} years old
                </Card.Text>

                <Button
                  variant="danger"
                  onClick={() => handleDeletePatient(patient.id)}
                >
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default App;