// ===== FORMAT HELPERS =====
  // 450000 → "450.000 đ"
  export const formatCurrency = (amount) => {
    return Number(amount).toLocaleString('vi-VN') + ' đ';
  };

  // "2025-10-02" → "02-10-2025"
  export const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split('-');
    return `${day}-${month}-${year}`;
  };
