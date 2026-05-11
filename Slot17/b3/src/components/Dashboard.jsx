import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Alert, Button, Container, Form, Table } from 'react-bootstrap';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const loadUsers = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.get(`${API_BASE_URL}/users`);
      setUsers(response.data);
    } catch (apiError) {
      setError('Cannot load users from server. Please check json-server.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    const keyword = searchKeyword.trim().toLowerCase();
    if (!keyword) {
      return users;
    }

    return users.filter((user) => {
      const email = `${String(user.username || '').toLowerCase()}@mail.com`;
      const username = String(user.username || '').toLowerCase();
      return username.includes(keyword) || email.includes(keyword);
    });
  }, [searchKeyword, users]);

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`${API_BASE_URL}/users/${userId}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (apiError) {
      setError('Delete failed. Please try again.');
    }
  };

  const handleEditUser = async (user) => {
    const newFullName = window.prompt('Update full name:', user.fullName || '');

    if (newFullName === null) {
      return;
    }

    const trimmedName = newFullName.trim();
    if (!trimmedName) {
      setError('Full name cannot be empty.');
      return;
    }

    try {
      const response = await axios.patch(`${API_BASE_URL}/users/${user.id}`, {
        fullName: trimmedName
      });

      setUsers((prevUsers) =>
        prevUsers.map((item) => (item.id === user.id ? response.data : item))
      );
    } catch (apiError) {
      setError('Edit failed. Please try again.');
    }
  };

  return (
    <>
      <Container className="py-3" style={{ textAlign: 'left' }}>
        {error && (
          <Alert variant="danger" className="mb-3">
            {error}
          </Alert>
        )}

        <Form.Control
          type="text"
          className="mb-3"
          placeholder="Search by username or email"
          value={searchKeyword}
          onChange={(event) => setSearchKeyword(event.target.value)}
        />

        <Table bordered hover responsive size="sm" className="align-middle mb-0">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Full Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {!isLoading && filteredUsers.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-3">
                  No users found.
                </td>
              </tr>
            )}

            {isLoading && (
              <tr>
                <td colSpan={4} className="text-center py-3">
                  Loading users...
                </td>
              </tr>
            )}

            {!isLoading &&
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>{`${user.username}@mail.com`}</td>
                  <td>{user.fullName}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleEditUser(user)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default Dashboard;
