import React, { createContext, useState, useContext } from "react";

const THEME_LIGHT = "light";
const THEME_DARK = "dark";

export const ThemeContext = createContext({
    theme: THEME_LIGHT,
    toggleTheme: () => {}
});

export const ThemeProvider = ({ children }) => {
    const [currentTheme, setCurrentTheme] = useState(THEME_LIGHT);

    const toggleTheme = () => {
        setCurrentTheme((previousTheme) => 
            previousTheme === THEME_LIGHT ? THEME_DARK : THEME_LIGHT
        );
    };

    const themeContextValue = {
        theme: currentTheme,
        toggleTheme
    };

    return (
        <ThemeContext.Provider value={themeContextValue}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const themeContext = useContext(ThemeContext);
    
    if (!themeContext) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    
    return themeContext;
};  

