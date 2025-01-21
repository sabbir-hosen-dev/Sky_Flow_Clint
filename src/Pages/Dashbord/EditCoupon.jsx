import { useNavigate, useParams } from 'react-router-dom';
import { axiosInt, useAxiosSecure } from '../../Hooks/useAxios';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Breadcrumb from '../../Components/DashbordComponents/BreadCrumb/BreadCrumb';

function EditCoupon() {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // State for form fields
  const [formData, setFormData] = useState({
    couponCode: '',
    isActive: "",
    discountPercentage: '',
    description: '',
  });

  // Fetch coupon data
  const { data } = useQuery({
    queryKey: ['single-coupon', id],
    queryFn: () => axiosInt.get(`/single-coupon/${id}`).then(res => res.data),
  });

  // Set form data when API response is available
  useEffect(() => {
    if (data) {
      setFormData({
        couponCode: data.couponCode || '',
        isActive: data.isActive ,
        discountPercentage: data.discountPercentage || '',
        description: data.description || '',
      });
    }
  }, [data]);

  console.log(data)

  // Handle input changes
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "isActive" ? value === "true" : value, // Convert string to boolean for isActive
    }));
  };

  // Handle form submission
  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axiosSecure.patch(`/coupons/${id}`, formData);
      console.log('Success:', response.data);
      toast.success('Coupon edited successfully!');
      navigate('/dashboard/manage-coupons');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to edit coupon.');
    } finally {
      setIsLoading(false);
    }
  };
console.log(formData.isActive)
  return (
    <div>
      <Breadcrumb pageName="Edit Coupon" />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <form onSubmit={handleSubmit}>
          <div className="p-6.5">
            
            {/* Coupon Code Field */}
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Coupon Code
              </label>
              <input
                type="text"
                name="couponCode"
                value={formData.couponCode}
                onChange={handleChange}
                required
                placeholder="Enter coupon code"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

            {/* Discount Percentage Field */}
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Discount Percentage
              </label>
              <input
                type="number"
                name="discountPercentage"
                value={formData.discountPercentage}
                onChange={handleChange}
                required
                placeholder="Enter discount percentage"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>


            {/* Status Select */}
            <div className="mb-4.5">
              <label className="mb-3 block text-black dark:text-white">
                Status
              </label>
              <select
                name="isActive"
                value={formData.isActive ? "true" : "false"}
                onChange={handleChange}
                required
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary">
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>

            {/* Description Field */}
            <div className="mb-6">
              <label className="mb-2.5 block text-black dark:text-white">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={6}
                required
                placeholder="Enter a description"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
              disabled={isLoading}>
              {isLoading ? 'Updating...' : 'Update Coupon'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditCoupon;
