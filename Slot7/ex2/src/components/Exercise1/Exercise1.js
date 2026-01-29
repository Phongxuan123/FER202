import React, { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import '../../styles/Exercise1.css';

// Exercise 1: Quản lý số lượng sản phẩm bằng useState
function Exercise1() {
  // Khai báo state để lưu số lượng, khởi tạo = 0
  const [quantity, setQuantity] = useState(0);

  // Hàm tăng số lượng lên 1
  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  // Hàm giảm số lượng xuống 1 (không cho phép số âm)
  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  // Hàm xử lý khi user nhập trực tiếp vào input
  const handleChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setQuantity(value);
    } else if (e.target.value === '') {
      setQuantity(0);
    }
  };

  // Render giao diện: form điều khiển số lượng với nút tăng/giảm và input
  return (
    <div className="exercise1-container">
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <div className="exercise1-card">
              <h2 className="text-center exercise1-title">Exercise 1: useState - Quản lý Số lượng</h2>
              <div className="quantity-control">
                <div className="d-flex justify-content-center align-items-center gap-3">
                  {/* Nút giảm, disabled khi quantity = 0 */}
                  <Button 
                    variant="danger" 
                    onClick={handleDecrease}
                    disabled={quantity === 0}
                    className="quantity-btn"
                  >
                    -
                  </Button>
                  {/* Input nhập số lượng, giá trị đồng bộ với state */}
                  <Form.Control
                    type="number"
                    value={quantity}
                    onChange={handleChange}
                    className="quantity-input"
                    style={{ width: '100px' }}
                    min="0"
                  />
                  {/* Nút tăng */}
                  <Button 
                    variant="success" 
                    onClick={handleIncrease}
                    className="quantity-btn"
                  >
                    +
                  </Button>
                </div>
              </div>
              {/* Hiển thị số lượng hiện tại */}
              <div className="text-center mt-3 quantity-display">
                <p className="fs-5 mb-0">Số lượng hiện tại: <strong>{quantity}</strong></p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Exercise1;
