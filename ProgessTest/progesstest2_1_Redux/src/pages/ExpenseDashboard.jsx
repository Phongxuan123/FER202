import React, { useEffect, useMemo, useState } from 'react';
import { Alert, Button, Card, Col, Container, Form, Row, Spinner, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  EXPENSE_CATEGORIES,
  EXPENSE_DEFAULT_FORM,
  FILTER_OPTIONS,
} from '../constants/appConstants';
import FooterExpenses from '../components/FooterExpenses';
import ModalConfirm from '../components/ModalConfirm';
import NavbarExpenses from '../components/NavbarExpenses';
import {
  clearExpensesError,
  createExpense,
  editExpense,
  fetchExpenses,
  removeExpense,
} from '../store/slices/expensesSlice';
import { formatCurrency, formatDate } from '../utils/formatters';
import { validateExpenseForm } from '../utils/validation';

// Khối màn hình chi tiêu: quản lý form, lọc dữ liệu và thao tác CRUD thông qua Redux.
function ExpensesDashboard() {
  const dispatch = useDispatch();
  const authenticatedUser = useSelector((state) => state.auth.user);
  const {
    items: expenseItems,
    loading: isExpensesLoading,
    error: expensesError,
  } = useSelector((state) => state.expenses);

  const [selectedCategory, setSelectedCategory] = useState(FILTER_OPTIONS.ALL_CATEGORIES);
  const [expenseFormData, setExpenseFormData] = useState(EXPENSE_DEFAULT_FORM);
  const [editingExpenseId, setEditingExpenseId] = useState(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [pendingDeleteExpenseId, setPendingDeleteExpenseId] = useState(null);
  const [isValidationEnabled, setIsValidationEnabled] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (authenticatedUser) {
      dispatch(fetchExpenses(authenticatedUser.id));
    }
  }, [dispatch, authenticatedUser]);

  const categories = useMemo(() => {
    const dynamicCategories = expenseItems.map((expense) => expense.category);
    return [...new Set([...EXPENSE_CATEGORIES, ...dynamicCategories])];
  }, [expenseItems]);

  const filteredExpenses = useMemo(() => {
    if (selectedCategory === FILTER_OPTIONS.ALL_CATEGORIES) {
      return expenseItems;
    }

    return expenseItems.filter((expense) => expense.category === selectedCategory);
  }, [expenseItems, selectedCategory]);

  const totalExpenses = useMemo(() => {
    return filteredExpenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
  }, [filteredExpenses]);

  const clearGlobalExpenseError = () => {
    if (expensesError) {
      dispatch(clearExpensesError());
    }
  };

  const resetExpenseForm = () => {
    setExpenseFormData(EXPENSE_DEFAULT_FORM);
    setEditingExpenseId(null);
    setIsValidationEnabled(false);
    setFormErrors({});
  };

  // Hàm này giữ cho cập nhật form và dọn lỗi field luôn nằm cùng một nơi.
  const handleExpenseInputChange = (event) => {
    const { name, value } = event.target;
    setExpenseFormData((currentFormData) => ({ ...currentFormData, [name]: value }));

    if (formErrors[name]) {
      setFormErrors((currentErrors) => ({ ...currentErrors, [name]: '' }));
    }

    clearGlobalExpenseError();
  };

  const fillFormForEdit = (expense) => {
    setExpenseFormData({
      name: expense.name,
      amount: expense.amount,
      category: expense.category,
      date: expense.date,
    });
    setEditingExpenseId(expense.id);
    setIsValidationEnabled(false);
    setFormErrors({});
  };

  const openDeleteConfirmation = (expenseId) => {
    setPendingDeleteExpenseId(expenseId);
    setIsDeleteModalVisible(true);
  };

  const closeDeleteConfirmation = () => {
    setIsDeleteModalVisible(false);
    setPendingDeleteExpenseId(null);
  };

  // Hàm lưu chi tiêu: kiểm tra dữ liệu, dispatch action phù hợp và reset form khi thành công.
  const handleSaveExpense = async (event) => {
    event.preventDefault();

    const validationErrors = validateExpenseForm(expenseFormData);
    setIsValidationEnabled(true);

    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      return;
    }

    if (!authenticatedUser) {
      return;
    }

    const expensePayload = {
      ...expenseFormData,
      userId: authenticatedUser.id,
      amount: Number(expenseFormData.amount),
    };

    const resultAction = editingExpenseId
      ? await dispatch(editExpense({ id: editingExpenseId, expenseData: expensePayload }))
      : await dispatch(createExpense(expensePayload));

    const isSaveSuccessful =
      editExpense.fulfilled.match(resultAction) ||
      createExpense.fulfilled.match(resultAction);

    if (isSaveSuccessful) {
      resetExpenseForm();
    }
  };

  const handleConfirmDelete = async () => {
    if (!pendingDeleteExpenseId) {
      return;
    }

    const deleteResultAction = await dispatch(removeExpense(pendingDeleteExpenseId));

    if (removeExpense.fulfilled.match(deleteResultAction)) {
      if (editingExpenseId === pendingDeleteExpenseId) {
        resetExpenseForm();
      }
      closeDeleteConfirmation();
    }
  };

  const isEditingMode = Boolean(editingExpenseId);
  const formTitle = isEditingMode ? 'Edit Expense' : 'Add Expense';

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavbarExpenses />

      <Container className="my-4 flex-grow-1">
        {expensesError ? <Alert variant="danger">{expensesError}</Alert> : null}

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
                  value={selectedCategory}
                  onChange={(event) => setSelectedCategory(event.target.value)}
                >
                  <option>{FILTER_OPTIONS.ALL_CATEGORIES}</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </Form.Select>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <Card>
              <Card.Body>
                <h5>{formTitle}</h5>
                <Form noValidate onSubmit={handleSaveExpense}>
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={expenseFormData.name}
                      onChange={handleExpenseInputChange}
                      isInvalid={isValidationEnabled && Boolean(formErrors.name)}
                      isValid={isValidationEnabled && !formErrors.name}
                    />
                    <Form.Control.Feedback type="invalid">{formErrors.name}</Form.Control.Feedback>
                  </Form.Group>

                  <Row className="mb-3">
                    <Col>
                      <Form.Label>Amount</Form.Label>
                      <Form.Control
                        type="number"
                        name="amount"
                        value={expenseFormData.amount}
                        onChange={handleExpenseInputChange}
                        isInvalid={isValidationEnabled && Boolean(formErrors.amount)}
                        isValid={isValidationEnabled && !formErrors.amount}
                      />
                      <Form.Control.Feedback type="invalid">{formErrors.amount}</Form.Control.Feedback>
                    </Col>

                    <Col>
                      <Form.Label>Category</Form.Label>
                      <Form.Select
                        name="category"
                        value={expenseFormData.category}
                        onChange={handleExpenseInputChange}
                      >
                        {EXPENSE_CATEGORIES.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="date"
                      value={expenseFormData.date}
                      onChange={handleExpenseInputChange}
                      isInvalid={isValidationEnabled && Boolean(formErrors.date)}
                      isValid={isValidationEnabled && !formErrors.date}
                    />
                    <Form.Control.Feedback type="invalid">{formErrors.date}</Form.Control.Feedback>
                  </Form.Group>

                  <div className="d-flex gap-2">
                    <Button variant="secondary" onClick={resetExpenseForm}>
                      Reset
                    </Button>
                    <Button variant="primary" type="submit">
                      Save
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          <Col md={8}>
            <Card>
              <Card.Body>
                <h5>Expense Management</h5>

                {isExpensesLoading ? (
                  <div className="d-flex align-items-center gap-2 py-3">
                    <Spinner animation="border" size="sm" />
                    <span>Loading expenses...</span>
                  </div>
                ) : null}

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
                    {filteredExpenses.map((expense) => (
                      <tr key={expense.id}>
                        <td>{expense.name}</td>
                        <td>{formatCurrency(expense.amount)}</td>
                        <td>{expense.category}</td>
                        <td>{formatDate(expense.date)}</td>
                        <td>
                          <Button
                            variant="warning"
                            size="sm"
                            className="me-2"
                            onClick={() => fillFormForEdit(expense)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => openDeleteConfirmation(expense.id)}
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

      <ModalConfirm
        show={isDeleteModalVisible}
        title="Confirm Delete"
        message="Are you sure you want to delete this expense?"
        onConfirm={handleConfirmDelete}
        onCancel={closeDeleteConfirmation}
      />
    </div>
  );
}

export default ExpensesDashboard;
