//Quiz.jsx - Component quiz với React Hooks: useState, useEffect, useContext
//Chức năng: Hiển thị câu hỏi, cho phép chọn đáp án, kiểm tra kết quả
import React, { useState, useEffect, useContext, createContext } from 'react';
import { Container, Card, Form, Button, Alert, Row, Col, ProgressBar } from 'react-bootstrap';

// Tạo Context để quản lý state quiz
const QuizContext = createContext();

// Provider component để wrap Quiz
function QuizProvider({ children }) {
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [score, setScore] = useState(0);

    const value = {
        selectedAnswers,
        setSelectedAnswers,
        showResults,
        setShowResults,
        score,
        setScore
    };

    return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

// Hook để sử dụng QuizContext
function useQuiz() {
    const context = useContext(QuizContext);
    if (!context) {
        throw new Error('useQuiz must be used within QuizProvider');
    }
    return context;
}

// Component hiển thị từng câu hỏi
function QuestionCard({ question, index }) {
    const { selectedAnswers, setSelectedAnswers, showResults } = useQuiz();

    const handleAnswerChange = (questionId, answer) => {
        setSelectedAnswers(prev => ({
            ...prev,
            [questionId]: answer
        }));
    };

    const isCorrect = selectedAnswers[question.id] === question.correctAnswer;
    const hasAnswered = selectedAnswers[question.id] !== undefined;

    return (
        <Card className="mb-4 shadow-sm">
            <Card.Body>
                <Card.Title>
                    Câu {index + 1}: {question.question}
                </Card.Title>
                
                <Form>
                    {question.options.map((option, optionIndex) => (
                        <Form.Check
                            key={optionIndex}
                            type="radio"
                            id={`question-${question.id}-option-${optionIndex}`}
                            name={`question-${question.id}`}
                            label={option}
                            value={option}
                            checked={selectedAnswers[question.id] === option}
                            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                            disabled={showResults}
                            className="mb-2"
                        />
                    ))}
                </Form>

                {showResults && hasAnswered && (
                    <Alert variant={isCorrect ? 'success' : 'danger'} className="mt-3">
                        {isCorrect ? (
                            <>
                                <strong>[CHÍNH XÁC]</strong> Đáp án đúng là: {question.correctAnswer}
                            </>
                        ) : (
                            <>
                                <strong>[SAI]</strong> Lựa chọn: {selectedAnswers[question.id]}
                                <br />
                                Đáp án đúng là: {question.correctAnswer}
                            </>
                        )}
                    </Alert>
                )}

                {showResults && !hasAnswered && (
                    <Alert variant="warning" className="mt-3">
                        Bạn chưa chọn câu trả lời cho câu hỏi này.
                    </Alert>
                )}
            </Card.Body>
        </Card>
    );
}

// Component chính Quiz
function QuizContent() {
    const { selectedAnswers, setShowResults, showResults, score, setScore } = useQuiz();
    
    // Định nghĩa câu hỏi quiz
    const [questions] = useState([
        {
            id: 1,
            question: 'React là gì?',
            options: [
                'Một thư viện JavaScript để xây dựng giao diện người dùng',
                'Một ngôn ngữ lập trình',
                'Một framework backend',
                'Một cơ sở dữ liệu'
            ],
            correctAnswer: 'Một thư viện JavaScript để xây dựng giao diện người dùng'
        },
        {
            id: 2,
            question: 'Hook nào được sử dụng để quản lý state trong functional component?',
            options: [
                'useEffect',
                'useState',
                'useContext',
                'useReducer'
            ],
            correctAnswer: 'useState'
        },
        {
            id: 3,
            question: 'useEffect được sử dụng để làm gì?',
            options: [
                'Quản lý state',
                'Xử lý side effects',
                'Tạo context',
                'Render component'
            ],
            correctAnswer: 'Xử lý side effects'
        },
        {
            id: 4,
            question: 'Hook nào cho phép chia sẻ data giữa các components?',
            options: [
                'useState',
                'useEffect',
                'useContext',
                'useMemo'
            ],
            correctAnswer: 'useContext'
        },
        {
            id: 5,
            question: 'JSX là gì?',
            options: [
                'JavaScript XML',
                'Java Syntax Extension',
                'JSON XML',
                'JavaScript Extension'
            ],
            correctAnswer: 'JavaScript XML'
        }
    ]);

    // useEffect để log khi component mount
    useEffect(() => {
        console.log('Quiz component đã được mount');
        console.log('Tổng số câu hỏi:', questions.length);
    }, [questions.length]);

    // useEffect để tính điểm khi showResults thay đổi
    useEffect(() => {
        if (showResults) {
            let correctCount = 0;
            questions.forEach(question => {
                if (selectedAnswers[question.id] === question.correctAnswer) {
                    correctCount++;
                }
            });
            setScore(correctCount);
            console.log('Kết quả:', correctCount, '/', questions.length);
        }
    }, [showResults, selectedAnswers, questions, setScore]);

    const handleSubmit = () => {
        if (Object.keys(selectedAnswers).length === 0) {
            alert('Vui lòng chọn ít nhất một câu trả lời!');
            return;
        }
        setShowResults(true);
    };

    const handleReset = () => {
        setShowResults(false);
        setScore(0);
    };

    const answeredCount = Object.keys(selectedAnswers).length;
    const progress = (answeredCount / questions.length) * 100;

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={10} lg={8}>
                    <Card className="shadow-lg mb-4">
                        <Card.Header className="bg-primary text-white">
                            <h3 className="mb-0">React Quiz Challenge</h3>
                        </Card.Header>
                        <Card.Body>
                            <div className="mb-4">
                                <div className="d-flex justify-content-between mb-2">
                                    <span>Tiến độ: {answeredCount}/{questions.length} câu</span>
                                    {showResults && (
                                        <span className="fw-bold">
                                            Điểm: {score}/{questions.length}
                                        </span>
                                    )}
                                </div>
                                <ProgressBar 
                                    now={progress} 
                                    label={`${Math.round(progress)}%`}
                                    variant={showResults ? (score >= questions.length * 0.7 ? 'success' : 'warning') : 'info'}
                                />
                            </div>

                            {showResults && (
                                <Alert variant={score >= questions.length * 0.7 ? 'success' : 'warning'}>
                                    <h5>
                                        {score >= questions.length * 0.7 
                                            ? 'XUẤT SẮC! Bạn đã đạt điểm cao!' 
                                            : 'CỐ gắng lên! Bạn có thể làm tốt hơn!'}
                                    </h5>
                                    <p className="mb-0">
                                        Bạn đã trả lời đúng {score} / {questions.length} câu hỏi 
                                        ({Math.round((score / questions.length) * 100)}%)
                                    </p>
                                </Alert>
                            )}

                            <div className="mt-4">
                                {questions.map((question, index) => (
                                    <QuestionCard 
                                        key={question.id} 
                                        question={question} 
                                        index={index} 
                                    />
                                ))}
                            </div>

                            <div className="d-flex gap-3 mt-4">
                                {!showResults ? (
                                    <Button 
                                        variant="primary" 
                                        size="lg" 
                                        onClick={handleSubmit}
                                        disabled={answeredCount === 0}
                                        className="flex-grow-1"
                                    >
                                        Nộp bài ({answeredCount}/{questions.length})
                                    </Button>
                                ) : (
                                    <Button 
                                        variant="success" 
                                        size="lg" 
                                        onClick={handleReset}
                                        className="flex-grow-1"
                                    >
                                        Làm lại Quiz
                                    </Button>
                                )}
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

// Component chính với Provider
function Quiz() {
    return (
        <QuizProvider>
            <QuizContent />
        </QuizProvider>
    );
}

export default Quiz;
