/**
 * authService - Cung cấp chức năng xác thực người dùng.
 * Tìm kiếm người dùng theo tên đăng nhập và kiểm tra mật khẩu.
 * Lưu ý: Đây là ứng dụng demo dùng JSON Server, không dùng cho môi trường thực tế.
 */
import api from './api';

/**
 * Đăng nhập người dùng bằng cách kiểm tra username và password với dữ liệu từ server.
 * Ném lỗi nếu không tìm thấy tài khoản khớp.
 */
export const loginUser = async (username, password) => {
  const response = await api.get('/users', {
    params: { username },
  });

  const matchedUser = response.data.find(
    (user) => user.username === username && user.password === password
  );

  if (!matchedUser) {
    throw new Error('Invalid username or password');
  }

  return matchedUser;
};
