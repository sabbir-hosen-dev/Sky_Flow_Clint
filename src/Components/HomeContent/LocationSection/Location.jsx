import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { HiOutlineLocationMarker, HiOutlineSupport } from 'react-icons/hi';
import { FiMail, FiPhoneCall } from 'react-icons/fi';
import TopHeading from '../TopHeading/TopHeading';

const apartmentLocation = {
  lat: 23.8103,
  lng: 90.4125,
  address: '123 Green Tower, Apartment Complex, Dhaka, Bangladesh',
  instructions: 'Near Bashundhara R/A, close to Jamuna Future Park.',
};

const Location = () => {
  return (
    <section className="relative mb-32">
      <TopHeading
        title="Your Dream Apartment Awaits"
        subtitle="Live in style in our modern apartments located in vibrant, accessible neighborhoods."
      />
      {/* Leaflet Map */}
      <div id="map" className="relative shadow-md h-[400px]">
        <MapContainer
          center={[apartmentLocation.lat, apartmentLocation.lng]}
          zoom={250}
          className="h-full w-full">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[apartmentLocation.lat, apartmentLocation.lng]}>
            <Popup>
              <strong>{apartmentLocation.address}</strong>
              <br />
              {apartmentLocation.instructions}
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      {/* Details Section on Top of Map */}
      <div className="absolute wrap -bottom-[55px] left-0 right-0 w-full px-6 md:px-12 z-[999]">
        <div className="block rounded-lg  p-5 px-10 bg-accentA bg-opacity-80 dark:bg-gray-950  shadow-lg  backdrop-blur-[10px] border border-gray-300/10">
          <div className="flex flex-wrap">
            {/* Support Contact */}
            <div className=" w-full md:w-6/12 flex items-center">
              <div className="shrink-0 p-4 bg-sky-50 rounded-md">
                <HiOutlineSupport className="w-7 h-7 text-primaryP" />
              </div>
              <div className="ml-6">
                <p className="mb-2 font-bold">Technical Support</p>
                <p className="text-sm text-textT/70 flex items-center">
                  <FiMail className="mr-2" /> tssabbirhosen@gmail.com
                </p>
                <p className="text-sm text-textT/70 flex items-center">
                  <FiPhoneCall className="mr-2" /> +880 1313-530719
                </p>
              </div>
            </div>
            {/* Address */}
            <div className=" w-full md:w-6/12 flex items-center">
              <div className="shrink-0 p-4 bg-sky-50 dark:bg-white rounded-md">
                <HiOutlineLocationMarker className="w-7 h-7 text-primaryP" />
              </div>
              <div className="ml-6">
                <p className="mb-2 text-textT font-bold">Address</p>
                <p className="text-sm text-textT/70">
                  {apartmentLocation.address}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;

//       {/* Right: Address & Directions */}
//       <div className="w-full md:w-1/2 space-y-4">
//         <p className="text-lg font-semibold text-gray-700">
//           📍 Address: <span className="text-indigo-600">{apartmentLocation.address}</span>
//         </p>
//         <p className="text-lg font-semibold text-gray-700">
//           🚗 How to Get Here:
//         </p>
//         <ul className="list-disc list-inside text-gray-600">
//           <li>🚌 Take Bus No. 27, stop at "Green Tower" Station.</li>
//           <li>🚕 Uber/CNG drop-off at the main entrance.</li>
//           <li>🚶 Walk 2 minutes from the nearest supermarket.</li>
//         </ul>
//       </div>
//     </div>
//   </section>
