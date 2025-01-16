

import PropTypes from 'prop-types';

const TopHeading = ({ title, subtitle }) => {
  return (
    <div className=" wrap flex text-center justify-center mb-10 text-text flex-col gap-2 items-center">
      <h2 className='font-bold text-4xl text-textT'>{title}</h2>
      <p className='text-textT/70  max-w-[600px]'>{subtitle}</p>
    </div>
  );
};

TopHeading.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string
};

export default TopHeading;

