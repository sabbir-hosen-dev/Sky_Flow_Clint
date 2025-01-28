import { RiDeleteBin5Line } from "react-icons/ri"; 
import { useQuery } from '@tanstack/react-query';
import { useAxiosSecure } from '../../Hooks/useAxios';
import Spinner from '../../Components/NotFound&Loading/Spinner';
import DataNotFound from '../../Components/NotFound&Loading/DataNotFound';
import toast from "react-hot-toast";
import Breadcrumb from "../../Components/DashbordComponents/BreadCrumb/BreadCrumb";
import Title from "../../Components/Utlites/Helmate/Helmate";

function ManageMember() {
  // Fetch agreements

  const axiosSecure = useAxiosSecure()
  const {
    data: members = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['members'],
    queryFn: async () => {
      const res = await axiosSecure.get('/members');
      return res.data;
    },
  });
 
  console.log(members)
 
  const handleDelet = (id,email) => {
      axiosSecure.patch(`/user/role-update/${id}?email=${email}`)
      .then(() =>{
        toast.success("Member deleted successfully!");
        refetch();
      })
      .catch(err => toast.error(err.message))
  }

  if (isLoading) return <Spinner />;
  if (error) return <DataNotFound />;

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <Breadcrumb pageName="Manage Members" />
      <Title title='Manage Member' />

      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-left dark:bg-meta-4">
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                User Name
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                User Email
              </th>

              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {members.map(agreement => (
              <tr
                key={agreement._id}
                className="border-b border-[#eee] dark:border-strokedark">
                <td className="py-5 px-4">
                  {agreement.name}
                </td>
                <td className="py-5 px-4">{agreement?.email}</td>
                <td className="py-5 px-4">
                  <div className="flex space-x-2">
                    <button onClick={() =>handleDelet(agreement._id,agreement.email)} className="bg-red-500 flex gap-1 items-center text-white text-xs px-3 py-1 rounded hover:bg-red-600">
                      <RiDeleteBin5Line />
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageMember;
