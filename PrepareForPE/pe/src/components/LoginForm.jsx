/**
 * Login Form Component
 */
import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../hooks/useAuth';
import { validateLoginCredentials } from '../utils/validation';
import '../styles/LoginForm.css';

const LoginForm = ({ onSuccess = null }) => {
  const navigate = useNavigate();
  const { login, loading, error } = useLogin();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false,
  });

  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Handle input change
  const handleInputChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear field error when user types
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  }, [formErrors]);

  // Validate form
  const validateForm = () => {
    const errors = {};

    const validation = validateLoginCredentials(formData.username, formData.password);
    if (!validation.valid) {
      errors.credentials = validation.message;
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    // Validate form
    if (!validateForm()) {
      return;
    }

    try {
      const result = await login({
        username: formData.username.trim(),
        password: formData.password,
      });

      if (result.success) {
        // Save reminder if checked
        if (formData.rememberMe) {
          localStorage.setItem('rememberUsername', formData.username);
        }

        // Call onSuccess callback if provided
        if (onSuccess) {
          onSuccess(result.user);
        } else {
          // Redirect to dashboard or home
          navigate('/dashboard', { replace: true });
        }
      } else {
        setSubmitError(result.error || 'Đăng nhập thất bại');
      }
    } catch (err) {
      setSubmitError(err.message || 'Đã xảy ra lỗi');
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-form-container">
      <div className="login-form-card">
        <h2 className="login-form-title">Đăng Nhập</h2>

        <form onSubmit={handleSubmit} className="login-form">
          {/* Username Field */}
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Tên đăng nhập
            </label>
            <input
              id="username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Nhập tên đăng nhập"
              className={`form-input ${formErrors.credentials ? 'is-invalid' : ''}`}
              disabled={loading}
              autoComplete="username"
              autoFocus
            />
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Mật khẩu
            </label>
            <div className="password-input-group">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Nhập mật khẩu"
                className={`form-input ${formErrors.credentials ? 'is-invalid' : ''}`}
                disabled={loading}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={togglePasswordVisibility}
                disabled={loading}
                title={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          {/* Remember Me Checkbox */}
          <div className="form-group checkbox-group">
            <input
              id="rememberMe"
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleInputChange}
              disabled={loading}
              className="form-checkbox"
            />
            <label htmlFor="rememberMe" className="checkbox-label">
              Ghi nhớ tên đăng nhập
            </label>
          </div>

          {/* Error Messages */}
          {(submitError || error || formErrors.credentials) && (
            <div className="alert alert-error">
              <span className="alert-icon">⚠️</span>
              <span className="alert-message">
                {submitError || error || formErrors.credentials}
              </span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Đang đăng nhập...
              </>
            ) : (
              'Đăng Nhập'
            )}
          </button>

          {/* Demo Credentials */}
          <div className="demo-credentials">
            <p className="demo-title">Demo Credentials:</p>
            <ul className="demo-list">
              <li><strong>Admin:</strong> admin / Admin@123</li>
              <li><strong>User:</strong> user1 / User@123</li>
            </ul>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
