import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { axiosInt } from '../../../Hooks/useAxios';
import Pagination from '../../../Components/Pageination/Pagination';
import ApartmentCard from '../../../Components/HomeContent/Apartment/ApartmentCard';
import MinMaxForm from '../../../Components/HomeContent/Apartment/MinMaxForm';
import Loadding from '../../Loadding';
import DataNotFound from '../../../Components/NotFound&Loading/DataNotFound';

const AllApartments = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState(''); // Store min rent value
  

  // // Function to handle the search form submission
  // const handleSearch = () => {
  //   setCurrentPage(1); // Reset to the first page when search is applied
  // };

  // Use React Query to fetch paginated data with optional rent range filters
  // console.log(filter)
  const { data, isLoading, isError } = useQuery({
    queryKey: ['apartments', currentPage, filter],
    queryFn: async () => {
      const requestURL = `/allapartments?page=${currentPage}&minRent=${filter?.min || ''}&maxRent=${filter?.max || ''}`;
      // console.log("Fetching Apartments From:", requestURL);
  
      const response = await axiosInt.get(requestURL);
      return response.data;
    },
    keepPreviousData: true, 
  });
  

  if (isLoading) return <Loadding />
  if (isError) return <DataNotFound />

  const apartments = data.data || [];
  const totalPages = data.totalPages || 1;

  return (
    <div className="p-5 wrap">
      <h2 className="text-xl font-bold mb-4">Apartments</h2>

      <MinMaxForm setCurrentPage={setCurrentPage} setFilter={setFilter} />

      {/* Apartment List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {apartments.map(apartment => <ApartmentCard key={apartment._id} apartment={apartment} />
        )}
      </div>

      {/* Pagination Component */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default AllApartments;
