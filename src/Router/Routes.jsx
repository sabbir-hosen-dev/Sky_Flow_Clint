import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import ErrorPages from "../Pages/ErrorPages";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPages />,
    element: <MainLayout />
  }
])

export default router