import TopHeading from '../TopHeading/TopHeading';
import CouponCard from './CoponCard';

const fakeCoupons = [
  {
    id: 1,
    code: 'SAVE20',
    discount: '20%',
    description: 'Get 20% off on your next rent!',
  },
  {
    id: 2,
    code: 'FIRST50',
    discount: '50%',
    description: 'Exclusive 50% discount for new members!',
  },
  {
    id: 3,
    code: 'BMS10',
    discount: '10%',
    description: 'Save 10% on maintenance fees!',
  },
];

const Coupons = () => {
  return (
    <div className="my-10 margin wrap px-4">
      <TopHeading
        title=" Limited-Time Apartment Offers!"
        subtitle=" Book now and enjoy exclusive discounts before they’re gone!"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 items-center justify-center gap-6">
        {fakeCoupons.map(({ id, code, discount, description }) => (
          <CouponCard
            key={id}
            code={code}
            discount={discount}
            description={description}
          />
        ))}
      </div>
    </div>
  );
};

export default Coupons;
