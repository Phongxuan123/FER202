import React, { useReducer } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useThemeColors } from '../hooks/useThemeColors';
import { SPACING, FONT_SIZES, TRANSITIONS } from '../constants/theme';

const COUNTER_ACTIONS = {
  INCREMENT: 'increment',
  DECREMENT: 'decrement',
  RESET: 'reset'
};

const INITIAL_COUNT = 0;
const initialCounterState = { count: INITIAL_COUNT };

const counterReducer = (state, action) => {
  switch (action.type) {
    case COUNTER_ACTIONS.INCREMENT:
      return { count: state.count + 1 };
    case COUNTER_ACTIONS.DECREMENT:
      return { count: state.count - 1 };
    case COUNTER_ACTIONS.RESET:
      return initialCounterState;
    default:
      return state;
  }
};

function CounterComponent() {
  const [state, dispatch] = useReducer(counterReducer, initialCounterState);
  const { colors } = useThemeColors();

  const incrementCount = () => dispatch({ type: COUNTER_ACTIONS.INCREMENT });
  const decrementCount = () => dispatch({ type: COUNTER_ACTIONS.DECREMENT });
  const resetCount = () => dispatch({ type: COUNTER_ACTIONS.RESET });

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
          Bộ Đếm Đa Năng
        </h5>
      </Card.Header>

      <Card.Body style={{ padding: SPACING.xxl }}>
        <div style={{ marginBottom: SPACING.xxl }}>
          <p style={{ 
            fontSize: FONT_SIZES.xs, 
            color: colors.textMuted, 
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            fontWeight: '600',
            marginBottom: SPACING.sm
          }}>
            Current Value:
          </p>
          <div style={{ 
            fontSize: FONT_SIZES.xxl, 
            fontWeight: '900',
            color: colors.text,
            lineHeight: 1,
            fontFamily: 'monospace'
          }}>
            {state.count}
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: SPACING.md }}>
          <Button 
            variant="primary"
            onClick={incrementCount}
            style={{ 
              fontWeight: '600',
              fontSize: FONT_SIZES.sm,
              padding: `${SPACING.sm} ${SPACING.lg}`
            }}
          >
            Tăng Dần
          </Button>
          <Button 
            variant="warning"
            onClick={decrementCount}
            style={{ 
              fontWeight: '600',
              fontSize: FONT_SIZES.sm,
              padding: `${SPACING.sm} ${SPACING.lg}`
            }}
          >
            Giảm Dần
          </Button>
          <Button 
            variant="danger"
            onClick={resetCount}
            style={{ 
              fontWeight: '600',
              fontSize: FONT_SIZES.sm,
              padding: `${SPACING.sm} ${SPACING.lg}`
            }}
          >
            Đặt Lại Trạng Thái
          </Button>
        </div>

        <p style={{ 
          fontSize: FONT_SIZES.sm, 
          color: colors.textMuted,
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
