import React, { useState } from 'react';
import { 
  Form, 
  Button, 
  Row, 
  Col, 
  InputGroup
} from 'react-bootstrap';
import './BookingForm.css';

function BookingForm() {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    from: 'Hà nội',
    to: 'Hà nội',
    tripTypes: []
  });

  const [errors, setErrors] = useState({});

  const validateName = (name) => {
    if (name.length < 5) {
      return 'Phải nhập 5 ký tự, in hoa...';
    }
    return '';
  };

  const validateAddress = (address) => {
    if (address.length < 5) {
      return 'Phải nhập 5 ký tự, in hoa...';
    }
    return '';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Validate on change
    if (name === 'name') {
      setErrors({
        ...errors,
        name: validateName(value)
      });
    } else if (name === 'address') {
      setErrors({
        ...errors,
        address: validateAddress(value)
      });
    }
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    let updatedTripTypes = [...formData.tripTypes];
    
    if (checked) {
      updatedTripTypes.push(value);
    } else {
      updatedTripTypes = updatedTripTypes.filter(type => type !== value);
    }
    
    setFormData({
      ...formData,
      tripTypes: updatedTripTypes
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = {
      name: validateName(formData.name),
      address: validateAddress(formData.address)
    };

    setErrors(newErrors);

    if (!newErrors.name && !newErrors.address) {
      alert('Đặt vé thành công!');
      console.log('Form data:', formData);
    }
  };

  return (
    <div className="booking-wrapper">
      {/* Thanh vàng trên */}
      <div className="top-bar">
        <span className="close-icon">×</span>
      </div>

      {/* Tiêu đề */}
      <h2 className="form-title">Form đặt vé máy bay</h2>

      <Form onSubmit={handleSubmit} className="px-3 pb-3">
          {/* Họ tên */}
          <Form.Group className="mb-3 form-group-custom">
            <Form.Label>Họ tên</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                👤
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Họ tên"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                isInvalid={!!errors.name}
              />
              <InputGroup.Text>vnd</InputGroup.Text>
            </InputGroup>
            <Form.Text className="text-muted help-text">
              {errors.name || 'Phải nhập 5 ký tự, in hoa...'}
            </Form.Text>
          </Form.Group>

          {/* Địa chỉ */}
          <Form.Group className="mb-3 form-group-address">
            <Form.Label>Địa chỉ</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              isInvalid={!!errors.address}
            />
            <Form.Text className="text-muted help-text">
              {errors.address || 'Phải nhập 5 ký tự, in hoa...'}
            </Form.Text>
          </Form.Group>

          {/* Đi từ và Đến */}
          <Row className="mb-3 form-group-destinations">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Đi từ</Form.Label>
                <Form.Select
                  name="from"
                  value={formData.from}
                  onChange={handleInputChange}
                >
                  <option value="Hà nội">Hà nội</option>
                  <option value="Hồ Chí Minh">Hồ Chí Minh</option>
                  <option value="Đà Nẵng">Đà Nẵng</option>
                  <option value="Nha Trang">Nha Trang</option>
                  <option value="Phú Quốc">Phú Quốc</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Đến</Form.Label>
                <Form.Select
                  name="to"
                  value={formData.to}
                  onChange={handleInputChange}
                >
                  <option value="Hà nội">Hà nội</option>
                  <option value="Hồ Chí Minh">Hồ Chí Minh</option>
                  <option value="Đà Nẵng">Đà Nẵng</option>
                  <option value="Nha Trang">Nha Trang</option>
                  <option value="Phú Quốc">Phú Quốc</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          {/* Chọn chiều đi */}
          <Form.Group className="mb-3 form-group-trip-type">
            <Form.Label>Chọn chiều đi (Khứ hồi)</Form.Label>
            <div className="checkbox-vertical-group">
              <Form.Check
                type="checkbox"
                label="Đi"
                name="tripType"
                value="di"
                checked={formData.tripTypes.includes('di')}
                onChange={handleCheckboxChange}
              />
              <Form.Check
                type="checkbox"
                label="Về"
                name="tripType"
                value="ve"
                checked={formData.tripTypes.includes('ve')}
                onChange={handleCheckboxChange}
              />
            </div>
          </Form.Group>

          {/* Submit Button */}
          <div className="d-grid">
            <Button variant="primary" type="submit">
              Đặt vé
            </Button>
          </div>
        </Form>
    </div>
  );
}

export default BookingForm;