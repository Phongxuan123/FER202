/**
 * ExpenseManagement - Quản lý danh sách chi tiêu với bộ lọc và thao tác sửa/xóa.
 * Cho phép lọc chi tiêu theo danh mục và xác nhận trước khi xóa thông qua hộp thoại.
 * Đánh dấu hàng đang được chỉnh sửa bằng màu nền để dễ nhận biết.
 */
import React, { useState, useMemo } from 'react';
import { Card, Form, Table, Button, Modal, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { deleteExpense } from '../store/expenseSlice';
import useCategories from '../hooks/useCategories';

function ExpenseManagement({ editingId, onEdit }) {
  const [filterCategory, setFilterCategory] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState(null);
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.expenses);

  // Lấy danh sách danh mục từ server (đọc từ db.json qua API)
  const allCategories = useCategories();

  // Lọc danh sách chi tiêu theo danh mục đã chọn, trả về tất cả nếu không có bộ lọc
  const filteredExpenses = useMemo(() => {
    if (!filterCategory) return items;
    return items.filter((expense) => expense.category === filterCategory);
  }, [filterCategory, items]);

  // Mở hộp thoại xác nhận xóa và lưu chi tiêu cần xóa
  const handleDeleteClick = (expense) => {
    setExpenseToDelete(expense);
    setShowDeleteModal(true);
  };

  // Thực hiện xóa chi tiêu sau khi người dùng xác nhận
  const handleConfirmDelete = () => {
    if (expenseToDelete) {
      dispatch(deleteExpense(expenseToDelete.id));
      setShowDeleteModal(false);
      setExpenseToDelete(null);
    }
  };

  return (
    <div>
      {/* Bộ lọc danh mục chi tiêu */}
      <Card className="mb-4">
        <Card.Header className="bg-white border-bottom">
          <Card.Title className="mb-0">Filter</Card.Title>
        </Card.Header>
        <Card.Body>
          <Form.Group>
            <Form.Label>Category</Form.Label>
            <Form.Select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
              <option value="">All categories</option>
              {allCategories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Card.Body>
      </Card>

      {/* Bảng danh sách chi tiêu với các nút sửa và xóa */}
      <Card>
        <Card.Header className="bg-white border-bottom">
          <Card.Title className="mb-0">Expense Management</Card.Title>
        </Card.Header>
        <Card.Body>
          {loading ? (
            // Hiển thị vòng xoay khi đang tải dữ liệu
            <div className="text-center py-4">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
            <div className="table-responsive">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Amount</th>
                    <th>Category</th>
                    <th>Date</th>
                    <th style={{ width: '150px' }} className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredExpenses.length > 0 ? (
                    filteredExpenses.map((expense) => (
                      // Đánh dấu hàng đang được chỉnh sửa bằng màu xanh nhạt
                      <tr key={expense.id} className={editingId === expense.id ? 'table-info' : ''}>
                        <td>{expense.name}</td>
                        <td>{Number(expense.amount).toLocaleString('vi-VN')} ₫</td>
                        <td>{expense.category}</td>
                        <td>{expense.date}</td>
                        <td className="text-center">
                          <div className="d-flex gap-2 justify-content-center">
                            <Button variant="warning" size="sm" onClick={() => onEdit(expense.id)}>
                              Edit
                            </Button>
                            <Button variant="danger" size="sm" onClick={() => handleDeleteClick(expense)}>
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center text-muted">No expenses found</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Hộp thoại xác nhận trước khi xóa chi tiêu */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Do you really want to delete this expense?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleConfirmDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ExpenseManagement;
