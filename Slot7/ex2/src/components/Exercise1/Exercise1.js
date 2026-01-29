import React, { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import '../../styles/Exercise1.css';

/**
 * Exercise 1: Sử dụng useState để quản lý số lượng sản phẩm
 * 
 * useState Hook cho phép component function có thể quản lý state
 * Syntax: const [state, setState] = useState(initialValue)
 * - state: giá trị hiện tại
 * - setState: function để cập nhật state
 * - initialValue: giá trị khởi tạo
 */
function Exercise1() {
  // useState để quản lý số lượng - khởi tạo giá trị là 0
  const [quantity, setQuantity] = useState(0);

  // Tăng số lượng - sử dụng setQuantity để cập nhật state
  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  // Giảm số lượng - kiểm tra điều kiện trước khi cập nhật
  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  // Cập nhật số lượng từ input
  const handleChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setQuantity(value);
    } else if (e.target.value === '') {
      setQuantity(0);
    }
  };

  return (
    <div className="exercise1-container">
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <div className="exercise1-card">
              <h2 className="text-center exercise1-title">Exercise 1: useState - Quản lý Số lượng</h2>
              <div className="alert alert-info text-center mb-3">
                <small><strong>useState Hook:</strong> const [quantity, setQuantity] = useState(0)</small>
              </div>
              <div className="quantity-control">
                <div className="d-flex justify-content-center align-items-center gap-3">
                  <Button 
                    variant="danger" 
                    onClick={handleDecrease}
                    disabled={quantity === 0}
                    className="quantity-btn"
                  >
                    -
                  </Button>
                  <Form.Control
                    type="number"
                    value={quantity}
                    onChange={handleChange}
                    className="quantity-input"
                    style={{ width: '100px' }}
                    min="0"
                  />
                  <Button 
                    variant="success" 
                    onClick={handleIncrease}
                    className="quantity-btn"
                  >
                    +
                  </Button>
                </div>
              </div>
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
