import React from 'react';
import { Card } from 'react-bootstrap';

const User = ({ user }) => {
  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <Card.Title className="text-primary">
          <i className="bi bi-person-circle me-2"></i>
          {user.name}
        </Card.Title>
        <Card.Text>
          <strong>Email:</strong> {user.email}
        </Card.Text>
        <Card.Text>
          <strong>Phone:</strong> {user.phone}
        </Card.Text>
        <Card.Text>
          <strong>Website:</strong> {user.website}
        </Card.Text>
        <Card.Text>
          <strong>Company:</strong> {user.company.name}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default User;
