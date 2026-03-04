/**
 * Form đăng nhập chính của ứng dụng.
 * Xác thực bằng username/email + password so với dữ liệu từ API.
 * Kiểm tra: trường rỗng, tài khoản tồn tại, quyền admin, trạng thái bị khoá.
 */
import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import MessageModal from './MessageModal';
import { useAuth } from '../contexts/AuthContext';
import { getAllAccounts } from '../services/accountService';

// Các thông báo lỗi - tập trung để dễ quản lý và tránh lặp (DRY)
const ERROR_MESSAGES = {
  EMPTY_USERNAME: 'Username or Email is required.',
  EMPTY_PASSWORD: 'Password is required.',
  INVALID_CREDENTIALS: 'Invalid username/email or password!',
  NOT_ADMIN: 'Access denied. Only admin users can log in.',
  ACCOUNT_LOCKED: 'Account is locked. Please contact admin.',
  SERVER_ERROR: 'Cannot connect to server. Please try again later.',
};

// Hằng số giao diện
const LOGIN_CARD_WIDTH = '420px';
const FULL_SCREEN_HEIGHT = '100vh';

function LoginForm() {
  // Giá trị nhập từ người dùng
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');

  // Thông báo lỗi riêng cho từng trường
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Thông báo lỗi chung (hiển thị dạng Alert)
  const [alertMessage, setAlertMessage] = useState('');

  // Trạng thái modal thông báo đăng nhập thành công
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  const navigate = useNavigate();
  const { login } = useAuth();

  /**
   * Kiểm tra các trường nhập có hợp lệ không.
   * Trả về true nếu tất cả hợp lệ, false nếu có lỗi.
   */
  const validateInputFields = () => {
    let isValid = true;
    setUsernameError('');
    setPasswordError('');

    if (!usernameOrEmail.trim()) {
      setUsernameError(ERROR_MESSAGES.EMPTY_USERNAME);
      isValid = false;
    }
    if (!password.trim()) {
      setPasswordError(ERROR_MESSAGES.EMPTY_PASSWORD);
      isValid = false;
    }
    return isValid;
  };

  /**
   * Tìm tài khoản trùng khớp với username/email và password.
   * Trả về đối tượng account hoặc undefined nếu không tìm thấy.
   */
  const findMatchingAccount = (accounts) =>
    accounts.find(
      (account) =>
        (account.username === usernameOrEmail || account.email === usernameOrEmail) &&
        account.password === password
    );

  /**
   * Xử lý khi bấm nút Login: validate → gọi API → kiểm tra điều kiện.
   */
  const handleLogin = async () => {
    setAlertMessage('');
    if (!validateInputFields()) return;

    try {
      const accounts = await getAllAccounts();
      const matchedAccount = findMatchingAccount(accounts);

      // Kiểm tra lần lượt từng điều kiện, dừng ngay khi thất bại
      if (!matchedAccount) {
        setAlertMessage(ERROR_MESSAGES.INVALID_CREDENTIALS);
        return;
      }
      if (matchedAccount.role !== 'admin') {
        setAlertMessage(ERROR_MESSAGES.NOT_ADMIN);
        return;
      }
      if (matchedAccount.status === 'locked') {
        setAlertMessage(ERROR_MESSAGES.ACCOUNT_LOCKED);
        return;
      }

      // Tất cả điều kiện đều đạt → hiển thị modal thành công
      setAuthenticatedUser(matchedAccount);
      setIsSuccessModalVisible(true);
    } catch (error) {
      setAlertMessage(ERROR_MESSAGES.SERVER_ERROR);
    }
  };

  /** Xoá sạch toàn bộ form và thông báo lỗi */
  const handleCancel = () => {
    setUsernameOrEmail('');
    setPassword('');
    setUsernameError('');
    setPasswordError('');
    setAlertMessage('');
  };

  /** Khi người dùng bấm Continue trên modal → lưu phiên đăng nhập → chuyển trang */
  const handleContinue = () => {
    setIsSuccessModalVisible(false);
    login(authenticatedUser);
    navigate('/accounts');
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: FULL_SCREEN_HEIGHT }}
    >
      <Card style={{ width: LOGIN_CARD_WIDTH }}>
        <Card.Body className="p-4">
          <h3 className="text-center mb-4">Login</h3>

          {/* Thông báo lỗi chung dạng Alert đỏ */}
          {alertMessage && (
            <Alert variant="danger" dismissible onClose={() => setAlertMessage('')}>
              {alertMessage}
            </Alert>
          )}

          {/* Trường nhập username hoặc email */}
          <Form.Group className="mb-3">
            <Form.Label>Username or email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username or email"
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
              isInvalid={!!usernameError}
            />
            <Form.Control.Feedback type="invalid">
              {usernameError}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Trường nhập mật khẩu */}
          <Form.Group className="mb-4">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isInvalid={!!passwordError}
            />
            <Form.Control.Feedback type="invalid">
              {passwordError}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Cặp nút hành động */}
          <div className="d-flex gap-2 mb-3">
            <Button variant="primary" className="flex-fill" onClick={handleLogin}>
              Login
            </Button>
            <Button variant="secondary" className="flex-fill" onClick={handleCancel}>
              Cancel
            </Button>
          </div>

          {/* Liên kết sang trang đăng ký */}
          <div className="text-center">
            <a href="/register">Don't have an account? Sign up.</a>
          </div>
        </Card.Body>
      </Card>

      {/* Modal hiển thị khi đăng nhập thành công */}
      <MessageModal
        show={isSuccessModalVisible}
        title="Login Successful"
        message={`Welcome, ${authenticatedUser?.username}! You have successfully logged in.`}
        onContinue={handleContinue}
      />
    </Container>
  );
}

export default LoginForm;
