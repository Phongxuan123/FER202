import Card from 'react-bootstrap/Card';

function StudentCard({ student }) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={student.avatar} />
      <Card.Body>
        <Card.Title>{student.name}</Card.Title>
        <Card.Text>
          <strong>ID:</strong> {student.id}<br />
          <strong>Age:</strong> {student.age}<br />
          <strong>Grade:</strong> {student.grade}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default StudentCard;
