/**
 * TotalExpenses - Hiển thị tổng số tiền của tất cả chi tiêu hiện tại.
 * Lấy dữ liệu trực tiếp từ Redux store và tự động cập nhật khi danh sách thay đổi.
 */
import React from 'react';
import { Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';

/**
 * Định dạng số tiền theo chuẩn tiền tệ Việt Nam (VND).
 * Ví dụ: 1500000 → "1.500.000 ₫"
 */
const formatCurrencyVND = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

function TotalExpenses() {
  const expenseItems = useSelector((state) => state.expenses.items);

  // Tính tổng bằng cách cộng dồn tất cả giá trị amount trong danh sách
  const totalAmount = expenseItems.reduce((sum, expense) => sum + Number(expense.amount), 0);

  return (
    <Card className="mb-4 total-expenses-card">
      <Card.Body>
        <Card.Title>Total of Expenses</Card.Title>
        <h2 className="mt-2">{formatCurrencyVND(totalAmount)}</h2>
      </Card.Body>
    </Card>
  );
}

export default TotalExpenses;
