/**
 * Footer - Thanh thông tin ở cuối trang.
 * Hiển thị bản quyền và thông tin về công nghệ sử dụng.
 */
import React from 'react';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2025 PersonalBudget Demo</p>
        <p>Built with React, Redux Toolkit &amp; JSON Server</p>
      </div>
    </footer>
  );
}

export default Footer;
