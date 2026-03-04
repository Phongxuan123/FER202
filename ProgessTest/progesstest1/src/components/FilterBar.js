/**
 * Thanh công cụ lọc và sắp xếp danh sách tài khoản.
 * Bao gồm: ô tìm kiếm, bộ lọc vai trò, bộ lọc trạng thái, và tuỳ chọn sắp xếp.
 * Nhận dữ liệu và hàm callback từ component cha (AccountList).
 */
import React from 'react';
import { Row, Col, Form, InputGroup } from 'react-bootstrap';

/** Các tuỳ chọn sắp xếp được định nghĩa sẵn để dễ mở rộng và bảo trì */
const SORT_OPTIONS = [
  { value: '', label: 'Sort' },
  { value: 'username_asc', label: 'Username (A → Z)' },
  { value: 'username_desc', label: 'Username (Z → A)' },
  { value: 'role_admin', label: 'Role (Admin first)' },
  { value: 'role_user', label: 'Role (User first)' },
  { value: 'status_active', label: 'Status (Active first)' },
  { value: 'status_locked', label: 'Status (Locked first)' },
];

function FilterBar({
  search,
  onSearchChange,
  filterRole,
  onRoleChange,
  filterStatus,
  onStatusChange,
  sortField,
  onSortChange,
}) {
  return (
    <Row className="mb-3 align-items-center g-2">
      {/* Ô tìm kiếm theo tên hoặc email */}
      <Col xs={12} md={4}>
        <InputGroup>
          <Form.Control
            placeholder="Search by username or email"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </InputGroup>
      </Col>

      {/* Lọc theo vai trò */}
      <Col xs="auto">
        <Form.Select value={filterRole} onChange={(e) => onRoleChange(e.target.value)}>
          <option value="All">All</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </Form.Select>
      </Col>

      {/* Lọc theo trạng thái */}
      <Col xs="auto">
        <Form.Select value={filterStatus} onChange={(e) => onStatusChange(e.target.value)}>
          <option value="All">All</option>
          <option value="active">Active</option>
          <option value="locked">Locked</option>
        </Form.Select>
      </Col>

      {/* Tuỳ chọn sắp xếp - render từ mảng SORT_OPTIONS để dễ thêm/sửa */}
      <Col xs="auto">
        <Form.Select value={sortField} onChange={(e) => onSortChange(e.target.value)}>
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Form.Select>
      </Col>
    </Row>
  );
}

export default FilterBar;
