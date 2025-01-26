import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';


function Title({ title }) {
  return (
    <Helmet>
      <title>{title} | Sky Flow</title>
    </Helmet>
  );
}
Title.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Title;

