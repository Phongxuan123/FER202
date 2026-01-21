import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="py-5" style={{ backgroundColor: '#1a1a1a', minHeight: '100vh' }}>
      <Container>
        {/* Hero Section */}
        <Row className="mb-5 pt-4">
          <Col>
            <h1 className="text-center mb-4 text-white" style={{ fontWeight: '700', fontSize: '42px', letterSpacing: '-0.5px' }}>Contact Us</h1>
            <p className="text-center mb-0" style={{ fontSize: '18px', maxWidth: '800px', margin: '0 auto', color: '#b8b8b8', lineHeight: '1.7' }}>
              Have questions or feedback? We'd love to hear from you! Get in touch with us using the form below or visit us at our location.
            </p>
          </Col>
        </Row>

        <Row className="mb-5">
          {/* Contact Form */}
          <Col lg={6} className="mb-4">
            <Card className="h-100" style={{ 
              borderRadius: '15px', 
              border: 'none',
              backgroundColor: '#252525',
              boxShadow: '0 8px 24px rgba(0,0,0,0.4)'
            }}>
              <Card.Body style={{ padding: '40px' }}>
                <h3 className="mb-4 text-white" style={{ fontWeight: '600', fontSize: '24px' }}>Send Us a Message</h3>
                
                {submitted && (
                  <Alert variant="success" style={{ 
                    borderRadius: '10px',
                    backgroundColor: '#1e7e34',
                    border: 'none',
                    color: '#fff'
                  }}>
                    Thank you for your message! We'll get back to you soon.
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-white" style={{ fontWeight: '500', fontSize: '14px' }}>Full Name</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      style={{ 
                        padding: '13px 15px', 
                        borderRadius: '10px', 
                        border: '1px solid #404040',
                        backgroundColor: '#1f1f1f',
                        color: '#fff',
                        fontSize: '15px'
                      }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="text-white" style={{ fontWeight: '500', fontSize: '14px' }}>Email Address</Form.Label>
                    <Form.Control 
                      type="email" 
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      style={{ 
                        padding: '13px 15px', 
                        borderRadius: '10px', 
                        border: '1px solid #404040',
                        backgroundColor: '#1f1f1f',
                        color: '#fff',
                        fontSize: '15px'
                      }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="text-white" style={{ fontWeight: '500', fontSize: '14px' }}>Phone Number</Form.Label>
                    <Form.Control 
                      type="tel" 
                      name="phone"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={handleChange}
                      style={{ 
                        padding: '13px 15px', 
                        borderRadius: '10px', 
                        border: '1px solid #404040',
                        backgroundColor: '#1f1f1f',
                        color: '#fff',
                        fontSize: '15px'
                      }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="text-white" style={{ fontWeight: '500', fontSize: '14px' }}>Message</Form.Label>
                    <Form.Control 
                      as="textarea" 
                      rows={5}
                      name="message"
                      placeholder="Write your message here..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                      style={{ 
                        padding: '13px 15px', 
                        borderRadius: '10px', 
                        border: '1px solid #404040',
                        backgroundColor: '#1f1f1f',
                        color: '#fff',
                        fontSize: '15px',
                        resize: 'none'
                      }}
                    />
                  </Form.Group>

                  <Button 
                    type="submit" 
                    className="w-100"
                    style={{ 
                      padding: '14px', 
                      fontWeight: '700', 
                      backgroundColor: '#ffc107',
                      border: 'none',
                      borderRadius: '10px',
                      fontSize: '16px',
                      color: '#1a1a1a',
                      boxShadow: '0 4px 16px rgba(255,193,7,0.4)',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Send Message
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          {/* Contact Information */}
          <Col lg={6}>
            <Card className="mb-4" style={{ 
              borderRadius: '15px', 
              border: 'none',
              backgroundColor: '#252525',
              boxShadow: '0 8px 24px rgba(0,0,0,0.4)'
            }}>
              <Card.Body style={{ padding: '40px' }}>
                <h3 className="mb-4 text-white" style={{ fontWeight: '600', fontSize: '24px' }}>Contact Information</h3>
                
                <div className="mb-4">
                  <div className="d-flex align-items-start mb-4 pb-3" style={{ borderBottom: '1px solid #333' }}>
                    <div style={{ fontSize: '28px', marginRight: '18px', minWidth: '40px' }}>📍</div>
                    <div>
                      <h5 className="text-white mb-2" style={{ fontWeight: '600', fontSize: '16px' }}>Address</h5>
                      <p className="mb-0" style={{ fontSize: '15px', color: '#aaa', lineHeight: '1.6' }}>
                        123 Pizza Street, Downtown<br/>
                        City Center, State 12345
                      </p>
                    </div>
                  </div>

                  <div className="d-flex align-items-start mb-4 pb-3" style={{ borderBottom: '1px solid #333' }}>
                    <div style={{ fontSize: '28px', marginRight: '18px', minWidth: '40px' }}>📞</div>
                    <div>
                      <h5 className="text-white mb-2" style={{ fontWeight: '600', fontSize: '16px' }}>Phone</h5>
                      <p className="mb-0" style={{ fontSize: '15px', color: '#aaa', lineHeight: '1.6' }}>
                        +1 (555) 123-4567<br/>
                        +1 (555) 765-4321
                      </p>
                    </div>
                  </div>

                  <div className="d-flex align-items-start mb-4 pb-3" style={{ borderBottom: '1px solid #333' }}>
                    <div style={{ fontSize: '28px', marginRight: '18px', minWidth: '40px' }}>✉️</div>
                    <div>
                      <h5 className="text-white mb-2" style={{ fontWeight: '600', fontSize: '16px' }}>Email</h5>
                      <p className="mb-0" style={{ fontSize: '15px', color: '#aaa', lineHeight: '1.6' }}>
                        info@pizzarestaurant.com<br/>
                        support@pizzarestaurant.com
                      </p>
                    </div>
                  </div>

                  <div className="d-flex align-items-start">
                    <div style={{ fontSize: '28px', marginRight: '18px', minWidth: '40px' }}>🕐</div>
                    <div>
                      <h5 className="text-white mb-2" style={{ fontWeight: '600', fontSize: '16px' }}>Business Hours</h5>
                      <p className="mb-0" style={{ fontSize: '15px', color: '#aaa', lineHeight: '1.6' }}>
                        Monday - Friday: 10:00 AM - 11:00 PM<br/>
                        Saturday - Sunday: 9:00 AM - 12:00 AM
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>

            {/* Social Media Card */}
            <Card style={{ 
              borderRadius: '15px', 
              border: 'none', 
              background: 'linear-gradient(135deg, #2d3436 0%, #1a1a1a 100%)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.4)'
            }}>
              <Card.Body style={{ padding: '35px', textAlign: 'center' }}>
                <h4 className="text-white mb-3" style={{ fontWeight: '600', fontSize: '20px' }}>Follow Us</h4>
                <p className="mb-4" style={{ fontSize: '14px', color: '#aaa' }}>
                  Stay connected with us on social media
                </p>
                <div className="d-flex justify-content-center gap-3">
                  <button className="btn" style={{ 
                    borderRadius: '50%', 
                    width: '55px', 
                    height: '55px', 
                    fontSize: '22px',
                    backgroundColor: '#333',
                    color: '#ffc107',
                    border: 'none',
                    transition: 'all 0.3s ease',
                    fontWeight: 'bold'
                  }}>
                    f
                  </button>
                  <button className="btn" style={{ 
                    borderRadius: '50%', 
                    width: '55px', 
                    height: '55px', 
                    fontSize: '22px',
                    backgroundColor: '#333',
                    color: '#ffc107',
                    border: 'none',
                    transition: 'all 0.3s ease',
                    fontWeight: 'bold'
                  }}>
                    𝕏
                  </button>
                  <button className="btn" style={{ 
                    borderRadius: '50%', 
                    width: '55px', 
                    height: '55px', 
                    fontSize: '22px',
                    backgroundColor: '#333',
                    color: '#ffc107',
                    border: 'none',
                    transition: 'all 0.3s ease',
                    fontWeight: 'bold'
                  }}>
                    in
                  </button>
                  <button className="btn" style={{ 
                    borderRadius: '50%', 
                    width: '55px', 
                    height: '55px', 
                    fontSize: '22px',
                    backgroundColor: '#333',
                    color: '#ffc107',
                    border: 'none',
                    transition: 'all 0.3s ease'
                  }}>
                    📷
                  </button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ContactUs;
