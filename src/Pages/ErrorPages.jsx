import { Link } from "react-router-dom";

function ErrorPages() {
  return (
    <div className="bg-backgroundB">
      {/* <!-- component --> */}
      <div className="w-full h-screen wrap flex flex-col lg:flex-row items-center justify-center space-y-16 lg:space-y-0 space-x-8 2xl:space-x-0">
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center lg:px-2 xl:px-0 text-center">
          <p className="text-7xl md:text-8xl lg:text-9xl font-bold tracking-wider text-textT/70">
            404
          </p>
          <p className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider text-textT/50 mt-2">
            Page Not Found
          </p>
          <p className="text-lg md:text-xl lg:text-2xl text-textT/60 my-12">
            Sorry, the page you are looking for could not be found.
          </p>
          <Link
            href="/"
            className="flex items-center space-x-2 bg-primaryP hover:bg-primaryP/70 text-white px-4 py-2 rounded transition duration-150"
            title="Return Home">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor">
              <path
                fillRule="evenodd"
                d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"></path>
            </svg>
            <span>Return Home</span>
          </Link>
        </div>
        <div className="w-1/2 lg:h-full items-center flex lg:items-end justify-center p-4">
         <img src="https://flowbite-admin-dashboard.vercel.app/images/illustrations/404.svg" alt="" />
        </div>
      </div>
    </div>
  );
}

export default ErrorPages;
