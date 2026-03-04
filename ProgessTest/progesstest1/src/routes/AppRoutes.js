/**
 * Cấu hình toàn bộ đường dẫn (routing) của ứng dụng.
 * Tách riêng ra file này để App.js gọn gàng và dễ bảo trì.
 */
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import AccountList from '../pages/AccountList';
import AccountDetail from '../pages/AccountDetail';

function AppRoutes() {
  return (
    <Routes>
      {/* Mặc định chuyển hướng về trang đăng nhập */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Trang đăng nhập */}
      <Route path="/login" element={<LoginForm />} />

      {/* Trang danh sách tài khoản */}
      <Route path="/accounts" element={<AccountList />} />

      {/* Trang chi tiết một tài khoản (theo ID) */}
      <Route path="/accounts/:id" element={<AccountDetail />} />
    </Routes>
  );
}

export default AppRoutes;
