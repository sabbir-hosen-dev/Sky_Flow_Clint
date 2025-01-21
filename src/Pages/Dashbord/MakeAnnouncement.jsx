import { RiDeleteBin6Line } from 'react-icons/ri';
import { BiEdit } from 'react-icons/bi';
import { useQuery } from '@tanstack/react-query';
import Breadcrumb from '../../Components/DashbordComponents/BreadCrumb/BreadCrumb';
import { axiosInt, useAxiosSecure } from '../../Hooks/useAxios';
import Spinner from '../../Components/NotFound&Loading/Spinner';
import DataNotFound from '../../Components/NotFound&Loading/DataNotFound';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

function MakeAnnouncement() {
  const {
    data: announcementsData = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['announcements'],
    queryFn: () => axiosInt.get('/announcement').then(res => res.data),
  });

  const axiosSecure = useAxiosSecure();
  const handleDelete = async id => {
    try {
      const response = await axiosSecure.delete(`/announcement/${id}`);

      if (response.data.success) {
        toast.success('Announcement deleted successfully!');
        refetch();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete announcement.');
    }
  };

  if (isLoading) return <Spinner />;
  if (error) return <DataNotFound />;
  return (
    <div>
      <Breadcrumb pageName="Announcements" />

      {announcementsData?.map(announcement => (
        <div
          key={announcement._id}
          className="rounded-sm border mb-4 border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex justify-between">
            <div className=" w-full ">
              <div>
                <h2 className="font-bold text-lg">{announcement.title}</h2>
                <p>{announcement.description}</p>
              </div>

              <div className="flex justify-between mt-2  ">
                <span className="text-xs">
                  Posted on:{' '}
                  {new Date(announcement.datePosted).toLocaleDateString()}
                </span>
                <span className="text-xs">
                  Status:{' '}
                  <span
                    className={`font-semibold ${
                      announcement.status === 'Active'
                        ? 'text-green-500'
                        : 'text-red-500'
                    }`}>
                    {announcement.status}
                  </span>
                </span>
              </div>
            </div>
            <div className="flex pl-3 gap-3 items-center">
              <Link to={`/dashboard/edit-announcement/${announcement._id}`}  >
              <BiEdit className="text-xl hover:text-primaryP transition-colors ease-linear duration-300 cursor-pointer" />
              
              </Link>
              <RiDeleteBin6Line
                onClick={() => handleDelete(announcement._id)}
                className="text-xl hover:text-primaryP transition-colors ease-linear duration-300 cursor-pointer"
              />
            </div>
          </div>
        </div>
      ))}

      <div className="flex w-full justify-between">
        <div className=""></div>
        <Link
          to="/dashboard/add-announcement"
          className="self-end bg-blue-700 px-4 py-2 rounded-md font-bold hover:bg-primaryP transition-all duration-300 text-textT">
          Add New
        </Link>
      </div>
    </div>
  );
}

export default MakeAnnouncement;
