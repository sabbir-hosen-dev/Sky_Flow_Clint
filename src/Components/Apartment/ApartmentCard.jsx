import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function ApartmentCard({ apartment }) {
  return (
    <div className="bg-secondaryS/20 rounded-lg overflow-hidden shadow-2xl">
      <img
        className="h-54 w-full object-cover object-end"
        src="https://images.unsplash.com/photo-1570797197190-8e003a00c846?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=968&q=80"
        alt="Home in Countryside"
      />
      <div className="p-6">
        <div className="flex items-baseline">
          {/* <span className="inline-block bg-teal-200 text-teal-800 py-1 px-4 text-xs rounded-full uppercase font-semibold tracking-wide">
            New

          </span> */}
    
        </div>
        <h4 className=" font-semibold text-lg leading-tight truncate">
          Beautiful Home in the countryside
        </h4>

        <div className="my-1 text-textT/70 text-xs uppercase font-semibold tracking-wide">
            3 beds &bull; 2 baths
          </div>

        <div className="mt-1">
          <span>$1,900.00</span>
          <span className="text-textT/70 text-sm">/ month</span>
        </div>
        <div className="mt-3">
          <Link className="card-btn">Agreement</Link>
        </div>
        
      </div>
    </div>
  );
}

ApartmentCard.propTypes = {
  apartment: PropTypes.shape({
    image: PropTypes.string.isRequired,
    blockName: PropTypes.string.isRequired,
    apartmentNo: PropTypes.string.isRequired,
    floorNo: PropTypes.string.isRequired,
    rent: PropTypes.number.isRequired,
  }).isRequired,
};

export default ApartmentCard;
