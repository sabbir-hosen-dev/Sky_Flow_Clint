import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './../Components/DashbordComponents/Sidebar/Sidebar';
import Header from '../Components/DashbordComponents/Header/Header';
import "../Css/DashbordColor.css"
import useAuthContext from '../Hooks/useAuthContext';
import Loadding from '../Pages/Loadding';


function DashbordLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {loadding} = useAuthContext();
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
