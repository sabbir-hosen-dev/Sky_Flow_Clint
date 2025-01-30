import { useEffect } from "react";
import {useNavigate } from "react-router-dom";
import useRole from "../Hooks/useRole";


const DashboardRedirect = () => {
  const navigate = useNavigate();

 // Get the user role
  useEffect(() => {
    if (!isLoading) {

    }
  }, [role, isLoading, navigate]);

  return null; // This component only handles redirection
};

export default DashboardRedirect;
