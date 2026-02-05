//NewCard.jsx chứa thông tin của 1 new gồm title, description và hình ảnh
import React from 'react';
import { Card } from 'react-bootstrap';
function NewCard({ newItem }) { 
    return (
        <Card style={{ width: '18rem', margin: '10px' }}>
            <Card.Img variant="top" src={newItem.images} />
            <Card.Body>
                <Card.Title>{newItem.title}</Card.Title>
                <Card.Text>{newItem.description}</Card.Text>
            </Card.Body>    
        </Card>
    );
}
export default NewCard;