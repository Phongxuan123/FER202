//áp dụng ThemeProvider và AuthProvider để bao bọc toàn bộ ứng dụng
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import LightSwitch from "./components/LightSwitch";
import CounterComponent from "./components/CounterComponent";
import LoginForm from "./components/LoginForm";
import { Button, Container, Row, Col, Navbar, Nav, Breadcrumb } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Component nội bộ để sử dụng useTheme và useAuth
function AppContent() {
  const { isAuthenticated, user, logout } = useAuth();
  const { theme } = useTheme(); // Lấy theme để thay đổi giao diện

  // Nếu chưa đăng nhập, chỉ hiển thị LoginForm
  if (!isAuthenticated) {
    return <LoginForm />;
  }

  // Định nghĩa màu sắc dựa trên theme
  const isDark = theme === 'dark';
  const bgColor = isDark ? '#0f172a' : '#f8f9fa';
  const textColor = isDark ? '#f8fafc' : '#212529';
  const borderColor = isDark ? '#334155' : '#dee2e6';
  const navbarBg = isDark ? '#1e293b' : '#ffffff';

  // Nếu đã đăng nhập, hiển thị trang chính với Counter và LightSwitch
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: bgColor,
      color: textColor,
      display: 'flex',
      flexDirection: 'column',
      transition: 'background-color 0.3s ease, color 0.3s ease'
    }}>
      {/* Header / Navbar */}
      <Navbar 
        expand="lg" 
        className="border-bottom shadow-sm" 
        style={{ 
          padding: '0.75rem 0',
          backgroundColor: navbarBg,
          borderColor: borderColor + ' !important',
          transition: 'background-color 0.3s ease'
        }}
      >
        <Container fluid style={{ paddingLeft: '2rem', paddingRight: '2rem' }}>
          <Navbar.Brand href="#" style={{ fontWeight: 'bold', fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ 
              backgroundColor: '#0d6efd', 
              color: 'white', 
              padding: '0.5rem 0.75rem', 
              borderRadius: '0.375rem',
              fontWeight: 'bold'
            }}>
              Lab 01
            </div>
          </Navbar.Brand>
          
          <Nav className="me-auto">
            <Nav.Link href="#" style={{ color: '#0d6efd', fontWeight: '500' }}>Dashboard</Nav.Link>
            <Nav.Link href="#" style={{ color: isDark ? '#94a3b8' : '#6c757d' }}>Assignments</Nav.Link>
            <Nav.Link href="#" style={{ color: isDark ? '#94a3b8' : '#6c757d' }}>Components</Nav.Link>
          </Nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: '600', fontSize: '0.875rem', color: textColor }}>{user.username}</div>
              <div style={{ fontSize: '0.75rem', color: isDark ? '#94a3b8' : '#6c757d', textTransform: 'uppercase' }}>
                {user.role}
              </div>
            </div>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: isDark ? '#334155' : '#e9ecef',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              color: isDark ? '#f8fafc' : '#495057'
            }}>
              {user.username.charAt(0).toUpperCase()}
            </div>
            <Button 
              variant="outline-danger" 
              size="sm"
              onClick={logout}
              style={{ fontWeight: '600' }}
            >
              Logout
            </Button>
          </div>
        </Container>
      </Navbar>

      {/* Main Content */}
      <Container fluid style={{ padding: '2rem', flex: 1 }}>
        {/* Breadcrumb */}
        <Breadcrumb style={{ fontSize: '0.875rem' }}>
          <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="#">Labs</Breadcrumb.Item>
          <Breadcrumb.Item active>Bài tập 1</Breadcrumb.Item>
        </Breadcrumb>

        {/* Page Title */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem', color: textColor }}>
            Bài tập 1: Thành phần chức năng
          </h1>
          <p style={{ color: isDark ? '#94a3b8' : '#6c757d', fontSize: '0.95rem', marginBottom: 0 }}>
            Khám phá cách React quản lý trạng thái thông qua các ví dụ thực tế về Bộ đếm và Công tắc đèn. 
            Sử dụng React Hooks và React-Bootstrap Layout.
          </p>
        </div>

        {/* Cards Grid */}
        <Row className="g-4">
          <Col lg={6}>
            <CounterComponent />
          </Col>
          <Col lg={6}>
            <LightSwitch />
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <footer style={{ 
        backgroundColor: navbarBg,
        borderTop: `1px solid ${borderColor}`,
        padding: '1.5rem 0',
        marginTop: 'auto',
        transition: 'background-color 0.3s ease'
      }}>
        <Container>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <p style={{ margin: 0, fontSize: '0.875rem', color: isDark ? '#94a3b8' : '#6c757d' }}>
              © 2024 Modern Dashboard. Developed for React UI/UX Assignment.
            </p>
            <div style={{ display: 'flex', gap: '2rem', fontSize: '0.875rem' }}>
              <span style={{ color: isDark ? '#94a3b8' : '#6c757d' }}>System Stable</span>
              <span style={{ color: isDark ? '#94a3b8' : '#6c757d' }}>React v18</span>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
