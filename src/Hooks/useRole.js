import { useQuery } from "@tanstack/react-query";
import useAuthContext from "./useAuthContext";
import { useAxiosSecure } from "./useAxios";

const useRole = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuthContext();

  const { data: role, isLoading } = useQuery({
    queryKey: ["role", user?.email],
    queryFn: async () => {
      if (!user?.email) return null; // Handle case when user is null
      const { data } = await axiosSecure(`/users/role/${user.email}`);
      return data.role;
    },
  });

  return [role, isLoading]; 
};

export default useRole;
