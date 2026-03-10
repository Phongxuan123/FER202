/**
 * ExpenseForm - Form thêm mới hoặc chỉnh sửa chi tiêu.
 * Hoạt động ở hai chế độ:
 *   - Thêm mới (editingId = null): Tạo chi tiêu mới cho người dùng.
 *   - Chỉnh sửa (editingId = id): Cập nhật thông tin chi tiêu đã có.
 * Tự động điền dữ liệu vào form khi ở chế độ chỉnh sửa.
 */
import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addExpense, updateExpense } from '../store/expenseSlice';
import useCategories from '../hooks/useCategories';

// Trạng thái rỗng ban đầu của form, dùng để reset sau khi submit hoặc hủy
const EMPTY_FORM_DATA = { name: '', amount: '', category: '', date: '' };

function ExpenseForm({ editingId, onEditComplete }) {
  const [formData, setFormData] = useState(EMPTY_FORM_DATA);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const expenseItems = useSelector((state) => state.expenses.items);

  // Lấy danh sách danh mục từ server (đọc từ db.json qua API)
  const availableCategories = useCategories();

  // Điền dữ liệu vào form khi chuyển sang chế độ chỉnh sửa, hoặc reset khi thêm mới
  useEffect(() => {
    if (editingId) {
      const expenseToEdit = expenseItems.find((e) => e.id === editingId);
      if (expenseToEdit) {
        // Chuyển ngày từ DD-MM-YYYY sang YYYY-MM-DD để dùng với input type="date"
        const dateParts = expenseToEdit.date.split('-');
        const dateForInput = dateParts[0].length === 4
          ? expenseToEdit.date
          : `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
        setFormData({
          name: expenseToEdit.name,
          amount: expenseToEdit.amount.toString(),
          category: expenseToEdit.category,
          date: dateForInput,
        });
      }
    } else {
      setFormData(EMPTY_FORM_DATA);
      setErrors({});
    }
  }, [editingId, expenseItems]);

  // Kiểm tra tính hợp lệ của dữ liệu form trước khi gửi
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.category.trim()) newErrors.category = 'Category is required';
    const parsedAmount = parseFloat(formData.amount);
    if (!formData.amount || isNaN(parsedAmount) || parsedAmount <= 0)
      newErrors.amount = 'Amount must be a valid number greater than 0';
    if (!formData.date) newErrors.date = 'Date is required';
    return newErrors;
  };

  // Chuyển định dạng ngày từ YYYY-MM-DD (input) sang DD-MM-YYYY (lưu trữ)
  const convertToStorageDateFormat = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
  };

  // Cập nhật giá trị form và xóa lỗi của trường đang chỉnh sửa
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) { setErrors(validationErrors); return; }

    // Chuẩn bị dữ liệu gửi lên server
    const expensePayload = {
      name: formData.name,
      amount: parseFloat(formData.amount),
      category: formData.category,
      date: convertToStorageDateFormat(formData.date),
      userId: user?.id,
    };

    if (editingId) {
      await dispatch(updateExpense({ id: editingId, expense: expensePayload }));
      setSuccessMessage('Expense updated successfully!');
    } else {
      await dispatch(addExpense(expensePayload));
      setSuccessMessage('Expense added successfully!');
    }

    // Reset form và đóng chế độ chỉnh sửa sau khi thành công
    setFormData(EMPTY_FORM_DATA);
    setErrors({});
    setTimeout(() => {
      setSuccessMessage('');
      if (onEditComplete) onEditComplete();
    }, 1500);
  };

  // Hủy thao tác và trở về trạng thái form rỗng
  const handleCancel = () => {
    setFormData(EMPTY_FORM_DATA);
    setErrors({});
    if (onEditComplete) onEditComplete();
  };

  return (
    <Card className="mb-4">
      <Card.Header className="bg-white border-bottom">
        <Card.Title className="mb-0">{editingId ? 'Edit Expense' : 'Add Expense'}</Card.Title>
      </Card.Header>
      <Card.Body>
        {successMessage && (
          <Alert variant="success" className="mb-3" dismissible onClose={() => setSuccessMessage('')}>
            {successMessage}
          </Alert>
        )}
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Expense name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Amount (VND)"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  step="1"
                  isInvalid={!!errors.amount}
                />
                <Form.Control.Feedback type="invalid">{errors.amount}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Category</Form.Label>
                <Form.Select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  onFocus={() => setErrors((prev) => ({ ...prev, category: '' }))}
                  isInvalid={!!errors.category}
                >
                  <option value="">Select category</option>
                  {availableCategories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">{errors.category}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  isInvalid={!!errors.date}
                />
                <Form.Control.Feedback type="invalid">{errors.date}</Form.Control.Feedback>
                <Form.Text className="d-block mt-1" muted>(Format: DD/MM/YYYY)</Form.Text>
              </Form.Group>
            </Col>
          </Row>
          <div className="d-flex gap-2">
            <Button variant="primary" type="submit" className="flex-grow-1">
              {editingId ? 'Save' : 'Add expense'}
            </Button>
            {/* Nút Reset dùng chung cho cả hai chế độ thêm mới và chỉnh sửa */}
            <Button variant="secondary" onClick={handleCancel}>Reset</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default ExpenseForm;
