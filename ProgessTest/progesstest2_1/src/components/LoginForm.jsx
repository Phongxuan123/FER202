import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';

import { loginAction } from '../services/AuthAPI'; 
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import ModalConfirm from './ModalConfirm';

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState(''); 
    // Lấy navigate từ react-router-dom để chuyển hướng sau khi đăng nhập thành công
    const navigate = useNavigate();

    // Lấy state và dispatch từ AuthContext
    const { state, dispatch } = useAuth();

    //Tạo 1 state cho lỗi
    const [errors, setError] = useState({ message: '' });
    const [showModal, setShowModal] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        //Xử lý lỗi cơ bản trước khi gọi API (ví dụ: kiểm tra rỗng)
        const newErrors = {};
        if (!username) newErrors.username = 'Username is required';
        if (!password) newErrors.password = 'Password is required';

        // Kiểm tra email hợp lệ nếu username có chứa '@'
        if (username && username.includes('@')) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(username)) {
                newErrors.username = 'Invalid email format';
            }
        }
        //Xử lý lỗi password yếu (ví dụ: ít nhất 6 ký tự)
        if (password && password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (Object.keys(newErrors).length > 0) {
            setError(newErrors);
            return; // Nếu có lỗi, không tiếp tục gọi API
        }

        // Nếu không có lỗi, Gọi hàm login từ AuthAPI.
        // Lưu ý: Hàm này nên tự thực hiện dispatch LOGIN_START và LOGIN_SUCCESS/FAILURE nội bộ.
        const result = await loginAction(dispatch, { username, password });

        if (result.success) {
            if (result.user.role !== 'admin') {
                setError({ message: 'Access denied. Admins only.' });
                return;
            }
            // Kiểm tra trạng thái tài khoản trước khi đăng nhập, nếu locked thì báo lỗi Access is denied.
            if (result.user.status === 'locked') {
                setError({ message: 'Access is denied. Your account is locked.' });
                return;
            }

            console.log('Login successful:', result.user);
            // alert('Login successful!');
            //Thay vì hiển thị alert, chúng ta sẽ hiển thị modal xác nhận
            setShowModal(true);
            setTimeout(() => {
                setShowModal(false);
                navigate('/');
            }, 3000);
            
        } else {
            console.error('Login failed:', result.message);
            setError({ message: result.message });
        }
    };

    const handleCancel = () => {
        setUsername('');
        setPassword('');
    };

    // Hàm tiện ích để xử lý thay đổi input và xóa lỗi tương ứng khi người dùng nhập lại
   const handleInputChange = (setter, field) => (e) => {
    setter(e.target.value);
    setError((prevErrors) => ({ ...prevErrors, [field]: '' }));
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
                            
                            {/* Hiển thị thông báo lỗi nếu có từ global state */}
                           {state.error || errors.message ? <Alert variant="danger">{state.error || errors.message}</Alert> : null}
                            
                            <Form onSubmit={handleLogin} noValidate>
    <Form.Group controlId="identifier" className="mb-3">
        <Form.Label>Username or email</Form.Label>
        <Form.Control
            type="text"
            placeholder="Enter username or email"
            value={username}
            onChange={handleInputChange(setUsername, 'username')}
            
            disabled={state.loading}
            isInvalid={!!errors.username} // Chỉ kiểm tra lỗi cục bộ
        />
        <Form.Control.Feedback type="invalid">
            {errors.username} {/* Chỉ hiển thị lỗi cục bộ */}
        </Form.Control.Feedback>
    </Form.Group>

    <Form.Group controlId="password" className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
            type="password"
            value={password}
            onChange={handleInputChange(setPassword, 'password')}
            placeholder="Enter password"
            
            disabled={state.loading}
            isInvalid={!!errors.password} // Chỉ kiểm tra lỗi cục bộ
        />
        <Form.Control.Feedback type="invalid">
            {errors.password} {/* Chỉ hiển thị lỗi cục bộ */}
        </Form.Control.Feedback>
    </Form.Group>

    <div className="d-flex gap-2 mt-4">
        <Button 
            variant="primary" 
            type="submit" 
            className="flex-fill"
            disabled={state.loading}
        >
            {state.loading ? 'Logging in...' : 'Login'}
        </Button>
        <Button 
            variant="secondary" 
            type="button" 
            className="flex-fill"
            onClick={handleCancel}
            disabled={state.loading}
        >
            Cancel
        </Button>
    </div>
</Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
                {/* Modal xác nhận đăng nhập thành công */}
        <ModalConfirm 
            show={showModal}
            title="Login Successful"
            message="You have successfully logged in. Redirecting to dashboard..."
            onConfirm={() => setShowModal(false)} // Đóng modal khi người dùng nhấn Confirm
            onCancel={() => setShowModal(false)} // Đóng modal khi người dùng nhấn Cancel hoặc đóng modal
        />
        </Container>
    );  
}   

export default LoginForm;
