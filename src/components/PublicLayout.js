import React, { useEffect, useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import HeaderLink from './header/HerderLink';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Call, GitHub } from '@mui/icons-material';

export const PublicLayout = () => {
  return (
    <div className="grid grid-flow-col justify-stretch h-screen">
      <PublicHeader />

      {/* Main content */}
      <div className="bg-gray-200 dark:bg-gray-600 h-auto w-full py-10">
        <div className="container mx-auto flex align-items-center justify-center gap-10">
          {/* Content */}
          <div className="mb-32 mt-16 h-full overflow-auto">
            <Outlet />
          </div>
        </div>
      </div>

      <PublicFooter />
    </div>
  );
};

export const PublicHeader = () => {
  const [currentTheme, setCurrentTheme] = useState('');

  useEffect(() => {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
      setCurrentTheme('dark');
    } else {
      document.documentElement.classList.remove('dark');
      setCurrentTheme('light');
    }
  });

  const changeTheme = (theme) => {
    if (theme == 'light') {
      localStorage.theme = 'light';
      document.documentElement.classList.remove('dark');
      setCurrentTheme('light');
    } else {
      localStorage.theme = 'dark';
      document.documentElement.classList.add('dark');
      setCurrentTheme('dark');
    }
  };
  return (
    <div className="bg-white dark:bg-gray-800 fixed left-0 top-0 w-full">
      <div className="container mx-auto h-[7vh] flex justify-between">
        <div className="flex items-center">
          <h1 className="logo text-2xl md:text-4xl font-bold text-red-500 tracking-wide">
            Mod<span className="text-gray-400">aNe</span>xus
          </h1>
        </div>

        <ul className="flex items-center">
          <li className="ml-5 md:ml-10">
            {currentTheme === 'dark' ? (
              <div onClick={() => changeTheme('light')}>
                <HeaderLink
                  Icon={LightModeIcon}
                  text="Light"
                  feed
                  className="cursor-pointer text-lg hover:text-black hover:scale-110 transition-all dark:text-gray-200"
                />
              </div>
            ) : (
              <div onClick={() => changeTheme('dark')}>
                <HeaderLink
                  Icon={DarkModeIcon}
                  text="Light"
                  feed
                  className="cursor-pointer text-lg hover:text-black hover:scale-110 transition-all dark:text-gray-200"
                />
              </div>
            )}
          </li>
          {/* <li className="hidden sm:flex ml-5 ">
            <NavLink
              to="/login"
              className="px-4 py-2 bg-red-500 hover:bg-red-700 focus:bg-red-300 text-white font-semibold rounded"
            >
              Login
            </NavLink>
          </li> */}
        </ul>
      </div>
    </div>
  );
};

export const PublicFooter = () => {
  return (
    <div className="fixed left-0 bottom-0 w-full">
      <div className="bg-white p-5 dark:bg-gray-800">
        <div className="">
          <span className="text-sm text-gray-500 dark:text-gray-300 sm:text-center">
            © 2023 <a href="">Maverick Dev™</a>. All Rights Reserved.{' '}
          </span>

          <span className="text-sm text-gray-500 dark:text-gray-300 sm:text-center">
            Terms and Condition
          </span>

          <div className="flex mt-4 space-x-6 sm:justify-center md:mt-0">
            <a
              href="#"
              className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              <FacebookIcon />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              <InstagramIcon />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              <TwitterIcon />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              <GitHub />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              <Call />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default { PublicLayout, PublicHeader, PublicFooter };
