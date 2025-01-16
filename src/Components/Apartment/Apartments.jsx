import TopHeading from '../TopHeading/TopHeading';
import ApartmentCard from './ApartmentCard';

function Apartments() {
  const apartments = [
    {
      id: 1,
      image: 'https://source.unsplash.com/400x300/?apartment,building',
      floorNo: 3,
      blockName: 'A',
      apartmentNo: '301',
      rent: 1200,
    },
    {
      id: 2,
      image: 'https://source.unsplash.com/400x300/?modern-apartment',
      floorNo: 5,
      blockName: 'B',
      apartmentNo: '502',
      rent: 1500,
    },
    {
      id: 3,
      image: 'https://source.unsplash.com/400x300/?luxury-apartment',
      floorNo: 2,
      blockName: 'C',
      apartmentNo: '205',
      rent: 1800,
    },
    {
      id: 4,
      image: 'https://source.unsplash.com/400x300/?real-estate',
      floorNo: 7,
      blockName: 'D',
      apartmentNo: '701',
      rent: 2000,
    },
  ];

  return (
    <div className="margin">
      <TopHeading title='Find Your Perfect Home' subtitle="Easy booking for hassle-free apartment viewings" />
      <div className="grid wrap grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {apartments.map(apartment => (
          <ApartmentCard key={apartment.id} apartment={apartment} />
        ))}
      </div>
    </div>
  );
}

export default Apartments;
