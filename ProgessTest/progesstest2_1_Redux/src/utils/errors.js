import { AUTH_MESSAGES } from '../constants/appConstants';

// Hàm dùng chung để chuẩn hóa lỗi trả về từ API.
export const getApiErrorMessage = (error, fallbackMessage = AUTH_MESSAGES.NETWORK_ERROR) => {
  return error?.response?.data?.message || error?.message || fallbackMessage;
};
