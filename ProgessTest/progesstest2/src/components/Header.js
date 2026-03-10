/**
 * Header - Thanh điều hướng trên cùng của ứng dụng.
 * Hiển thị logo, tên ứng dụng, tên người dùng đang đăng nhập và nút đăng xuất.
 */
import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';
import '../styles/Header.css';

// Kích thước logo hiển thị trên thanh điều hướng (đơn vị: pixel)
const LOGO_SIZE = 38;

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  // Ưu tiên hiển thị tên đầy đủ, nếu không có thì dùng tên đăng nhập
  const displayName = user?.fullName || user?.username || '';

  // Đăng xuất và xóa session, sau đó chuyển về trang đăng nhập
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <Navbar expand="lg" className="navbar-custom mb-3">
      <Container>
        <Navbar.Brand href="#" className="brand-title d-flex align-items-center gap-2">
          <img
            src={process.env.PUBLIC_URL + '/images/image.png'}
            alt="PersonalBudget logo"
            style={{ width: LOGO_SIZE, height: LOGO_SIZE, objectFit: 'contain', borderRadius: '50%' }}
          />
          PersonalBudget
        </Navbar.Brand>
        <div className="navbar-right">
          <span className="signed-in-text">Signed in as {displayName}</span>
          <Button
            variant="danger"
            size="sm"
            onClick={handleLogout}
            className="logout-btn"
          >
            Logout
          </Button>
        </div>
      </Container>
    </Navbar>
  );
}

export default Header;
