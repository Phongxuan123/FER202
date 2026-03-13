//AuthContext.jsx kết hợp useReducer để quản lý trạng thái xác thực, cung cấp các hàm đăng nhập và đăng xuất, và lưu trữ thông tin người dùng trong localStorage để duy trì trạng thái đăng nhập qua các phiên làm việc.
import React, { createContext, useReducer} from 'react';

//Bước 1. Khởi tạo giá trị ban đầu cho context
const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

//Bước 2. Tạo reducer để quản lý trạng thái
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        loading: false,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
//Bước 3. Tạo context
export const AuthContext = createContext();
//Bước 4. Tạo provider để cung cấp context cho toàn bộ ứng dụng
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);      

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

//Tạo một custom hook để dễ dàng sử dụng context trong các component khác
//Thay vì mỗi lần dùng lại phải import cả useContext và AuthContext, 
// các component chỉ cần import useAuth và gọi nó để lấy giá trị context. 
// Điều này giúp mã nguồn trở nên sạch hơn và dễ bảo trì hơn.
export const useAuth = () => {
  const context = React.useContext(AuthContext);  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
