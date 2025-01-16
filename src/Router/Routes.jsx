import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import ErrorPages from "../Pages/ErrorPages";
import SignIn from "../Components/Form/SignIn/SignIn";
import SignUp from "../Components/Form/SignUp/SignUp";
import Home from "../Pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPages />,
    element: <MainLayout />,
    children : [
      {
        path : "/",
        element : <Home />
      }
    ]
  },
  {
    path : "/signin",
    element : <SignIn />
  },
  {
    path : "/signup",
    element : <SignUp />
  }
])

export default router