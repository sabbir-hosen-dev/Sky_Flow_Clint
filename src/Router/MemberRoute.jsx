import { Navigate } from "react-router-dom";
import useRole from "../Hooks/useRole"
import Loadding from "../Pages/Loadding";
import PropTypes from 'prop-types';

function MemberRoute({children}) {
  const [role, isLoading] = useRole();

  if(isLoading) return <Loadding />
  if(role === "member") return children 
  return <Navigate to="/dashbord" replace="true" />
}

MemberRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MemberRoute
