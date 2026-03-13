import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from './components/LoginForm';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute';
import ExpensesDashboard from './pages/ExpenseDashboard';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
      <Routes>
 <Route path="/login" element={<LoginForm />} /> 
        {/* Các route khác của bạn sẽ được đặt ở đây */}
        <Route path= "/" element={
          <ProtectedRoute>
              <ExpensesDashboard />
          </ProtectedRoute> 
          } />
        </Routes>
     

      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
