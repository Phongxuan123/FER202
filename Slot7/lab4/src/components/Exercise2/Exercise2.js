import React, { useReducer } from 'react';
import { Container, Button, Modal } from 'react-bootstrap';
import '../../styles/Exercise2.css';

// Reducer function để xử lý các actions
const reducer = (state, action) => {
  switch (action.type) {
    case 'OPEN_MODAL':
      // Mở modal
      return { ...state, isShowModal: true };
    
    case 'CLOSE_MODAL':
      // Đóng modal
      return { ...state, isShowModal: false };
    
    case 'CONFIRM_ORDER':
      // Xác nhận đơn hàng: set isConfirmed = true và đóng modal
      return { ...state, isConfirmed: true, isShowModal: false };
    
    default:
      return state;
  }
};

// Exercise 2: Quản lý trạng thái mở/đóng Modal bằng useReducer
function Exercise2() {
  // Khai báo useReducer với state object { isShowModal, isConfirmed }
  const [state, dispatch] = useReducer(reducer, {
    isShowModal: false,
    isConfirmed: false
  });

  // Hàm mở modal - dispatch action OPEN_MODAL
  const handleOpenModal = () => {
    dispatch({ type: 'OPEN_MODAL' });
  };

  // Hàm đóng modal - dispatch action CLOSE_MODAL
  const handleCloseModal = () => {
    dispatch({ type: 'CLOSE_MODAL' });
  };

  // Hàm xử lý xác nhận - dispatch action CONFIRM_ORDER
  const handleConfirm = () => {
    const confirmed = window.confirm(
      'Bạn có chắc chắn muốn duyệt đơn hàng này để chuyển sang bộ phận kho không?'
    );
    
    if (confirmed) {
      alert('Xử lý đơn hàng thành công!');
      dispatch({ type: 'CONFIRM_ORDER' });
    }
  };

  // Render giao diện: nút trigger và Modal được điều khiển bởi state
  return (
    <div className="exercise2-container">
      <Container>
        <div className="exercise2-card">
          <h2 className="text-center exercise2-title">Exercise 2: useReducer - Quản lý Modal</h2>
          {/* Nút mở modal */}
          <div className="text-center">
            <Button variant="primary" onClick={handleOpenModal} className="process-btn">
              Xử lý đơn hàng
            </Button>
            {/* Hiển thị trạng thái đã xác nhận */}
            {state.isConfirmed && (
              <div className="alert alert-success mt-3">
                ✅ Đơn hàng đã được xác nhận và chuyển sang bộ phận kho!
              </div>
            )}
          </div>
        </div>
      </Container>

      {/* Modal hiển thị khi state.isShowModal = true */}
      <Modal show={state.isShowModal} onHide={handleCloseModal} centered className="custom-modal">
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
