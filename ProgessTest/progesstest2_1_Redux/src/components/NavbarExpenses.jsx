import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants/appConstants';
import { logout } from '../store/slices/authSlice';
import { resetExpensesState } from '../store/slices/expensesSlice';

// Thanh điều hướng dùng để hiển thị trạng thái đăng nhập và cung cấp nút đăng xuất toàn cục.
function NavbarExpenses() {
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        dispatch(resetExpensesState());
        navigate(ROUTES.LOGIN);
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand>
                    <img
                        alt=""
                        src="/images/logo.png"
                        width="30"
                        height="30"
                        className="d-inline-block align-top me-2"
                    />
                    Personal Budget
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto align-items-center">
                        {isAuthenticated ? (
                            <>
                                <Navbar.Text className="me-3">
                                    Signed in as <strong>{user?.fullName}</strong>
                                </Navbar.Text>
                                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                            </>
                        ) : null}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarExpenses;
