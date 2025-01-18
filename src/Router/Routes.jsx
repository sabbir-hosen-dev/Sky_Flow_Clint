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
    element: (
      <PrivetRoute>
        <DashbordLayout />
      </PrivetRoute>
    ),
    children : [

    ]
  },
]);

export default router;
