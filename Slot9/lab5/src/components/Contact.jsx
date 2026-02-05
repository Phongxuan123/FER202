//Contact.jsx - Form liên hệ với validation sử dụng useReducer
//Form bao gồm: First name, Last name, Username, City, State, Zip, Terms checkbox
//Sử dụng Modal để hiển thị thông tin đã đăng ký và Toast message khi thành công
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import CommonModal from './CommonModal';
import ToastMessage from './ToastMessage';

// Bước 1: Khởi tạo trạng thái form
const initialState = {
    values: {
        firstName: '',
        lastName: '',
        username: '',
        city: '',
        state: '',
        zip: '',
        agreeTerms: false
    },
    errors: {
        firstName: '',
        lastName: '',
        username: '',
        city: '',
        state: '',
        zip: '',
        agreeTerms: ''
    }
};

// Bước 2: Hàm reducer để quản lý trạng thái form
const formReducer = (state, action) => {
    switch (action.type) {
        case 'SET_VALUE':
            return {
                ...state,
                values: {
                    ...state.values,
                    [action.field]: action.value
                },
                errors: {
                    ...state.errors,
                    [action.field]: ''
                }
            };
        case 'SET_ERROR':
            return {
                ...state,
                errors: {
                    ...state.errors,
                    [action.field]: action.error
                }
            };
        case 'RESET_FORM':
            return initialState;
        default:
            return state;
    }
};

function Contact() {
    const [state, dispatch] = React.useReducer(formReducer, initialState);
    const [validated, setValidated] = useState(false);
    const [formSuccess, setFormSuccess] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showToast, setShowToast] = useState(false);

    // Hàm kiểm tra lỗi cho từng trường
    const validateField = (field, value) => {
        let error = '';
        switch (field) {
            case 'firstName':
                if (value.trim() === '') {
                    error = 'First name is required';
                }
                break;
            case 'lastName':
                if (value.trim() === '') {
                    error = 'Last name is required';
                }
                break;
            case 'username':
                if (value.trim() === '') {
                    error = 'Please choose a username.';
                } else if (value.length < 3) {
                    error = 'Username must be at least 3 characters';
                }
                break;
            case 'city':
                if (value.trim() === '') {
                    error = 'Please provide a valid city.';
                }
                break;
            case 'state':
                if (value.trim() === '') {
                    error = 'Please provide a valid state.';
                }
                break;
            case 'zip':
                if (value.trim() === '') {
                    error = 'Please provide a valid zip.';
                } else if (!/^\d{5}$/.test(value)) {
                    error = 'Zip must be 5 digits';
                }
                break;
            case 'agreeTerms':
                if (!value) {
                    error = 'You must agree before submitting.';
                }
                break;
            default:
                break;
        }
        return error;
    };

    // Hàm kiểm tra toàn bộ form
    const validateForm = () => {
        let isValid = true;
        Object.keys(state.values).forEach((field) => {
            const error = validateField(field, state.values[field]);
            if (error) {
                dispatch({ type: 'SET_ERROR', field, error });
                isValid = false;
            }
        });
        return isValid;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            console.log('Contact form submitted successfully:', state.values);
            setFormSuccess(true);
            setValidated(true);
            setShowModal(true);
            setShowToast(true);
        } else {
            setFormSuccess(false);
            setValidated(true);
        }
    };

    // Xử lý sự kiện handleBlur để kiểm tra lỗi ngay khi rời khỏi ô nhập liệu
    const handleBlur = (field) => {
        const error = validateField(field, state.values[field]);
        if (error) {
            dispatch({ type: 'SET_ERROR', field, error });
        }
    };

    // Đóng modal và reset form
    const handleModalClose = () => {
        setShowModal(false);
        setFormSuccess(false);
        setValidated(false);
        dispatch({ type: 'RESET_FORM' });
    };

    return (
        <>
            <Container className="mt-5">
                <Row className="justify-content-center">
                    <Col md={8}>
                        <Card className="shadow-sm">
                            <Card.Body>
                                <Card.Title className="text-center mb-4">Contact Form</Card.Title>
                                <Form noValidate onSubmit={handleSubmit}>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} md="6" controlId="formFirstName">
                                            <Form.Label>First name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Mark"
                                                value={state.values.firstName}
                                                isInvalid={validated && !formSuccess && !!state.errors.firstName}
                                                onChange={(e) => {
                                                    dispatch({ type: 'SET_VALUE', field: 'firstName', value: e.target.value });
                                                    // Real-time validation nếu đã có lỗi
                                                    if (state.errors.firstName || validated) {
                                                        const error = validateField('firstName', e.target.value);
                                                        if (error) {
                                                            dispatch({ type: 'SET_ERROR', field: 'firstName', error });
                                                        }
                                                    }
                                                }}
                                                onBlur={() => handleBlur('firstName')}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {state.errors.firstName || 'First name is required'}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group as={Col} md="6" controlId="formLastName">
                                            <Form.Label>Last name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Otto"
                                                value={state.values.lastName}
                                                isInvalid={validated && !formSuccess && !!state.errors.lastName}
                                                onChange={(e) => {
                                                    dispatch({ type: 'SET_VALUE', field: 'lastName', value: e.target.value });
                                                    if (state.errors.lastName || validated) {
                                                        const error = validateField('lastName', e.target.value);
                                                        if (error) {
                                                            dispatch({ type: 'SET_ERROR', field: 'lastName', error });
                                                        }
                                                    }
                                                }}
                                                onBlur={() => handleBlur('lastName')}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {state.errors.lastName || 'Last name is required'}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Row>

                                    <Form.Group className="mb-3" controlId="formUsername">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Username"
                                            value={state.values.username}
                                            isInvalid={validated && !formSuccess && !!state.errors.username}
                                            onChange={(e) => {
                                                dispatch({ type: 'SET_VALUE', field: 'username', value: e.target.value });
                                                if (state.errors.username || validated) {
                                                    const error = validateField('username', e.target.value);
                                                    if (error) {
                                                        dispatch({ type: 'SET_ERROR', field: 'username', error });
                                                    }
                                                }
                                            }}
                                            onBlur={() => handleBlur('username')}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {state.errors.username || 'Please choose a username.'}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Row className="mb-3">
                                        <Form.Group as={Col} md="4" controlId="formCity">
                                            <Form.Label>City</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="City"
                                                value={state.values.city}
                                                isInvalid={validated && !formSuccess && !!state.errors.city}
                                                onChange={(e) => {
                                                    dispatch({ type: 'SET_VALUE', field: 'city', value: e.target.value });
                                                    if (state.errors.city || validated) {
                                                        const error = validateField('city', e.target.value);
                                                        if (error) {
                                                            dispatch({ type: 'SET_ERROR', field: 'city', error });
                                                        }
                                                    }
                                                }}
                                                onBlur={() => handleBlur('city')}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {state.errors.city || 'Please provide a valid city.'}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group as={Col} md="4" controlId="formState">
                                            <Form.Label>State</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="State"
                                                value={state.values.state}
                                                isInvalid={validated && !formSuccess && !!state.errors.state}
                                                onChange={(e) => {
                                                    dispatch({ type: 'SET_VALUE', field: 'state', value: e.target.value });
                                                    if (state.errors.state || validated) {
                                                        const error = validateField('state', e.target.value);
                                                        if (error) {
                                                            dispatch({ type: 'SET_ERROR', field: 'state', error });
                                                        }
                                                    }
                                                }}
                                                onBlur={() => handleBlur('state')}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {state.errors.state || 'Please provide a valid state.'}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group as={Col} md="4" controlId="formZip">
                                            <Form.Label>Zip</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Zip"
                                                value={state.values.zip}
                                                isInvalid={validated && !formSuccess && !!state.errors.zip}
                                                onChange={(e) => {
                                                    dispatch({ type: 'SET_VALUE', field: 'zip', value: e.target.value });
                                                    if (state.errors.zip || validated) {
                                                        const error = validateField('zip', e.target.value);
                                                        if (error) {
                                                            dispatch({ type: 'SET_ERROR', field: 'zip', error });
                                                        }
                                                    }
                                                }}
                                                onBlur={() => handleBlur('zip')}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {state.errors.zip || 'Please provide a valid zip.'}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Row>

                                    <Form.Group className="mb-3" controlId="formAgreeTerms">
                                        <Form.Check
                                            type="checkbox"
                                            label="Agree to terms and conditions"
                                            checked={state.values.agreeTerms}
                                            isInvalid={validated && !formSuccess && !!state.errors.agreeTerms}
                                            onChange={(e) =>
                                                dispatch({ type: 'SET_VALUE', field: 'agreeTerms', value: e.target.checked })
                                            }
                                            feedback={validated && !formSuccess && state.errors.agreeTerms ? state.errors.agreeTerms : ''}
                                            feedbackType="invalid"
                                        />
                                    </Form.Group>

                                    <Button variant="primary" type="submit">
                                        Submit form
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            {/* Modal hiển thị thông tin đã đăng ký */}
            <CommonModal
                show={showModal}
                handleClose={handleModalClose}
                title="Registration Successful"
                body={
                    <div>
                        <p><strong>First Name:</strong> {state.values.firstName}</p>
                        <p><strong>Last Name:</strong> {state.values.lastName}</p>
                        <p><strong>Username:</strong> {state.values.username}</p>
                        <p><strong>City:</strong> {state.values.city}</p>
                        <p><strong>State:</strong> {state.values.state}</p>
                        <p><strong>Zip:</strong> {state.values.zip}</p>
                    </div>
                }
            />

            {/* Toast Message */}
            <ToastMessage
                show={showToast}
                onClose={() => setShowToast(false)}
                message="Đã đăng ký thành công!"
                variant="success"
            />
        </>
    );
}

export default Contact;
