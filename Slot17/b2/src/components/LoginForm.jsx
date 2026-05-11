import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Modal, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';

function LoginForm() {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [identifierError, setIdentifierError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [formError, setFormError] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const resetErrors = () => {
    setIdentifierError('');
    setPasswordError('');
    setFormError('');
  };

  const handleCancel = () => {
    setIdentifier('');
    setPassword('');
    resetErrors();
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const handleConfirmSuccessModal = () => {
    setShowSuccessModal(false);
    navigate('/dashboard');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    resetErrors();
    setIsLoading(true);

    const trimmedIdentifier = identifier.trim();
    let hasError = false;

    if (!trimmedIdentifier && !password) {
      setFormError('Username and password are required');
      setIsLoading(false);
      return;
    }

    if (!trimmedIdentifier) {
      setIdentifierError('Username is required');
      hasError = true;
    }

    if (!password) {
      setPasswordError('Password is required');
      hasError = true;
    }

    if (password && password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      hasError = true;
    }

    if (hasError) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/users`);
      const users = response.data;
      const foundUser = users.find(user => user.username === trimmedIdentifier);

      if (!foundUser) {
        setIdentifierError('Account not found');
        setIsLoading(false);
        return;
      }

      if (password !== foundUser.password) {
        setPasswordError('Incorrect password');
        setIsLoading(false);
        return;
      }

      setFormError('');
      setShowSuccessModal(true);
      setIsLoading(false);
    } catch (error) {
      setFormError('Connection error. Please try again.');
      console.error('Login error:', error);
      setIsLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-start pt-5" style={{ minHeight: '100vh' }}>
      <div style={{ width: '100%', maxWidth: '400px', border: '1px solid #ddd', padding: '30px', borderRadius: '4px', backgroundColor: '#f9f9f9', textAlign: 'left' }}>
        <h2 className="mb-4">Login</h2>
        
        {formError && (
          <Alert variant="warning" className="mb-3" style={{ backgroundColor: '#f8d7da', color: '#721c24', border: '1px solid #f5c6cb' }}>
            {formError}
          </Alert>
        )}
        
        <Form noValidate onSubmit={handleSubmit}>

          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={identifier}
              isInvalid={Boolean(identifierError)}
              onChange={(event) => setIdentifier(event.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              {identifierError}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              isInvalid={Boolean(passwordError)}
              onChange={(event) => setPassword(event.target.value)}
            />
            <Form.Text className="d-block text-muted small">
              (at least 6 characters)
            </Form.Text>
            <Form.Control.Feedback type="invalid" style={{ display: passwordError ? 'block' : 'none' }}>
              {passwordError}
            </Form.Control.Feedback>
          </Form.Group>

          <div className="d-flex gap-2">
            <Button 
              variant="primary" 
              type="submit" 
              className="flex-fill"
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Login'}
            </Button>
            <Button 
              variant="secondary" 
              type="button" 
              className="flex-fill"
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
          </div>
        </Form>
      </div>

      <Modal show={showSuccessModal} onHide={handleCloseSuccessModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Login Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You have successfully logged in. Redirecting to dashboard...
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseSuccessModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmSuccessModal}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
    );  
}

export default LoginForm;

