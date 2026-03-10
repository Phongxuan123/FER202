/**
 * useCategories - Hook tùy chỉnh để lấy danh sách danh mục từ server.
 * Dùng chung cho ExpenseForm và ExpenseManagement để tránh lặp code.
 * Tự động gộp thêm các danh mục tùy chỉnh xuất hiện trong chi tiêu thực tế
 * nhưng chưa có trong danh sách server (ví dụ: dữ liệu cũ).
 */
import { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getCategories } from '../services/expenseService';

function useCategories() {
  // Danh sách danh mục lấy từ server
  const [serverCategories, setServerCategories] = useState([]);
  const expenseItems = useSelector((state) => state.expenses.items);

  // Gọi API lấy danh sách danh mục khi hook được khởi tạo lần đầu
  useEffect(() => {
    getCategories()
      .then((data) => setServerCategories(data.map((item) => item.name)))
      .catch(() => setServerCategories([]));
  }, []);

  // Gộp danh mục từ server với danh mục tùy chỉnh có trong dữ liệu chi tiêu thực tế
  const categories = useMemo(() => {
    const customCategories = expenseItems
      .map((expense) => expense.category)
      .filter((cat) => cat && !serverCategories.includes(cat));
    return [...serverCategories, ...Array.from(new Set(customCategories)).sort()];
  }, [serverCategories, expenseItems]);

  return categories;
}

export default useCategories;
