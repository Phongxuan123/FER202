import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { EXPENSE_MESSAGES } from '../../constants/appConstants';
import {
  addExpense,
  deleteExpense,
  getExpenses,
  updateExpense,
} from '../../services/ExpensesAPI';

// Slice chi tiêu: chịu trách nhiệm đồng bộ danh sách chi tiêu và trạng thái tải/lỗi.
const initialState = {
  items: [],
  loading: false,
  error: null,
};

const getRejectedMessage = (action, fallbackMessage) => action.payload || fallbackMessage;

export const fetchExpenses = createAsyncThunk(
  'expenses/fetchExpenses',
  async (userId, { rejectWithValue }) => {
    try {
      const data = await getExpenses();
      return data.filter((expense) => expense.userId === userId);
    } catch (error) {
      return rejectWithValue(error.message || EXPENSE_MESSAGES.FETCH_FAILED);
    }
  }
);

export const createExpense = createAsyncThunk(
  'expenses/createExpense',
  async (expenseData, { rejectWithValue }) => {
    try {
      const created = await addExpense(expenseData);
      return created;
    } catch (error) {
      return rejectWithValue(error.message || EXPENSE_MESSAGES.CREATE_FAILED);
    }
  }
);

export const editExpense = createAsyncThunk(
  'expenses/editExpense',
  async ({ id, expenseData }, { rejectWithValue }) => {
    try {
      const updated = await updateExpense(id, expenseData);
      return updated;
    } catch (error) {
      return rejectWithValue(error.message || EXPENSE_MESSAGES.UPDATE_FAILED);
    }
  }
);

export const removeExpense = createAsyncThunk(
  'expenses/removeExpense',
  async (id, { rejectWithValue }) => {
    try {
      await deleteExpense(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message || EXPENSE_MESSAGES.DELETE_FAILED);
    }
  }
);

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    clearExpensesError: (state) => ({
      ...state,
      error: null,
    }),
    resetExpensesState: () => ({
      ...initialState,
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.pending, (state) => ({
        ...state,
        loading: true,
        error: null,
      }))
      .addCase(fetchExpenses.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        items: action.payload,
      }))
      .addCase(fetchExpenses.rejected, (state, action) => ({
        ...state,
        loading: false,
        error: getRejectedMessage(action, EXPENSE_MESSAGES.FETCH_FAILED),
      }))
      .addCase(createExpense.fulfilled, (state, action) => ({
        ...state,
        items: [...state.items, action.payload],
      }))
      .addCase(createExpense.rejected, (state, action) => ({
        ...state,
        error: getRejectedMessage(action, EXPENSE_MESSAGES.CREATE_FAILED),
      }))
      .addCase(editExpense.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index >= 0) {
          const updatedItems = [...state.items];
          updatedItems[index] = action.payload;
          return {
            ...state,
            items: updatedItems,
          };
        }
        return state;
      })
      .addCase(editExpense.rejected, (state, action) => ({
        ...state,
        error: getRejectedMessage(action, EXPENSE_MESSAGES.UPDATE_FAILED),
      }))
      .addCase(removeExpense.fulfilled, (state, action) => ({
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      }))
      .addCase(removeExpense.rejected, (state, action) => ({
        ...state,
        error: getRejectedMessage(action, EXPENSE_MESSAGES.DELETE_FAILED),
      }));
  },
});

export const { clearExpensesError, resetExpensesState } = expensesSlice.actions;
export default expensesSlice.reducer;
