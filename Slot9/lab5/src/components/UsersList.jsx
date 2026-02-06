import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const UsersList = ({ users }) => {
  return (
    <Row>
      {users.map((user) => (
        <Col key={user.id} xs={12} className="mb-3">
          <Card className="shadow-sm hover-card">
            <Card.Body>
              <Card.Title className="text-dark fw-bold">{user.name}</Card.Title>
              <Card.Text className="text-muted mb-0">{user.email}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default UsersList;
