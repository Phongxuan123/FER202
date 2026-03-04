/**
 * Modal thông báo kết quả (đăng nhập thành công, ...).
 * Hiển thị tiêu đề, nội dung và nút "Continue" ở giữa màn hình.
 * Không cho phép đóng bằng phím ESC hoặc nhấn ngoài (backdrop="static").
 */
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function MessageModal({ show, title, message, onContinue }) {
  return (
    <Modal show={show} centered backdrop="static" keyboard={false}>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>

      {/* Nút duy nhất để xác nhận và tiếp tục */}
      <Modal.Footer className="justify-content-center">
        <Button variant="success" onClick={onContinue}>
          Continue
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MessageModal;
