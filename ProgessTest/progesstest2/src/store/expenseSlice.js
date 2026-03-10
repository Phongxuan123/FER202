/**
 * expenseSlice - Quản lý trạng thái danh sách chi tiêu của người dùng.
 * Cung cấp các thao tác bất đồng bộ: tải, thêm, cập nhật và xóa chi tiêu thông qua API.
 * Tự động xóa danh sách khi người dùng đăng xuất.
 */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getExpensesByUserId,
  createExpense,
  updateExpenseById,
  deleteExpenseById,
} from '../services/expenseService';
import { logout } from './authSlice';

/**
 * Chuyển đổi định dạng ngày từ YYYY-MM-DD (ISO) sang DD-MM-YYYY (hiển thị).
 * Nếu ngày đã đúng định dạng DD-MM-YYYY thì trả về nguyên bản.
 */
const convertToDisplayDateFormat = (dateString) => {
  if (!dateString) return '';
  const isISOFormat = dateString.includes('-') && dateString.split('-')[0].length === 4;
  if (isISOFormat) {
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
  }
  return dateString;
};

/**
 * Chuẩn hóa dữ liệu chi tiêu nhận từ API:
 * - Chuyển amount sang kiểu số
 * - Chuyển định dạng ngày sang DD-MM-YYYY để hiển thị
 */
const normalizeExpense = (expense) => ({
  ...expense,
  amount: Number(expense.amount),
  date: convertToDisplayDateFormat(expense.date),
});

// Tải toàn bộ chi tiêu của người dùng theo userId từ API
export const fetchExpenses = createAsyncThunk(
  'expenses/fetchAll',
  async (userId, { rejectWithValue }) => {
    try {
      const data = await getExpensesByUserId(userId);
      // Lọc thêm phía client để đảm bảo chỉ hiển thị chi tiêu của đúng người dùng
      const userExpenses = data.filter((expense) => String(expense.userId) === String(userId));
      return userExpenses.map(normalizeExpense);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thêm một chi tiêu mới vào danh sách
export const addExpense = createAsyncThunk(
  'expenses/add',
  async (expense, { rejectWithValue }) => {
    try {
      const createdExpense = await createExpense(expense);
      return normalizeExpense(createdExpense);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Cập nhật thông tin chi tiêu đã tồn tại theo id
export const updateExpense = createAsyncThunk(
  'expenses/update',
  async ({ id, expense }, { rejectWithValue }) => {
    try {
      const updatedExpense = await updateExpenseById(id, expense);
      return normalizeExpense(updatedExpense);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Xóa một chi tiêu theo id
export const deleteExpense = createAsyncThunk(
  'expenses/delete',
  async (id, { rejectWithValue }) => {
    try {
      await deleteExpenseById(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const expenseSlice = createSlice({
  name: 'expenses',
  initialState: {
    items: [],      // Danh sách chi tiêu hiện tại
    loading: false, // Trạng thái đang tải dữ liệu
    error: null,    // Thông báo lỗi nếu có
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // --- Tải danh sách chi tiêu ---
      .addCase(fetchExpenses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // --- Thêm chi tiêu mới thành công ---
      .addCase(addExpense.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      // --- Cập nhật chi tiêu thành công ---
      .addCase(updateExpense.fulfilled, (state, action) => {
        const expenseIndex = state.items.findIndex((item) => item.id === action.payload.id);
        if (expenseIndex !== -1) state.items[expenseIndex] = action.payload;
      })
      // --- Xóa chi tiêu thành công ---
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      // --- Xóa toàn bộ chi tiêu khi người dùng đăng xuất ---
      .addCase(logout, (state) => {
        state.items = [];
        state.loading = false;
        state.error = null;
      });
  },
});

export default expenseSlice.reducer;
