import React from 'react';
import { Navbar as BootstrapNavbar, Container, Nav, Badge } from 'react-bootstrap';
import './Navbar.css';

function Navbar({ currentView, setCurrentView }) {
  const navItems = [
    { id: 'booking', label: 'Booking Form', icon: '✈️' },
    { id: 'login', label: 'Login', icon: '🔐' },
    { id: 'manage', label: 'Manage Users', icon: '👥' }
  ];

  const views = ['booking', 'login', 'manage'];
  const progress = ((views.indexOf(currentView) + 1) / views.length) * 100;

  return (
    <div className="navbar-wrapper">
      <BootstrapNavbar bg="dark" variant="dark" expand="lg" className="custom-navbar">
        <Container fluid>
          {/* Logo/Brand */}
          <BootstrapNavbar.Brand href="#" className="brand-section">
            <div className="brand-icon">
              <span>🚀</span>
            </div>
            <div className="brand-text">
              <h1>Admin Portal</h1>
              <p>Management System</p>
            </div>
          </BootstrapNavbar.Brand>

          {/* Navigation Buttons */}
          <Nav className="mx-auto nav-buttons">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`nav-btn ${currentView === item.id ? 'active' : ''}`}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
                {currentView === item.id && <div className="active-indicator"></div>}
              </button>
            ))}
          </Nav>

          {/* User Profile */}
          <div className="user-profile">
            <div className="user-info">
              <span className="user-name">Admin User</span>
              <span className="user-role">Super Admin</span>
            </div>
            <div className="user-avatar">
              <img src="https://i.pravatar.cc/150?img=33" alt="User" />
              <Badge bg="success" pill className="online-badge"></Badge>
            </div>
          </div>
        </Container>
      </BootstrapNavbar>

      {/* Progress Bar */}
      <div className="progress-bar-wrapper">
        <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
}

export default Navbar;
