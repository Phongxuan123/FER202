import React, { createContext, useState } from "react";

// Dữ liệu mẫu thay thế cho API call
const mockAccounts = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@example.com',
    password: '123456',
    role: 'admin',
    status: 'active'
  },
  {
    id: 2,
    username: 'user1',
    email: 'user1@example.com',
    password: '123456',
    role: 'user',
    status: 'active'
  },
  {
    id: 3,
    username: 'user2',
    email: 'user2@example.com',
    password: '123456',
    role: 'user',
    status: 'locked'
  }
];

// 1. Khởi tạo AuthContext với giá trị mặc định
export const AuthContext = createContext({
  user: null, // Thông tin người dùng đã đăng nhập
  isAuthenticated: false, // Trạng thái đăng nhập
  login: () => {}, // Hàm đăng nhập
  logout: () => {} // Hàm đăng xuất
});

// 2. Tạo AuthProvider để bao bọc ứng dụng và quản lý trạng thái xác thực
export const AuthProvider = ({ children }) => {
  // State quản lý thông tin người dùng
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 3. Hàm xử lý đăng nhập với mock data
  const login = (username, password) => {
    // Tìm kiếm user trong mock data
    const foundUser = mockAccounts.find(
      (account) => account.username === username && account.password === password
    );

    // Kiểm tra user có tồn tại không
    if (!foundUser) {
      return {
        success: false,
        message: 'Tên đăng nhập hoặc mật khẩu không đúng!'
      };
    }

    // Kiểm tra tài khoản có bị khóa không
    if (foundUser.status === 'locked') {
      return {
        success: false,
        message: 'Tài khoản của bạn đã bị khóa!'
      };
    }

    // Kiểm tra phân quyền: chỉ admin mới được đăng nhập
    if (foundUser.role !== 'admin') {
      return {
        success: false,
        message: 'Chỉ có admin mới được phép đăng nhập!'
      };
    }

    // Đăng nhập thành công
    setUser(foundUser);
    setIsAuthenticated(true);
    return {
      success: true,
      message: 'Đăng nhập thành công!',
      user: foundUser
    };
  };

  // 4. Hàm xử lý đăng xuất
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  // 5. Tạo object context chứa các giá trị và hàm
  const contextValue = {
    user, // Thông tin người dùng hiện tại
    isAuthenticated, // Trạng thái đã đăng nhập hay chưa
    login, // Hàm đăng nhập
    logout // Hàm đăng xuất
  };

  // 6. Cung cấp context cho các component con
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// 7. Custom hook để sử dụng AuthContext dễ dàng hơn
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
