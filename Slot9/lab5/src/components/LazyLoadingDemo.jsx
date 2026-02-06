import React, { Suspense, useState } from 'react';
import { Container, Row, Col, Button, Spinner, Card, ButtonGroup } from 'react-bootstrap';
import { createUserResource, createPostResource } from '../api/api';
import ErrorBoundary from './ErrorBoundary';

const User = React.lazy(() => import('./User'));
const Post = React.lazy(() => import('./Post'));

const LazyLoadingDemo = () => {
  const [userId, setUserId] = useState(1);
  const [postId, setPostId] = useState(1);
  const [userResource, setUserResource] = useState(() => createUserResource(1));
  const [postResource, setPostResource] = useState(() => createPostResource(1));

  const handleLoadUser = (id) => {
    setUserId(id);
    setUserResource(createUserResource(id));
  };

  const handleLoadPost = (id) => {
    setPostId(id);
    setPostResource(createPostResource(id));
  };

  return (
    <ErrorBoundary>
      <Container className="py-5">
        <Card className="mb-4 shadow-lg">
          <Card.Header className="bg-gradient text-white" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
            <h1 className="text-center mb-0">
              <i className="bi bi-lightning-charge me-2"></i>
              React Lazy Loading & Suspense Demo
            </h1>
          </Card.Header>
          <Card.Body>
            <p className="text-center text-muted mb-4">
              Demonstration of lazy loading components with React.lazy() and Suspense for dynamic data fetching
            </p>
          </Card.Body>
        </Card>

        <Row className="mb-4">
          <Col md={6}>
            <Card className="shadow-sm h-100">
              <Card.Header className="bg-primary text-white">
                <h5 className="mb-0">
                  <i className="bi bi-person-circle me-2"></i>
                  User Component
                </h5>
              </Card.Header>
              <Card.Body>
                <p className="mb-3">Select a user to load:</p>
                <ButtonGroup className="mb-3 d-flex flex-wrap">
                  {[1, 2, 3, 4, 5].map((id) => (
                    <Button
                      key={id}
                      variant={userId === id ? 'primary' : 'outline-primary'}
                      onClick={() => handleLoadUser(id)}
                      className="m-1"
                    >
                      User {id}
                    </Button>
                  ))}
                </ButtonGroup>
                
                <Suspense 
                  fallback={
                    <div className="text-center p-4">
                      <Spinner animation="border" variant="primary" />
                      <p className="mt-3 text-muted">Loading User Data...</p>
                    </div>
                  }
                >
                  <UserWrapper resource={userResource} />
                </Suspense>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="shadow-sm h-100">
              <Card.Header className="bg-success text-white">
                <h5 className="mb-0">
                  <i className="bi bi-file-text me-2"></i>
                  Post Component
                </h5>
              </Card.Header>
              <Card.Body>
                <p className="mb-3">Select a post to load:</p>
                <ButtonGroup className="mb-3 d-flex flex-wrap">
                  {[1, 2, 3, 4, 5].map((id) => (
                    <Button
                      key={id}
                      variant={postId === id ? 'success' : 'outline-success'}
                      onClick={() => handleLoadPost(id)}
                      className="m-1"
                    >
                      Post {id}
                    </Button>
                  ))}
                </ButtonGroup>
                
                <Suspense 
                  fallback={
                    <div className="text-center p-4">
                      <Spinner animation="border" variant="success" />
                      <p className="mt-3 text-muted">Loading Post Data...</p>
                    </div>
                  }
                >
                  <PostWrapper resource={postResource} />
                </Suspense>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Card className="shadow-sm">
          <Card.Header className="bg-info text-white">
            <h5 className="mb-0">
              <i className="bi bi-info-circle me-2"></i>
              Technical Details
            </h5>
          </Card.Header>
          <Card.Body>
            <ul className="mb-0">
              <li><strong>React.lazy():</strong> Enables code splitting and lazy loading of components</li>
              <li><strong>Suspense:</strong> Displays fallback UI while lazy components are loading</li>
              <li><strong>API Integration:</strong> Fetches real data from JSONPlaceholder API</li>
              <li><strong>Resource Pattern:</strong> Wraps promises to work seamlessly with React Suspense</li>
              <li><strong>Dynamic Loading:</strong> Components and data load only when requested</li>
              <li><strong>Error Handling:</strong> Comprehensive try-catch blocks for JSON parsing and data validation</li>
            </ul>
          </Card.Body>
        </Card>
      </Container>
    </ErrorBoundary>
  );
};

// Wrapper components that read from resources
const UserWrapper = ({ resource }) => {
  try {
    const user = resource.read();
    return <User user={user} />;
  } catch (error) {
    // This error will be caught by ErrorBoundary
    throw error;
  }
};

const PostWrapper = ({ resource }) => {
  try {
    const post = resource.read();
    return <Post post={post} />;
  } catch (error) {
    // This error will be caught by ErrorBoundary
    throw error;
  }
};

export default LazyLoadingDemo;
