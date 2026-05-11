import React from 'react';
import '../styles/Dashboard.css';

const Dashboard = ({ user, onLogout }) => {
  return (
    <div className="dashboard">
      <nav className="navbar">
        <h1>Dashboard</h1>
        <div className="navbar-right">
          <span className="user-info">Welcome, {user.username}</span>
          <button onClick={onLogout} className="logout-button">
            Logout
          </button>
        </div>
      </nav>
      <main className="dashboard-content">
        {/* Blank dashboard content */}
      </main>
    </div>
  );
};

export default Dashboard;
