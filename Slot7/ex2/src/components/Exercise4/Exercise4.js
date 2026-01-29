import React, { useState } from 'react';
import { Container, Form, Button, ListGroup, Row, Col, Card } from 'react-bootstrap';
import '../../styles/Exercise4.css';

/**
 * Exercise 4: Sử dụng useState với Array để quản lý danh sách
 * 
 * useState với array để quản lý danh sách các item
 * - Thêm item: [...array, newItem]
 * - Xóa item: array.filter(item => condition)
 */
function Exercise4() {
  // useState với Array để quản lý danh sách todos
  const [todos, setTodos] = useState([]);
  
  // useState cho input value
  const [inputValue, setInputValue] = useState('');

  // Thêm todo mới vào array sử dụng spread operator
  const handleAddTodo = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      // Spread operator để thêm item mới vào cuối array
      setTodos([...todos, { id: Date.now(), text: inputValue }]);
      setInputValue('');
    }
  };

  // Xóa todo sử dụng filter để tạo array mới không chứa item bị xóa
  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="exercise4-container">
      <Container>
        <h2 className="text-center exercise4-title mb-3">Exercise 4: useState - Quản lý Array (Todo List)</h2>
        <div className="alert alert-info text-center mb-4">
          <small><strong>useState Hook:</strong> const [todos, setTodos] = useState([])</small>
        </div>
        
        <Row>
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
