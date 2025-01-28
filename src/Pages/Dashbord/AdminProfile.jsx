// import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Breadcrumb from '../../Components/DashbordComponents/BreadCrumb/BreadCrumb';
import ApoantmentChart from '../../Components/DashbordComponents/Charts/ApoatmentChart';
import Title from '../../Components/Utlites/Helmate/Helmate';
import useAuthContext from '../../Hooks/useAuthContext';
import { axiosInt } from '../../Hooks/useAxios';

function AdminProfile() {
  const { user: authUser } = useAuthContext();

  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['all-users'],
    queryFn: () => axiosInt.get('/all-users').then(res => res.data),
  });

  const user = data.filter(user => user.role == 'user');
  const member = data.filter(user => user.role == 'member');

  return (
    <div>
      <Title title="Admin Profile" />

      <Breadcrumb pageName="Admin Profile" />

      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="relative z-20 h-35 md:h-65">
          <img
            src="https://media.istockphoto.com/id/1407063872/vector/modern-abstract-background-with-black-gradient-abstract-black-business-background.jpg?s=612x612&w=0&k=20&c=6QftyGArm3LTpQsLw29DpZ9ZB42HMNK-wboAWyFZvto="
            alt="profile cover"
            className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
          />
          {/* <div className="absolute bottom-1 right-1 z-10 xsm:bottom-4 xsm:right-4">
            <label
              htmlFor="cover"
              className="flex cursor-pointer items-center justify-center gap-2 rounded bg-primary py-1 px-2 text-sm font-medium text-white hover:bg-opacity-90 xsm:px-4">
              <input type="file" name="cover" id="cover" className="sr-only" />
              <span>
                <svg
                  className="fill-current"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.76464 1.42638C4.87283 1.2641 5.05496 1.16663 5.25 1.16663H8.75C8.94504 1.16663 9.12717 1.2641 9.23536 1.42638L10.2289 2.91663H12.25C12.7141 2.91663 13.1592 3.101 13.4874 3.42919C13.8156 3.75738 14 4.2025 14 4.66663V11.0833C14 11.5474 13.8156 11.9925 13.4874 12.3207C13.1592 12.6489 12.7141 12.8333 12.25 12.8333H1.75C1.28587 12.8333 0.840752 12.6489 0.512563 12.3207C0.184375 11.9925 0 11.5474 0 11.0833V4.66663C0 4.2025 0.184374 3.75738 0.512563 3.42919C0.840752 3.101 1.28587 2.91663 1.75 2.91663H3.77114L4.76464 1.42638ZM5.56219 2.33329L4.5687 3.82353C4.46051 3.98582 4.27837 4.08329 4.08333 4.08329H1.75C1.59529 4.08329 1.44692 4.14475 1.33752 4.25415C1.22812 4.36354 1.16667 4.51192 1.16667 4.66663V11.0833C1.16667 11.238 1.22812 11.3864 1.33752 11.4958C1.44692 11.6052 1.59529 11.6666 1.75 11.6666H12.25C12.4047 11.6666 12.5531 11.6052 12.6625 11.4958C12.7719 11.3864 12.8333 11.238 12.8333 11.0833V4.66663C12.8333 4.51192 12.7719 4.36354 12.6625 4.25415C12.5531 4.14475 12.4047 4.08329 12.25 4.08329H9.91667C9.72163 4.08329 9.53949 3.98582 9.4313 3.82353L8.43781 2.33329H5.56219Z"
                    fill="white"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.99992 5.83329C6.03342 5.83329 5.24992 6.61679 5.24992 7.58329C5.24992 8.54979 6.03342 9.33329 6.99992 9.33329C7.96642 9.33329 8.74992 8.54979 8.74992 7.58329C8.74992 6.61679 7.96642 5.83329 6.99992 5.83329ZM4.08325 7.58329C4.08325 5.97246 5.38909 4.66663 6.99992 4.66663C8.61075 4.66663 9.91659 5.97246 9.91659 7.58329C9.91659 9.19412 8.61075 10.5 6.99992 10.5C5.38909 10.5 4.08325 9.19412 4.08325 7.58329Z"
                    fill="white"
                  />
                </svg>
              </span>
              <span>Edit</span>
            </label>
          </div> */}
        </div>
        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
          <div className="relative overflow-hidden z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20  backdrop-blur sm:h-44 sm:max-w-44 ">
            <div className="w-full  h-full overflow-hidden drop-shadow-2">
              <img
                src={authUser.photo}
                className="w-full h-full object-cover "
                alt=""
              />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
              {authUser.name}
            </h3>
            <p className="font-medium">{authUser.email}</p>
            <div className="flex justify-center items-center">
              <div className="mx-auto mt-4.5 mb-5.5  flex gap-2  ">
                <div
                  className="
              rounded-md border min-w-[150px] w-full border-stroke py-2.5 shadow-1 dark:border-strokedark dark:bg-[#37404F]">
                  Total users:
                  <div className="font-bold">{user.length}</div>
                </div>
                <div
                  className="
              rounded-md border w-full min-w-[150px] border-stroke py-2.5 shadow-1 dark:border-strokedark dark:bg-[#37404F]">
                  Total Member:
                  <div className="font-bold">{member.length}</div>
                </div>
              </div>
            </div>
            <div className="">
              <ApoantmentChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;
