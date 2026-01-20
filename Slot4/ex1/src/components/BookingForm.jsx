import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

function BookingForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    requests: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission logic here
  };

  return (
    <section className="text-white py-5" style={{ backgroundColor: '#1a1a1a' }}>
      <Container>
        <h2 className="text-center mb-5" style={{ fontSize: '36px', fontWeight: 'normal' }}>Book your table</h2>
        <Form onSubmit={handleSubmit}>
          <Row className="g-3 mb-3">
            <Col md={4}>
              <Form.Control
                type="text"
                name="name"
                placeholder="Your name *"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Col>
            <Col md={4}>
              <Form.Control
                type="email"
                name="email"
                placeholder="Your email *"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Col>
            <Col md={4}>
              <Form.Select
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
              >
                <option value="">Select a Service</option>
                <option value="dine-in">Dine In</option>
                <option value="delivery">Delivery</option>
                <option value="takeaway">Takeaway</option>
                <option value="catering">Catering</option>
              </Form.Select>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Control
                as="textarea"
                name="requests"
                rows={4}
                placeholder="Please write your requests"
                value={formData.requests}
                onChange={handleChange}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Button 
                type="submit" 
                style={{ backgroundColor: '#ffc107', borderColor: '#ffc107', color: '#000' }}
                className="fw-bold"
              >
                Send Message
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </section>
  );
}

export default BookingForm;
