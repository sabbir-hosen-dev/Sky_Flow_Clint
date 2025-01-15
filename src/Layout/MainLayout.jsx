import { Outlet } from 'react-router-dom';
import Navber from '../Components/Sheard/Navber/Navber';
import Footer from '../Components/Sheard/Footer/Footer';
import { useState } from 'react';

function MainLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const states = {
    menuOpen,
    setMenuOpen,
    userDropdownOpen,
    setUserDropdownOpen,
  };
  return (
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
  );
}

export default MainLayout;
