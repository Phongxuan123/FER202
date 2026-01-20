import React from 'react';
import { Card, Badge } from 'react-bootstrap';

function PizzaCard({ pizza }) {
  return (
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
      <Card.Body className="d-flex flex-column" style={{ padding: '20px' }}>
        <Card.Title style={{ fontSize: '18px', marginBottom: '10px' }}>{pizza.name}</Card.Title>
        <div className="mt-auto">
          <div className="mb-3">
            {pizza.oldPrice && (
              <span className="text-decoration-line-through text-muted me-2" style={{ fontSize: '14px' }}>
                ${pizza.oldPrice}
              </span>
            )}
            <span className="fw-bold" style={{ fontSize: '18px', color: pizza.oldPrice ? '#ffc107' : '#000' }}>${pizza.price}</span>
          </div>
          <button className="btn btn-dark w-100" style={{ padding: '10px', fontWeight: '500' }}>Buy</button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default PizzaCard;
