import { Navigate, useLocation } from "react-router-dom";
import useAuthContext from "../Hooks/useAuthContext";
import Loadding from "../Pages/Loadding";




// eslint-disable-next-line react/prop-types
function PrivetRoute({children}) {
  const {user,loadding} = useAuthContext();


  const location = useLocation();
  
  if (loadding ) return <Loadding />

  if(!user.email){
    return <Navigate to="/signin" state={{form : location.pathname}} />
  }

  return children
}

export default PrivetRoute