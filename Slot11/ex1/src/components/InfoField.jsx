import React from 'react';
import { useThemeColors } from '../hooks/useThemeColors';
import { FONT_SIZES, SPACING } from '../constants/theme';

const InfoField = ({ label, value, isBadge = false, badgeColor = '#3b82f6' }) => {
  const { colors } = useThemeColors();

  return (
    <div style={{ marginBottom: SPACING.lg }}>
      <p style={{ 
        fontSize: FONT_SIZES.xs, 
        color: colors.textMuted,
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        marginBottom: SPACING.xs,
        fontWeight: '600'
      }}>
        {label}
      </p>
      {isBadge ? (
        <span style={{ 
          display: 'inline-block',
          padding: `${SPACING.xs} ${SPACING.md}`,
          borderRadius: '0.375rem',
          fontSize: FONT_SIZES.sm,
          fontWeight: '600',
          backgroundColor: badgeColor,
          color: '#ffffff'
        }}>
          {value}
        </span>
      ) : (
        <p style={{ 
          fontSize: FONT_SIZES.md, 
          color: colors.text,
          fontWeight: '500',
          margin: 0,
          fontFamily: badgeColor ? 'monospace' : 'inherit'
        }}>
          {value}
        </p>
      )}
    </div>
  );
};

export default InfoField;
