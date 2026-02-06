import React from 'react';
import { Card } from 'react-bootstrap';

const Post = ({ post }) => {
  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <Card.Title className="text-success">
          <i className="bi bi-file-text me-2"></i>
          {post.title}
        </Card.Title>
        <Card.Text>{post.body}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Post;
