import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import Breadcrumb from '../../Components/DashbordComponents/BreadCrumb/BreadCrumb';
import CheckoutForm from '../../Components/DashbordComponents/CheckoutForm/CheckoutForm';
import useAuthContext from '../../Hooks/useAuthContext';
import { axiosInt, useAxiosSecure } from '../../Hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY); // Use your public key here

function Payment() {
  const [rent, setRent] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [coupon, setCoupon] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(new Date().toLocaleString('en-US', { month: 'long' }));


  const { user } = useAuthContext();
  const axiosSecure = useAxiosSecure();

  const applyCoupon = async () => {
    if (!coupon) return toast.error('Please enter a coupon code');

    try {
      const res = await axiosInt.get(`/coupons/${coupon}`);
      setDiscount((res.data.discountPercentage * rent) / 100);
      toast.success(res.data.description);
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Invalid or inactive coupon code'
      );
      setDiscount(0);
    }
  };

  const { data: profile = {} } = useQuery({
    queryKey: ['members'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/profile?email=${user.email}`);
      return res.data;
    },
  });

  useEffect(() => {
    setRent(profile.rent);
  }, [profile.rent]);
  
  // console.log(profile);

  return (
    <div className="min-h-screen  p-6">
      <Breadcrumb pageName="Payment" />
      <section className="container mx-auto max-w-4xl bg-white dark:bg-boxdark p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-textT mb-4">
          Payment Details
        </h2>{' '}
        <form className="space-y-4">
          <div>
            <div>
              <label className="mb-3 block text-black dark:text-white">
                Member Email
              </label>
              <input
                readOnly
                value={user.email}
                type="text"
                placeholder="Default Input"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-3 block text-black dark:text-white">
                Block No
              </label>
              <input
                type="text"
                readOnly
                value={profile.blockNo}
                placeholder="Default Input"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

            <div>
              <label className="mb-3 block text-black dark:text-white">
                Room No
              </label>
              <input
                readOnly
                value={profile.floorNo}
                type="text"
                placeholder="Default Input"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-3 block text-black dark:text-white">
                Apartment No
              </label>
              <input
                readOnly
                value={profile.apartmentNo}
                type="text"
                placeholder="Default Input"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

            <div>
              <label className="mb-3 block text-black dark:text-white">
                Rent
              </label>
              <input
                readOnly
                value={profile.rent}
                type="text"
                placeholder="Default Input"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
          </div>
          <div>
            <label className="mb-3 block text-black dark:text-white">
              Select Month
            </label>
            <select
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              value={selectedMonth}
              onChange={e => setSelectedMonth(e.target.value)}>
              {[
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December',
              ].map(month => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter coupon code"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              value={coupon}
              onChange={e => setCoupon(e.target.value)}
            />
            <button
              type="button"
              className="px-4 py-2 min-w-[100px] bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              onClick={applyCoupon}>
              Apply
            </button>
          </div>
        </form>
        <Elements stripe={stripePromise}>
          <CheckoutForm
            amount={rent - discount}
            info={{
              month: selectedMonth,
              apartmentId: profile.apartmentId,
              discount: discount,
              finalAmount: rent - discount,
              rent :rent
            }}
          />
        </Elements>
        <div className="p-4 bg-transparent border-[1.5px] border-stroke text-textT rounded-lg">
          <p className="text-sm font-medium">Original Rent: ${rent}</p>
          <p className="text-sm font-medium text-green-600">
            Discount: -${discount.toFixed(2)}
          </p>
          <p className="text-lg font-bold mt-2">
            Total Payable: ${(rent - discount).toFixed(2)}
          </p>
        </div>
      </section>
    </div>
  );
}

export default Payment;
