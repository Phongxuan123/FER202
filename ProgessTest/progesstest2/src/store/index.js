/**
 * Cấu hình Redux Store - Trung tâm quản lý trạng thái toàn bộ ứng dụng.
 * Store kết hợp authReducer (đăng nhập/đăng xuất) và expenseReducer (quản lý chi tiêu).
 */
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import expenseReducer from './expenseSlice';

// Kết hợp các reducer thành một store duy nhất cho toàn ứng dụng
const store = configureStore({
  reducer: {
    auth: authReducer,
    expenses: expenseReducer,
  },
});

export default store;
