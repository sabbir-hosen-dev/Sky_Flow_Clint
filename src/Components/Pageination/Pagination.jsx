import PropTypes from 'prop-types';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const visiblePages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
  let endPage = Math.min(totalPages, startPage + visiblePages - 1);

  if (endPage - startPage < visiblePages - 1) {
    startPage = Math.max(1, endPage - visiblePages + 1);
  }

  return (
    <div className="flex justify-center mt-4">
      {/* Prev Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`flex items-center justify-center px-4 h-10 ms-0 leading-tight  border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700  dark:border-gray-700  dark:hover:bg-gray-700 dark:hover:text-white ${
          currentPage === 1 ? 'bg-gray-100 dark:bg-gray-800 cursor-not-allowed' : ' text-textT/80 dark:text-gray-900 bg-orange-100'
        }`}>
        Prev
      </button>

      {/* First Page */}
      {startPage > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className={`px-3 py-1 ${
              currentPage === 1 ? 'bg-orange-400 text-white' : 'bg-gray-900 '
            }`}>
            1
          </button>
          {startPage > 2 && <span className="px-2">...</span>}
        </>
      )}

      {/* Page Numbers */}
      {Array.from({ length: endPage - startPage + 1 }, (_, i) => (
        <button
          key={i + startPage}
          onClick={() => onPageChange(i + startPage)}
          className={`border-r-0 py-1 flex items-center justify-center px-4 h-10 leading-tight text-gray-500  border border-gray-300 hover:bg-gray-100 hover:text-gray-700  dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
            currentPage === i + startPage ? 'bg-orange-400 dark:text-gray-900 text-white font-bold' : 'dark:bg-gray-800 bg-gray-100'
          }`}>
          {i + startPage}
        </button>
      ))}

      {/* Last Page */}
      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="px-2">...</span>}
          <button
            onClick={() => onPageChange(totalPages)}
            className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500  border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white py-1 ${
              currentPage === totalPages ? 'bg-orange-400 text-white font-bold' : 'bg-gray-200 '
            }`}>
            {totalPages}
          </button>
        </>
      )}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`flex items-center justify-center px-4 h-10 ms-0 leading-tight  border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700  dark:border-gray-700  dark:hover:bg-gray-700 dark:hover:text-white ${
          currentPage === totalPages ? 'bg-gray-100 dark:bg-gray-800 cursor-not-allowed' : ' text-textT/80 dark:text-gray-900 bg-orange-100'
        }`}>
        Next
      </button>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
