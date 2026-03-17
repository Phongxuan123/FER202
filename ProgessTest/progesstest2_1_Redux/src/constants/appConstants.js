export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/',
};

export const API_ENDPOINTS = {
  USERS: 'http://localhost:3001/users',
  EXPENSES: 'http://localhost:3001/expenses',
};

export const AUTH_MESSAGES = {
  INVALID_CREDENTIALS: 'Tài khoản hoặc mật khẩu không chính xác',
  NETWORK_ERROR: 'Không thể kết nối đến máy chủ',
  LOGIN_FAILED: 'Đăng nhập thất bại.',
  ADMIN_ONLY: 'Access denied. Admins only.',
  ACCOUNT_LOCKED: 'Access is denied. Your account is locked.',
};

export const EXPENSE_MESSAGES = {
  FETCH_FAILED: 'Không thể tải danh sách chi tiêu.',
  CREATE_FAILED: 'Không thể thêm khoản chi tiêu.',
  UPDATE_FAILED: 'Không thể cập nhật khoản chi tiêu.',
  DELETE_FAILED: 'Không thể xóa khoản chi tiêu.',
  NAME_REQUIRED: 'Name is required.',
  AMOUNT_REQUIRED: 'Amount must be greater than 0.',
  DATE_REQUIRED: 'Date is required.',
};

export const LOGIN_MESSAGES = {
  USERNAME_REQUIRED: 'Username is required',
  PASSWORD_REQUIRED: 'Password is required',
  INVALID_EMAIL: 'Invalid email format',
  WEAK_PASSWORD: 'Password must be at least 6 characters',
  REDIRECT_SUCCESS: 'You have successfully logged in. Redirecting to dashboard...',
};

export const LOGIN_RULES = {
  MIN_PASSWORD_LENGTH: 6,
  REDIRECT_DELAY_MS: 3000,
};

export const EXPENSE_DEFAULT_FORM = {
  name: '',
  amount: '',
  category: 'Food',
  date: '',
};

export const EXPENSE_CATEGORIES = ['Food', 'Utilities', 'Entertainment', 'Mua sắm'];

export const FILTER_OPTIONS = {
  ALL_CATEGORIES: 'All categories',
};
