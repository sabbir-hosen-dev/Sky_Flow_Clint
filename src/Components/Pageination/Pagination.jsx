import PropTypes from 'prop-types';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const visiblePages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
  let endPage = Math.min(totalPages, startPage + visiblePages - 1);

  if (endPage - startPage < visiblePages - 1) {
    startPage = Math.max(1, endPage - visiblePages + 1);
  }

  return (
    <div className="flex justify-center space-x-2 mt-4">
      {/* Prev Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"}`}
      >
        Prev
      </button>

      {/* First Page */}
      {startPage > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className={`px-3 py-1 rounded ${currentPage === 1 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
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
          className={`px-3 py-1 rounded ${currentPage === i + startPage ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          {i + startPage}
        </button>
      ))}

      {/* Last Page */}
      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="px-2">...</span>}
          <button
            onClick={() => onPageChange(totalPages)}
            className={`px-3 py-1 rounded ${currentPage === totalPages ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"}`}
      >
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
