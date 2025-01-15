import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import ErrorPages from "../Pages/ErrorPages";
import SignIn from "../Components/Form/SignIn/SignIn";
import SignUp from "../Components/Form/SignUp/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPages />,
    element: <MainLayout />
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