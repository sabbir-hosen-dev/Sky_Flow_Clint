import { GiStoneBlock } from 'react-icons/gi';
import { AiOutlineBorderlessTable } from 'react-icons/ai';

import { MdApartment } from 'react-icons/md';
import {
  FaBed,
  FaBath,
  FaWarehouse,
  FaRulerCombined,
  FaCheckCircle,
} from 'react-icons/fa';
import GallerySlider from './../../Components/GallerySlider/GallerySlider';
import { useQuery } from '@tanstack/react-query';
import { axiosInt } from '../../Hooks/useAxios';
import { useParams } from 'react-router-dom';
import DataNotFound from '../../Components/NotFound&Loading/DataNotFound';

function Apartment() {
  const { id } = useParams();

  const {
    isPending,
    error,
    data: apartment = {},
  } = useQuery({
    queryKey: 'apartment',
    queryFn: () => axiosInt.get(`/apartments/${id}`).then(res => res.data),
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  {
    error && <DataNotFound />;
  }

  const {
    apartmentNo,
    bathrooms,
    bedrooms,
    blockNo,
    description,
    floorNo,
    images,
    price,
    rooms,
    size,
    amenities,
    title,
    // _id,
  } = apartment;
  return (
    <div className="wrap">
      <GallerySlider images={images} />

      <div className=" bg-secondaryS/5 p-6 dark:border-gray-900 rounded-lg border">
        {/* Header Section */}
        <div className="flex justify-between items-center border-b dark:border-gray-900 pb-4 mb-4">
          <h2 className="text-2xl font-bold">{title}</h2>
          <h4 className="text-2xl font-bold text-textT/90">${price}</h4>
        </div>

        <div className="mb-2  text-textT/80">{description}</div>

        {/* Property Details Summary */}

        <div className="grid grid-cols-2 md:grid-cols-3 items-center justify-center xl:grid-cols-4 gap-4">
          <div className="flex gap-2">
            <div className="border flex justify-center items-center px-3 rounded-md">
              <MdApartment className="inline-block mr-1 text-textT/70" />
            </div>

            <div>
              <p className="text-sm text-textT/70">Apartment:</p>
              <p className="font-bold text-textT/70">{apartmentNo}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <div className="border flex justify-center items-center px-3 rounded-md">
              <AiOutlineBorderlessTable className="inline-block mr-1 text-textT/70" />
            </div>

            <div>
              <p className="text-sm text-textT/70">Floor:</p>
              <p className="font-bold text-textT/70">{floorNo}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <div className="border flex justify-center items-center px-3 rounded-md">
              <GiStoneBlock className="inline-block mr-1 text-textT/70" />
            </div>
            <div>
              <p className="text-sm text-textT/70">Block:</p>
              <p className="font-bold text-textT/70">{blockNo}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <div className="border flex justify-center items-center px-3 rounded-md">
              <FaRulerCombined className="inline-block mr-1 text-textT/70" />
            </div>

            <div>
              <p className="text-sm text-textT/70">Size:</p>
              <p className="font-bold text-textT/70">
                {size} <span className="font-thin text-xs">SqFt</span>
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <div className="border flex justify-center items-center px-3 rounded-md">
              <FaWarehouse className="inline-block mr-1 text-textT/70" />
            </div>

            <div>
              <p className="text-sm text-textT/70">Rooms:</p>
              <p className="font-bold text-textT/70">{rooms}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <div className="border flex justify-center items-center px-3 rounded-md">
              <FaBed className="inline-block mr-1 text-textT/70" />
            </div>

            <div>
              <p className="text-sm text-textT/70">Bedrooms:</p>
              <p className="font-bold text-textT/70">{bedrooms}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <div className="border flex justify-center items-center px-3 rounded-md">
              <FaBath className="inline-block mr-1 text-textT/70" />
            </div>

            <div>
              <p className="text-sm text-textT/70">Bathrooms:</p>
              <p className="font-bold text-textT/70">{bathrooms}</p>
            </div>
          </div>

          {/* <div className=" flex ">
            <div className="flex items-center max-w-[150px]  space-x-2 px-4 p-2 border rounded-md bg-gray-50 dark:bg-gray-900 dark:border-gray-950">
              <FaCheckCircle className="text-green-500" />
              <span className="text-textT/70 dark:text-gray-300 font-medium">
                {status}
              </span>
            </div>
          </div> */}


        </div>

        <h3 className="text-xl mt-5 font-bold  dark:text-white mb-4">
          Apartment Amenities
        </h3>
        <div className="flex flex-wrap gap-3">
          {amenities.map((amenity, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 px-4 p-2 border rounded-md bg-gray-50 dark:bg-gray-900 dark:border-gray-950">
              <FaCheckCircle className="text-green-500" />
              <span className="text-textT/70 dark:text-gray-300 font-medium">
                {amenity}
              </span>
            </div>
          ))}
        </div>

        {/* Ask a Question Button */}
        <button className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg">
        Agreement
        </button>
      </div>
    </div>
  );
}

export default Apartment;
