import { createContext } from "react";
import PropTypes from 'prop-types';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

const AuthContextProvider = ({children}) => {

  const data = {

  }

  return <AuthContext.Provider data={data}>{children}</AuthContext.Provider>


}
AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContextProvider;
