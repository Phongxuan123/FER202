import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function Student({student}) {
    console.log(student);
    return (
        <>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={student.avatar} />
                <Card.Body>
                    <Card.Title>
                        {student.id}
                    </Card.Title>
                    <Card.Text>
                        {student.name} - Age: {student.age} - Grade: {student.grade}
                    </Card.Text>
                    <Button variant="primary">View Details</Button>
                </Card.Body>
            </Card>
        </>
    );
}
export default Student;