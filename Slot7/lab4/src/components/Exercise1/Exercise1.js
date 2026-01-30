import React, { useReducer } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import '../../styles/Exercise1.css';

// Reducer function để xử lý các actions
const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      // Tăng số lượng lên 1
      return { count: state.count + 1 };
    
    case 'DECREMENT':
      // Giảm số lượng xuống 1, đảm bảo không nhỏ hơn 0
      return { count: Math.max(0, state.count - 1) };
    
    case 'SET_INPUT':
      // Cập nhật số lượng trực tiếp từ input
      const value = parseInt(action.payload);
      return { count: !isNaN(value) && value >= 0 ? value : state.count };
    
    default:
      return state;
  }
};

// Exercise 1: Quản lý số lượng sản phẩm bằng useReducer
function Exercise1() {
  // Khai báo useReducer với state object { count: 0 }
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  // Hàm tăng số lượng - dispatch action INCREMENT
  const handleIncrease = () => {
    dispatch({ type: 'INCREMENT' });
  };

  // Hàm giảm số lượng - dispatch action DECREMENT
  const handleDecrease = () => {
    dispatch({ type: 'DECREMENT' });
  };

  // Hàm xử lý khi user nhập trực tiếp vào input - dispatch action SET_INPUT
  const handleChange = (e) => {
    dispatch({ type: 'SET_INPUT', payload: e.target.value });
  };

  // Render giao diện: form điều khiển số lượng với nút tăng/giảm và input
  return (
    <div className="exercise1-container">
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <div className="exercise1-card">
              <h2 className="text-center exercise1-title">Exercise 1: useReducer - Quản lý Số lượng</h2>
              <div className="quantity-control">
                <div className="d-flex justify-content-center align-items-center gap-3">
                  {/* Nút giảm, disabled khi count = 0 */}
                  <Button 
                    variant="danger" 
                    onClick={handleDecrease}
                    disabled={state.count === 0}
                    className="quantity-btn"
                  >
                    -
                  </Button>
                  {/* Input nhập số lượng, giá trị đồng bộ với state.count */}
                  <Form.Control
                    type="number"
                    value={state.count}
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
                <p className="fs-5 mb-0">Số lượng hiện tại: <strong>{state.count}</strong></p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Exercise1;
