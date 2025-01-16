import { axiosInt } from "../Hooks/useAxios"

const saveUser = async user => {
  await axiosInt.post(`/users/${user.email}`,user)
}

export default saveUser;