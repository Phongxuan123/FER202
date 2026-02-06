import React, { Suspense } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { createAllUsersResource } from '../api/api';

const UsersList = React.lazy(() => import('../components/UsersList'));

const usersResource = createAllUsersResource();

const UsersPage = () => {
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
              <i className="bi bi-people-fill me-3"></i>
              Users
            </h1>
          </div>
        </Container>
      </div>
      
      <Container className="pb-5">
        <Suspense 
          fallback={
            <div className="text-center p-5">
              <Spinner animation="border" variant="light" style={{ width: '3rem', height: '3rem' }} />
              <p className="mt-3 text-white fs-5">Loading Users...</p>
            </div>
          }
        >
          <UsersWrapper resource={usersResource} />
        </Suspense>
      </Container>
    </div>
  );
};

const UsersWrapper = ({ resource }) => {
  const users = resource.read();
  return <UsersList users={users} />;
};

export default UsersPage;
