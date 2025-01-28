import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { axiosInt } from '../../../Hooks/useAxios';
import Spinner from '../../NotFound&Loading/Spinner';
import DataNotFound from '../../NotFound&Loading/DataNotFound';

const ApartmentChart = () => {
  const {
    data: apartments = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['all-apartments'],
    queryFn: () => axiosInt.get('/all-apartments').then(res => res.data),
  });

  // Handle loading state
  if (isLoading) return <div><Spinner /> </div>;
  if (error) return <div><DataNotFound /></div>;

  // Ensure apartments exist before calculations
  const totalRooms = apartments.reduce((sum, apt) => sum + (apt.rooms || 0), 0);
  const availableRooms = apartments
    .filter(apt => apt.status === 'available')
    .reduce((sum, apt) => sum + (apt.rooms || 0), 0);

  const unavailableRooms = totalRooms - availableRooms;

  // Handle case where no data is available
  if (totalRooms === 0) return <div>No apartment data available</div>;

  // Prepare data for PieChart
  const data = [
    { name: 'Available Rooms', value: availableRooms },
    { name: 'Unavailable Rooms', value: unavailableRooms },
  ];

  const COLORS = ['#0088FE', '#FF8042'];

  return (
    <div className="w-full h-64">
         <div className="mt-2 text-lg font-semibold text-textT/80">
        <p>
          Total Rooms:{' '}
          <span className="text-primaryP">{apartments.length}</span>
        </p>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(1)}%`
            }>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

   
    </div>
  );
};

export default ApartmentChart;
