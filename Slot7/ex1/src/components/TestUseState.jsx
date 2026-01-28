import { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './TestUseState.css';

//component này dùng để thử useState, có form gồm username và age.
//Nhấn nút submit sẽ thay đổi giá trị hiển thị bên dưới trên label
function TestUseState() {
    // State để lưu giá trị input hiện tại
    const [username, setUsername] = useState("phongnxk");
    const [age, setAge] = useState(18);
    
    // State để kiểm soát hiển thị Result
    const [submitted, setSubmitted] = useState(false);
    
    // State để lưu giá trị đã submit (không thay đổi khi user tiếp tục nhập)
    const [submittedUsername, setSubmittedUsername] = useState("");
    const [submittedAge, setSubmittedAge] = useState("");
    
    // Xử lý khi user nhập liệu vào form
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'username') {
            setUsername(value);
        } else if (name === 'age') {
            setAge(value);
        }
    };

    // Xử lý khi user nhấn nút Submit
    const handleSubmit = () => {
        // Lưu giá trị hiện tại vào state submitted
        setSubmittedUsername(username);
        setSubmittedAge(age);
        setSubmitted(true);
        
        // Tự động ẩn Result sau 10 giây
        setTimeout(() => {
            setSubmitted(false);
        }, 5000);
    };

    return (
        // Container với khung viền bao quanh toàn bộ form
        <Container className="mt-4 test-usestate-container">
            <h2 className="text-center test-usestate-title">Test useState Hook</h2>
            <Form>
                {/* Dòng 1: Username label và textbox */}
                <Row className="mb-2">
                    <Col xs={3}>
                        <Form.Label>Username</Form.Label>
                    </Col>
                    <Col xs={9}>
                        <Form.Control
                            type="text"
                            name="username"
                            value={username}
                            onChange={handleChange}
                            placeholder="Enter your name"
                        />
                    </Col>
                </Row>
                {/* Dòng 2: Age label và textbox */}
                <Row className="mb-3">
                    <Col xs={3}>
                        <Form.Label>Age</Form.Label>
                    </Col>
                    <Col xs={9}>
                        <Form.Control
                            type="number"
                            name="age"
                            value={age}
                            onChange={handleChange}
                            placeholder="Enter your age"
                        />
                    </Col>
                </Row>
                {/* Dòng 3: Nút Submit */}
                <Row className="mb-3">
                    <Col xs={3}></Col>
                    <Col xs={9}>
                        <Button variant="primary" className="btn-submit" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Col>
                </Row>
                {/* Dòng 4: Result - chỉ hiển thị khi submitted = true */}
                {submitted && (
                    <Row>
                        <Col xs={3}>
                            <Form.Label>Result</Form.Label>
                        </Col>
                        <Col xs={9}>
                            <div className="result-container">
                                <p className="result-text">Hello, my name is {submittedUsername}, and I am {submittedAge} years old.</p>
                            </div>
                        </Col>
                    </Row>
                )}
            </Form>
        </Container>
    );
}
export default TestUseState;