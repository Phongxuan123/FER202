import React, { useState } from 'react';
import { Card, Badge, Modal, Button, Row, Col } from 'react-bootstrap';

function PizzaCard({ pizza }) {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <>
      <Card className="h-100 shadow-sm" style={{ borderRadius: '8px', overflow: 'hidden' }}>
        <div className="position-relative">
          <Card.Img 
            variant="top" 
            src={pizza.image} 
            alt={pizza.name}
            style={{ height: '220px', objectFit: 'cover' }}
          />
          {pizza.tags && pizza.tags.length > 0 && (
            <div className="position-absolute top-0 start-0 m-2">
              {pizza.tags.map((tag, index) => (
                <Badge 
                  key={index} 
                  bg={tag === 'Sale' ? 'warning' : 'success'} 
                  className="me-1 text-dark fw-bold"
                  style={{ fontSize: '11px', padding: '4px 8px', textTransform: 'uppercase' }}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
        <Card.Body className="d-flex flex-column" style={{ padding: '18px' }}>
          <Card.Title style={{ fontSize: '17px', marginBottom: '12px', fontWeight: '600', color: '#2d3436' }}>{pizza.name}</Card.Title>
          <div className="mt-auto">
            <div className="mb-3">
              {pizza.oldPrice && (
                <span className="text-decoration-line-through text-muted me-2" style={{ fontSize: '13px' }}>
                  ${pizza.oldPrice}
                </span>
              )}
              <span className="fw-bold" style={{ fontSize: '20px', color: pizza.oldPrice ? '#ffc107' : '#2d3436' }}>${pizza.price}</span>
            </div>
            <Row className="g-2">
              <Col xs={6}>
                <button 
                  className="btn btn-outline-dark w-100" 
                  style={{ 
                    padding: '10px 8px', 
                    fontSize: '13px',
                    fontWeight: '500',
                    borderWidth: '1.5px',
                    borderRadius: '6px',
                    height: '44px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  onClick={handleShow}
                >
                  View Details
                </button>
              </Col>
              <Col xs={6}>
                <button 
                  className="btn btn-dark w-100" 
                  style={{ 
                    padding: '10px 8px', 
                    fontSize: '13px',
                    fontWeight: '500',
                    backgroundColor: '#2d3436',
                    borderColor: '#2d3436',
                    borderRadius: '6px',
                    height: '44px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  Buy
                </button>
              </Col>
            </Row>
          </div>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton style={{ borderBottom: '2px solid #f0f0f0' }}>
          <Modal.Title style={{ fontSize: '24px', fontWeight: '600', color: '#2d3436' }}>{pizza.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: '30px' }}>
          <Row>
            <Col md={6} className="mb-4 mb-md-0">
              <img 
                src={pizza.image} 
                alt={pizza.name} 
                style={{ width: '100%', borderRadius: '10px', objectFit: 'cover', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
              />
              {pizza.tags && pizza.tags.length > 0 && (
                <div className="mt-3">
                  {pizza.tags.map((tag, index) => (
                    <Badge 
                      key={index} 
                      bg={tag === 'Sale' ? 'warning' : 'success'} 
                      className="me-2 text-dark fw-bold"
                      style={{ fontSize: '12px', padding: '6px 12px', textTransform: 'uppercase' }}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </Col>
            <Col md={6}>
              <h5 className="mb-3" style={{ color: '#2d3436', fontWeight: '600' }}>Product Details</h5>
              <div className="mb-4">
                <h6 style={{ color: '#636e72', fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', marginBottom: '10px' }}>Description</h6>
                <p className="text-muted" style={{ fontSize: '15px', lineHeight: '1.6' }}>{pizza.description}</p>
              </div>
              <div className="mb-4">
                <h6 style={{ color: '#636e72', fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', marginBottom: '10px' }}>Price</h6>
                <div className="mt-2">
                  {pizza.oldPrice && (
                    <>
                      <span className="text-decoration-line-through text-muted me-3" style={{ fontSize: '18px' }}>
                        ${pizza.oldPrice}
                      </span>
                      <span className="fw-bold" style={{ fontSize: '28px', color: '#ffc107' }}>
                        ${pizza.price}
                      </span>
                      <Badge bg="danger" className="ms-3" style={{ fontSize: '12px', padding: '6px 10px' }}>
                        Save ${(pizza.oldPrice - pizza.price).toFixed(2)}
                      </Badge>
                    </>
                  )}
                  {!pizza.oldPrice && (
                    <span className="fw-bold" style={{ fontSize: '28px', color: '#2d3436' }}>${pizza.price}</span>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer style={{ borderTop: '2px solid #f0f0f0', padding: '20px 30px' }}>
          <Button variant="outline-secondary" onClick={handleClose} style={{ padding: '10px 24px', fontWeight: '500', borderRadius: '6px' }}>
            Close
          </Button>
          <Button variant="dark" onClick={handleClose} style={{ padding: '10px 24px', fontWeight: '500', backgroundColor: '#2d3436', borderColor: '#2d3436', borderRadius: '6px' }}>
            Add to Cart
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PizzaCard;
