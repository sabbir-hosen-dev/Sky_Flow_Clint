import { Outlet } from 'react-router-dom';
import Navber from '../Components/Sheard/Navber/Navber';
import Footer from '../Components/Sheard/Footer/Footer';

function MainLayout() {
  return (
    <div>
      <Navber />
      <div className="min-h-[89vh]">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}

export default MainLayout;
