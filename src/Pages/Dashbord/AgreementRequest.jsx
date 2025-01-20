import { useQuery } from '@tanstack/react-query';
import { useAxiosSecure } from '../../Hooks/useAxios';
import DataNotFound from '../../Components/NotFound&Loading/DataNotFound';
import Spinner from '../../Components/NotFound&Loading/Spinner';
import toast from 'react-hot-toast';
import Breadcrumb from '../../Components/DashbordComponents/BreadCrumb/BreadCrumb';

function AgreementRequest() {
  const axiosSecure = useAxiosSecure();

  // Fetch agreements
  const {
    data: agreements = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['agreements'],
    queryFn: async () => {
      const res = await axiosSecure.get('/agreements/request');
      return res.data;
    },
  });
  console.log(agreements);

  if (isLoading) return <Spinner />;
  if (error) return <DataNotFound />;

  const handleAccepted = (id, email, apartmentId) => {
    // console.log('Accepting agreement for:', email);
    const newData = {
      email: email,
      status: 'approved',
      apartmentId: apartmentId,
    };
    console.log(apartmentId)

    axiosSecure
      .patch(`/agreements/update/${id}`, newData)
      .then(res => {
        console.log('Update Response:', res.data);
        toast.success("Agreement request accepted!");
        refetch();
        // }
      })
      .catch(err => console.error('Error in handleAccepted:', err));
  };

  const handleRejected = id => {
    console.log('Rejecting agreement ID:', id);
    axiosSecure
      .patch(`/agreements/reject/${id}`)
      .then(()=> {
        toast.error("Agreement request rejected!");
        // if (res.data.modifiedCount > 0) {
        refetch(); 
        // }
      })
      .catch(err => console.error('Error in handleRejected:', err));
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <Breadcrumb pageName="Aggrement Requests" />
    
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-left dark:bg-meta-4">
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                User
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Floor
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Block
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Room No
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Rent
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Request Date
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {agreements.map(agreement => (
              <tr
                key={agreement._id}
                className="border-b border-[#eee] dark:border-strokedark">
                <td className="py-5 px-4">
                  {agreement.name} <br /> {agreement.email}
                </td>
                <td className="py-5 px-4">{agreement.floorNo}</td>
                <td className="py-5 px-4">{agreement.blockNo}</td>
                <td className="py-5 px-4">{agreement.apartmentNo}</td>
                <td className="py-5 px-4">${agreement.rent}</td>
                <td className="py-5 px-4">
                  {new Date(agreement.agreementDate).toLocaleDateString(
                    'en-GB',
                    {
                      day: '2-digit',
                      month: '2-digit',
                      year: '2-digit',
                    }
                  )}
                </td>
              

                <td className="py-5 px-4">
                  <div className="flex space-x-2">
                    <button
                      onClick={() =>
                        handleAccepted(
                          agreement._id,
                          agreement.email,
                          agreement.apartmentId
                        )
                      }
                      className="bg-green-500 text-white text-xs px-3 py-1 rounded hover:bg-green-600">
                      Accept
                    </button>
                    <button
                      onClick={() => handleRejected(agreement._id)}
                      className="bg-red-500 text-white text-xs px-3 py-1 rounded hover:bg-red-600">
                      Reject
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

export default AgreementRequest;
