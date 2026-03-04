/**
 * Modal xác nhận hành động (Lock/Unlock tài khoản).
 * Hiển thị câu hỏi xác nhận và 2 nút: Hủy (Cancel) / Xác nhận (Confirm).
 */
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function ConfirmModal({ show, message, onConfirm, onCancel }) {
  return (
    <Modal show={show} centered onHide={onCancel}>
      {/* Nội dung câu hỏi xác nhận */}
      <Modal.Body className="py-4 px-4">
        <p className="mb-0">{message}</p>
      </Modal.Body>

      {/* Cặp nút hành động */}
      <Modal.Footer className="border-0 pt-0">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmModal;
