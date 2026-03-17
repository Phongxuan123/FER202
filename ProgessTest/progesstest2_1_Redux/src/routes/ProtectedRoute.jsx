import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '../constants/appConstants';

// Route bảo vệ dùng để chặn truy cập vào trang chính khi chưa đăng nhập.
function ProtectedRoute({ children }) {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to={ROUTES.LOGIN} />;
    }

    return children;
}

export default ProtectedRoute;
