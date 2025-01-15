import { FcGoogle } from "react-icons/fc"


function GoogleSignBtn() {
  return (
    <button
    type="button"
    // onClick={}
    className="w-full border py-4 border-neutral-400 hover:bg-pin duration-300 hover:border-pin text-text font-medium rounded-lg text-sm px-5 hover:text-textT/70 text-center flex justify-center items-center gap-2">
    <FcGoogle className="w-5 h-5" />
    Sign in with Google
  </button>
  )
}

export default GoogleSignBtn
