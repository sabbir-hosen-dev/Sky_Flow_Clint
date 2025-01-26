import { useQuery } from '@tanstack/react-query';
import AnnouncementsCard from '../../Components/DashbordComponents/Card/AnnouncementsCard';
import { axiosInt } from '../../Hooks/useAxios';
import Spinner from '../../Components/NotFound&Loading/Spinner';
import DataNotFound from '../../Components/NotFound&Loading/DataNotFound';
import Breadcrumb from '../../Components/DashbordComponents/BreadCrumb/BreadCrumb';
import Title from '../../Components/Utlites/Helmate/Helmate';

function Announcements() {
  const {
    data: announcementsData = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['announcement'],
    queryFn: () => axiosInt.get('/announcement').then(res => res.data),
  });

  


  if (isLoading) return <Spinner />;
  if (error) return <DataNotFound />;

  return (
    <div className="container mx-auto p-4">
      <Title title='Announcements' />

      <Breadcrumb pageName="Announcements" />
      <div className=''>
        {announcementsData.map(announcement => (
          <AnnouncementsCard
            key={announcement.announcementId}
            {...announcement}
          />
        ))}
      </div>
    </div>
  );
}

export default Announcements;
