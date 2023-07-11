import React from 'react';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { Avatar } from '@mui/material';
import RightBar from './RightBar';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const LeftBar = () => {
  let session = '';

  let content = (
    <div className="space-y-2 min-w-max max-w-lg">
      {/* Top */}
      <div className="bg-white dark:bg-[#1D2226] rounded-lg overflow-hidden relative flex flex-col items-center text-center border border-gray-300 dark:border-none">
        <div className="relative w-full h-14">
          {/* <img src="https://rb.gy/i26zak" layout="fill" priority /> */}
          <div className="flex justify-center items-center h-screen">
            <img
              src="https://rb.gy/i26zak"
              alt="Picture of the author"
              className="w-500 h-500 object-cover"
            />
          </div>
        </div>
        <Avatar
          // src={session}
          className="!h-14 !w-14 !border-2 !absolute !top-4 !cursor-pointer"
        />
        <div className="mt-5 py-4 space-x-0.5">
          <h4 className="hover:underline decoration-purple-700 underline-offset-1 cursor-pointer">
            John Doo
          </h4>
          <p className="text-white text-sm">John@gmail.com</p>
        </div>

        <div className="hidden md:inline text-left text-white text-sm">
          <div className="font-medium sidebarButton space-y-0.5">
            <div className="flex justify-between space-x-2">
              <h4>Who viewed your profile</h4>
              <span className="text-blue-500">321</span>
            </div>
            <div className="flex justify-between space-x-2">
              <h4>Views of your post</h4>
              <span className="text-blue-500">1,892</span>
            </div>
          </div>

          <div className="sidebarButton">
            <h4 className="leading-4 text-xs">
              Access exclusive tools & insights
            </h4>
            <h4 className="text-white font-medium">
              <span className="w-3 h-3 bg-gradient-to-tr from-yellow-700 to-yellow-200 inline-block rounded-sm mr-1" />{' '}
              Try Premium for free
            </h4>
          </div>

          <div className="sidebarButton flex items-center space-x-1.5">
            <BookmarkOutlinedIcon className="!-ml-1" />
            <h4 className="dark:text-white font-medium">My items</h4>
          </div>
        </div>
      </div>
      {/* Bottom */}
      <div className="hidden md:flex bg-white dark:bg-[#1D2226] text-black/70 dark:text-white/75 rounded-lg overflow-hidden flex-col space-y-2 pt-2.5 sticky top-20 border border-gray-300 dark:border-none">
        <p className="sidebarLink">Groups</p>
        <div className="flex items-center justify-between">
          <p className="sidebarLink">Events</p>
          <AddRoundedIcon className="!h-5" />
        </div>
        <p className="sidebarLink">Followed Hashtags</p>
        <div className="sidebarButton text-center">
          <h4 className="dark:text-white font-medium text-sm">Discover More</h4>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-5">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Avatar className="h-10 w-10 rounded-full object-cover" />
            <div className="ml-5">
              <h1 className="dark:text-gray-200">John Doo</h1>
              <p>5000 Friends</p>
            </div>
          </div>
          <PersonAddIcon className="text-lg" />
        </div>

        <hr className="my-5" />

        <div className="flex items-center">
          <LocationOnIcon className="text-lg" />
          <p className="ml-5">Some Place in Nigeria</p>
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
    </>
  );
};

export default LeftBar;
