import { useQuery } from '@tanstack/react-query';
import { useAxiosSecure } from '../../Hooks/useAxios';
import Spinner from '../../Components/NotFound&Loading/Spinner';
import DataNotFound from '../../Components/NotFound&Loading/DataNotFound';
import useAuthContext from '../../Hooks/useAuthContext';
import Breadcrumb from '../../Components/DashbordComponents/BreadCrumb/BreadCrumb';

function PaymentHistory() {
  const { user } = useAuthContext();

  const axiosSequire = useAxiosSecure();

  const {
    data: history = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['payment-history', user?.email], // Add user.email to re-fetch on change
    queryFn: async () => {
      if (!user?.email) return []; // Prevent request if email is undefined
      const res = await axiosSequire.get(
        `/payment-history?email=${user.email}`
      );
      return res.data;
    },
    enabled: !!user?.email, // Only fetch when user.email is available
  });

  if (isLoading) return <Spinner />;
  if (error) return <DataNotFound />;
  // console.log(history);
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <Breadcrumb  pageName="Payment History"/>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-left dark:bg-meta-4">
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                User
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Month
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Amount
              </th>

              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Pament Date
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Transaction Id
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {history.map(history => (
              <tr
                key={history._id}
                className="border-b border-[#eee] dark:border-strokedark">
                <td className="py-5 px-4">
                  {history.userName} <br /> {history.userEmail}
                </td>
                <td className="py-5 px-4">{history.month}</td>
                <td className="py-5 px-4">${history.finalAmount}</td>

                <td className="py-5 px-4">
                  {new Date(history.paymentDate).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: '2-digit',
                  })}
                </td>

                <td className="py-5 px-4">{history.transactionId}</td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p
                    className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium bg-green-300 text-green-700
                   `}>
                    {history.paymentStatus}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PaymentHistory;
