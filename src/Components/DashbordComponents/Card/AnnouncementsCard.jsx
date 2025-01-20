import PropTypes from 'prop-types';

function AnnouncementsCard({ title, description, datePosted, status }) {
  return (
    <div className="rounded-sm border mb-4 border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div>
        <h2 className='font-bold text-lg'>{title}</h2>
        <p>{description}</p>
      </div>

      <div className="flex justify-between mt-2  ">
        <span className='text-xs'>Posted on: {new Date(datePosted).toLocaleDateString()}</span>
        <span className='text-xs'>
          Status:{' '}
          <span
            className={`font-semibold ${
              status === 'Active' ? 'text-green-500' : 'text-red-500'
            }`}>
            {status}
          </span>
        </span>
      </div>
    </div>
  );
}

AnnouncementsCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  datePosted: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

export default AnnouncementsCard;
