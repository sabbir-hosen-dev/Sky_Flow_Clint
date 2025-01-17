import { FcGoogle } from 'react-icons/fc';
import useAuthContext from '../../../Hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import saveUser from '../../../Api/saveUser';

function GoogleSignBtn() {
  const { googleSignIn, setUser } = useAuthContext();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    googleSignIn()
      .then(user => {
        const { displayName, photoURL, email } = user.user;

        const newUser = {
          name: displayName,
          email: email,
          photo: photoURL,
        };
        saveUser(newUser);
        setUser({
          ...user,
          name: displayName,
          email: email,
          photo: photoURL,
        });

        toast.success('Successfully logged in with Google!'); // Success toast
        navigate(`${location?.state?.form || '/'}`);
      })
      .catch(err => {
        console.log(err);
        toast.error('Google login failed!'); // Error toast
      });
  };
  return (
    <button
      type="button"
      onClick={handleGoogleSignIn}
      className="w-full border py-4 border-neutral-400 hover:bg-pin duration-300 hover:border-pin text-text font-medium rounded-lg text-sm px-5 hover:text-textT/70 text-center flex justify-center items-center gap-2">
      <FcGoogle className="w-5 h-5" />
      Sign in with Google
    </button>
  );
}

export default GoogleSignBtn;
