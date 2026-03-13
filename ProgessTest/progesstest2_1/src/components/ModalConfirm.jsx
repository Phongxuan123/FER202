//ModalConfirm.jsx kết hợp React-Bootstrap để tạo một modal xác nhận có thể tái sử dụng, cho phép người dùng xác nhận hoặc hủy bỏ một hành động. Modal này nhận các props để tùy chỉnh tiêu đề, nội dung và các hàm xử lý sự kiện cho các nút xác nhận và hủy bỏ.
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
function ModalConfirm({ show, title, message, onConfirm, onCancel }) {
    return (
        <Modal show={show} onHide={onCancel} centered>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{message}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onCancel}> 
                    Cancel
                </Button>
                <Button variant="danger" onClick={onConfirm}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
export default ModalConfirm;
