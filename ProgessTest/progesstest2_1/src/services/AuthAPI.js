import axios from 'axios';

export const loginAction = async (dispatch, credentials) => {
  dispatch({ type: 'LOGIN_START' });

  try {
    // 1. Chuyển sang POST nếu backend hỗ trợ, hoặc giữ GET nhưng cẩn trọng
    // Ở đây tôi sửa lỗi thiếu ngoặc và tối ưu catch error
    const response = await axios.get('http://localhost:3001/users');

    const users = response.data;

    // Lọc người dùng dựa trên username và password
    const user = users.find(
      (u) => u.username === credentials.username && u.password === credentials.password
    );

    if (user) {
      // Xóa password trước khi lưu vào State/LocalStorage để bảo mật
      delete user.password; 

      dispatch({ type: 'LOGIN_SUCCESS', payload: { user } });
      console.log('User logged in:', user);
      return { success: true, user };
    } else {
      const errorMessage = 'Tài khoản hoặc mật khẩu không chính xác';
      dispatch({ type: 'LOGIN_FAILURE', payload: { error: errorMessage } });
      return { success: false, message: errorMessage };
    }
  } catch (error) { // Đã thêm dấu đóng ngoặc } bị thiếu ở đây
    // Xử lý lỗi thông minh hơn (Network error vs Server error)
    const errorMessage = error.response?.data?.message || 'Không thể kết nối đến máy chủ';
    
    dispatch({ type: 'LOGIN_FAILURE', payload: { error: errorMessage } });
    return { success: false, message: errorMessage };
  }
};
