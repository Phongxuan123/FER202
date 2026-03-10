/**
 * ExpenseContext - Context cục bộ để quản lý danh sách chi tiêu (dữ liệu mẫu, không kết nối API).
 * Lưu ý: Đây là phiên bản Context API độc lập, chủ yếu dùng để demo hoặc phát triển UI.
 * Ứng dụng chính sử dụng Redux Toolkit (expenseSlice) để quản lý chi tiêu với API thực tế.
 */
import React, { createContext, useState, useContext } from 'react';

// Dữ liệu chi tiêu mẫu để khởi tạo context khi không có API
const INITIAL_EXPENSES = [
  { id: 1, name: 'Lunch',           amount: 85000,   category: 'Food',          date: '02-10-2025' },
  { id: 2, name: 'Electricity Bill', amount: 450000, category: 'Utilities',     date: '03-10-2025' },
  { id: 3, name: 'Cinema',          amount: 120000,  category: 'Entertainment', date: '05-10-2025' },
  { id: 4, name: 'Cafe',            amount: 65000,   category: 'Food',          date: '07-10-2025' },
  { id: 5, name: 'Buy clothes',     amount: 2000000, category: 'Mua sắm',       date: '02-10-2025' },
];

const ExpenseContext = createContext();

export function ExpenseProvider({ children }) {
  const [expenses, setExpenses] = useState(INITIAL_EXPENSES);
  const [fullName, setFullName] = useState('Nguyen Van A');

  // Thêm chi tiêu mới với id tự động tăng dần
  const addExpense = (expense) => {
    const nextId = Math.max(...expenses.map((e) => e.id), 0) + 1;
    setExpenses([...expenses, { id: nextId, ...expense }]);
  };

  // Cập nhật thông tin chi tiêu theo id, giữ nguyên các trường không thay đổi
  const updateExpense = (id, updatedExpense) => {
    setExpenses(expenses.map((e) => (e.id === id ? { ...e, ...updatedExpense } : e)));
  };

  // Xóa chi tiêu khỏi danh sách theo id
  const deleteExpense = (id) => {
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  // Tìm và trả về một chi tiêu cụ thể theo id
  const getExpenseById = (id) => {
    return expenses.find((e) => e.id === id);
  };

  // Tính tổng số tiền của tất cả chi tiêu
  const getTotalExpenses = () => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  };

  // Lọc chi tiêu theo danh mục (không phân biệt hoa thường), trả về tất cả nếu không có bộ lọc
  const getFilteredExpenses = (category) => {
    if (!category) return expenses;
    return expenses.filter((e) => e.category.toLowerCase().includes(category.toLowerCase()));
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        addExpense,
        updateExpense,
        deleteExpense,
        getExpenseById,
        getTotalExpenses,
        getFilteredExpenses,
        fullName,
        setFullName,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}

// Hook tiện ích để truy cập ExpenseContext, đảm bảo chỉ dùng bên trong ExpenseProvider
export function useExpense() {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpense phải được sử dụng bên trong ExpenseProvider');
  }
  return context;
}
