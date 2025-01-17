

import PropTypes from 'prop-types';

function MinMaxForm({ setFilter }) {


  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const min = form.min.value;
    const max = form.max.value;
    // setCurrentPage(1)
    setFilter({ min: Number(min), max: Number(max) });
  };

  return (
    <div className="flex mb-5 justify-center items-center">
      <form onSubmit={handleSubmit} className="flex gap-5  p-4 rounded-lg ">
        <div className="relative">
          <input
            type="number"
            id="min"
            name="min"
            className="peer bg-transparent h-10 w-72 rounded-lg text-gray-200 placeholder-transparent ring-2 px-3 ring-gray-200 dark:ring-gray-900 focus:ring-sky-600 focus:outline-none"
            placeholder="500"
            required
            
          />
          <label
            htmlFor="min"
            className="absolute left-3 -top-3 text-sm text-textT/70 px-1 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:bg-gray-800  peer-focus:text-sm transition-all">
            Min Rent
          </label>
        </div>

        <div className="relative">
          <input
            type="number"
            id="max"
            name="max"
            className="peer bg-transparent h-10 w-72 rounded-lg text-gray-200 placeholder-transparent ring-2 px-3 ring-gray-200 dark:ring-gray-900 focus:ring-sky-600 focus:outline-none"
            placeholder="1000"
            required
           
          />
          <label
            htmlFor="max"
            className="absolute left-3 -top-3 text-sm text-textT/70 px-1 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:bg-gray-800  peer-focus:text-sm transition-all">
            Max Rent
          </label>
        </div>

        <button
          type="submit"
          className=" bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg">
          Filter
        </button>
      </form>
    </div>
  );
}

MinMaxForm.propTypes = {
  setFilter: PropTypes.func.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};

export default MinMaxForm;

