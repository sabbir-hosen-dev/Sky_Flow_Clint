import useAuthContext from '../../Hooks/useAuthContext';
import Breadcrumb from '../../Components/DashbordComponents/BreadCrumb/BreadCrumb';
import { FaBuilding } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import { useAxiosSecure } from '../../Hooks/useAxios';
import Spinner from '../../Components/NotFound&Loading/Spinner';
import DataNotFound from '../../Components/NotFound&Loading/DataNotFound';

const MyProfile = () => {
  const { user } = useAuthContext();

  const axiosSecure = useAxiosSecure();

  const {
    data: profile = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ['members'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/profile?email=${user.email}`);
      return res.data;
    },
  });

  console.log(profile);
  if (isLoading) return <Spinner />;
  if (error) return <DataNotFound />;

  return (
    <div>
      <Breadcrumb pageName="My Profile" />

      <div className="overflow-hidden rounded-lg border border-gray-300 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
        {/* Profile Cover Image */}
        <div className="relative h-36 md:h-52 bg-gray-300">
          <img
            src="https://media.istockphoto.com/id/1266230676/vector/dark-black-wave-background.jpg?s=612x612&w=0&k=20&c=vg_abZSvq7NyOusRWjlR4CA1_RvbgBOYuucSzEi-ZdQ="
            alt="profile cover"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Profile Info */}
        <div className="px-6 pb-8 text-center relative">
          {/* Profile Image */}
          <div className="relative mx-auto -mt-16 w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-md">
            <img
              src={user?.photo || 'https://via.placeholder.com/150'}
              alt="User Profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* User Name & Email */}
          <h3 className="mt-4 text-2xl font-semibold text-gray-900 dark:text-white">
            {user?.name || 'Guest User'}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {user?.email || 'No Email'}
          </p>

          {/* User Details in Grid Layout */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="flex items-center flex-col justify-center bg-gray-100 dark:bg-gray-700 p-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition">
              <div className="flex gap-2 items-center">
                <FaBuilding className="text-green-400" />
                <span className="ml-1 text-gray-800 dark:text-gray-300">
                  <strong>Agreement:</strong>
                </span>
              </div>
              <div className="">
                {profile.agreementDate
                  ? new Date(profile.agreementDate).toLocaleDateString(
                      'en-GB',
                      {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                      }
                    )
                  : 'None'}
              </div>
            </div>
            <div className="flex items-center flex-col justify-center bg-gray-100 dark:bg-gray-700 p-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition">
              <div className="flex gap-2 items-center">
                <FaBuilding className="text-green-400" />
                <span className="ml-1 text-gray-800 dark:text-gray-300">
                  <strong>Floor:</strong>
                </span>
              </div>
              <div className="">{profile?.floorNo || 'None'}</div>
            </div>

            <div className="flex items-center i  flex-col justify-center bg-gray-100 dark:bg-gray-700 p-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition">
              <div className="flex gap-2 items-center">
                <FaBuilding className="text-red-400" />
                <span className="ml-1 text-gray-800 dark:text-gray-300">
                  <strong>Block No:</strong>
                </span>
              </div>
              <div className="">{profile?.blockNo || 'None'}</div>
            </div>

            <div className="flex items-center flex-col justify-center bg-gray-100 dark:bg-gray-700 p-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition">
              <div className="flex gap-2 items-center">
                <FaBuilding className="text-blue-400" />
                <span className="ml-1 text-gray-800 dark:text-gray-300">
                  <strong>Room No:</strong>
                </span>
              </div>
              <div className="">{profile?.apartmentNo || 'None'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
