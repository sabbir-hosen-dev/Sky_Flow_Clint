import { AiOutlineWhatsApp } from 'react-icons/ai';
import { AiFillGithub } from 'react-icons/ai';
import { AiOutlineLinkedin } from 'react-icons/ai';
import { CgFacebook } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo.png';

function Footer() {
  return (
    <footer className="w-full bg-gray-70">
      <div className="wrap">
        {/* <!--Grid--> */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-8 py-10 max-sm:max-w-sm max-sm:mx-auto gap-y-8">
          <div className="col-span-full mb-10 lg:col-span-2 lg:mb-0">
            <Link
              to="/"
              className="flex items-center space-x-3 rtl:space-x-reverse">
              <img src={logo} className="h-8" alt="Logo" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap e">
                SkyFlow
              </span>
            </Link>
            <p className="py-8 text-sm text-textT lg:max-w-xs text-center lg:text-left">
              Trusted in more than 100 countries & 5 million customers. Have any
              query ?
            </p>
            <a
              href="javascript:;"
              className="py-2.5 px-5 h-9 block w-fit bg-primaryP rounded-full shadow-sm text-xs text-white mx-auto transition-all  duration-500 hover:bg-primaryP/80 lg:mx-0">
              Contact us
            </a>
          </div>
          {/* <!--End Col--> */}
          <div className="lg:mx-auto text-left ">
            <h4 className="text-lg  font-medium mb-7">Pagedone</h4>
            <ul className="text-sm  transition-all duration-500">
              <li className="mb-6 li">
                <a
                  href="javascript:;"
                  className="">
                  Home
                </a>
              </li>
              <li className="mb-6 li">
                <a
                  href="javascript:;"
                  className=" ">
                  About
                </a>
              </li>
              <li className="mb-6 li">
                <a
                  href="javascript:;"
                  className="">
                  Pricing
                </a>
              </li>
              <li className='li'>
                <a
                  href="javascript:;"
                  className=" ">
                  Features
                </a>
              </li>
            </ul>
          </div>
          {/* <!--End Col--> */}
          <div className="lg:mx-auto text-left ">
            <h4 className="text-lg font-medium mb-7">Products</h4>
            <ul className="text-sm  transition-all duration-500">
              <li className="mb-6 transition-colors duration-300 ease-linear text-textT/80 hover:text-textT">
                <a
                  href="javascript:;"
                  className="">
                  Figma UI System
                </a>
              </li>
              <li className="mb-6 li">
                <a
                  href="javascript:;"
                  className=" ">
                  Icons Assets
                </a>
              </li>
              <li className="mb-6 li">
                <a
                  href="javascript:;"
                  className=" ">
                  Responsive Blocks
                </a>
              </li >
              <li className='li'>
                <a
                  href="javascript:;"
                  className=" ">
                  Components Library
                </a>
              </li>
            </ul>
          </div>
          {/* <!--End Col--> */}
          <div className="lg:mx-auto text-left">
            <h4 className="text-lg  font-medium mb-7">
              Resources
            </h4>
            <ul className="text-sm  transition-all duration-500">
              <li className="mb-6 li">
                <a
                  href="javascript:;"
                  className="">
                  FAQs
                </a>
              </li>
              <li className="mb-6 li">
                <a
                  href="javascript:;"
                  className=" ">
                  Quick Start
                </a>
              </li>
              <li className="mb-6 li">
                <a
                  href="javascript:;"
                  className=" ">
                  Documentation
                </a>
              </li>
              <li className='li'>
                <a
                  href="javascript:;"
                  className=" ">
                  User Guide
                </a>
              </li>
            </ul>
          </div>
          {/* <!--End Col--> */}
          <div className="lg:mx-auto text-left">
            <h4 className="text-lg  font-medium mb-7">Blogs</h4>
            <ul className="text-sm  transition-all duration-500">
              <li className="mb-6 li">
                <a
                  href="javascript:;"
                  className="">
                  News
                </a>
              </li>
              <li className="mb-6 li">
                <a
                  href="javascript:;"
                  className=" ">
                  Tips & Tricks
                </a>
              </li>
              <li className="mb-6 li">
                <a
                  href="javascript:;"
                  className=" ">
                  New Updates
                </a>
              </li>
              <li>
                <a
                  href="javascript:;"
                  className=" ">
                  Events
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* <!--Grid--> */}
        <div className="py-7 border-t border-gray-200">
          <div className="flex items-center justify-center flex-col lg:justify-between lg:flex-row">
            <span className="text-sm text-textT ">
              &copy;<a href="https://pagedone.io/">Sabir Hosen</a>{' '}
              {new Date().getFullYear()}, All rights reserved.
            </span>
            <div className="flex mt-4  space-x-4 sm:justify-center lg:mt-0 ">
              <CgFacebook className="w-9 h-9 rounded-full  flex  hover:text-whitejustify-center items-center hover:text-primaryP cursor-pointer duration-300  " />
              <AiOutlineLinkedin className="w-9 h-9 rounded-full  flex  hover:text-whitejustify-center items-center hover:text-primaryP cursor-pointer duration-300  " />
              <AiFillGithub className="w-9 h-9 rounded-full flex hover:text-white justify-center items-center hover:text-primaryP cursor-pointer duration-300  " />
              <AiOutlineWhatsApp className="w-9 h-9 rounded-full  flex justify-center items-center  hover:text-white hover:text-primaryP cursor-pointer duration-300 " />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
