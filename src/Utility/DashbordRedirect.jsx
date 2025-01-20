import { useEffect } from "react";
import {useNavigate } from "react-router-dom";
import useRole from "../Hooks/useRole";


const DashboardRedirect = () => {
  const navigate = useNavigate();
  const [role, isLoading] = useRole(); // Get the user role
  useEffect(() => {
    if (!isLoading) {
      if (role === "admin") {
        navigate("/dashboard/admin-profile");
      } else {
        navigate("/dashboard/profile");
      }
    }
  }, [role, isLoading, navigate]);

  return null; // This component only handles redirection
};

export default DashboardRedirect;
