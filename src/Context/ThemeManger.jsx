import { createContext, useContext, useState } from "react";

const ThemeContext = createContext({});
const useTheme = () => useContext(ThemeContext);

const ThemeContextProvider = ({ children }) => {
    const [theme, currentTheme] = useState(Themes.DarkTheme);

    const themeValues = {
        theme,
        currentTheme,
    };
    return (
        <ThemeContext.Provider value={themeValues}>
            {children}
        </ThemeContext.Provider>
    );
};
export{useTheme, ThemeContextProvider}

const Themes = {
    LightTheme: {
        mainColor: "white",
        altColor: "black",
    },
    DarkTheme: {
        mainColor: "black",
        altColor: "white"
    }
}