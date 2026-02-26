//LightSwitch.jsx - Bật/tắt đèn sẽ thay đổi giao diện sáng/tối của hệ thống
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useTheme } from '../contexts/ThemeContext'; // Import custom hook useTheme

function LightSwitch() {
    // Sử dụng ThemeContext để quản lý giao diện sáng/tối
    const { theme, toggleTheme } = useTheme(); 
    
    // Đèn bật = giao diện sáng (light), Đèn tắt = giao diện tối (dark)
    const isLampOn = theme === 'light';

    const isDark = theme === 'dark';
    const cardBg = isDark ? '#1e293b' : '#ffffff';
    const textColor = isDark ? '#f8fafc' : '#212529';
    const borderColor = isDark ? '#334155' : '#dee2e6';
    const mutedColor = isDark ? '#94a3b8' : '#6c757d';

    // Action handlers - thay đổi theme khi bật/tắt đèn
    const toggle = () => {
        toggleTheme(); // Chuyển đổi giữa light và dark
    };
    
    const turnOn = () => {
        if (theme !== 'light') {
            toggleTheme(); // Bật đèn = chuyển sang light mode
        }
    };
    
    const turnOff = () => {
        if (theme !== 'dark') {
            toggleTheme(); // Tắt đèn = chuyển sang dark mode
        }
    };

    return (
      <Card className="shadow-sm h-100" style={{ backgroundColor: cardBg, borderColor, transition: 'all 0.3s ease' }}>
        {/* Card Header */}
        <Card.Header 
          className="border-bottom" 
          style={{ 
            padding: '1rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            backgroundColor: cardBg,
            borderColor,
            transition: 'all 0.3s ease'
          }}
        >
          <h5 style={{ margin: 0, fontWeight: '600', fontSize: '1rem', color: textColor }}>
            Công Tắc Đèn Thông Minh
          </h5>
        </Card.Header>

        {/* Card Body */}
        <Card.Body style={{ padding: '2rem', position: 'relative' }}>
          {/* Lamp Status Display */}
          <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
            <div style={{ 
              fontSize: '6rem', 
              lineHeight: 1,
              marginBottom: '1rem',
              color: isLampOn ? '#ffc107' : '#adb5bd',
              transition: 'all 0.3s ease'
            }}>
              ●
            </div>
            <p style={{ 
              fontSize: '1.25rem', 
              fontWeight: '700',
              color: isLampOn ? '#ffc107' : mutedColor,
              margin: 0,
              transition: 'all 0.3s ease'
            }}>
              {isLampOn ? 'ON / SÁNG' : 'OFF / TỐI'}
            </p>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            <Button 
              variant="primary"
              onClick={toggle}
              style={{ 
                fontWeight: '600',
                fontSize: '0.875rem',
                padding: '0.5rem 1rem'
              }}
            >
              Đảo Trạng Thái
            </Button>
            <Button 
              variant="success"
              onClick={turnOn}
              style={{ 
                fontWeight: '600',
                fontSize: '0.875rem',
                padding: '0.5rem 1rem'
              }}
            >
              Bật Đèn
            </Button>
            <Button 
              variant="danger"
              onClick={turnOff}
              style={{ 
                fontWeight: '600',
                fontSize: '0.875rem',
                padding: '0.5rem 1rem'
              }}
            >
              Tắt Đèn
            </Button>
          </div>

          {/* Footer Note */}
          <p style={{ 
            fontSize: '0.8rem', 
            color: mutedColor,
            fontStyle: 'italic',
            marginTop: '1.5rem',
            marginBottom: 0
          }}>
            Minh họa việc sử dụng Boolean state để thay đổi tình CSS và icons theo điều kiện.
          </p>
        </Card.Body>
      </Card>
    );
}   
export default LightSwitch;
