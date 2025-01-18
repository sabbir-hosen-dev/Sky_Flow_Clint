import toast from 'react-hot-toast';
import useAuthContext from './useAuthContext';
import { axiosInt } from './useAxios';
import { useNavigate } from 'react-router-dom';

const useHandleLogOut = () => {
  const { user, logOut, setUser } = useAuthContext();
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        axiosInt.post('/logout').catch(err => console.log(err));
        setUser({
          ...user,
          name: '',
          email: '',
          photo: '',
        });
        toast.success('user Log Out');
        navigate("/")
      })
      .catch(err => toast.error(err.message));
  };

  return handleLogOut;
};

export default useHandleLogOut;
