/**
 * Main App Component
 * Integrate AuthProvider and Routing
 */
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthProvider from './contexts/AuthContext';
import { ProtectedRoute, AdminRoute, PublicRoute } from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import { ROUTES } from './constants/authConstants';
import './App.css';

// Page components
const HomePage = () => (
  <div className="page-container">
    <h1>Welcome to AuthApp</h1>
    <p>This is a production-ready authentication system for React applications.</p>
  </div>
);

const DashboardPage = () => (
  <div className="page-container">
    <h1>Dashboard</h1>
    <p>This is a protected page that requires authentication.</p>
  </div>
);

const ProfilePage = () => (
  <div className="page-container">
    <h1>User Profile</h1>
    <p>This is the user profile page.</p>
  </div>
);

const SettingsPage = () => (
  <div className="page-container">
    <h1>Settings</h1>
    <p>This is the settings page.</p>
  </div>
);

const UnauthorizedPage = () => (
  <div className="page-container error-page">
    <h1>❌ Unauthorized</h1>
    <p>You don't have permission to access this page.</p>
    <a href={ROUTES.HOME}>Go back to home</a>
  </div>
);

const NotFoundPage = () => (
  <div className="page-container error-page">
    <h1>404 - Page Not Found</h1>
    <p>The page you're looking for doesn't exist.</p>
    <a href={ROUTES.HOME}>Go back to home</a>
  </div>
);

/**
 * Main App Component
 */
function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app">
          <Routes>
            {/* Public Routes */}
            <Route
              path={ROUTES.LOGIN}
              element={
                <PublicRoute>
                  <LoginForm />
                </PublicRoute>
              }
            />

            {/* Protected Routes */}
            <Route
              path="*"
              element={
                <ProtectedRoute>
                  <div className="app-with-navbar">
                    <Navbar />
                    <main className="app-main">
                      <Routes>
                        <Route path={ROUTES.HOME} element={<HomePage />} />
                        <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
                        <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
                        <Route path={ROUTES.SETTINGS} element={<SettingsPage />} />
                        <Route path={ROUTES.UNAUTHORIZED} element={<UnauthorizedPage />} />
                        <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
                        <Route path="*" element={<Navigate to={ROUTES.NOT_FOUND} replace />} />
                      </Routes>
                    </main>
                  </div>
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
