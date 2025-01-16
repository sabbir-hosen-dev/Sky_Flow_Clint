import { useQuery } from '@tanstack/react-query';
import TopHeading from '../TopHeading/TopHeading';
import ApartmentCard from './ApartmentCard';
import { axiosInt } from '../../Hooks/useAxios';
import LoaddingCard from './LoaddingCard';
import DataNotFound from '../DataNotFound/DataNotFound';

function Apartments() {
  const damo = [1, 2, 3, 4, 5, 6];

  const {
    isPending,
    error,
    data: apartments,
  } = useQuery({
    queryKey: ['cardData'],
    queryFn: () => axiosInt.get('/apartments').then(res => res.data),
  });

  console.log(apartments)
  return (
    <div className="margin">
      <TopHeading
        title="Find Your Perfect Home"
        subtitle="Easy booking for hassle-free apartment viewings"
      />
         {
          error && <DataNotFound />
        }
      <div className="grid wrap grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
     
        {apartments &&
          apartments.map(apartment => (
            <ApartmentCard key={apartment._id} apartment={apartment} />
          ))}
        {isPending && damo.map((a, b) => <LoaddingCard key={b} />)}
      </div>
    </div>
  );
}

export default Apartments;
