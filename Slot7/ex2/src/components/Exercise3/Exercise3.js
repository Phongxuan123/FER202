import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';
import '../../styles/Exercise3.css';

/**
 * Exercise 3: Sử dụng useState với Object để quản lý Form
 * 
 * useState có thể lưu trữ bất kỳ kiểu dữ liệu nào, kể cả object
 * Sử dụng spread operator (...) để cập nhật một phần của object
 * Syntax: setForm({...form, [field]: value})
 */
function Exercise3() {
  // useState với Object để quản lý nhiều field của form
  const [form, setForm] = useState({
    name: '',
    price: '',
    category: ''
  });

  // useState riêng để lưu dữ liệu đã submit
  const [submittedData, setSubmittedData] = useState(null);

  // Cập nhật form sử dụng spread operator
  const handleChange = (e) => {
    // Spread operator giữ nguyên các field khác, chỉ cập nhật field được thay đổi
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData(form);
  };

  const handleReset = () => {
    setForm({
      name: '',
      price: '',
      category: ''
    });
    setSubmittedData(null);
  };

  return (
    <div className="exercise3-container">
      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            <h2 className="text-center exercise3-title">Exercise 3: useState - Quản lý Form Object</h2>
            <div className="alert alert-info text-center mb-3">
              <small><strong>useState Hook:</strong> const [form, setForm] = useState(&#123;name: '', price: '', category: ''&#125;)</small>
            </div>
            
            <Card className="mb-4 form-card">
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Tên sản phẩm</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Nhập tên sản phẩm"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Giá</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="Nhập giá sản phẩm"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Danh mục</Form.Label>
                  <Form.Select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Chọn danh mục</option>
                    <option value="Điện tử">Điện tử</option>
                    <option value="Thời trang">Thời trang</option>
                    <option value="Đồ gia dụng">Đồ gia dụng</option>
                    <option value="Thực phẩm">Thực phẩm</option>
                    <option value="Sách">Sách</option>
                  </Form.Select>
                </Form.Group>

                <div className="d-flex gap-2">
                  <Button variant="primary" type="submit" className="form-btn">
                    Lưu sản phẩm
                  </Button>
                  <Button variant="secondary" type="button" onClick={handleReset} className="form-btn">
                    Reset
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>

          {submittedData && (
            <Card className="result-card">
              <Card.Header>
                <h5>Thông tin sản phẩm đã lưu</h5>
              </Card.Header>
              <Card.Body>
                <p><strong>Tên sản phẩm:</strong> {submittedData.name}</p>
                <p><strong>Giá:</strong> {Number(submittedData.price).toLocaleString('vi-VN')} VNĐ</p>
                <p><strong>Danh mục:</strong> {submittedData.category}</p>
              </Card.Body>
            </Card>
          )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Exercise3;
