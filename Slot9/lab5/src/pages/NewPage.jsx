//file này sử dụng component NewList để hiển thị danh sách tin tức mới//NewPage.jsx sử dụng component NewCard để hiển thị danh sách tin tức
import React from 'react';
import newLists from '../data/newList';
import NewCard from '../components/NewCard';
import { Container, Row, Col } from 'react-bootstrap';  
function NewPage() {
    return (
        <Container>
            <h2 className="my-4">Latest News</h2>
            <Row>
                {newLists.map((newItem) => (
                    <Col key={newItem.id} sm={12} md={6} lg={4}>
                        <NewCard newItem={newItem} />
                    </Col>  
                ))}
            </Row>
        </Container>
    );
}
export default NewPage;