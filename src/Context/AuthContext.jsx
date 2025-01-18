import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import auth from "../Firebase/firebase.config";
import { axiosInt } from "../Hooks/useAxios";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

const AuthContextProvider = ({children}) => {

  const [user, setUser] = useState({
    name: 'name',
    email: 'a@gmail.com',
    photo: 'p',
  });

  const [loadding, setLoadding] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      if (currentUser) {
        const newUser = {
          name: currentUser.displayName,
          email: currentUser.email,
          photo: currentUser.photoURL,
        };

        if (currentUser?.email) {
          setLoadding(true);
          axiosInt
            .post('/jwt', newUser)
            .then(() => {

              setUser(newUser);
              setLoadding(false);
              
            })
            .catch(err => {
              console.error(err.message);
              setLoadding(false);
            });
        }
      } else {
        // Reset user state when no user is authenticated
        setUser({
          name: '',
          email: '',
          photo: '',
        });
        setLoadding(false);
      }
    });

    // Cleanup function to unsubscribe when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []); // Empty dependency array to run only once on component mount


  const googleProvider = new GoogleAuthProvider();

  const googleSignIn = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    return signOut(auth);
  };
  const value = {
    user,
    loadding,
    setUser,
    googleSignIn,
    createUser,
    loginUser,
    logOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>


}
AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContextProvider;
