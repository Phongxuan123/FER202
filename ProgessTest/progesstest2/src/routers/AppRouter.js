/**
 * AppRouter - Định tuyến chính của ứng dụng.
 * Bảo vệ các trang yêu cầu đăng nhập thông qua PrivateRoute.
 * Mặc định chuyển hướng người dùng đến trang đăng nhập.
 */
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from '../pages/Login';
import Home from '../pages/Home';

/**
 * PrivateRoute - Component bảo vệ route.
 * Nếu người dùng chưa đăng nhập, chuyển hướng về trang /login.
 */
function PrivateRoute({ children }) {
  const loggedInUser = useSelector((state) => state.auth.user);
  return loggedInUser ? children : <Navigate to="/login" replace />;
}

function AppRouter() {
  return (
    <Router>
      <Routes>
        {/* Trang đăng nhập - truy cập tự do */}
        <Route path="/login" element={<Login />} />

        {/* Trang chính - chỉ truy cập được khi đã đăng nhập */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        {/* Mặc định chuyển hướng về trang đăng nhập */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
