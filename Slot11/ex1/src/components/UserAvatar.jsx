import React from 'react';
import { useThemeColors } from '../hooks/useThemeColors';
import { SPACING } from '../constants/theme';

const UserAvatar = ({ username, size = 40 }) => {
  const { colors } = useThemeColors();
  
  const avatarInitial = username.charAt(0).toUpperCase();

  return (
    <div style={{
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: '50%',
      backgroundColor: colors.border,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
      color: colors.text
    }}>
      {avatarInitial}
    </div>
  );
};

export default UserAvatar;
