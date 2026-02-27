import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { useThemeColors } from './hooks/useThemeColors';
import LightSwitch from "./components/LightSwitch";
import CounterComponent from "./components/CounterComponent";
import LoginForm from "./components/LoginForm";
import UserAvatar from "./components/UserAvatar";
import InfoField from "./components/InfoField";
import { Button, Container, Row, Col, Navbar, Card } from 'react-bootstrap';
import { SPACING, FONT_SIZES, BRAND_COLORS, TRANSITIONS, USER_ROLES, ACCOUNT_STATUS } from './constants/theme';
import 'bootstrap/dist/css/bootstrap.min.css';

function AppContent() {
  const { isAuthenticated, user, logout } = useAuth();
  const { colors } = useThemeColors();

  if (!isAuthenticated) {
    return <LoginForm />;
  }
  const getRoleBadgeColor = (role) => {
    return role === USER_ROLES.admin ? BRAND_COLORS.primary : BRAND_COLORS.secondary;
  };

  const getStatusBadgeColor = (status) => {
    return status === ACCOUNT_STATUS.active ? BRAND_COLORS.success : BRAND_COLORS.danger;
  };

  const getStatusLabel = (status) => {
    return status === ACCOUNT_STATUS.active ? 'HOẠT ĐỘNG' : 'BỊ KHÓA';
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: colors.background,
      color: colors.text,
      display: 'flex',
      flexDirection: 'column',
      transition: TRANSITIONS.standard
    }}>
      <Navbar 
        expand="lg" 
        className="border-bottom shadow-sm" 
        style={{ 
          padding: `${SPACING.md} 0`,
          backgroundColor: colors.navbarBackground,
          borderColor: `${colors.border} !important`,
          transition: TRANSITIONS.standard
        }}
      >
        <Container fluid style={{ paddingLeft: SPACING.xxl, paddingRight: SPACING.xxl }}>
          <Navbar.Brand style={{ 
            fontWeight: 'bold', 
            fontSize: FONT_SIZES.lg, 
            display: 'flex', 
            alignItems: 'center', 
            gap: SPACING.sm 
          }}>
            <div style={{ 
              backgroundColor: BRAND_COLORS.primary, 
              color: 'white', 
              padding: `${SPACING.sm} ${SPACING.md}`, 
              borderRadius: '0.375rem',
              fontWeight: 'bold'
            }}>
              Lab 01
            </div>
          </Navbar.Brand>

          <div style={{ display: 'flex', alignItems: 'center', gap: SPACING.lg, marginLeft: 'auto' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: '600', fontSize: FONT_SIZES.sm, color: colors.text }}>
                {user.username}
              </div>
              <div style={{ fontSize: FONT_SIZES.xs, color: colors.textMuted, textTransform: 'uppercase' }}>
                {user.role}
              </div>
            </div>
            <UserAvatar username={user.username} />
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

      <Container fluid style={{ padding: SPACING.xxl, flex: 1 }}>
        <div style={{ marginBottom: SPACING.xxl }}>
          <h1 style={{ 
            fontSize: FONT_SIZES.xl, 
            fontWeight: 'bold', 
            marginBottom: SPACING.sm, 
            color: colors.text 
          }}>
            Bài tập 1: Thành phần chức năng
          </h1>
          <p style={{ 
            color: colors.textMuted, 
            fontSize: FONT_SIZES.md, 
            marginBottom: 0 
          }}>
            Khám phá cách React quản lý trạng thái thông qua các ví dụ thực tế về Bộ đếm và Công tắc đèn. 
            Sử dụng React Hooks và React-Bootstrap Layout.
          </p>
        </div>

        <Row className="g-4">
          <Col lg={6}>
            <CounterComponent />
          </Col>
          <Col lg={6}>
            <LightSwitch />
          </Col>
        </Row>

        <div style={{ marginTop: SPACING.xxl }}>
          <Card className="shadow-sm" style={{ 
            backgroundColor: colors.cardBackground, 
            borderColor: colors.border,
            transition: TRANSITIONS.standard
          }}>
            <Card.Header 
              className="border-bottom" 
              style={{ 
                padding: `${SPACING.lg} ${SPACING.xl}`,
                backgroundColor: colors.cardBackground,
                borderColor: colors.border,
                transition: TRANSITIONS.standard
              }}
            >
              <h5 style={{ 
                margin: 0, 
                fontWeight: '600', 
                fontSize: FONT_SIZES.md, 
                color: colors.text 
              }}>
                Thông tin người dùng
              </h5>
            </Card.Header>
            <Card.Body style={{ padding: SPACING.xl }}>
              <Row className="g-3">
                <Col md={6}>
                  <InfoField label="Tên người dùng" value={user.username} />
                </Col>
                <Col md={6}>
                  <InfoField label="Email" value={user.email} />
                </Col>
                <Col md={4}>
                  <InfoField 
                    label="Vai trò" 
                    value={user.role.toUpperCase()} 
                    isBadge={true}
                    badgeColor={getRoleBadgeColor(user.role)}
                  />
                </Col>
                <Col md={4}>
                  <InfoField 
                    label="Trạng thái" 
                    value={getStatusLabel(user.status)} 
                    isBadge={true}
                    badgeColor={getStatusBadgeColor(user.status)}
                  />
                </Col>
                <Col md={4}>
                  <InfoField label="ID" value={`#${user.id}`} badgeColor="monospace" />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </div>
      </Container>

      <footer style={{ 
        backgroundColor: colors.navbarBackground,
        borderTop: `1px solid ${colors.border}`,
        padding: `${SPACING.xl} 0`,
        marginTop: 'auto',
        transition: TRANSITIONS.standard
      }}>
        <Container>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: SPACING.lg
          }}>
            <p style={{ 
              margin: 0, 
              fontSize: FONT_SIZES.sm, 
              color: colors.textMuted 
            }}>
              © 2024 Modern Dashboard. Developed for React UI/UX Assignment.
            </p>
            <div style={{ display: 'flex', gap: SPACING.xxl, fontSize: FONT_SIZES.sm }}>
              <span style={{ color: colors.textMuted }}>System Stable</span>
              <span style={{ color: colors.textMuted }}>React v18</span>
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
