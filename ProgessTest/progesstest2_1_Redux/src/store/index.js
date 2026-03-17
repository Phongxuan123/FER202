import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import expensesReducer from './slices/expensesSlice';

// Store trung tâm: tập hợp toàn bộ state của ứng dụng vào một nguồn duy nhất.
const store = configureStore({
  reducer: {
    auth: authReducer,
    expenses: expensesReducer,
  },
});

export default store;
