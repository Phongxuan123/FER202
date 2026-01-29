import React from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../styles/Home.css';

// Component trang chủ hiển thị danh sách các bài tập
function Home() {
  // Render danh sách các bài tập dạng card grid
  return (
    <div className="home-container">
      <Container>
        <h1 className="text-center home-title">React useState Hook - Learning Exercises</h1>
        <div className="alert alert-warning text-center mb-4">
          <h5>📚 Chủ đề: Using useState Hook</h5>
          <p className="mb-0">Các bài tập thực hành về React useState Hook - quản lý state trong Function Components</p>
        </div>
        {/* Grid 2x2 hiển thị 4 bài tập */}
        <Row>
          <Col md={6} className="mb-4">
            <Card className="exercise-card">
              <Card.Body>
                <Card.Title>Exercise 1: useState - Number</Card.Title>
                <Card.Text>
                  Quản lý số lượng sản phẩm với useState. Học cách sử dụng useState với kiểu số (number) và cập nhật giá trị.
                </Card.Text>
                <Link to="/exercise1" className="exercise-link">
                Xem chi tiết
              </Link>
            </Card.Body>
          </Card>
        </Col>
          <Col md={6} className="mb-4">
            <Card className="exercise-card">
              <Card.Body>
                <Card.Title>Exercise 2: useState - Boolean</Card.Title>
                <Card.Text>
                  Quản lý trạng thái Modal với useState. Học cách sử dụng useState với kiểu boolean để kiểm soát hiển/ẩn.
                </Card.Text>
                <Link to="/exercise2" className="exercise-link">
                Xem chi tiết
              </Link>
            </Card.Body>
          </Card>
        </Col>
          <Col md={6} className="mb-4">
            <Card className="exercise-card">
              <Card.Body>
                <Card.Title>Exercise 3: useState - Object</Card.Title>
                <Card.Text>
                  Quản lý form với useState Object. Học cách sử dụng useState với object và spread operator.
                </Card.Text>
                <Link to="/exercise3" className="exercise-link">
                Xem chi tiết
              </Link>
            </Card.Body>
          </Card>
        </Col>
          <Col md={6} className="mb-4">
            <Card className="exercise-card">
              <Card.Body>
                <Card.Title>Exercise 4: useState - Array</Card.Title>
                <Card.Text>
                  Quản lý danh sách Todo với useState Array. Học cách thêm, xóa item trong array.
                </Card.Text>
                <Link to="/exercise4" className="exercise-link">
                Xem chi tiết
              </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
