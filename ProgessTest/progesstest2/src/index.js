/**
 * Điểm khởi động của ứng dụng React.
 * Gắn kết ứng dụng vào phần tử root trong index.html và bọc toàn bộ ứng dụng
 * trong Provider của Redux để chia sẻ store toàn cục.
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Gắn ứng dụng vào phần tử #root trong file public/index.html
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Provider cung cấp Redux store cho toàn bộ cây component */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
