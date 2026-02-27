import { useTheme } from '../contexts/ThemeContext';
import { THEME_COLORS } from '../constants/theme';

export const useThemeColors = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  
  return {
    isDarkMode,
    colors: THEME_COLORS[theme]
  };
};
