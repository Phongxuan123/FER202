/**
 * Quản lý trạng thái xác thực (đăng nhập/đăng xuất) của người dùng.
 * Dùng React Context + useReducer để chia sẻ thông tin user khắp ứng dụng
 * mà không cần truyền props qua nhiều tầng.
 */
import React, { createContext, useContext, useReducer } from 'react';

// Tạo Context mặc định là null (chưa có user nào đăng nhập)
const AuthContext = createContext(null);

// Tên key lưu trong localStorage, đặt hằng số để tránh gõ sai (no magic string)
const STORAGE_KEY = 'loggedInUser';

// Các loại action dùng trong reducer (no magic string)
const AUTH_ACTIONS = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
};

/**
 * Reducer xử lý các thay đổi trạng thái xác thực.
 * @param {Object} state - Trạng thái hiện tại { loggedInUser }
 * @param {Object} action - { type, payload }
 */
function authReducer(state, action) {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN:
      // Lưu vào localStorage để giữ đăng nhập khi tải lại trang
      localStorage.setItem(STORAGE_KEY, JSON.stringify(action.payload));
      return { loggedInUser: action.payload };

    case AUTH_ACTIONS.LOGOUT:
      // Xóa khỏi localStorage khi đăng xuất
      localStorage.removeItem(STORAGE_KEY);
      return { loggedInUser: null };

    default:
      return state;
  }
}

/**
 * Provider bọc quanh toàn bộ ứng dụng, cung cấp thông tin đăng nhập.
 */
export function AuthProvider({ children }) {
  // Khởi tạo state từ localStorage để giữ đăng nhập khi tải lại trang
  const initialState = {
    loggedInUser: (() => {
      const storedUser = localStorage.getItem(STORAGE_KEY);
      return storedUser ? JSON.parse(storedUser) : null;
    })(),
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  /** Dispatch action LOGIN với thông tin user */
  const login = (user) => dispatch({ type: AUTH_ACTIONS.LOGIN, payload: user });

  /** Dispatch action LOGOUT để xóa phiên đăng nhập */
  const logout = () => dispatch({ type: AUTH_ACTIONS.LOGOUT });

  return (
    <AuthContext.Provider value={{ loggedInUser: state.loggedInUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook tiện ích để sử dụng thông tin xác thực ở bất kỳ component nào.
 * Ví dụ: const { loggedInUser, login, logout } = useAuth();
 */
export const useAuth = () => useContext(AuthContext);
