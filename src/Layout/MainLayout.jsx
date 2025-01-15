import { Outlet } from 'react-router-dom';
import Navber from '../Components/Sheard/Navber/Navber';
import Footer from '../Components/Sheard/Footer/Footer';
import { useState } from 'react';
import Loadding from '../Pages/Loadding';
import useAuthContext from '../Hooks/useAuthContext';

function MainLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { loadding } = useAuthContext();

  const states = {
    menuOpen,
    setMenuOpen,
    userDropdownOpen,
    setUserDropdownOpen,
  };
  return (
    <>
      {loadding ? (
        <Loadding />
      ) : (
        <div>
          <Navber states={states} />
          <div
            onClick={() => {
              setMenuOpen(false);
              setUserDropdownOpen(false);
            }}>
            <div className="min-h-[89vh]">
              <Outlet />
            </div>
            <Footer />
          </div>
        </div>
      )}
    </>
  );
}

export default MainLayout;
