import React, { Suspense } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { createAllPostsResource } from '../api/api';

const PostsList = React.lazy(() => import('../components/PostsList'));

const postsResource = createAllPostsResource();

const PostsPage = () => {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <div style={{ 
        background: '#1a1a2e', 
        color: 'white', 
        padding: '3rem 0',
        marginBottom: '2rem'
      }}>
        <Container>
          <div className="text-center">
            <h1 className="display-4 fw-bold mb-0">
              <i className="bi bi-file-text-fill me-3"></i>
              Posts
            </h1>
          </div>
        </Container>
      </div>
      
      <Container className="pb-5">
        <Suspense 
          fallback={
            <div className="text-center p-5">
              <Spinner animation="border" variant="light" style={{ width: '3rem', height: '3rem' }} />
              <p className="mt-3 text-white fs-5">Loading Posts...</p>
            </div>
          }
        >
          <PostsWrapper resource={postsResource} />
        </Suspense>
      </Container>
    </div>
  );
};

const PostsWrapper = ({ resource }) => {
  const posts = resource.read();
  return <PostsList posts={posts} />;
};

export default PostsPage;
