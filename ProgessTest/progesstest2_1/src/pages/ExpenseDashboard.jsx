//ExpensesDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Form, Button } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { getExpenses, addExpense, updateExpense, deleteExpense } from '../services/ExpensesAPI';
import FooterExpenses from '../components/FooterExpenses';
import ModalConfirm from '../components/ModalConfirm';
import { formatCurrency, formatDate } from '../utils/formatters';   
import NavbarExpenses from '../components/NavbarExpenses';
function ExpensesDashboard() {
  const { state } = useAuth();

  // Danh sách expenses
  const [expenses, setExpenses] = useState([]);
  // Bộ lọc category
  const [filterCategory, setFilterCategory] = useState('All categories');
  // Form data cho Add/Edit
  const [formData, setFormData] = useState({
    name: '', amount: '', category: 'Food', date: ''
  });
  // ID đang edit (null = chế độ Add)
  const [editingId, setEditingId] = useState(null);
  // Modal xác nhận xóa
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  // Form validation
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState({});

  // ===== FETCH DATA =====
  const fetchExpenses = async () => {
    try {
      const data = await getExpenses(); //gọi API để lấy tất cả expenses
      // Lọc theo userId của user đang đăng nhập
      const userExpenses = data.filter(e => e.userId === state.user.id);
      setExpenses(userExpenses);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  useEffect(() => {
    if (state.user) {
      fetchExpenses();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.user]);

  // ===== COMPUTED VALUES =====
  // Danh sách category duy nhất (cho dropdown filter)
  const categories = [...new Set(expenses.map(e => e.category))];

  // Lọc expense theo category đã chọn
  const filteredExpenses = filterCategory === 'All categories'
    ? expenses
    : expenses.filter(e => e.category === filterCategory);

  // Tổng tiền
  const totalExpenses = filteredExpenses.reduce(
    (sum, e) => sum + Number(e.amount), 0
  );

  

  // ===== VALIDATION =====
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required.';
    }
    if (!formData.amount || Number(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be greater than 0.';
    }
    if (!formData.date) {
      newErrors.date = 'Date is required.';
    }
    return newErrors;
  };

  // ===== FORM HANDLERS =====
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Xóa lỗi khi user bắt đầu nhập
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleReset = () => {
    setFormData({ name: '', amount: '', category: 'Food', date: '' });
    setEditingId(null);
    setValidated(false);
    setErrors({});
  };

  // Save: Add mới hoặc Update
  const handleSave = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    setValidated(true);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      const expenseData = {
        ...formData,
        userId: state.user.id,
        amount: Number(formData.amount),
      };

      if (editingId) {
        await updateExpense(editingId, expenseData);
      } else {
        await addExpense(expenseData);
      }
      fetchExpenses();
      handleReset();
    } catch (error) {
      console.error('Error saving expense:', error);
    }
  };

  // Click Edit → fill form
  const handleEdit = (expense) => {
    setFormData({
      name: expense.name,
      amount: expense.amount,
      category: expense.category,
      date: expense.date,
    });
    setEditingId(expense.id);
  };

  // Click Delete → mở modal xác nhận
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  // Confirm Delete
  const handleConfirmDelete = async () => {
    try {
      await deleteExpense(deleteId);
      fetchExpenses();
      setShowModal(false);
      setDeleteId(null);
      if (editingId === deleteId) handleReset();
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* ===== NAVBAR ===== */}
      <NavbarExpenses />

      {/* ===== MAIN CONTENT ===== */}
      <Container className="my-4 flex-grow-1">
        {/* Row 1: Total + Filter */}
        <Row className="mb-4">
          <Col md={6}>
            <Card>
              <Card.Body>
                <h5>Total of Expenses</h5>
                <p className="fs-5">{formatCurrency(totalExpenses)}</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card>
              <Card.Body>
                <h5>Filter</h5>
                <Form.Label>Category</Form.Label>
                <Form.Select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                >
                  <option>All categories</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </Form.Select>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Row 2: Form + Table */}
        <Row>
          {/* Form Add/Edit */}
          <Col md={4}>
            <Card>
              <Card.Body>
                <h5>{editingId ? 'Edit Expense' : 'Add Expense'}</h5>
                <Form noValidate onSubmit={handleSave}>
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text" name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      isInvalid={validated && !!errors.name}
                      isValid={validated && !errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Row className="mb-3">
                    <Col>
                      <Form.Label>Amount</Form.Label>
                      <Form.Control
                        type="number" name="amount"
                        value={formData.amount}
                        onChange={handleInputChange}
                        isInvalid={validated && !!errors.amount}
                        isValid={validated && !errors.amount}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.amount}
                      </Form.Control.Feedback>
                    </Col>
                    <Col>
                      <Form.Label>Category</Form.Label>
                      <Form.Select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                      >
                        <option value="Food">Food</option>
                        <option value="Utilities">Utilities</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Mua sắm">Mua sắm</option>
                      </Form.Select>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                      type="date" name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      isInvalid={validated && !!errors.date}
                      isValid={validated && !errors.date}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.date}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <div className="d-flex gap-2">
                    <Button variant="secondary" onClick={handleReset}>Reset</Button>
                    <Button variant="primary" type="submit">Save</Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          {/* Table */}
          <Col md={8}>
            <Card>
              <Card.Body>
                <h5>Expense Management</h5>
                <Table bordered hover>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Amount</th>
                      <th>Category</th>
                      <th>Date</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredExpenses.map(expense => (
                      <tr key={expense.id}>
                        <td>{expense.name}</td>
                        <td>{formatCurrency(expense.amount)}</td>
                        <td>{expense.category}</td>
                        <td>{formatDate(expense.date)}</td>
                        <td>
                          <Button
                            variant="warning" size="sm" className="me-2"
                            onClick={() => handleEdit(expense)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="danger" size="sm"
                            onClick={() => handleDeleteClick(expense.id)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <FooterExpenses />

      {/* ===== MODAL CONFIRM DELETE ===== */}
      <ModalConfirm
        show={showModal}
        title="Confirm Delete"
        message="Are you sure you want to delete this expense?"
        onConfirm={handleConfirmDelete}
        onCancel={() => setShowModal(false)}
      />
    </div>
  );
}

export default ExpensesDashboard;
