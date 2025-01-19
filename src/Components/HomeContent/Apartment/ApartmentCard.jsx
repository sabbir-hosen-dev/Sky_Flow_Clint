import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function ApartmentCard({ apartment }) {
  const { images, floorNo, title, blockNo, rent, _id } = apartment;


  return (
    <div className="bg-secondaryS/20 rounded-lg overflow-hidden shadow-2xl">
      <img
        className="h-[270px] w-full object-cover object-end"
        src={images}
        alt="Home in Countryside"
      />
      <div className="p-6">
        <div className="flex items-baseline">
          {/* <span className="inline-block bg-teal-200 text-teal-800 py-1 px-4 text-xs rounded-full uppercase font-semibold tracking-wide">
            New

          </span> */}
        </div>
        <h4 className=" font-semibold text-lg leading-tight truncate">
          {title}
        </h4>

        <div className="my-1 text-textT/70 text-xs uppercase font-semibold tracking-wide">
          {floorNo} FLOOR &bull; {blockNo} BLOCK
        </div>

        <div className="mt-1">
          <span>${rent}</span>
          <span className="text-textT/70 text-sm">/ month</span>
        </div>
        <div className="mt-3">
          <Link
            to={
              !location.pathname === '/apartments'
                ? `/${_id}`
                : `/apartments/${_id}`
            }
            className="card-btn">
            Agreement
          </Link>
        </div>
      </div>
    </div>
  );
}

ApartmentCard.propTypes = {
  apartment: PropTypes.shape({
    images: PropTypes.string.isRequired,
    floorNo: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    blockNo: PropTypes.string.isRequired,
    rent: PropTypes.number.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default ApartmentCard;
