import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useTheme } from '../contexts/ThemeContext';
import { useThemeColors } from '../hooks/useThemeColors';
import { SPACING, FONT_SIZES, BRAND_COLORS, TRANSITIONS } from '../constants/theme';

const THEME_LIGHT = 'light';
const THEME_DARK = 'dark';
const LAMP_ON_COLOR = BRAND_COLORS.warning;
const LAMP_OFF_COLOR = '#adb5bd';

function LightSwitch() {
    const { theme, toggleTheme } = useTheme();
    const { colors } = useThemeColors();
    
    const isLampOn = theme === THEME_LIGHT;

    const toggleLampState = () => {
        toggleTheme();
    };
    
    const turnLampOn = () => {
        if (theme !== THEME_LIGHT) {
            toggleTheme();
        }
    };
    
    const turnLampOff = () => {
        if (theme !== THEME_DARK) {
            toggleTheme();
        }
    };

    return (
      <Card className="shadow-sm h-100" style={{ 
        backgroundColor: colors.cardBackground, 
        borderColor: colors.border, 
        transition: TRANSITIONS.standard 
      }}>
        <Card.Header 
          className="border-bottom" 
          style={{ 
            padding: `${SPACING.lg} ${SPACING.xl}`,
            display: 'flex',
            alignItems: 'center',
            gap: SPACING.sm,
            backgroundColor: colors.cardBackground,
            borderColor: colors.border,
            transition: TRANSITIONS.standard
          }}
        >
          <h5 style={{ 
            margin: 0, 
            fontWeight: '600', 
            fontSize: FONT_SIZES.md, 
            color: colors.text 
          }}>
            Công Tắc Đèn Thông Minh
          </h5>
        </Card.Header>

        <Card.Body style={{ padding: SPACING.xxl, position: 'relative' }}>
          <div style={{ marginBottom: SPACING.xxl, textAlign: 'center' }}>
            <div style={{ 
              fontSize: '6rem', 
              lineHeight: 1,
              marginBottom: SPACING.lg,
              color: isLampOn ? LAMP_ON_COLOR : LAMP_OFF_COLOR,
              transition: TRANSITIONS.standard
            }}>
              ●
            </div>
            <p style={{ 
              fontSize: FONT_SIZES.lg, 
              fontWeight: '700',
              color: isLampOn ? LAMP_ON_COLOR : colors.textMuted,
              margin: 0,
              transition: TRANSITIONS.standard
            }}>
              {isLampOn ? 'ON / SÁNG' : 'OFF / TỐI'}
            </p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: SPACING.md }}>
            <Button 
              variant="primary"
              onClick={toggleLampState}
              style={{ 
                fontWeight: '600',
                fontSize: FONT_SIZES.sm,
                padding: `${SPACING.sm} ${SPACING.lg}`
              }}
            >
              Đảo Trạng Thái
            </Button>
            <Button 
              variant="success"
              onClick={turnLampOn}
              style={{ 
                fontWeight: '600',
                fontSize: FONT_SIZES.sm,
                padding: `${SPACING.sm} ${SPACING.lg}`
              }}
            >
              Bật Đèn
            </Button>
            <Button 
              variant="danger"
              onClick={turnLampOff}
              style={{ 
                fontWeight: '600',
                fontSize: FONT_SIZES.sm,
                padding: `${SPACING.sm} ${SPACING.lg}`
              }}
            >
              Tắt Đèn
            </Button>
          </div>

          <p style={{ 
            fontSize: FONT_SIZES.sm, 
            color: colors.textMuted,
            fontStyle: 'italic',
            marginTop: SPACING.xl,
            marginBottom: 0
          }}>
            Minh họa việc sử dụng Boolean state để thay đổi tình CSS và icons theo điều kiện.
          </p>
        </Card.Body>
      </Card>
    );
}   
export default LightSwitch;
