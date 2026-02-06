import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const PostsList = ({ posts }) => {
  return (
    <Row>
      {posts.map((post) => (
        <Col key={post.id} md={6} className="mb-4">
          <Card className="shadow-sm hover-card h-100">
            <Card.Body>
              <Card.Title className="text-dark fw-bold">{post.title}</Card.Title>
              <Card.Text className="text-muted">{post.body}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default PostsList;
