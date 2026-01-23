import React, { useState } from 'react';
import { Container, Table, Button, Badge, Image, Form, InputGroup, Row, Col, Card } from 'react-bootstrap';
import ListOfUsers from './ListOfUsers';
import './ManageUsers.css';

function ManageUsers() {
  const [users, setUsers] = useState(ListOfUsers);
  const [searchTerm, setSearchTerm] = useState('');

  const handleEdit = (userId) => {
    alert(`Edit user with ID: ${userId}`);
  };

  const handleDelete = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  return (
    <div className="manage-users-wrapper">
      <Container fluid className="py-4">
        {/* Page Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="page-title mb-1">Manage Users</h1>
            <p className="page-subtitle">View, edit, and manage user access and permissions</p>
          </div>
          <Button variant="primary" className="add-user-btn">
            <span className="material-symbols-outlined me-2">add</span>
            Add New User
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="mb-4 filter-card">
          <Card.Body>
            <Row>
              <Col md={6} className="mb-3 mb-md-0">
                <InputGroup>
                  <InputGroup.Text>
                    <span className="material-symbols-outlined">search</span>
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Search users by name, email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputGroup>
              </Col>
              <Col md={6}>
                <div className="d-flex gap-2">
                  <Form.Select className="flex-grow-1">
                    <option value="">All Status</option>
                    <option value="active">Active</option>
                    <option value="locked">Locked</option>
                  </Form.Select>
                  <Button variant="outline-secondary" className="filter-btn">
                    <span className="material-symbols-outlined">filter_list</span>
                  </Button>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Users Table */}
        <Card className="table-card">
          <Card.Body className="p-0">
            <div className="table-responsive">
              <Table hover className="users-table mb-0">
                <thead>
                  <tr>
                    <th className="checkbox-col">
                      <Form.Check type="checkbox" />
                    </th>
                    <th>User</th>
                    <th>Status</th>
                    <th>Password</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="user-row">
                      <td className="checkbox-col">
                        <Form.Check type="checkbox" />
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Image 
                            src={user.avatar} 
                            roundedCircle 
                            width="40" 
                            height="40"
                            className="user-avatar me-3"
                          />
                          <div>
                            <div className="user-name">{user.username}</div>
                            <div className="user-id">ID: {user.id}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className={`status-dot ${user.status === 'Active' ? 'active' : 'inactive'}`}></span>
                          <Badge 
                            bg={user.status === 'Active' ? 'success' : 'secondary'}
                            className="status-badge"
                          >
                            {user.status}
                          </Badge>
                        </div>
                      </td>
                      <td>
                        <span className="password-mask">••••••••</span>
                      </td>
                      <td className="text-end">
                        <div className="action-buttons">
                          <Button 
                            variant="link" 
                            size="sm"
                            className="action-btn edit-btn"
                            onClick={() => handleEdit(user.id)}
                            title="Edit"
                          >
                            <span className="material-symbols-outlined">edit</span>
                          </Button>
                          <Button 
                            variant="link" 
                            size="sm"
                            className="action-btn delete-btn"
                            onClick={() => handleDelete(user.id)}
                            title="Delete"
                          >
                            <span className="material-symbols-outlined">delete</span>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="pagination-wrapper">
              <div className="pagination-info">
                Showing <span className="fw-semibold">1</span> to <span className="fw-semibold">{users.length}</span> of <span className="fw-semibold">{users.length}</span> results
              </div>
              <div className="pagination-controls">
                <Button variant="outline-secondary" size="sm" className="me-2">
                  <span className="material-symbols-outlined">chevron_left</span>
                </Button>
                <Button variant="primary" size="sm" className="me-2">1</Button>
                <Button variant="outline-secondary" size="sm">
                  <span className="material-symbols-outlined">chevron_right</span>
                </Button>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default ManageUsers;
