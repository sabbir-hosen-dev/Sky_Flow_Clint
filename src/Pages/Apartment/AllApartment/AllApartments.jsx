import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { axiosInt } from "../../../Hooks/useAxios";
import Pagination from "../../../Components/Pageination/Pagination";

const AllApartments = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Use React Query to fetch paginated data
  const { data, isLoading, isError } = useQuery({
    queryKey: ["apartments", currentPage],
    queryFn: () =>
      axiosInt.get(`/allapartments?page=${currentPage}`).then((response) => response.data),
    keepPreviousData: true, // Keeps old data while fetching new data
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading data</p>;

  const apartments = data.data || [];
  const totalPages = data.totalPages || 1;

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-4">Apartments</h2>
      <ul className="grid grid-cols-3 gap-4">
        {apartments.map((apartment) => (
          <li key={apartment._id} className="border p-3 rounded-lg">
            <h3 className="text-lg font-semibold">{apartment.title}</h3>
            <p className="text-gray-600">{apartment.description}</p>
            <p className="font-bold text-blue-600">${apartment.price}</p>
          </li>
        ))}
      </ul>

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
