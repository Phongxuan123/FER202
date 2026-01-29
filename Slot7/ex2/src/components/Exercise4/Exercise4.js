import React, { useState } from 'react';
import { Container, Form, Button, ListGroup, Row, Col, Card } from 'react-bootstrap';
import '../../styles/Exercise4.css';

// Exercise 4: Quản lý danh sách Todo bằng useState Array
function Exercise4() {
  // State array chứa danh sách todos
  const [todos, setTodos] = useState([]);
  
  // State lưu giá trị input
  const [inputValue, setInputValue] = useState('');

  // Hàm thêm todo mới vào array bằng spread operator
  const handleAddTodo = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      setTodos([...todos, { id: Date.now(), text: inputValue }]);
      setInputValue('');
    }
  };

  // Hàm xóa todo bằng filter
  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Render giao diện: form thêm todo và danh sách todos
  return (
    <div className="exercise4-container">
      <Container>
        <h2 className="text-center exercise4-title mb-3">Exercise 4: useState - Quản lý Array (Todo List)</h2>
        
        <Row>
          {/* Form nhập todo mới */}
          <Col md={6}>
            <Card className="todo-input-card h-100">
              <Card.Body>
                <Form onSubmit={handleAddTodo}>
                  <Form.Group className="mb-3">
                    <Form.Label>Công việc mới</Form.Label>
                    <Form.Control
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Nhập công việc cần làm..."
                      className="todo-input mb-3"
                    />
                    <Button variant="primary" type="submit" className="add-btn w-100">
                      Add Todo
                    </Button>
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          {/* Danh sách todos, render bằng map() */}
          <Col md={6}>
            <Card className="todo-list-card h-100">
              <Card.Header>
                <h5>Todo List</h5>
              </Card.Header>
              <Card.Body>
                {todos.length === 0 ? (
                  <p className="empty-state">Chưa có công việc nào</p>
                ) : (
                  <ListGroup variant="flush">
                    {/* Render từng todo, cần có key prop */}
                    {todos.map((todo) => (
                      <ListGroup.Item
                        key={todo.id}
                        className="todo-item d-flex justify-content-between align-items-center"
                      >
                        <span>{todo.text}</span>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDeleteTodo(todo.id)}
                          className="delete-btn"
                        >
                          Delete
                        </Button>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Exercise4;
