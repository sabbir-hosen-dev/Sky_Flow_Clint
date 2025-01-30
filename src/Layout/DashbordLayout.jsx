import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './../Components/DashbordComponents/Sidebar/Sidebar';
import Header from '../Components/DashbordComponents/Header/Header';
import "../Css/DashbordColor.css"
import useAuthContext from '../Hooks/useAuthContext';
import Loadding from '../Pages/Loadding';
import useRole from '../Hooks/useRole';


function DashbordLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {loadding} = useAuthContext();

  const [role, isLoading] = useRole();
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    if (isLoading) return; // Wait until the role is fetched
  
    if (location.pathname === "/dashboard") {
      if (role === "admin") {
        navigate("/dashboard/admin-profile");
      } else {
        navigate("/dashboard/profile");
      }
    }
  }, [location.pathname, navigate, role, isLoading]);
  

  {loadding && <Loadding />}
  return (
    <div className="dark:bg-boxdark-2 bg-white dark:text-bodydark">
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex h-screen overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default DashbordLayout;
