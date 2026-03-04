/**
 * Trang danh sách tài khoản - hiển thị bảng tất cả tài khoản trong hệ thống.
 * Chức năng: lọc, sắp xếp, tìm kiếm, khoá/mở khoá tài khoản, xem chi tiết.
 */
import React, { useState, useEffect } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import FilterBar from '../components/FilterBar';
import ConfirmModal from '../components/ConfirmModal';
import ToastMessage from '../components/ToastMessage';
import { useAuth } from '../contexts/AuthContext';
import { getAllAccounts, updateAccountStatus } from '../services/accountService';

// Hằng số trạng thái tài khoản - tránh gõ sai chuỗi (no magic strings)
const STATUS_LOCKED = 'locked';
const STATUS_ACTIVE = 'active';

// Hằng số vai trò
const ROLE_ADMIN = 'admin';
const ROLE_USER = 'user';

// Giá trị mặc định cho bộ lọc
const FILTER_ALL = 'All';

// Kích thước avatar trong bảng (px)
const AVATAR_SIZE = 40;

// Ảnh thay thế khi avatar không tải được
const FALLBACK_AVATAR_URL = 'https://via.placeholder.com/40';

// Số cột trong bảng (dùng cho colSpan khi không có dữ liệu)
const TABLE_COLUMN_COUNT = 6;

/**
 * Hàm sắp xếp mảng tài khoản theo tiêu chí đã chọn.
 * Tách riêng để giữ hàm chính ngắn gọn (Keep Functions Small).
 */
const applySorting = (accountList, sortField) => {
  const sorted = [...accountList];

  const sortStrategies = {
    username_asc: (a, b) => a.username.localeCompare(b.username),
    username_desc: (a, b) => b.username.localeCompare(a.username),
    role_admin: (a, b) => (a.role === ROLE_ADMIN ? -1 : 1),
    role_user: (a, b) => (a.role === ROLE_USER ? -1 : 1),
    status_active: (a, b) => (a.status === STATUS_ACTIVE ? -1 : 1),
    status_locked: (a, b) => (a.status === STATUS_LOCKED ? -1 : 1),
  };

  const compareFunction = sortStrategies[sortField];
  if (compareFunction) {
    sorted.sort(compareFunction);
  }

  return sorted;
};

function AccountList() {
  const navigate = useNavigate();
  const { loggedInUser } = useAuth();

  // Danh sách tài khoản gốc từ API
  const [accounts, setAccounts] = useState([]);

  // Giá trị tìm kiếm và bộ lọc
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filterRole, setFilterRole] = useState(FILTER_ALL);
  const [filterStatus, setFilterStatus] = useState(FILTER_ALL);
  const [sortField, setSortField] = useState('');

  // Trạng thái modal xác nhận khoá/mở khoá
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [pendingAccount, setPendingAccount] = useState(null);

  // Trạng thái toast thông báo
  const [toastConfig, setToastConfig] = useState({
    show: false,
    message: '',
    variant: 'success',
  });

  // Gọi API lấy danh sách tài khoản khi component được mount
  useEffect(() => {
    loadAccounts();
  }, []);

  /** Lấy danh sách tài khoản từ server */
  const loadAccounts = async () => {
    try {
      const data = await getAllAccounts();
      setAccounts(data);
    } catch (error) {
      console.error('Không thể tải danh sách tài khoản:', error);
    }
  };

  /** Hiển thị toast thông báo - hàm tiện ích dùng chung (DRY) */
  const showToast = (message, variant = 'success') => {
    setToastConfig({ show: true, message, variant });
  };

  /** Ẩn toast */
  const hideToast = () => {
    setToastConfig((prev) => ({ ...prev, show: false }));
  };

  // =====================================================
  // XỬ LÝ KHOÁ / MỞ KHOÁ TÀI KHOẢN
  // =====================================================

  /** Khi bấm nút Lock/Unlock: kiểm tra tự khoá → mở modal xác nhận */
  const handleToggleLock = (account) => {
    // Không cho phép admin tự khoá chính mình
    const isSelfLocking = loggedInUser && account.id === loggedInUser.id;
    if (isSelfLocking) {
      showToast('Cannot self-lock the currently logged-user admin.', 'warning');
      return;
    }

    // Lưu tài khoản đang chờ xác nhận và hiện modal
    setPendingAccount(account);
    setIsConfirmModalVisible(true);
  };

  /** Khi bấm Confirm trên modal: gọi API cập nhật trạng thái */
  const handleConfirmToggle = async () => {
    setIsConfirmModalVisible(false);
    if (!pendingAccount) return;

    const newStatus = pendingAccount.status === STATUS_LOCKED ? STATUS_ACTIVE : STATUS_LOCKED;

    try {
      await updateAccountStatus(pendingAccount.id, newStatus);

      // Cập nhật trạng thái ngay trên giao diện (không cần reload trang)
      setAccounts((previousAccounts) =>
        previousAccounts.map((account) =>
          account.id === pendingAccount.id ? { ...account, status: newStatus } : account
        )
      );

      // Hiện thông báo thành công
      const successMessage = newStatus === STATUS_LOCKED ? 'Locked successfully' : 'Unlocked successfully';
      showToast(successMessage);
    } catch (error) {
      console.error('Không thể cập nhật trạng thái:', error);
    }

    setPendingAccount(null);
  };

  /** Khi bấm Cancel trên modal: đóng modal, không làm gì */
  const handleCancelToggle = () => {
    setIsConfirmModalVisible(false);
    setPendingAccount(null);
  };

  // =====================================================
  // LỌC VÀ SẮP XẾP DANH SÁCH
  // =====================================================

  /** Chuyển sang trang chi tiết tài khoản */
  const handleViewDetails = (account) => {
    navigate(`/accounts/${account.id}`);
  };

  /**
   * Lọc và sắp xếp danh sách tài khoản theo tiêu chí hiện tại.
   * Mỗi bước lọc tách riêng cho rõ ràng (Clear Conditions).
   */
  const getFilteredAndSortedAccounts = () => {
    let result = [...accounts];

    // Bước 1: Lọc theo từ khoá tìm kiếm
    if (searchKeyword.trim()) {
      const lowerKeyword = searchKeyword.toLowerCase();
      result = result.filter(
        (account) =>
          account.username.toLowerCase().includes(lowerKeyword) ||
          account.email.toLowerCase().includes(lowerKeyword)
      );
    }

    // Bước 2: Lọc theo vai trò
    if (filterRole !== FILTER_ALL) {
      result = result.filter((account) => account.role === filterRole.toLowerCase());
    }

    // Bước 3: Lọc theo trạng thái
    if (filterStatus !== FILTER_ALL) {
      result = result.filter((account) => account.status === filterStatus.toLowerCase());
    }

    // Bước 4: Sắp xếp
    result = applySorting(result, sortField);

    return result;
  };

  /**
   * Tạo nội dung câu hỏi xác nhận cho modal Lock/Unlock.
   */
  const getConfirmMessage = () => {
    if (!pendingAccount) return '';
    const isCurrentlyLocked = pendingAccount.status === STATUS_LOCKED;
    return isCurrentlyLocked
      ? `Unlock account ${pendingAccount.username}?`
      : `Lock account ${pendingAccount.username}? The user cannot log in after this`;
  };

  const filteredAccounts = getFilteredAndSortedAccounts();

  // =====================================================
  // GIAO DIỆN
  // =====================================================

  return (
    <Container className="mt-4">
      {/* Thanh công cụ lọc và sắp xếp */}
      <FilterBar
        search={searchKeyword}
        onSearchChange={setSearchKeyword}
        filterRole={filterRole}
        onRoleChange={setFilterRole}
        filterStatus={filterStatus}
        onStatusChange={setFilterStatus}
        sortField={sortField}
        onSortChange={setSortField}
      />

      {/* Bảng hiển thị danh sách tài khoản */}
      <Table responsive bordered hover>
        <thead className="table-light">
          <tr>
            <th>Avatar</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAccounts.length === 0 ? (
            <tr>
              <td colSpan={TABLE_COLUMN_COUNT} className="text-center text-muted">
                No accounts found.
              </td>
            </tr>
          ) : (
            filteredAccounts.map((account) => (
              <tr key={account.id}>
                {/* Ảnh đại diện */}
                <td>
                  <img
                    src={account.avatar}
                    alt={account.username}
                    width={AVATAR_SIZE}
                    height={AVATAR_SIZE}
                    style={{ borderRadius: '50%', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.src = FALLBACK_AVATAR_URL;
                    }}
                  />
                </td>
                <td>{account.username}</td>
                <td>{account.email}</td>
                <td>{account.role}</td>
                <td>{account.status}</td>

                {/* Cặp nút hành động: Xem chi tiết + Khoá/Mở khoá */}
                <td>
                  <Button
                    variant="primary"
                    size="sm"
                    className="me-2"
                    onClick={() => handleViewDetails(account)}
                  >
                    View Details
                  </Button>
                  {account.status === STATUS_LOCKED ? (
                    <Button variant="success" size="sm" onClick={() => handleToggleLock(account)}>
                      Unlock
                    </Button>
                  ) : (
                    <Button variant="danger" size="sm" onClick={() => handleToggleLock(account)}>
                      Lock
                    </Button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {/* Modal xác nhận khoá/mở khoá */}
      <ConfirmModal
        show={isConfirmModalVisible}
        message={getConfirmMessage()}
        onConfirm={handleConfirmToggle}
        onCancel={handleCancelToggle}
      />

      {/* Toast thông báo kết quả */}
      <ToastMessage
        show={toastConfig.show}
        message={toastConfig.message}
        variant={toastConfig.variant}
        onClose={hideToast}
      />
    </Container>
  );
}

export default AccountList;
