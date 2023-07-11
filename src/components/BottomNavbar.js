import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import MessageIcon from '@mui/icons-material/Message';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import LightModeIcon from '@mui/icons-material/LightMode';
import HeaderLink from './header/HerderLink';

//

import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import GroupIcon from '@mui/icons-material/Group';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import { Avatar } from '@mui/material';
import { NavLink } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const BottomNavbar = () => {
  const userData = useAuth();

  return (
    <div
      className="hidden bot bg-white dark:bg-gray-800 fixed left-0 bottom-0 w-full"
      id="bot"
    >
      <div className="container mx-auto h-[10vh] flex justify-between">
        <NavLink to="/dash" className="flex">
          <HeaderLink Icon={HomeRoundedIcon} text="Home" activeTop="dash" />
        </NavLink>

        <NavLink to="/dash/chat" className="flex">
          <HeaderLink Icon={ChatIcon} text="Chat" activeTop="chat" />
        </NavLink>

        <NavLink to="/dash/profile" className="flex">
          <HeaderLink Icon={Avatar} text="Me" avatar activeTop="profile" />
        </NavLink>
      </div>
    </div>
  );
};

export default BottomNavbar;
