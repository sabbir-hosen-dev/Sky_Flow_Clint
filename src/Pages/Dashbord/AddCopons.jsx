import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../Components/DashbordComponents/BreadCrumb/BreadCrumb';
import { useAxiosSecure } from '../../Hooks/useAxios';

function AddCoupons() {
  const axiosSecure = useAxiosSecure();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);

    const form = e.target;
    const couponCode = form.coupon.value.trim().toUpperCase();
    const discountPercentage = parseFloat(form.discountPercentage.value);
    const isActive = form.status.value === 'true'; // Convert string to boolean
    const description = form.description.value.trim();

    const data = { couponCode, discountPercentage, isActive, description };

    try {
      const response = await axiosSecure.post('/coupons', data);
      console.log('Success:', response.data);
      toast.success('Coupon added successfully!');
      form.reset();
      navigate('/dashboard/manage-coupons');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to add Coupon.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Breadcrumb pageName="Add Coupon" />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <form onSubmit={handleSubmit}>
          <div className="p-6.5">
            {/* Coupon Code */}
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Coupon Code
              </label>
              <input
                type="text"
                required
                name="coupon"
                placeholder="Enter coupon code"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

            {/* Discount Percentage */}
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Discount Percentage
              </label>
              <input
                type="number"
                step="0.01"
                required
                name="discountPercentage"
                placeholder="Enter discount percentage"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

            {/* Status */}
            <div className="mb-4.5">
              <label className="mb-3 block text-black dark:text-white">
                Status
              </label>
              <select
                required
                name="status"
                defaultValue="true"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary">
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>

            {/* Description */}
            <div className="mb-6">
              <label className="mb-2.5 block text-black dark:text-white">
                Description
              </label>
              <textarea
                name="description"
                rows={6}
                required
                placeholder="Enter description"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
              disabled={isLoading}>
              {isLoading ? 'Adding...' : 'Add Coupon'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCoupons;
