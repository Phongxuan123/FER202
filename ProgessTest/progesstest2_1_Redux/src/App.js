import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ROUTES } from './constants/appConstants';
import LoginForm from './components/LoginForm';
import ExpensesDashboard from './pages/ExpenseDashboard';
import ProtectedRoute from './routes/ProtectedRoute';

// Khối định tuyến trung tâm dùng để kiểm soát luồng truy cập toàn ứng dụng.
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<LoginForm />} />
        <Route
          path={ROUTES.DASHBOARD}
          element={
            <ProtectedRoute>
              <ExpensesDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
