import axios from 'axios';
import { API_ENDPOINTS } from '../constants/appConstants';

const EXPENSES_API_URL = API_ENDPOINTS.EXPENSES;

// Hàm trợ giúp dùng để gom logic gọi API + xử lý lỗi vào một nơi duy nhất.
const executeRequest = async (requestExecutor, errorPrefix) => {
  try {
    const response = await requestExecutor();
    return response?.data;
  } catch (error) {
    console.error(`${errorPrefix}:`, error);
    throw error;
  }
};

// Khối này dùng để lấy toàn bộ danh sách chi tiêu từ backend.
export const getExpenses = async () => {
  return executeRequest(() => axios.get(EXPENSES_API_URL), 'Error fetching expenses');
};

export const getExpenseById = async (id) => {
  return executeRequest(() => axios.get(`${EXPENSES_API_URL}/${id}`), 'Error fetching expense');
};

export const addExpense = async (expense) => {
  return executeRequest(() => axios.post(EXPENSES_API_URL, expense), 'Error adding expense');
};

export const updateExpense = async (id, updatedExpense) => {
  return executeRequest(() => axios.put(`${EXPENSES_API_URL}/${id}`, updatedExpense), 'Error updating expense');
};

export const deleteExpense = async (id) => {
  return executeRequest(() => axios.delete(`${EXPENSES_API_URL}/${id}`), 'Error deleting expense');
};
