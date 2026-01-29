import React, { useState } from 'react';
import { Container, Button, Modal } from 'react-bootstrap';
import '../../styles/Exercise2.css';

// Exercise 2: Quản lý trạng thái mở/đóng Modal bằng useState
function Exercise2() {
  // Khai báo state boolean để kiểm soát hiển thị modal
  const [isShowModal, setIsShowModal] = useState(false);

  // Hàm mở modal
  const handleOpenModal = () => {
    setIsShowModal(true);
  };

  // Hàm đóng modal
  const handleCloseModal = () => {
    setIsShowModal(false);
  };

  // Hàm xử lý xác nhận và đóng modal
  const handleConfirm = () => {
    const confirmed = window.confirm(
      'Bạn có chắc chắn muốn duyệt đơn hàng này để chuyển sang bộ phận kho không?'
    );
    
    if (confirmed) {
      alert('Xử lý đơn hàng thành công!');
      setIsShowModal(false);
    }
  };

  // Render giao diện: nút trigger và Modal được điều khiển bởi state
  return (
    <div className="exercise2-container">
      <Container>
        <div className="exercise2-card">
          <h2 className="text-center exercise2-title">Exercise 2: useState - Quản lý Modal</h2>
          {/* Nút mở modal */}
          <div className="text-center">
            <Button variant="primary" onClick={handleOpenModal} className="process-btn">
              Xử lý đơn hàng
            </Button>
          </div>
        </div>
      </Container>

      {/* Modal hiển thị khi isShowModal = true */}
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
