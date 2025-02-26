import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';


export const ThemeContext = createContext();

const ThemeProvider = ({children}) => {


  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme === "true" || storedTheme === null; 
  });

  // const [openMenu, setMenu] = useState(false);

  useEffect(() => {
    document.body.classList.remove("dark", "light");
    document.body.classList.add(theme ? "dark" : "light");
    localStorage.setItem("theme", theme.toString()); 
  }, [theme]);


  const value = {
    theme,
    setTheme,
    //sss
    // openMenu,
    //  setMenu
  };


  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ThemeProvider;
