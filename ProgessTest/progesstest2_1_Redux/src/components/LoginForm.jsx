import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LOGIN_MESSAGES, LOGIN_RULES, ROUTES } from '../constants/appConstants';
import { validateLoginForm } from '../utils/validation';
import ModalConfirm from './ModalConfirm';
import { clearAuthError, loginUser } from '../store/slices/authSlice';

// Khối đăng nhập này chịu trách nhiệm validate dữ liệu, gọi action đăng nhập và điều hướng người dùng.
function LoginForm() {
    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [fieldErrors, setFieldErrors] = useState({ message: '' });
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const authState = useSelector((state) => state.auth);

    const clearLocalAndGlobalErrors = () => {
        setFieldErrors({ message: '' });
        if (authState.error) {
            dispatch(clearAuthError());
        }
    };

    // Hàm này đảm bảo mọi lần nhập liệu đều dọn lỗi cũ để người dùng nhận phản hồi mới nhất.
    const createInputChangeHandler = (setInputValue, fieldKey) => (event) => {
        setInputValue(event.target.value);
        setFieldErrors((currentErrors) => ({ ...currentErrors, [fieldKey]: '', message: '' }));
        if (authState.error) {
            dispatch(clearAuthError());
        }
    };

    const startRedirectAfterLogin = () => {
        setIsSuccessModalVisible(true);
        setTimeout(() => {
            setIsSuccessModalVisible(false);
            navigate(ROUTES.DASHBOARD);
        }, LOGIN_RULES.REDIRECT_DELAY_MS);
    };

    const handleSubmitLogin = async (event) => {
        event.preventDefault();

        const validationErrors = validateLoginForm({
            username: usernameInput,
            password: passwordInput,
        });

        if (Object.keys(validationErrors).length > 0) {
            setFieldErrors(validationErrors);
            return;
        }

        const loginResultAction = await dispatch(
            loginUser({ username: usernameInput, password: passwordInput })
        );

        if (loginUser.fulfilled.match(loginResultAction)) {
            startRedirectAfterLogin();
            return;
        }

        setFieldErrors({ message: loginResultAction.payload || LOGIN_MESSAGES.LOGIN_FAILED });
    };

    const handleCancelLogin = () => {
        setUsernameInput('');
        setPasswordInput('');
        clearLocalAndGlobalErrors();
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                    <Card className="shadow-sm">
                        <Card.Header className="bg-white py-3">
                            <h3 className="text-center mb-0">Login</h3>
                        </Card.Header>

                        <Card.Body className="p-4">
                            {authState.error || fieldErrors.message ? (
                                <Alert variant="danger">{authState.error || fieldErrors.message}</Alert>
                            ) : null}

                            <Form onSubmit={handleSubmitLogin} noValidate>
                                <Form.Group controlId="identifier" className="mb-3">
                                    <Form.Label>Username or email</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter username or email"
                                        value={usernameInput}
                                        onChange={createInputChangeHandler(setUsernameInput, 'username')}
                                        disabled={authState.loading}
                                        isInvalid={Boolean(fieldErrors.username)}
                                    />
                                    <Form.Control.Feedback type="invalid">{fieldErrors.username}</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="password" className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        value={passwordInput}
                                        onChange={createInputChangeHandler(setPasswordInput, 'password')}
                                        placeholder="Enter password"
                                        disabled={authState.loading}
                                        isInvalid={Boolean(fieldErrors.password)}
                                    />
                                    <Form.Control.Feedback type="invalid">{fieldErrors.password}</Form.Control.Feedback>
                                </Form.Group>

                                <div className="d-flex gap-2 mt-4">
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        className="flex-fill"
                                        disabled={authState.loading}
                                    >
                                        {authState.loading ? 'Logging in...' : 'Login'}
                                    </Button>

                                    <Button
                                        variant="secondary"
                                        type="button"
                                        className="flex-fill"
                                        onClick={handleCancelLogin}
                                        disabled={authState.loading}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <ModalConfirm
                show={isSuccessModalVisible}
                title="Login Successful"
                message={LOGIN_MESSAGES.REDIRECT_SUCCESS}
                onConfirm={() => setIsSuccessModalVisible(false)}
                onCancel={() => setIsSuccessModalVisible(false)}
            />
        </Container>
    );
}

export default LoginForm;
