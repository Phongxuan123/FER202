//ExpensesAPI.js chứa các hàm để tương tác với backend, bao gồm hàm CRUD expenses
import axios from 'axios';

const API_URL = 'http://localhost:3001/expenses';
// Hàm lấy danh sách các khoản chi tiêu
export const getExpenses = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching expenses:', error);
        throw error;
    }
};
//Hàm lấy chi tiết một khoản chi tiêu theo ID
export const getExpenseById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching expense:', error);
        throw error;
    }
};
// Hàm thêm mới một khoản chi tiêu
export const addExpense = async (expense) => {
    try {
        const response = await axios.post(API_URL, expense);
        return response.data;
    } catch (error) {
        console.error('Error adding expense:', error);
        throw error;
    }
};
// Hàm cập nhật một khoản chi tiêu
export const updateExpense = async (id, updatedExpense) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, updatedExpense);   
        return response.data;
    } catch (error) {
        console.error('Error updating expense:', error);
        throw error;
    }
};
//Hàm xóa một khoản chi tiêu
export const deleteExpense = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error('Error deleting expense:', error);
        throw error;
    }
};
