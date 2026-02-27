import React, { useReducer } from 'react';
import { Form, Button, Alert, Card } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';

const FORM_ACTIONS = {
  SET_USERNAME: 'SET_USERNAME',
  SET_PASSWORD: 'SET_PASSWORD',
  SET_ERROR: 'SET_ERROR',
  SET_SUBMITTED: 'SET_SUBMITTED',
  SET_LOGIN_MESSAGE: 'SET_LOGIN_MESSAGE',
  RESET_FORM: 'RESET_FORM'
};

const initialFormState = {
  username: '',
  password: '',
  errors: {
    username: '',
    password: ''
  },
  submitted: false,
  loginMessage: ''
};

const loginFormReducer = (state, action) => {
  switch (action.type) {
    case FORM_ACTIONS.SET_USERNAME:
      return {
        ...state,
        username: action.payload,
        errors: { ...state.errors, username: '' }
      };
    
    case FORM_ACTIONS.SET_PASSWORD:
      return {
        ...state,
        password: action.payload,
        errors: { ...state.errors, password: '' }
      };
    
    case FORM_ACTIONS.SET_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.payload.field]: action.payload.message
        }
      };
    
    case FORM_ACTIONS.SET_SUBMITTED:
      return {
        ...state,
        submitted: action.payload
      };
    
    case FORM_ACTIONS.SET_LOGIN_MESSAGE:
      return {
        ...state,
        loginMessage: action.payload
      };
    
    case FORM_ACTIONS.RESET_FORM:
      return initialFormState;
    
    default:
      return state;
  }
};

function LoginForm() {
  const [state, dispatch] = useReducer(loginFormReducer, initialFormState);
  const { login } = useAuth();

  const validateForm = () => {
    let isValid = true;
    const newErrors = { username: '', password: '' };

    if (!state.username.trim()) {
      newErrors.username = 'Vui lòng nhập tên đăng nhập!';
      isValid = false;
    } else if (state.username.length < 3) {
      newErrors.username = 'Tên đăng nhập phải có ít nhất 3 ký tự!';
      isValid = false;
    }

    if (!state.password) {
      newErrors.password = 'Vui lòng nhập mật khẩu!';
      isValid = false;
    } else if (state.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự!';
      isValid = false;
    }

    if (!isValid) {
      Object.keys(newErrors).forEach(field => {
        if (newErrors[field]) {
          dispatch({
            type: FORM_ACTIONS.SET_ERROR,
            payload: { field, message: newErrors[field] }
          });
        }
      });
    }

    return isValid;
  };

  const handleUsernameChange = (e) => {
    dispatch({
      type: FORM_ACTIONS.SET_USERNAME,
      payload: e.target.value
    });
  };

  const handlePasswordChange = (e) => {
    dispatch({
      type: FORM_ACTIONS.SET_PASSWORD,
      payload: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    dispatch({ type: FORM_ACTIONS.SET_SUBMITTED, payload: true });
    dispatch({ type: FORM_ACTIONS.SET_LOGIN_MESSAGE, payload: '' });

    if (!validateForm()) {
      return;
    }

    const result = login(state.username, state.password);

    dispatch({
      type: FORM_ACTIONS.SET_LOGIN_MESSAGE,
      payload: result.message
    });

    if (result.success) {
      dispatch({ type: FORM_ACTIONS.RESET_FORM });
    }
  };

  // Style cho container với background pattern
  const containerStyle = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1.5rem',
    backgroundColor: '#f4f7f6',
    backgroundImage: 'radial-gradient(#dee2e6 0.5px, transparent 0.5px)',
    backgroundSize: '20px 20px'
  };

  const cardWrapperStyle = {
    width: '100%',
    maxWidth: '480px'
  };

  const cardStyle = {
    backgroundColor: '#ffffff',
    border: '1px solid #dee2e6',
    borderRadius: '0.5rem',
    boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)',
    overflow: 'hidden'
  };

  const headerStyle = {
    backgroundColor: '#0d6efd',
    color: 'white',
    padding: '1.5rem',
    borderBottom: '1px solid #dee2e6'
  };

  const inputStyle = {
    padding: '0.625rem 1rem',
    fontSize: '1rem',
    borderRadius: '0.375rem',
    border: '1px solid #ced4da',
    transition: 'all 0.15s ease-in-out'
  };

  const buttonStyle = {
    padding: '0.625rem 1rem',
    fontSize: '1.125rem',
    fontWeight: '500',
    borderRadius: '0.375rem',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    transition: 'all 0.2s ease-in-out'
  };

  // 9. Hiển thị form đăng nhập
  return (
    <div style={containerStyle}>
      <div style={cardWrapperStyle}>
        <Card style={cardStyle}>
          {/* Header */}
          <div style={headerStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div>
                <h5 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 'bold', lineHeight: 1.2 }}>
                  Đăng nhập hệ thống
                </h5>
                <p style={{ 
                  margin: '0.125rem 0 0 0', 
                  fontSize: '0.75rem', 
                  opacity: 0.8,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  fontWeight: 500
                }}>
                  Bảng điều khiển quản trị
                </p>
              </div>
            </div>
          </div>

          {/* Body */}
          <Card.Body style={{ padding: '2rem' }}>
            {/* Hiển thị thông báo login */}
            {state.loginMessage && (
              <Alert 
                variant={state.loginMessage.includes('thành công') ? 'success' : 'danger'}
                onClose={() => dispatch({ type: FORM_ACTIONS.SET_LOGIN_MESSAGE, payload: '' })}
                dismissible
                style={{ marginBottom: '1.5rem' }}
              >
                {state.loginMessage}
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              {/* Username field */}
              <Form.Group className="mb-4" controlId="formUsername">
                <Form.Label style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                  Tên đăng nhập
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập tên đăng nhập"
                  value={state.username}
                  onChange={handleUsernameChange}
                  isInvalid={state.submitted && state.errors.username}
                  style={inputStyle}
                />
                <Form.Control.Feedback type="invalid">
                  {state.errors.username}
                </Form.Control.Feedback>
                <small style={{ 
                  color: '#6c757d', 
                  fontSize: '0.8rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.25rem',
                  marginTop: '0.375rem'
                }}>
                  Tên đăng nhập phải có ít nhất 3 ký tự
                </small>
              </Form.Group>

              {/* Password field */}
              <Form.Group className="mb-4" controlId="formPassword">
                <Form.Label style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                  Mật khẩu
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="••••••••"
                  value={state.password}
                  onChange={handlePasswordChange}
                  isInvalid={state.submitted && state.errors.password}
                  style={inputStyle}
                />
                <Form.Control.Feedback type="invalid">
                  {state.errors.password}
                </Form.Control.Feedback>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginTop: '0.375rem'
                }}>
                  <small style={{ 
                    color: '#6c757d', 
                    fontSize: '0.8rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}>
                    Mật khẩu phải có ít nhất 6 ký tự
                  </small>
                </div>
              </Form.Group>

              {/* Submit button */}
              <Button 
                variant="primary" 
                type="submit" 
                className="w-100"
                style={buttonStyle}
              >
                Đăng nhập
              </Button>
            </Form>
          </Card.Body>
        </Card>

        {/* Footer */}
        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <p style={{ color: '#9ca3af', fontSize: '0.75rem', margin: 0 }}>
            © 2024 Corporate Dashboard. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
