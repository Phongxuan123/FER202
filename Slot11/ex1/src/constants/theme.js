// Theme color constants to avoid magic numbers throughout the application

export const THEME_COLORS = {
  light: {
    background: '#f8f9fa',
    cardBackground: '#ffffff',
    text: '#212529',
    textMuted: '#6c757d',
    border: '#dee2e6',
    navbarBackground: '#ffffff'
  },
  dark: {
    background: '#0f172a',
    cardBackground: '#1e293b',
    text: '#f8fafc',
    textMuted: '#94a3b8',
    border: '#334155',
    navbarBackground: '#1e293b'
  }
};

export const BRAND_COLORS = {
  primary: '#0d6efd',
  success: '#10b981',
  danger: '#ef4444',
  warning: '#ffc107',
  secondary: '#6b7280'
};

export const SPACING = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '0.75rem',
  lg: '1rem',
  xl: '1.5rem',
  xxl: '2rem'
};

export const FONT_SIZES = {
  xs: '0.75rem',
  sm: '0.875rem',
  md: '1rem',
  lg: '1.25rem',
  xl: '2rem',
  xxl: '4rem'
};

export const TRANSITIONS = {
  standard: 'all 0.3s ease'
};

export const VALIDATION_RULES = {
  minUsernameLength: 3,
  minPasswordLength: 6
};

export const USER_ROLES = {
  admin: 'admin',
  user: 'user'
};

export const ACCOUNT_STATUS = {
  active: 'active',
  locked: 'locked'
};
