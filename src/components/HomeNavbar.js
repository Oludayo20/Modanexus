import React, { useEffect, useState } from 'react';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import HeaderLink from './header/HerderLink';
import ChatIcon from '@mui/icons-material/Chat';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import Notifications from './header/Notification';
import { NavLink } from 'react-router-dom';

const HomeNavbar = () => {
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
      <div className="container mx-auto h-[8vh] flex justify-between">
        <div className="flex items-center">
          <h1 className="logo text-2xl md:text-4xl font-bold text-red-500 tracking-wide">
            Mod<span className="text-gray-400">aNe</span>xus
          </h1>
        </div>

        {/* <div className="flex items-center w-[30vw]">
          <SearchModal text="Search" feed active />
        </div> */}

        <div className="flex items-center justify-between space-x-8">
          <NavLink
            to="home"
            className="hidden md:inline-flex cursor-pointer text-lg hover:text-black hover:scale-110 transition-all dark:text-gray-200"
          >
            <HeaderLink
              Icon={HomeRoundedIcon}
              text="Home"
              feed
              active="home"
              hidden
            />
          </NavLink>

          <NavLink
            to="chat"
            className="hidden md:inline-flex cursor-pointer text-lg hover:text-black hover:scale-110 transition-all dark:text-gray-200"
          >
            <HeaderLink Icon={ChatIcon} active="chat" text="Chat" feed hidden />
          </NavLink>

          <Notifications text="Notifications" feed active />

          {currentTheme === 'dark' ? (
            <div
              onClick={() => changeTheme('light')}
              className="cursor-pointer text-lg hover:text-black hover:scale-110 transition-all dark:text-gray-200"
            >
              <HeaderLink
                Icon={LightModeIcon}
                text="Light"
                feed
                className="cursor-pointer text-lg hover:text-black hover:scale-110 transition-all dark:text-gray-200"
              />
            </div>
          ) : (
            <div
              onClick={() => changeTheme('dark')}
              className="cursor-pointer text-lg hover:text-black hover:scale-110 transition-all dark:text-gray-200"
            >
              <HeaderLink
                Icon={DarkModeIcon}
                text="Light"
                feed
                className="cursor-pointer text-lg hover:text-black hover:scale-110 transition-all dark:text-gray-200"
              />
            </div>
          )}

          {/* <li className="ml-2 md:ml-5">
            <MessageIcon className="cursor-pointer text-lg hover:text-black hover:scale-110 transition-all dark:text-gray-200" />
          </li>
          <li className="ml-2 md:ml-5">
            <NotificationsNoneIcon className="cursor-pointer text-lg hover:text-black hover:scale-110 transition-all dark:text-gray-200" />
          </li>
          <li className="ml-2 md:ml-5">
            <button className="px-4 py-1 rounded-lg bg-red-400 text-white transition-all">
              Register
            </button>
          </li> */}
        </div>
      </div>
    </div>
  );
};

export default HomeNavbar;
