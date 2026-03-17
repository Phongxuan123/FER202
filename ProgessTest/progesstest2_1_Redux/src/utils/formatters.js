// Bộ formatter dùng để chuẩn hóa cách hiển thị dữ liệu trong toàn bộ giao diện.
export const formatCurrency = (amount) => {
  return `${Number(amount || 0).toLocaleString('vi-VN')} đ`;
};

export const formatDate = (dateString) => {
  if (!dateString || !dateString.includes('-')) {
    return '';
  }

  const [year, month, day] = dateString.split('-');
  return `${day}-${month}-${year}`;
};
