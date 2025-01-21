import { useState } from 'react';
import Breadcrumb from '../../Components/DashbordComponents/BreadCrumb/BreadCrumb';
import { useAxiosSecure } from '../../Hooks/useAxios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function AddAnnouncement() {
  const axiosSecure = useAxiosSecure();
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);

    const form = e.target;
    const title = form.title.value;
    const status = form.status.value;
    const description = form.description.value;

    const data = {
      title: title,
      status: status,
      description: description,
      datePosted: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
      postedBy: 'Admin',
    };

    try {
      const response = await axiosSecure.post('/announcement', data);
      console.log('Success:', response.data);
      toast.success('Announcement added successfully!');
      form.reset(); // Clear form after submission
      navigate("/dashboard/make-announcement")
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to add announcement.');
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div>
      <Breadcrumb pageName="Add Announcement" />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <form onSubmit={handleSubmit}>
          <div className="p-6.5">

            {/* Title Field */}
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Title
              </label>
              <input
                type="text"
                required
                name="title"
                placeholder="Enter announcement title"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

            {/* Status Select */}
            <div className="mb-4.5">
              <label className="mb-3 block text-black dark:text-white">
                Status
              </label>
              <select
                required
                name="status"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary">
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            {/* Description Field */}
            <div className="mb-6">
              <label className="mb-2.5 block text-black dark:text-white">
                Description
              </label>
              <textarea
                name="description"
                rows={6}
                required
                placeholder="Type your message"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
              disabled={isLoading}>
              {isLoading ? 'Adding...' : 'Add Announcement'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddAnnouncement;
