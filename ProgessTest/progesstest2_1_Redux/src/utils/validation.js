import { EXPENSE_MESSAGES, LOGIN_MESSAGES, LOGIN_RULES } from '../constants/appConstants';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Hàm này gom toàn bộ luật kiểm tra form đăng nhập để component chỉ lo hiển thị.
export const validateLoginForm = ({ username, password }) => {
  const validationErrors = {};

  if (!username) {
    validationErrors.username = LOGIN_MESSAGES.USERNAME_REQUIRED;
  }

  if (!password) {
    validationErrors.password = LOGIN_MESSAGES.PASSWORD_REQUIRED;
  }

  if (username && username.includes('@') && !EMAIL_PATTERN.test(username)) {
    validationErrors.username = LOGIN_MESSAGES.INVALID_EMAIL;
  }

  if (password && password.length < LOGIN_RULES.MIN_PASSWORD_LENGTH) {
    validationErrors.password = LOGIN_MESSAGES.WEAK_PASSWORD;
  }

  return validationErrors;
};

// Hàm này giữ một điểm kiểm tra duy nhất cho form chi tiêu, tránh lặp luật ở nhiều nơi.
export const validateExpenseForm = (expenseFormData) => {
  const validationErrors = {};

  if (!expenseFormData.name.trim()) {
    validationErrors.name = EXPENSE_MESSAGES.NAME_REQUIRED;
  }

  if (!expenseFormData.amount || Number(expenseFormData.amount) <= 0) {
    validationErrors.amount = EXPENSE_MESSAGES.AMOUNT_REQUIRED;
  }

  if (!expenseFormData.date) {
    validationErrors.date = EXPENSE_MESSAGES.DATE_REQUIRED;
  }

  return validationErrors;
};
