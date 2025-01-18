import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import logo from '../../../assets/logo.png';
import { Link, NavLink } from 'react-router-dom';
import ThemeTogole from '../../Utlites/ThemeTogole/ThemeTogole';
import useAuthContext from '../../../Hooks/useAuthContext';
import { axiosInt } from '../../../Hooks/useAxios';
import toast from 'react-hot-toast';

function Navber({ states }) {
  const { menuOpen, setMenuOpen, userDropdownOpen, setUserDropdownOpen } =
    states;
  const { user, logOut, setUser } = useAuthContext();

  const [isSticky, setIsSticky] = useState(false);

  // Handle scroll to make the navbar sticky
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  //logout function
  const handleLogOut = () => {
    logOut()
      .then(() => {
        axiosInt.post('/logout').catch(err => console.log(err));
        setUser({
          ...user,
          name: '',
          email: '',
          photo: '',
        });
        toast.success('user Log Out');
      })
      .catch(err => toast.error(err.message));
  };

  return (
    <nav
      className={`${
        isSticky
          ? 'sticky z-[99] top-0 backdrop-blur-lg bg-backgroundB/30 shadow-md shadow-black/20 dark:shadow-gray-500/20'
          : ''
      } border-gray-200`}>
      <div className="wrap flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} className="h-8" alt="Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap ">
            SkyFlow
          </span>
        </Link>
        <div className="flex justify-center items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {!user.email && <ThemeTogole />}
          {/* User Dropdown */}
          {user.email ? (
            <div className="relative">
              <button
                type="button"
                className="flex text-sm  bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}>
                <span className="sr-only">Open user menu</span>

                {user?.photo ? (
                  <img
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content={user?.name}
                    className="w-10 rounded-full"
                    src={user.photo}
                    alt="User"
                  />
                ) : (
                  <div className="w-10 h-10 z-50 flex justify-center items-center bg-pin rounded-full">
                    <h1 className="font-bold text-white text-2xl">
                      {user?.name?.charAt(0).toUpperCase()}
                    </h1>
                  </div>
                )}
              </button>
              {userDropdownOpen && (
                <div className="z-50  my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 absolute top-12 right-4">
                  <div className="px-4 py-3">
                    <span className="block text-sm text-gray-900 dark:text-white">
                      {user.name}
                    </span>
                    <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                      {user.email}
                    </span>
                  </div>
                  <ul className="py-2">
                    <li className="ml-2">
                      <div onClick={() => setUserDropdownOpen(false)}>
                        <ThemeTogole />
                      </div>
                    </li>
                    <li>
                      <Link
                        onClick={() => setUserDropdownOpen(false)}
                        to="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                        Dashboard
                      </Link>
                    </li>

                    <li>
                      <div
                        onClick={() => {
                          handleLogOut(), setUserDropdownOpen(false);
                        }}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer dark:text-gray-200 dark:hover:text-white">
                        Sign out
                      </div>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/signin"
              className="pt-2 pb-2 flex justify-center items-center  px-5 bg-primaryP rounded-md font-bold shadow-sm  text-white mx-auto transition-all  duration-500 hover:bg-primaryP/80 ">
              Login
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-textT rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            onClick={() => setMenuOpen(!menuOpen)}>
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        {/* Navbar Links */}
        <div
          className={`${
            menuOpen ? 'block' : 'hidden'
          } items-center justify-between w-full md:flex md:w-auto md:order-1`}
          id="navbar-user">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  ">
            <NavLink
              onClick={() => setMenuOpen(false)}
              to="/"
              className="links">
              Home
            </NavLink>
            <NavLink
              onClick={() => setMenuOpen(false)}
              to="apartments"
              className="links">
              Apartment
            </NavLink>
          </ul>
        </div>
      </div>
    </nav>
  );
}
Navber.propTypes = {
  states: PropTypes.shape({
    menuOpen: PropTypes.bool.isRequired,
    setMenuOpen: PropTypes.func.isRequired,
    userDropdownOpen: PropTypes.bool.isRequired,
    setUserDropdownOpen: PropTypes.func.isRequired,
  }).isRequired,
};

export default Navber;
