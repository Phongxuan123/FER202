/**
 * Trang chi tiết tài khoản - hiển thị đầy đủ thông tin một tài khoản.
 * Bao gồm: avatar, username, email, vai trò, trạng thái.
 * Có nút "Back to list" để quay về danh sách.
 */
import React, { useState, useEffect } from 'react';
import { Container, Card, Row, Col, Button, Badge } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { getAccountById } from '../services/accountService';

// Kích thước avatar lớn trên trang chi tiết (px)
const DETAIL_AVATAR_SIZE = 120;

// Ảnh thay thế khi avatar không tải được
const FALLBACK_AVATAR_URL = `https://via.placeholder.com/${DETAIL_AVATAR_SIZE}`;

// Chiều rộng tối đa của card chi tiết
const CARD_MAX_WIDTH = '700px';

function AccountDetail() {
  // Lấy ID tài khoản từ URL (ví dụ: /accounts/2 → id = "2")
  const { id: accountId } = useParams();
  const navigate = useNavigate();

  const [account, setAccount] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Gọi API lấy thông tin tài khoản khi component được mount
  useEffect(() => {
    getAccountById(accountId)
      .then((data) => setAccount(data))
      .catch(() => setErrorMessage('Account not found.'));
  }, [accountId]);

  /** Quay về trang danh sách tài khoản */
  const handleBackToList = () => navigate('/accounts');

  // Trường hợp lỗi: không tìm thấy tài khoản
  if (errorMessage) {
    return (
      <Container className="mt-5 text-center">
        <p className="text-danger">{errorMessage}</p>
        <Button variant="secondary" onClick={handleBackToList}>
          Back to list
        </Button>
      </Container>
    );
  }

  // Trường hợp đang tải dữ liệu
  if (!account) {
    return (
      <Container className="mt-5 text-center">
        <p>Loading...</p>
      </Container>
    );
  }

  // Màu badge phụ thuộc vào trạng thái: xanh = active, đỏ = locked
  const statusBadgeColor = account.status === 'active' ? 'success' : 'danger';

  return (
    <Container className="mt-4" style={{ maxWidth: CARD_MAX_WIDTH }}>
      <Card>
        <Card.Header>
          <strong>Account Details</strong>
        </Card.Header>

        <Card.Body className="p-4">
          <Row className="align-items-center">
            {/* Ảnh đại diện */}
            <Col xs={12} md={4} className="text-center mb-4 mb-md-0">
              <img
                src={account.avatar}
                alt={account.username}
                style={{
                  width: `${DETAIL_AVATAR_SIZE}px`,
                  height: `${DETAIL_AVATAR_SIZE}px`,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '3px solid #dee2e6',
                }}
                onError={(e) => {
                  e.target.src = FALLBACK_AVATAR_URL;
                }}
              />
            </Col>

            {/* Thông tin chi tiết */}
            <Col xs={12} md={8}>
              <div className="mb-3">
                <div className="text-muted small">Username</div>
                <div className="fw-semibold fs-6">{account.username}</div>
              </div>
              <div className="mb-3">
                <div className="text-muted small">Email</div>
                <div className="fw-semibold fs-6">{account.email}</div>
              </div>
              <div className="mb-3">
                <div className="text-muted small">Role</div>
                <div className="fw-semibold fs-6 text-capitalize">{account.role}</div>
              </div>
              <div className="mb-3">
                <div className="text-muted small">Status</div>
                <Badge bg={statusBadgeColor} className="text-capitalize">
                  {account.status}
                </Badge>
              </div>
            </Col>
          </Row>
        </Card.Body>

        {/* Nút quay về danh sách */}
        <Card.Footer>
          <Button variant="secondary" size="sm" onClick={handleBackToList}>
            Back to list
          </Button>
        </Card.Footer>
      </Card>
    </Container>
  );
}

export default AccountDetail;
