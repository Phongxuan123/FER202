/**
 * Dịch vụ gọi API liên quan đến tài khoản người dùng.
 * Tập trung toàn bộ các request HTTP tại đây để tránh lặp code (DRY).
 */
import axios from 'axios';

// Đường dẫn gốc của API tài khoản trên json-server
const ACCOUNTS_API_URL = 'http://localhost:3001/accounts';

/**
 * Lấy danh sách tất cả tài khoản.
 * @returns {Promise<Array>} Mảng các đối tượng tài khoản
 */
export const getAllAccounts = () =>
  axios.get(ACCOUNTS_API_URL).then((response) => response.data);

/**
 * Lấy thông tin một tài khoản theo ID.
 * @param {string} accountId - ID duy nhất của tài khoản
 * @returns {Promise<Object>} Đối tượng tài khoản
 */
export const getAccountById = (accountId) =>
  axios.get(`${ACCOUNTS_API_URL}/${accountId}`).then((response) => response.data);

/**
 * Cập nhật trạng thái (active/locked) của một tài khoản.
 * @param {string} accountId - ID tài khoản cần cập nhật
 * @param {string} newStatus - Trạng thái mới ('active' hoặc 'locked')
 * @returns {Promise} Kết quả từ server
 */
export const updateAccountStatus = (accountId, newStatus) =>
  axios.patch(`${ACCOUNTS_API_URL}/${accountId}`, { status: newStatus });
