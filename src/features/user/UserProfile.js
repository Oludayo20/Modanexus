import { Avatar } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import { useGetUserQuery } from './userApiSlice';
import { memo, useEffect, useRef, useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LoadingSpinner from '../../utils/LoadingSpinner';
import ToastContainer from '../../utils/ToastContainer';
import NearbyErrorIcon from '@mui/icons-material/NearbyError';
import FriendsList from '../friends/FriendsList';

const UserProfile = () => {
  const modalContent = useRef(null);
  const {
    data: user,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetUserQuery();

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenuTop = () => setIsOpen(!isOpen);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!isOpen) return;
      setIsOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, []);

  let content;

  if (isSuccess) {
    const { data } = user;

    let content = (
      <div className="h-[90vh] overflow-auto pro pb-28">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-5 dark:text-gray-200">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Avatar
                src={`https://res.cloudinary.com/dwy4eglsn/image/upload/v1686519924/${data?.profilePicture}.jpg`}
                style={{ backgroundColor: 'red' }}
                className="h-10 w-10 rounded-full object-cover"
              />
              <div className="ml-5">
                <h1 className="dark:text-gray-200">
                  {data?.firstName} {data?.lastName}
                </h1>
                <p>{data?.role}</p>
              </div>
            </div>
            {/* <MoreVertIcon className="text-lg" /> */}
            <div className="ml-4 relative">
              <button className="text-lg" onClick={toggleMenuTop}>
                <MoreVertIcon />
              </button>
              {isOpen && (
                <div className="absolute right-0 w-48 bg-white dark:bg-gray-700 rounded shadow-md mt-2">
                  <ul className="py-2">
                    <li className="px-4 py-2 hover:bg-gray-100">
                      Edit Account
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100">
                      2FA Settings
                    </li>
                    <li className="text-red-500 px-4 py-2 hover:bg-gray-100">
                      Report Complain
                    </li>
                    <li className="text-red-500 px-4 py-2 hover:bg-gray-100">
                      Delete Account
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          <hr className="my-5" />

          <div className="flex items-center">
            <LocationOnIcon className="text-lg" />
            <p className="ml-5">
              {data?.stateOfResidence}, {data?.countryOfResidence}
            </p>
          </div>

          <div className="flex items-center mt-2">
            <WorkIcon className="text-lg" />
            <p className="ml-5">Some Degree</p>
          </div>

          <hr className="my-5" />

          <div className="flex justify-between items-center">
            <p>Who view your profile ?</p>
            <h2>300</h2>
          </div>

          <div className="flex justify-between items-center mt-2">
            <p>Impress from your friend</p>
            <h2>3900</h2>
          </div>

          <hr className="my-5" />

          <h2>Social Media</h2>
          <div className="flex justify-between mt-5">
            <div className="flex items-center">
              <TwitterIcon className="text-lg" />
              <p className="ml-5 font-semibold">Twitter</p>
            </div>
          </div>

          <div className="flex justify-between mt-5">
            <div className="flex items-center">
              <InstagramIcon className="text-lg" />
              <p className="ml-5 font-semibold">Instagram</p>
            </div>
          </div>
        </div>
        <FriendsList />
      </div>
    );

    return content;
  }

  return (
    <div className="">
      {isError && (
        <ToastContainer
          messages={error?.data?.errors}
          Icon={NearbyErrorIcon}
          color={'bg-red-500'}
        />
      )}
      {isSuccess && content} {isLoading && <LoadingSpinner />}
    </div>
  );
};

const memoizedUserProfile = memo(UserProfile);
export default memoizedUserProfile;
