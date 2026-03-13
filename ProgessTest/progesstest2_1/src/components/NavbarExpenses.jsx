//NavbarExpenses.jsx thanh điều hướng chứa logo+tên app "Personal Budget" bên trái, bên phải hiển thị "Signed in as [username]" và nút "Logout". Navbar này sẽ xuất hiện trên tất cả các trang sau khi người dùng đăng nhập thành công, giúp người dùng dễ dàng nhận biết trạng thái đăng nhập và có thể đăng xuất bất cứ lúc nào.
import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
function NavbarExpenses() {
    const { state, dispatch } = useAuth(); //Sử dụng useAuth để lấy thông tin xác thực và hàm dispatch từ AuthContext
    const navigate = useNavigate(); //Sử dụng useNavigate để điều hướng sau khi đăng xuất
    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('/login'); // Chuyển hướng về trang đăng nhập sau khi đăng xuất
    }
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
                        {state.isAuthenticated && (
                            <>
                                <Navbar.Text className="me-3">
                                    Signed in as <strong>{state.user.fullName}</strong>
                                </Navbar.Text>
                                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
export default NavbarExpenses;
