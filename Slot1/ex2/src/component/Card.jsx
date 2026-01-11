import React from 'react';
import './Card.css';

function Card({ student }) {
  return (
    <div className="card">
      <img src={student.avatar} alt={student.name} className="card-avatar" />
      <div className="card-content">
        <h2 className="card-name">{student.name}</h2>
        <p className="card-info">
          <strong>ID:</strong> {student.id}
        </p>
        <p className="card-info">
          <strong>Age:</strong> {student.age}
        </p>
        <p className="card-info">
          <strong>Grade:</strong> {student.grade}
        </p>
      </div>
    </div>
  );
}

export default Card;
