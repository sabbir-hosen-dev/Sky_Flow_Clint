import { createContext } from "react";
import PropTypes from 'prop-types';

const ThemeContext = createContext();

const ThemeProvider = ({children}) => {

  const data = {

  }

  return <ThemeContext.Provider data={data}>{children}</ThemeContext.Provider>
}
ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ThemeProvider;
