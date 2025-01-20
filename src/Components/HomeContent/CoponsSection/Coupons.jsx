import { useQuery } from '@tanstack/react-query';
import TopHeading from '../TopHeading/TopHeading';
import CouponCard from './CoponCard';
import { axiosInt } from '../../../Hooks/useAxios';
import Spinner from '../../NotFound&Loading/Spinner';
import DataNotFound from '../../NotFound&Loading/DataNotFound';

const Coupons = () => {
  const {
    data: coupons = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['coupons'],
    queryFn: async () => {
      const res = await axiosInt.get('/coupons');
      return res.data.filter(coupon => coupon.isActive); // Only active coupons
    },
  });
  if (isLoading) return <Spinner />;
  if (error) return <DataNotFound />;

  return (
    <div className="my-10 margin wrap px-4">
      <TopHeading
        title=" Limited-Time Apartment Offers!"
        subtitle=" Book now and enjoy exclusive discounts before they’re gone!"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 items-center justify-center gap-6">
        {coupons.map(({ id, couponCode, discountPercentage, description }) => (
          <CouponCard
            key={id}
            code={couponCode}
            discount={discountPercentage}
            description={description}
          />
        ))}
      </div>
    </div>
  );
};

export default Coupons;
