/**
 * Cấu hình Axios client dùng chung cho toàn bộ ứng dụng.
 * Mọi request đến API đều thông qua instance này để đảm bảo nhất quán về baseURL và headers.
 */
import axios from 'axios';

// Địa chỉ máy chủ JSON Server chạy cục bộ
const API_BASE_URL = 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
