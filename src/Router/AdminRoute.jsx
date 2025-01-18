import { Navigate } from "react-router-dom";
import useRole from "../Hooks/useRole"
import Loadding from "../Pages/Loadding";
import PropTypes from 'prop-types';

function AdminRoute({children}) {
  const [role, isLoading] = useRole();

  if(isLoading) return <Loadding />
  if(role === "admin") return children 
  return <Navigate to="/dashbord" replace="true" />
}

AdminRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminRoute
