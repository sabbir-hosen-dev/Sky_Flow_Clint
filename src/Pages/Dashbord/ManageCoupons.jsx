import { RiDeleteBin5Line } from 'react-icons/ri';
import { BiEdit } from 'react-icons/bi';
import { useQuery } from '@tanstack/react-query';
import { axiosInt, useAxiosSecure } from '../../Hooks/useAxios';
import Spinner from '../../Components/NotFound&Loading/Spinner';
import DataNotFound from '../../Components/NotFound&Loading/DataNotFound';
import Breadcrumb from '../../Components/DashbordComponents/BreadCrumb/BreadCrumb';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Title from '../../Components/Utlites/Helmate/Helmate';

function ManageCoupons() {
  const axiosSecure = useAxiosSecure();
  const {
    data: coupons = {},
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['coupons'],
    queryFn: () => axiosInt.get('/coupons').then(res => res.data),
  });

  if (isLoading) return <Spinner />;
  if (error) return <DataNotFound />;

  const handleDelete = async id => {
    try {
      const response = await axiosSecure.delete(`/coupons/${id}`);

      if (response.data.success) {
        toast.success('Coupons deleted successfully!');
        refetch();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete Coupons.');
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <Breadcrumb pageName="Manage Coupons" />
      <Title title='Manage Coupons' />
     
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[110px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Code
              </th>
              <th className=" py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Discount
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Description
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Status
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {coupons.map(coupon => (
              <tr key={coupon._id}>
                <td className="border-b border-[#eee] py-5 px-4 pl-2 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {coupon.couponCode}
                  </h5>
                </td>
                <td className='text-center'>
                  <p className="text-sm">{coupon.discountPercentage}%</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {coupon.description}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p
                    className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                      coupon.isActive
                        ? 'bg-success text-success'
                        : 'bg-warning text-warning'
                    }`}>
                    {coupon.isActive ? "active " : "inactive"}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <Link to={`/dashboard/edit-coupon/${coupon._id}`} className="hover:text-primary">
                      <BiEdit   />
                    </Link>
                    <button className="hover:text-primary">
                      <RiDeleteBin5Line onClick={() => handleDelete(coupon._id)} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex w-full justify-between">
        <div className=""></div>
        <Link
          to="/dashboard/add-coupon"
          className="self-end bg-blue-700 px-4 py-2 mt-4 rounded-md font-bold hover:bg-primaryP transition-all duration-300 text-textT">
          Add New
        </Link>
      </div>
      </div>
    </div>
  );
}

export default ManageCoupons;
