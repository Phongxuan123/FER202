import React, { useState } from 'react';
import { Container, Button, Modal } from 'react-bootstrap';
import '../../styles/Exercise2.css';

/**
 * Exercise 2: Sử dụng useState để quản lý trạng thái Modal
 * 
 * useState với giá trị boolean để kiểm soát hiển thị/ẩn Modal
 * - true: hiển thị modal
 * - false: ẩn modal
 */
function Exercise2() {
  // useState với giá trị boolean để quản lý trạng thái modal
  const [isShowModal, setIsShowModal] = useState(false);

  // Mở modal - set state thành true
  const handleOpenModal = () => {
    setIsShowModal(true);
  };

  // Đóng modal - set state thành false
  const handleCloseModal = () => {
    setIsShowModal(false);
  };

  // Xử lý xác nhận và đóng modal
  const handleConfirm = () => {
    const confirmed = window.confirm(
      'Bạn có chắc chắn muốn duyệt đơn hàng này để chuyển sang bộ phận kho không?'
    );
    
    if (confirmed) {
      alert('Xử lý đơn hàng thành công!');
      setIsShowModal(false);
    }
  };

  return (
    <div className="exercise2-container">
      <Container>
        <div className="exercise2-card">
          <h2 className="text-center exercise2-title">Exercise 2: useState - Quản lý Modal</h2>
          <div className="alert alert-info text-center mb-3">
            <small><strong>useState Hook:</strong> const [isShowModal, setIsShowModal] = useState(false)</small>
          </div>
          <div className="text-center">
            <Button variant="primary" onClick={handleOpenModal} className="process-btn">
              Xử lý đơn hàng
            </Button>
          </div>
        </div>
      </Container>

      <Modal show={isShowModal} onHide={handleCloseModal} centered className="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận xử lý đơn hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Bạn có muốn xử lý đơn hàng này không?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal} className="modal-btn">
            Hủy
          </Button>
          <Button variant="primary" onClick={handleConfirm} className="modal-btn">
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Exercise2;
