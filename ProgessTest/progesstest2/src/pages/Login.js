import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { login, clearError } from '../store/authSlice';
import '../styles/Auth.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.auth);

  // If already logged in, redirect to home
  useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user, navigate]);

  // Clear errors when typing
  useEffect(() => {
    if (error) dispatch(clearError());
    setFieldErrors({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username, password]);

  const validateForm = () => {
    const newErrors = {};
    if (!username.trim() || !password.trim()) {
      newErrors.general = 'Username and password are required';
      return newErrors;
    }
    if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setFieldErrors(newErrors);
      return;
    }
    setFieldErrors({});
    const result = await dispatch(login({ username, password }));
    if (login.fulfilled.match(result)) {
      navigate('/home');
    }
  };

  const handleCancel = () => {
    setUsername('');
    setPassword('');
    setFieldErrors({});
    dispatch(clearError());
  };

  return (
    <Container className="login-container">
      <div className="login-form">
        <h2>Login</h2>

        {(fieldErrors.general || error) && (
          <Alert variant="danger" className="mb-3">
            {fieldErrors.general || error}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isInvalid={!!fieldErrors.password}
            />
            <Form.Control.Feedback type="invalid">
              {fieldErrors.password}
            </Form.Control.Feedback>
            <Form.Text className="d-block mt-1" muted>
              (at least 6 characters)
            </Form.Text>
          </Form.Group>

          <div className="d-flex gap-2">
            <Button variant="primary" type="submit" className="flex-grow-1" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
            {username.trim() && (
              <Button variant="secondary" onClick={handleCancel} disabled={loading}>
                Cancel
              </Button>
            )}
          </div>
        </Form>
      </div>
    </Container>
  );
}

export default Login;
