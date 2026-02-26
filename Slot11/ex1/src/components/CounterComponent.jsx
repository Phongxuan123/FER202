//CounterComponent.jsx is a functional component that uses the useReducer hook to manage a counter state.
import React, { useReducer } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useTheme } from '../contexts/ThemeContext';

// 1. Khởi tạo trạng thái ban đầu
const initialState = { count: 0 };
// 2. Định nghĩa hàm reducer
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return initialState;
    default:
      return state;
  }
}

function CounterComponent() {
  // 3. Sử dụng useReducer để quản lý trạng thái
  const [state, dispatch] = useReducer(reducer, initialState);
  const { theme } = useTheme();

  const isDark = theme === 'dark';
  const cardBg = isDark ? '#1e293b' : '#ffffff';
  const textColor = isDark ? '#f8fafc' : '#212529';
  const borderColor = isDark ? '#334155' : '#dee2e6';
  const mutedColor = isDark ? '#94a3b8' : '#6c757d';

  //action handlers
  const increment = () => dispatch({ type: 'increment' });
  const decrement = () => dispatch({ type: 'decrement' });
  const reset = () => dispatch({ type: 'reset' });

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
          Bộ Đếm Đa Năng
        </h5>
      </Card.Header>

      {/* Card Body */}
      <Card.Body style={{ padding: '2rem' }}>
        {/* Current Value Display */}
        <div style={{ marginBottom: '2rem' }}>
          <p style={{ 
            fontSize: '0.75rem', 
            color: mutedColor, 
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            fontWeight: '600',
            marginBottom: '0.5rem'
          }}>
            Current Value:
          </p>
          <div style={{ 
            fontSize: '4rem', 
            fontWeight: '900',
            color: textColor,
            lineHeight: 1,
            fontFamily: 'monospace'
          }}>
            {state.count}
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          <Button 
            variant="primary"
            onClick={increment}
            style={{ 
              fontWeight: '600',
              fontSize: '0.875rem',
              padding: '0.5rem 1rem'
            }}
          >
            Tăng Dần
          </Button>
          <Button 
            variant="warning"
            onClick={decrement}
            style={{ 
              fontWeight: '600',
              fontSize: '0.875rem',
              padding: '0.5rem 1rem'
            }}
          >
            Giảm Dần
          </Button>
          <Button 
            variant="danger"
            onClick={reset}
            style={{ 
              fontWeight: '600',
              fontSize: '0.875rem',
              padding: '0.5rem 1rem'
            }}
          >
            Đặt Lại Trạng Thái
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
          Thành phần này minh họa việc sử dụng useState để cập nhật giá trị số theo các thao tác cụ thể.
        </p>
      </Card.Body>
    </Card>
  );
}
export default CounterComponent;
