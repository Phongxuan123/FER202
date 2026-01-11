import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import StudentCard from './StudentCard';
import About from './About';
import listOfStudent from '../listOfStudent';

function StudentList() {
  return (
    <Container>
      <About />
      <Row className="mt-4">
        {listOfStudent.map((student) => (
          <Col key={student.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <StudentCard student={student} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default StudentList;
