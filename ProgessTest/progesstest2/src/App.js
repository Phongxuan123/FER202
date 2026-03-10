/**
 * App - Component gốc của ứng dụng.
 * Kết xuất AppRouter để xử lý toàn bộ việc điều hướng giữa các trang.
 */
import './App.css';
import AppRouter from './routers/AppRouter';

function App() {
  return <AppRouter />;
}

export default App;
