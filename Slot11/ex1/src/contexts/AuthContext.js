import React, { createContext, useState, useContext } from "react";
import { USER_ROLES, ACCOUNT_STATUS } from '../constants/theme';

const MOCK_ACCOUNTS = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@example.com',
    password: '123456',
    role: USER_ROLES.admin,
    status: ACCOUNT_STATUS.active
  },
  {
    id: 2,
    username: 'user1',
    email: 'user1@example.com',
    password: '123456',
    role: USER_ROLES.user,
    status: ACCOUNT_STATUS.active
  },
  {
    id: 3,
    username: 'user2',
    email: 'user2@example.com',
    password: '123456',
    role: USER_ROLES.user,
    status: ACCOUNT_STATUS.locked
  }
];

const ERROR_MESSAGES = {
  invalidCredentials: 'Tên đăng nhập hoặc mật khẩu không đúng!',
  accountLocked: 'Tài khoản của bạn đã bị khóa!',
  adminOnly: 'Chỉ có admin mới được phép đăng nhập!',
  success: 'Đăng nhập thành công!'
};

export const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {}
});

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

  const findUserByCredentials = (username, password) => {
    return MOCK_ACCOUNTS.find(
      (account) => account.username === username && account.password === password
    );
  };

  const validateUserAccount = (user) => {
    if (!user) {
      return { isValid: false, message: ERROR_MESSAGES.invalidCredentials };
    }

    if (user.status === ACCOUNT_STATUS.locked) {
      return { isValid: false, message: ERROR_MESSAGES.accountLocked };
    }

    if (user.role !== USER_ROLES.admin) {
      return { isValid: false, message: ERROR_MESSAGES.adminOnly };
    }

    return { isValid: true, message: ERROR_MESSAGES.success };
  };

  const login = (username, password) => {
    const foundUser = findUserByCredentials(username, password);
    const validation = validateUserAccount(foundUser);

    if (!validation.isValid) {
      return {
        success: false,
        message: validation.message
      };
    }

    setCurrentUser(foundUser);
    setIsUserAuthenticated(true);
    
    return {
      success: true,
      message: validation.message,
      user: foundUser
    };
  };

  const logout = () => {
    setCurrentUser(null);
    setIsUserAuthenticated(false);
  };

  const authContextValue = {
    user: currentUser,
    isAuthenticated: isUserAuthenticated,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContext = useContext(AuthContext);
  
  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  return authContext;
};
