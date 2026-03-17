import axios from 'axios';
import { API_ENDPOINTS, AUTH_MESSAGES } from '../constants/appConstants';
import { getApiErrorMessage } from '../utils/errors';

// Khối gọi API đăng nhập: chỉ chịu trách nhiệm lấy dữ liệu người dùng và trả user an toàn.
export const loginRequest = async (credentials) => {
  try {
    const response = await axios.get(API_ENDPOINTS.USERS);
    const users = response.data;

    // Tách điều kiện thành biến có nghĩa để câu lệnh tìm kiếm dễ đọc hơn.
    const user = users.find(
      (u) => u.username === credentials.username && u.password === credentials.password
    );

    if (user) {
      const { password, ...safeUser } = user;
      return safeUser;
    }

    throw new Error(AUTH_MESSAGES.INVALID_CREDENTIALS);
  } catch (error) {
    throw new Error(getApiErrorMessage(error, AUTH_MESSAGES.NETWORK_ERROR));
  }
};
