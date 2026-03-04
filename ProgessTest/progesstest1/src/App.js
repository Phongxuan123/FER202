/**
 * Điểm khởi đầu của ứng dụng React.
 * Bọc AuthProvider (quản lý đăng nhập) và Router (quản lý đường dẫn)
 * quanh toàn bộ các trang.
 */
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
