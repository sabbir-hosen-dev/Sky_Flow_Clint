import { Link } from "react-router-dom"
import useAuthContext from "../../../Hooks/useAuthContext"


function UserLogo() {
  const {user} = useAuthContext();
  return (
    <Link

    className="flex items-center gap-4"
    to="#"
  >
    <span className="hidden text-right lg:block">
      <span className="block text-sm font-medium text-black dark:text-white">
        {user.name}
      </span>
      <span className="block text-gray-500 dark:text-gray-100 text-xs">{user.email}</span>
    </span>

    <img src={user.photo}  alt={`${user.name} Photo`} className="h-12 w-12 bg-gray-500 rounded-full" />
      
      
 
  </Link>
  )
}

export default UserLogo
