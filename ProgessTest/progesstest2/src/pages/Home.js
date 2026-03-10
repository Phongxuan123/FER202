/**
 * Trang chủ (Dashboard) - Màn hình chính sau khi đăng nhập.
 * Hiển thị tổng chi tiêu, form thêm/sửa và bảng danh sách chi tiêu.
 * Tự động tải danh sách chi tiêu của người dùng khi vào trang.
 */
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExpenses } from '../store/expenseSlice';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TotalExpenses from '../components/TotalExpenses';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseManagement from '../components/ExpenseManagement';
import '../styles/Dashboard.css';

// CSS selector của form để cuộn trang đến khi bắt đầu chỉnh sửa
const EXPENSE_FORM_SELECTOR = '.add-expense-form';

function Home() {
  const [editingId, setEditingId] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  // Tải danh sách chi tiêu khi người dùng đăng nhập thành công
  useEffect(() => {
    if (user?.id) {
      dispatch(fetchExpenses(user.id));
    }
  }, [dispatch, user]);

  // Bắt đầu chỉnh sửa chi tiêu và cuộn trang đến form
  const handleEdit = (expenseId) => {
    setEditingId(expenseId);
    const formElement = document.querySelector(EXPENSE_FORM_SELECTOR);
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Kết thúc chỉnh sửa, đặt lại trạng thái form về chế độ thêm mới
  const handleEditComplete = () => {
    setEditingId(null);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />

      <Container className="flex-grow-1 py-4">
        <Row>
          {/* Cột trái: Tổng chi tiêu và Form thêm/sửa */}
          <Col md={5}>
            <TotalExpenses />
            <div className="add-expense-form">
              <ExpenseForm
                editingId={editingId}
                onEditComplete={handleEditComplete}
              />
            </div>
          </Col>

          {/* Cột phải: Bảng quản lý danh sách chi tiêu */}
          <Col md={7}>
            <ExpenseManagement
              editingId={editingId}
              onEdit={handleEdit}
            />
          </Col>
        </Row>
      </Container>

      <Footer />
    </div>
  );
}

export default Home;
