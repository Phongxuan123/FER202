import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';
import '../../styles/Exercise3.css';

// Exercise 3: Quản lý form với useState Object và spread operator
function Exercise3() {
  // State object chứa tất cả các field của form
  const [form, setForm] = useState({
    name: '',
    price: '',
    category: ''
  });

  // State lưu dữ liệu đã submit để hiển thị
  const [submittedData, setSubmittedData] = useState(null);

  // Hàm cập nhật form khi input thay đổi, sử dụng spread operator
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // Hàm xử lý submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData(form);
  };

  // Hàm reset form về trạng thái ban đầu
  const handleReset = () => {
    setForm({
      name: '',
      price: '',
      category: ''
    });
    setSubmittedData(null);
  };

  // Render giao diện: form nhập liệu và card hiển thị kết quả
  return (
    <div className="exercise3-container">
      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            <h2 className="text-center exercise3-title">Exercise 3: useState - Quản lý Form Object</h2>
            
            {/* Form nhập thông tin sản phẩm */}
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

          {/* Hiển thị kết quả sau khi submit */}
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
