//ToastMessage.jsx - Toast component dùng chung để hiển thị thông báo
//Sử dụng React-Bootstrap Toast với các variant khác nhau (success, danger, warning, info)
import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

function ToastMessage({ show, onClose, message, variant = 'success' }) {
    return (
        <ToastContainer position="top-end" className="p-3" style={{ zIndex: 9999 }}>
            <Toast show={show} onClose={onClose} delay={3000} autohide bg={variant}>
                <Toast.Header>
                    <strong className="me-auto">Notification</strong>
                </Toast.Header>
                <Toast.Body className={variant === 'dark' ? 'text-white' : ''}>
                    {message}
                </Toast.Body>
            </Toast>
        </ToastContainer>
    );
}

export default ToastMessage;
