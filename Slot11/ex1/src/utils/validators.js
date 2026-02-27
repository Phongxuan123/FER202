import { VALIDATION_RULES } from '../constants/theme';

export const validateUsername = (username) => {
  if (!username || username.trim().length === 0) {
    return 'Tên đăng nhập không được để trống!';
  }
  
  if (username.length < VALIDATION_RULES.minUsernameLength) {
    return `Tên đăng nhập phải có ít nhất ${VALIDATION_RULES.minUsernameLength} ký tự!`;
  }
  
  return null;
};

export const validatePassword = (password) => {
  if (!password || password.trim().length === 0) {
    return 'Mật khẩu không được để trống!';
  }
  
  if (password.length < VALIDATION_RULES.minPasswordLength) {
    return `Mật khẩu phải có ít nhất ${VALIDATION_RULES.minPasswordLength} ký tự!`;
  }
  
  return null;
};

export const validateLoginForm = (username, password) => {
  const usernameError = validateUsername(username);
  if (usernameError) {
    return { isValid: false, error: usernameError };
  }
  
  const passwordError = validatePassword(password);
  if (passwordError) {
    return { isValid: false, error: passwordError };
  }
  
  return { isValid: true, error: null };
};
