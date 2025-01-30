import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../Layout/MainLayout';
import ErrorPages from '../Pages/ErrorPages';
import Home from '../Pages/Home/Home';
import SignIn from '../Pages/Auth/SignIn/SignIn';
import SignUp from '../Pages/Auth/SignUp/SignUp';
import Apartment from '../Pages/Apartment/Apartment';
import AllApartments from '../Pages/Apartment/AllApartment/AllApartments';
import PrivetRoute from './PrivetRouter';
import DashbordLayout from '../Layout/DashbordLayout';
import AdminRoute from './AdminRoute';
import AdminProfile from '../Pages/Dashbord/AdminProfile';
import MyProfile from '../Pages/Dashbord/MyProfile';

import AgreementRequest from '../Pages/Dashbord/AgreementRequest';
import ManageMember from '../Pages/Dashbord/ManageMember';
import MemberRoute from './MemberRoute';
import Payment from '../Pages/Dashbord/Payment';
import ManageCoupons from '../Pages/Dashbord/ManageCoupons';
import PaymentHistory from '../Pages/Dashbord/PaymentHistory';
import Announcements from '../Pages/Dashbord/Announcements';
import MakeAnnouncement from '../Pages/Dashbord/MakeAnnouncement';
import AddAnnouncement from '../Pages/Dashbord/AddAnnouncement';
import EditAnnouncement from '../Pages/Dashbord/EditAnnouncement';
import AddCoupons from '../Pages/Dashbord/AddCopons';
import EditCoupon from '../Pages/Dashbord/EditCoupon';


const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPages />,
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'apartments',
        element: <AllApartments />,
      },
      {
        path: 'apartments/:id',
        element: <Apartment />,
      },
    ],
  },
  {
    path: '/signin',
    element: <SignIn />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/dashboard',
    errorElement : <ErrorPages />,
    element: (
      <PrivetRoute>
        <DashbordLayout />
      </PrivetRoute>
    ),
    children: [
      {
        path: 'profile',
        element: <MyProfile />,
      },
      {
        path: 'announcements',
        element: <Announcements />,
      },

      // Admin Routes
      {
        path: 'admin-profile',
        element: (
          <AdminRoute>
            <AdminProfile />
          </AdminRoute>
        ),
      },
      {
        path: 'aggrement-requests',
        element: (
          <AdminRoute>
            <AgreementRequest />
          </AdminRoute>
        ),
      },
      {
        path: 'manage-members',
        element: (
          <AdminRoute>
            <ManageMember />
          </AdminRoute>
        ),
      },
      {
        path: 'manage-coupons',
        element: (
          <AdminRoute>
            <ManageCoupons />
          </AdminRoute>
        ),
      },
      {
        path: 'make-announcement',
        element: (
          <AdminRoute>
            <MakeAnnouncement />
          </AdminRoute>
        ),
      },
      {
        path: 'add-announcement',
        element: (
          <AdminRoute>
            <AddAnnouncement/>
          </AdminRoute>
        ),
      },
      {
        path: 'edit-announcement/:id',
        element: (
          <AdminRoute>
            <EditAnnouncement />
          </AdminRoute>
        ),
      },
      {
        path: 'add-coupon',
        element: (
          <AdminRoute>
            <AddCoupons />
          </AdminRoute>
        ),
      },
      {
        path: 'edit-coupon/:id',
        element: (
          <AdminRoute>
            <EditCoupon />
          </AdminRoute>
        ),
      },
      {
        path: 'add-coupon',
        element: (
          <AdminRoute>
            <AddCoupons />
          </AdminRoute>
        ),
      },

      //member route
      {
        path: 'payment',
        element: (
          <MemberRoute>
            <Payment />
          </MemberRoute>
        ),
      },
      {
        path: 'payment-history',
        element: (
          <MemberRoute>
            <PaymentHistory />
          </MemberRoute>
        ),
      },
    ],
  },
]);

export default router;
