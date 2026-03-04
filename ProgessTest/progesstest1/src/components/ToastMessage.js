/**
 * Thông báo dạng Toast (góc phải trên màn hình).
 * Tự động ẩn sau một khoảng thời gian (mặc định 3 giây).
 * Dùng chung cho mọi thông báo: thành công (success), cảnh báo (warning), lỗi (danger).
 */
import React, { useEffect } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

// Thời gian tự động ẩn toast (ms) - tránh magic number
const DEFAULT_AUTO_HIDE_DELAY = 3000;

// Z-index cao để luôn hiển thị trên cùng màn hình
const TOAST_Z_INDEX = 9999;

function ToastMessage({
  show,
  message,
  variant = 'success',
  onClose,
  delay = DEFAULT_AUTO_HIDE_DELAY,
}) {
  // Tự động đóng toast sau thời gian quy định
  useEffect(() => {
    if (!show) return;
    const autoHideTimer = setTimeout(onClose, delay);
    return () => clearTimeout(autoHideTimer);
  }, [show, delay, onClose]);

  // Màu chữ phụ thuộc vào variant: warning dùng chữ đen, còn lại chữ trắng
  const textColorClass = variant === 'warning' ? 'text-dark' : 'text-white';

  return (
    <ToastContainer position="top-end" className="p-3" style={{ zIndex: TOAST_Z_INDEX }}>
      <Toast show={show} onClose={onClose} bg={variant}>
        <Toast.Header closeButton>
          <strong className="me-auto">Notification</strong>
        </Toast.Header>
        <Toast.Body className={textColorClass}>
          {message}
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default ToastMessage;
