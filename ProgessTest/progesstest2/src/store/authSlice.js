/**
 * authSlice - Quản lý trạng thái xác thực người dùng (đăng nhập / đăng xuất).
 * Sử dụng Redux Toolkit để tạo slice với các action và reducer tự động.
 * Lưu trữ thông tin người dùng vào localStorage để duy trì phiên đăng nhập sau khi tải lại trang.
 */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser } from '../services/authService';

// Thực hiện đăng nhập bất đồng bộ và lưu người dùng vào localStorage
export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const user = await loginUser(username, password);
      // Lưu thông tin người dùng để duy trì phiên đăng nhập khi tải lại trang
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (error) {
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

/**
 * Đọc thông tin người dùng đã lưu từ localStorage khi ứng dụng khởi động.
 * Trả về null nếu không có dữ liệu hoặc dữ liệu bị lỗi.
 */
const loadSavedUser = () => {
  try {
    const savedUserData = localStorage.getItem('user');
    return savedUserData ? JSON.parse(savedUserData) : null;
  } catch {
    return null;
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: loadSavedUser(), // Khôi phục phiên đăng nhập từ localStorage
    loading: false,
    error: null,
  },
  reducers: {
    // Xử lý đăng xuất: xóa người dùng khỏi state và localStorage
    logout(state) {
      state.user = null;
      state.error = null;
      localStorage.removeItem('user');
    },
    // Xóa thông báo lỗi khi người dùng bắt đầu nhập lại
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Đang xử lý đăng nhập
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Đăng nhập thành công
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      // Đăng nhập thất bại
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
