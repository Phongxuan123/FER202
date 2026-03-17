import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginRequest } from '../../services/AuthAPI';
import { AUTH_MESSAGES } from '../../constants/appConstants';

// Slice xác thực: quản lý trạng thái đăng nhập và lỗi liên quan đến phiên người dùng.
const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

const getRejectedMessage = (action, fallbackMessage) => action.payload || fallbackMessage;

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (loginCredentials, { rejectWithValue }) => {
    try {
      const authenticatedUser = await loginRequest(loginCredentials);

      if (authenticatedUser.role !== 'admin') {
        return rejectWithValue(AUTH_MESSAGES.ADMIN_ONLY);
      }

      if (authenticatedUser.status === 'locked') {
        return rejectWithValue(AUTH_MESSAGES.ACCOUNT_LOCKED);
      }

      return authenticatedUser;
    } catch (error) {
      return rejectWithValue(error.message || AUTH_MESSAGES.LOGIN_FAILED);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => ({
      ...state,
      isAuthenticated: false,
      user: null,
      error: null,
    }),
    clearAuthError: (state) => ({
      ...state,
      error: null,
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => ({
        ...state,
        loading: true,
        error: null,
      }))
      .addCase(loginUser.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      }))
      .addCase(loginUser.rejected, (state, action) => ({
        ...state,
        loading: false,
        error: getRejectedMessage(action, AUTH_MESSAGES.LOGIN_FAILED),
      }));
  },
});

export const { logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
