import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

function About() {
  return (
    <div className="py-5" style={{ backgroundColor: '#1a1a1a', minHeight: '100vh' }}>
      <Container>
        {/* Hero Section */}
        <Row className="mb-5 pt-4">
          <Col>
            <h1 className="text-center mb-4 text-white" style={{ fontWeight: '700', fontSize: '42px', letterSpacing: '-0.5px' }}>About Us</h1>
            <p className="text-center mb-0" style={{ fontSize: '18px', maxWidth: '800px', margin: '0 auto', color: '#b8b8b8', lineHeight: '1.7' }}>
              Welcome to Pizza House! We are passionate about serving the most delicious and authentic pizzas made with the finest ingredients.
            </p>
          </Col>
        </Row>

        {/* Main Story Cards */}
        <Row className="mb-5">
          <Col md={6} className="mb-4">
            <Card className="h-100" style={{ 
              borderRadius: '15px', 
              border: 'none',
              backgroundColor: '#252525',
              boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }}>
              <Card.Body style={{ padding: '35px' }}>
                <div className="mb-4" style={{ 
                  fontSize: '56px',
                  background: 'linear-gradient(135deg, #ffc107 0%, #ff9800 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'inline-block'
                }}>🍕</div>
                <h3 className="text-white mb-3" style={{ fontWeight: '600', fontSize: '24px' }}>Our Story</h3>
                <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#b8b8b8', marginBottom: 0 }}>
                  Founded in 2020, our restaurant has been dedicated to bringing authentic Italian pizza traditions to our community. 
                  Every pizza is crafted with love and attention to detail, using time-honored recipes passed down through generations.
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className="mb-4">
            <Card className="h-100" style={{ 
              borderRadius: '15px', 
              border: 'none',
              backgroundColor: '#252525',
              boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }}>
              <Card.Body style={{ padding: '35px' }}>
                <div className="mb-4" style={{ 
                  fontSize: '56px',
                  background: 'linear-gradient(135deg, #ffc107 0%, #ff9800 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'inline-block'
                }}>🌟</div>
                <h3 className="text-white mb-3" style={{ fontWeight: '600', fontSize: '24px' }}>Our Mission</h3>
                <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#b8b8b8', marginBottom: 0 }}>
                  We strive to create memorable dining experiences by combining quality ingredients, expert craftsmanship, 
                  and exceptional service. Our goal is to make every visit special and every bite unforgettable.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Features Grid */}
        <Row className="mb-5">
          <Col md={4} className="mb-4">
            <Card className="h-100 text-center" style={{ 
              borderRadius: '15px', 
              border: '1px solid #333',
              backgroundColor: '#222',
              boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
              transition: 'all 0.3s ease'
            }}>
              <Card.Body style={{ padding: '35px 25px' }}>
                <div className="mb-3" style={{ fontSize: '52px' }}>🥬</div>
                <h4 className="text-white mb-3" style={{ fontWeight: '600', fontSize: '19px' }}>Fresh Ingredients</h4>
                <p style={{ fontSize: '14px', lineHeight: '1.7', color: '#999', marginBottom: 0 }}>
                  We source the freshest local ingredients daily to ensure the highest quality in every pizza we make.
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100 text-center" style={{ 
              borderRadius: '15px', 
              border: '1px solid #333',
              backgroundColor: '#222',
              boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
              transition: 'all 0.3s ease'
            }}>
              <Card.Body style={{ padding: '35px 25px' }}>
                <div className="mb-3" style={{ fontSize: '52px' }}>👨‍🍳</div>
                <h4 className="text-white mb-3" style={{ fontWeight: '600', fontSize: '19px' }}>Expert Chefs</h4>
                <p style={{ fontSize: '14px', lineHeight: '1.7', color: '#999', marginBottom: 0 }}>
                  Our experienced chefs bring decades of culinary expertise to create perfect pizzas every time.
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100 text-center" style={{ 
              borderRadius: '15px', 
              border: '1px solid #333',
              backgroundColor: '#222',
              boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
              transition: 'all 0.3s ease'
            }}>
              <Card.Body style={{ padding: '35px 25px' }}>
                <div className="mb-3" style={{ fontSize: '52px' }}>❤️</div>
                <h4 className="text-white mb-3" style={{ fontWeight: '600', fontSize: '19px' }}>Made with Love</h4>
                <p style={{ fontSize: '14px', lineHeight: '1.7', color: '#999', marginBottom: 0 }}>
                  Every pizza is prepared with care and passion, ensuring a delicious experience with every bite.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Call to Action */}
        <Row>
          <Col>
            <Card style={{ 
              borderRadius: '15px', 
              border: 'none', 
              background: 'linear-gradient(135deg, #2d3436 0%, #1a1a1a 100%)',
              boxShadow: '0 12px 32px rgba(0,0,0,0.5)'
            }}>
              <Card.Body style={{ padding: '50px 40px', textAlign: 'center' }}>
                <h3 className="text-white mb-3" style={{ fontWeight: '700', fontSize: '32px' }}>Join Our Pizza Family</h3>
                <p className="mb-4" style={{ fontSize: '17px', maxWidth: '650px', margin: '0 auto 30px', color: '#aaa', lineHeight: '1.7' }}>
                  Experience the taste of authentic pizza made with passion. Visit us today and discover why our customers keep coming back for more!
                </p>
                <button className="btn btn-warning btn-lg" style={{ 
                  padding: '14px 45px', 
                  fontWeight: '700', 
                  borderRadius: '10px',
                  fontSize: '16px',
                  border: 'none',
                  backgroundColor: '#ffc107',
                  color: '#1a1a1a',
                  boxShadow: '0 4px 16px rgba(255,193,7,0.4)',
                  transition: 'all 0.3s ease'
                }}>
                  Order Now
                </button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default About;
