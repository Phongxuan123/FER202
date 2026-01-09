import React from 'react';

// khai báo 1 đối tượng student gồm id, name, avatar, grade
const student = {
    id: 1,
    name: "An",
    avatar: "/image/Jerry thần tài.jpg", // Thay bằng URL avatar thực tế
    age: 20,
    grade: "A"
};

const About = () => {
    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            fontFamily: 'Arial, sans-serif',
            backgroundColor: '#f5f5f5',
            minHeight: '100vh'
        },
        title: {
            color: '#333',
            fontSize: '2.5rem',
            marginBottom: '20px',
            textAlign: 'center'
        },
        studentName: {
            color: '#007bff',
            fontSize: '2rem',
            marginBottom: '15px',
            textAlign: 'center'
        },
        info: {
            fontSize: '1.2rem',
            color: '#555',
            marginBottom: '20px',
            textAlign: 'center'
        },
        avatar: {
            width: '300px',
            height: '300px',
            objectFit: 'cover',
            borderRadius: '50%',
            border: '5px solid #007bff',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            marginBottom: '20px'
        },
        card: {
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '15px',
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
            maxWidth: '500px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>This is the About Student</h1>
            <div style={styles.card}>
                <img src={student.avatar} alt="Avatar" style={styles.avatar} />
                <h1 style={styles.studentName}>{student.name}</h1>
                <p style={styles.info}>
                    <strong>ID:</strong> {student.id} | <strong>Age:</strong> {student.age} | <strong>Grade:</strong> {student.grade}
                </p>
            </div>
        </div>
    );
};

export default About;