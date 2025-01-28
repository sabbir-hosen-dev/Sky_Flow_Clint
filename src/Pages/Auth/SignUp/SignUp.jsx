/* eslint-disable react-hooks/rules-of-hooks */
import { BiUpload } from 'react-icons/bi';
import signup from '../../../assets/signup.png';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineArrowLeft, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import GoogleSignBtn from '../../../Components/Utlites/GoogleSignBtn/GoogleSignBtn';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useFileNameRename from '../../../Hooks/useFileNameRename';
import uploadFile from '../../../Api/uploadFile';
import useAuthContext from '../../../Hooks/useAuthContext';
import { updateProfile } from 'firebase/auth';
import auth from '../../../Firebase/firebase.config';
import toast from 'react-hot-toast';
import { useState } from 'react';
import load from '../../../assets/loading.gif';
import saveUser from '../../../Api/saveUser';
import Title from '../../../Components/Utlites/Helmate/Helmate';

function SignUp() {
  const SignUpSchema = Yup.object().shape({
    name: Yup.string().min(3, 'Too Short!').required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password too short')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(
        /[@$!%*?&]/,
        'Password must contain at least one special character (@, $, !, %, *, ?, &)'
      )
      .required('Password is required'),
    file: Yup.mixed()
      .required('Profile picture is required')
      .test(
        'fileSize',
        'File is too large',
        value => !value || (value && value.size <= 2 * 1024 * 1024)
      ) // 2MB limit
      .test(
        'fileType',
        'Unsupported file format',
        value =>
          !value ||
          (value &&
            ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type))
      ),
  });
  const [eye, setEye] = useState(true);
  const [loadding, setLoadding] = useState(false);

  const { setUser, createUser } = useAuthContext();
  const navigate = useNavigate();
  

  const handleSubmit = async (values, { resetForm }) => {
    setLoadding(true);
    try {
      const { name, email, password, file } = values;

      // Upload the file and get the image URL
      const photoUrl = await uploadFile(file);

      // Create user with email and password
      await createUser(email, password);

      // Get the authenticated user
      const user = auth.currentUser;

      if (user) {
        // Update user profile
        await updateProfile(user, {
          displayName: name,
          photoURL: photoUrl,
        });

        // Set user state
        setUser({
          name: name,
          email: email,
          photo: photoUrl,
        });

        const newUser = {
          name: name,
          email: email,
          photo: photoUrl,
        };
        saveUser(newUser);

        // Success message
        toast.success('Account Created Successfully!');

        // Reset form and navigate to sign-in page
        resetForm();
        navigate('/');
      }
    } catch (error) {
      console.error('Error during user creation:', error.message);

      // Handle Firebase errors
      if (error.code === 'auth/email-already-in-use') {
        toast.error(
          'An account with this email already exists. Please log in instead.'
        );
        navigate('/signin'); // Redirect to sign-in page
      } else if (error.code === 'auth/invalid-email') {
        toast.error('Invalid email format. Please enter a valid email.');
      } else if (error.code === 'auth/weak-password') {
        toast.error('Password should be at least 6 characters.');
      } else {
        toast.error('Error creating account. Please try again.');
      }
    } finally {
      setLoadding(false);
    }
  };

  return (
    <div className=" relative py-10 lg:py-20">
      <Title title='Sign Up' />
      <Link
        to="/"
        className="wrap flex items-center gap-2 hover:text-primaryP transition-colors duration-300  font-bold">
        <AiOutlineArrowLeft /> Back to Home
      </Link>
      <div
        className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-0 mr-auto mb-0 ml-auto max-w-7xl
          xl:px-5 lg:flex-row">
        <div className="flex flex-col items-center w-full pt-5 pr-10 pb-20 pl-10 lg:pt-20 lg:flex-row">
          <div className="w-full order-1 lg:order-2 mt-20 mr-0 mb-0 ml-0 relative z-10 max-w-2xl lg:mt-0 lg:w-5/12">
            <div
              className="flex flex-col items-start justify-start pt-10 pr-10 pb-10 pl-10 bg-accentA shadow-2xl rounded-xl
                relative z-10">
              <p className="w-full text-4xl font-medium text-center leading-snug font-serif">
                Create a new account
              </p>
              <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                <Formik
                  initialValues={{
                    name: '',
                    email: '',
                    password: '',
                    file: null,
                  }}
                  validationSchema={SignUpSchema}
                  onSubmit={(values, { resetForm }) =>
                    handleSubmit(values, { resetForm })
                  }>
                  {({ setFieldValue, values }) => (
                    <Form className="w-full mt-6 space-y-8">
                      <div>
                        <p className="bg-secondaryS pt-0 pr-2 pb-0 pl-2 -mt-3 font-medium text-textT absolute">
                          Username
                        </p>
                        <Field
                          name="name"
                          placeholder="name"
                          type="text"
                          className="bg-secondaryS border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 text-base block border-gray-300 text-textT rounded-md"
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>

                      <div>
                        <p className="bg-secondaryS pt-0 pr-2 pb-0 pl-2 -mt-3 font-medium text-textT absolute">
                          Email
                        </p>
                        <Field
                          name="email"
                          placeholder="example@gmail.com"
                          type="email"
                          className="bg-secondaryS border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 text-base block border-gray-300 text-textT rounded-md"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>

                      <div className='relative'>
                        <p className="bg-secondaryS pt-0 pr-2 pb-0  pl-2 -mt-3 font-medium text-textT absolute">
                          Password
                        </p>
                      
                          <Field
                            name="password"
                            placeholder="*******"
                            type={eye ? 'password' : 'text'}
                            className="bg-secondaryS border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 text-base block border-gray-300 text-textT rounded-md"
                          />
                        <div className="absolute right-5 top-5 bottom-0">
                        {eye ? (
                        <AiOutlineEye
                          onClick={() => setEye(false)}
                          className="hover:text-primaryP cursor-pointer  transition-colors duration-300"
                        />
                      ) : (
                        <AiOutlineEyeInvisible
                          onClick={() => setEye(true)}
                          className="hover:text-primaryP cursor-pointer  transition-colors duration-300"
                        />
                      )}
                        </div>
                       
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>

                      <div>
                        <p className="bg-secondaryS pt-0 pr-2 pb-0 pl-2 -mt-3 font-medium text-textT absolute">
                          Profile
                        </p>
                        <div className="bg-secondaryS flex border w-full pt-4 pr-4 pb-4 rounded-md">
                          <label
                            htmlFor="file"
                            className="flex items-center gap-2 bg-secondaryS text-text px-4 rounded cursor-pointer hover:bg-secondaryS/60">
                            <BiUpload />
                            Upload File
                          </label>
                          <input
                            id="file"
                            name="file"
                            type="file"
                            onChange={event =>
                              setFieldValue('file', event.target.files[0])
                            }
                            className="hidden"
                          />
                          <div className="flex items-center gap-4">
                            <span className="text-textT/60">
                              {values.file
                                ? useFileNameRename(values.file.name)
                                : 'No file selected'}
                            </span>
                          </div>
                        </div>
                        <ErrorMessage
                          name="file"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>

                      {!loadding ? (
                        <button
                          type="submit"
                          className="w-full pt-3 pr-5 pb-3 pl-5 text-xl font-medium text-white bg-primaryP rounded-lg transition duration-200 hover:bg-primaryP/80">
                          Submit
                        </button>
                      ) : (
                        <button
                          disabled="true"
                          className="w-full flex justify-center pt-3 pr-5 pb-3 pl-5 text-xl font-medium text-white bg-primaryP rounded-lg transition duration-200 hover:bg-primaryP/80">
                          <img className="w-7" src={load} alt="" />
                        </button>
                      )}
                    </Form>
                  )}
                </Formik>

                <GoogleSignBtn />
                <p className="text-sm font-light text-text">
                  Don&apos;t have an account?{' '}
                  <Link
                    to="/signin"
                    className="font-medium text-primary-600 hover:underline">
                    <span className="text-blue-400">Login here</span>
                  </Link>
                </p>
              </div>
            </div>
            <svg
              viewBox="0 0 91 91"
              className="absolute top-0 left-0 z-0 w-32 h-32 -mt-12 -ml-12 text-primaryP
                fill-current">
              <g stroke="none" strokeWidth="1" fillRule="evenodd">
                <g fillRule="nonzero">
                  <g>
                    <g>
                      <circle cx="3.261" cy="3.445" r="2.72" />
                      <circle cx="15.296" cy="3.445" r="2.719" />
                      <circle cx="27.333" cy="3.445" r="2.72" />
                      <circle cx="39.369" cy="3.445" r="2.72" />
                      <circle cx="51.405" cy="3.445" r="2.72" />
                      <circle cx="63.441" cy="3.445" r="2.72" />
                      <circle cx="75.479" cy="3.445" r="2.72" />
                      <circle cx="87.514" cy="3.445" r="2.719" />
                    </g>
                    <g transform="translate(0 12)">
                      <circle cx="3.261" cy="3.525" r="2.72" />
                      <circle cx="15.296" cy="3.525" r="2.719" />
                      <circle cx="27.333" cy="3.525" r="2.72" />
                      <circle cx="39.369" cy="3.525" r="2.72" />
                      <circle cx="51.405" cy="3.525" r="2.72" />
                      <circle cx="63.441" cy="3.525" r="2.72" />
                      <circle cx="75.479" cy="3.525" r="2.72" />
                      <circle cx="87.514" cy="3.525" r="2.719" />
                    </g>
                    <g transform="translate(0 24)">
                      <circle cx="3.261" cy="3.605" r="2.72" />
                      <circle cx="15.296" cy="3.605" r="2.719" />
                      <circle cx="27.333" cy="3.605" r="2.72" />
                      <circle cx="39.369" cy="3.605" r="2.72" />
                      <circle cx="51.405" cy="3.605" r="2.72" />
                      <circle cx="63.441" cy="3.605" r="2.72" />
                      <circle cx="75.479" cy="3.605" r="2.72" />
                      <circle cx="87.514" cy="3.605" r="2.719" />
                    </g>
                    <g transform="translate(0 36)">
                      <circle cx="3.261" cy="3.686" r="2.72" />
                      <circle cx="15.296" cy="3.686" r="2.719" />
                      <circle cx="27.333" cy="3.686" r="2.72" />
                      <circle cx="39.369" cy="3.686" r="2.72" />
                      <circle cx="51.405" cy="3.686" r="2.72" />
                      <circle cx="63.441" cy="3.686" r="2.72" />
                      <circle cx="75.479" cy="3.686" r="2.72" />
                      <circle cx="87.514" cy="3.686" r="2.719" />
                    </g>
                    <g transform="translate(0 49)">
                      <circle cx="3.261" cy="2.767" r="2.72" />
                      <circle cx="15.296" cy="2.767" r="2.719" />
                      <circle cx="27.333" cy="2.767" r="2.72" />
                      <circle cx="39.369" cy="2.767" r="2.72" />
                      <circle cx="51.405" cy="2.767" r="2.72" />
                      <circle cx="63.441" cy="2.767" r="2.72" />
                      <circle cx="75.479" cy="2.767" r="2.72" />
                      <circle cx="87.514" cy="2.767" r="2.719" />
                    </g>
                    <g transform="translate(0 61)">
                      <circle cx="3.261" cy="2.846" r="2.72" />
                      <circle cx="15.296" cy="2.846" r="2.719" />
                      <circle cx="27.333" cy="2.846" r="2.72" />
                      <circle cx="39.369" cy="2.846" r="2.72" />
                      <circle cx="51.405" cy="2.846" r="2.72" />
                      <circle cx="63.441" cy="2.846" r="2.72" />
                      <circle cx="75.479" cy="2.846" r="2.72" />
                      <circle cx="87.514" cy="2.846" r="2.719" />
                    </g>
                    <g transform="translate(0 73)">
                      <circle cx="3.261" cy="2.926" r="2.72" />
                      <circle cx="15.296" cy="2.926" r="2.719" />
                      <circle cx="27.333" cy="2.926" r="2.72" />
                      <circle cx="39.369" cy="2.926" r="2.72" />
                      <circle cx="51.405" cy="2.926" r="2.72" />
                      <circle cx="63.441" cy="2.926" r="2.72" />
                      <circle cx="75.479" cy="2.926" r="2.72" />
                      <circle cx="87.514" cy="2.926" r="2.719" />
                    </g>
                    <g transform="translate(0 85)">
                      <circle cx="3.261" cy="3.006" r="2.72" />
                      <circle cx="15.296" cy="3.006" r="2.719" />
                      <circle cx="27.333" cy="3.006" r="2.72" />
                      <circle cx="39.369" cy="3.006" r="2.72" />
                      <circle cx="51.405" cy="3.006" r="2.72" />
                      <circle cx="63.441" cy="3.006" r="2.72" />
                      <circle cx="75.479" cy="3.006" r="2.72" />
                      <circle cx="87.514" cy="3.006" r="2.719" />
                    </g>
                  </g>
                </g>
              </g>
            </svg>
            <svg
              viewBox="0 0 91 91"
              className="absolute bottom-0 right-0 z-0 w-32 h-32 -mb-12 -mr-12 text-indigo-500
                fill-current">
              <g stroke="none" strokeWidth="1" fillRule="evenodd">
                <g fillRule="nonzero">
                  <g>
                    <g>
                      <circle cx="3.261" cy="3.445" r="2.72" />
                      <circle cx="15.296" cy="3.445" r="2.719" />
                      <circle cx="27.333" cy="3.445" r="2.72" />
                      <circle cx="39.369" cy="3.445" r="2.72" />
                      <circle cx="51.405" cy="3.445" r="2.72" />
                      <circle cx="63.441" cy="3.445" r="2.72" />
                      <circle cx="75.479" cy="3.445" r="2.72" />
                      <circle cx="87.514" cy="3.445" r="2.719" />
                    </g>
                    <g transform="translate(0 12)">
                      <circle cx="3.261" cy="3.525" r="2.72" />
                      <circle cx="15.296" cy="3.525" r="2.719" />
                      <circle cx="27.333" cy="3.525" r="2.72" />
                      <circle cx="39.369" cy="3.525" r="2.72" />
                      <circle cx="51.405" cy="3.525" r="2.72" />
                      <circle cx="63.441" cy="3.525" r="2.72" />
                      <circle cx="75.479" cy="3.525" r="2.72" />
                      <circle cx="87.514" cy="3.525" r="2.719" />
                    </g>
                    <g transform="translate(0 24)">
                      <circle cx="3.261" cy="3.605" r="2.72" />
                      <circle cx="15.296" cy="3.605" r="2.719" />
                      <circle cx="27.333" cy="3.605" r="2.72" />
                      <circle cx="39.369" cy="3.605" r="2.72" />
                      <circle cx="51.405" cy="3.605" r="2.72" />
                      <circle cx="63.441" cy="3.605" r="2.72" />
                      <circle cx="75.479" cy="3.605" r="2.72" />
                      <circle cx="87.514" cy="3.605" r="2.719" />
                    </g>
                    <g transform="translate(0 36)">
                      <circle cx="3.261" cy="3.686" r="2.72" />
                      <circle cx="15.296" cy="3.686" r="2.719" />
                      <circle cx="27.333" cy="3.686" r="2.72" />
                      <circle cx="39.369" cy="3.686" r="2.72" />
                      <circle cx="51.405" cy="3.686" r="2.72" />
                      <circle cx="63.441" cy="3.686" r="2.72" />
                      <circle cx="75.479" cy="3.686" r="2.72" />
                      <circle cx="87.514" cy="3.686" r="2.719" />
                    </g>
                    <g transform="translate(0 49)">
                      <circle cx="3.261" cy="2.767" r="2.72" />
                      <circle cx="15.296" cy="2.767" r="2.719" />
                      <circle cx="27.333" cy="2.767" r="2.72" />
                      <circle cx="39.369" cy="2.767" r="2.72" />
                      <circle cx="51.405" cy="2.767" r="2.72" />
                      <circle cx="63.441" cy="2.767" r="2.72" />
                      <circle cx="75.479" cy="2.767" r="2.72" />
                      <circle cx="87.514" cy="2.767" r="2.719" />
                    </g>
                    <g transform="translate(0 61)">
                      <circle cx="3.261" cy="2.846" r="2.72" />
                      <circle cx="15.296" cy="2.846" r="2.719" />
                      <circle cx="27.333" cy="2.846" r="2.72" />
                      <circle cx="39.369" cy="2.846" r="2.72" />
                      <circle cx="51.405" cy="2.846" r="2.72" />
                      <circle cx="63.441" cy="2.846" r="2.72" />
                      <circle cx="75.479" cy="2.846" r="2.72" />
                      <circle cx="87.514" cy="2.846" r="2.719" />
                    </g>
                    <g transform="translate(0 73)">
                      <circle cx="3.261" cy="2.926" r="2.72" />
                      <circle cx="15.296" cy="2.926" r="2.719" />
                      <circle cx="27.333" cy="2.926" r="2.72" />
                      <circle cx="39.369" cy="2.926" r="2.72" />
                      <circle cx="51.405" cy="2.926" r="2.72" />
                      <circle cx="63.441" cy="2.926" r="2.72" />
                      <circle cx="75.479" cy="2.926" r="2.72" />
                      <circle cx="87.514" cy="2.926" r="2.719" />
                    </g>
                    <g transform="translate(0 85)">
                      <circle cx="3.261" cy="3.006" r="2.72" />
                      <circle cx="15.296" cy="3.006" r="2.719" />
                      <circle cx="27.333" cy="3.006" r="2.72" />
                      <circle cx="39.369" cy="3.006" r="2.72" />
                      <circle cx="51.405" cy="3.006" r="2.72" />
                      <circle cx="63.441" cy="3.006" r="2.72" />
                      <circle cx="75.479" cy="3.006" r="2.72" />
                      <circle cx="87.514" cy="3.006" r="2.719" />
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </div>
          <div className="w-full order-2 lg:order-1  bg-cover relative max-w-md lg:max-w-2xl lg:w-7/12">
            <div className="flex flex-col items-center justify-center w-full h-full relative lg:pr-10">
              <img src={signup} className="btn-" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
