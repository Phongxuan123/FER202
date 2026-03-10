/**
 * expenseService - Các hàm giao tiếp với API để quản lý chi tiêu.
 * Cung cấp đầy đủ chức năng CRUD: đọc, tạo, cập nhật và xóa chi tiêu.
 * Cung cấp thêm hàm lấy danh sách danh mục từ server.
 */
import api from './api';

// Lấy danh sách chi tiêu của một người dùng theo userId
export const getExpensesByUserId = async (userId) => {
  const response = await api.get('/expenses', {
    params: { userId },
  });
  return response.data;
};

// Tạo một chi tiêu mới và trả về dữ liệu vừa được lưu
export const createExpense = async (expense) => {
  const response = await api.post('/expenses', expense);
  return response.data;
};

// Cập nhật toàn bộ thông tin của một chi tiêu theo id
export const updateExpenseById = async (id, expense) => {
  const response = await api.put(`/expenses/${id}`, expense);
  return response.data;
};

// Xóa một chi tiêu theo id
export const deleteExpenseById = async (id) => {
  await api.delete(`/expenses/${id}`);
  return id;
};

// Lấy danh sách tất cả danh mục chi tiêu được định nghĩa trong server
export const getCategories = async () => {
  const response = await api.get('/categories');
  return response.data;
};
