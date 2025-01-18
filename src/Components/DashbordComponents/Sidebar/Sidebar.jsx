import { BiMessageEdit } from "react-icons/bi"; 
import { BsArrowLeft } from 'react-icons/bs';
import { RiCoupon2Line } from 'react-icons/ri';
import { AiOutlinePullRequest } from 'react-icons/ai';
import { MdOutlineManageAccounts } from 'react-icons/md';
import { HiOutlineAnnotation } from 'react-icons/hi';
import { MdPayments } from 'react-icons/md';
import { AiOutlineUser } from 'react-icons/ai';
import { MdPayment } from 'react-icons/md';
/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import logo from '../../../assets/logo.png';
import useRole from '../../../Hooks/useRole';
import Loadding from '../../../Pages/Loadding';
import useHandleLogOut from "../../../Hooks/useLogout";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  // eslint-disable-next-line no-unused-vars
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  const handleLogout = useHandleLogOut();

  const [role, isLoading] = useRole();

  {
    isLoading && <Loadding />;
  }




  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} className="h-8" alt="Logo" />
          <span className="self-center text-white text-2xl font-semibold whitespace-nowrap ">
            SkyFlow
          </span>
        </Link>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden">
          <BsArrowLeft className="text-white text-2xl" />
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar h-full flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 flex flex-col justify-between h-full py-4 px-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              MENU
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Calendar --> */}

              {/* admin profile */}
              {role === 'admin' && (
                <li>
                  <NavLink
                    to="admin-profile"
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                      pathname.includes('profile') &&
                      'bg-graydark dark:bg-meta-4'
                    }`}>
                    <AiOutlineUser className="text-2xl" />
                    Admin Profile
                  </NavLink>
                </li>
              )}

              {/* my profile */}
              {role !== 'admin' && (
                <li>
                  <NavLink
                    to="profile"
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                      pathname.includes('profile') &&
                      'bg-graydark dark:bg-meta-4'
                    }`}>
                    <AiOutlineUser className="text-2xl" />
                    Profile
                  </NavLink>
                </li>
              )}

              {/* manage member */}
              {role === 'admin' && (
                <li>
                  <NavLink
                    to="manage-members"
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                      pathname.includes('profile') &&
                      'bg-graydark dark:bg-meta-4'
                    }`}>
                    <MdOutlineManageAccounts className="text-2xl" />
                    Manage Members
                  </NavLink>
                </li>
              )}

              {/* aggrement requests */}
              {role === 'admin' && (
                <li>
                  <NavLink
                    to="aggrement-requests"
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                      pathname.includes('profile') &&
                      'bg-graydark dark:bg-meta-4'
                    }`}>
                    <AiOutlinePullRequest className="text-2xl" />
                    Agreement Requests
                  </NavLink>
                </li>
              )}

              {/* manage Coupons */}
              {role === 'admin' && (
                <li>
                  <NavLink
                    to="make-announcement"
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                      pathname.includes('profile') &&
                      'bg-graydark dark:bg-meta-4'
                    }`}>
                      <BiMessageEdit className="text-2xl" />
                    
                    Make Announcement
                  </NavLink>
                </li>
              )}
              
              {/* manage Coupons */}
              {role === 'admin' && (
                <li>
                  <NavLink
                    to="manage-coupons"
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                      pathname.includes('profile') &&
                      'bg-graydark dark:bg-meta-4'
                    }`}>
                    <RiCoupon2Line className="text-2xl" />
                    Manage Coupons
                  </NavLink>
                </li>
              )}

              {/* Make Payment  */}
              {role === 'member' && (
                <NavLink
                  to="payment"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('calendar') &&
                    'bg-graydark dark:bg-meta-4'
                  }`}>
                  <MdPayment className="text-2xl" />
                  Make Payment
                </NavLink>
              )}

              {/* <!-- Payment history --> */}
              {role === 'member' && (
                <li>
                  <NavLink
                    to="payment-history"
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                      pathname.includes('tables') &&
                      'bg-graydark dark:bg-meta-4'
                    }`}>
                    <MdPayments className="text-2xl" />
                    Paymetn History
                  </NavLink>
                </li>
              )}

              {/* // anous ment  */}

              {role !== 'admin' && (
                <li>
                  <NavLink
                    to="announcements"
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                      pathname.includes('settings') &&
                      'bg-graydark dark:bg-meta-4'
                    }`}>
                    <HiOutlineAnnotation className="text-2xl" />
                    Announcements
                  </NavLink>
                </li>
              )}
            </ul>
          </div>

          <button
          onClick={() => handleLogout()}
            className={`group  relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
              (pathname === '/auth' || pathname.includes('auth')) &&
              'bg-graydark dark:bg-meta-4'
            }`}>
            <svg
              className="fill-current"
              width="18"
              height="19"
              viewBox="0 0 18 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_130_9814)">
                <path
                  d="M12.7127 0.55835H9.53457C8.80332 0.55835 8.18457 1.1771 8.18457 1.90835V3.84897C8.18457 4.18647 8.46582 4.46772 8.80332 4.46772C9.14082 4.46772 9.45019 4.18647 9.45019 3.84897V1.88022C9.45019 1.82397 9.47832 1.79585 9.53457 1.79585H12.7127C13.3877 1.79585 13.9221 2.33022 13.9221 3.00522V15.0709C13.9221 15.7459 13.3877 16.2802 12.7127 16.2802H9.53457C9.47832 16.2802 9.45019 16.2521 9.45019 16.1959V14.2552C9.45019 13.9177 9.16894 13.6365 8.80332 13.6365C8.43769 13.6365 8.18457 13.9177 8.18457 14.2552V16.1959C8.18457 16.9271 8.80332 17.5459 9.53457 17.5459H12.7127C14.0908 17.5459 15.1877 16.4209 15.1877 15.0709V3.03335C15.1877 1.65522 14.0627 0.55835 12.7127 0.55835Z"
                  fill=""
                />
                <path
                  d="M10.4346 8.60205L7.62207 5.7333C7.36895 5.48018 6.97519 5.48018 6.72207 5.7333C6.46895 5.98643 6.46895 6.38018 6.72207 6.6333L8.46582 8.40518H3.45957C3.12207 8.40518 2.84082 8.68643 2.84082 9.02393C2.84082 9.36143 3.12207 9.64268 3.45957 9.64268H8.49395L6.72207 11.4427C6.46895 11.6958 6.46895 12.0896 6.72207 12.3427C6.83457 12.4552 7.00332 12.5114 7.17207 12.5114C7.34082 12.5114 7.50957 12.4552 7.62207 12.3145L10.4346 9.4458C10.6877 9.24893 10.6877 8.85518 10.4346 8.60205Z"
                  fill=""
                />
              </g>
              <defs>
                <clipPath id="clip0_130_9814">
                  <rect
                    width="18"
                    height="18"
                    fill="white"
                    transform="translate(0 0.052124)"
                  />
                </clipPath>
              </defs>
            </svg>
            Log Out
          </button>
        </nav>

        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
