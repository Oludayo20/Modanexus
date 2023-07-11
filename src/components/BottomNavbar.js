import React, { useEffect, useState } from 'react';
import HeaderLink from './header/HerderLink';
import ChatIcon from '@mui/icons-material/Chat';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
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
        <NavLink to="/home" className="flex">
          <HeaderLink Icon={HomeRoundedIcon} text="Home" activeTop="home" />
        </NavLink>

        <NavLink to="chat" className="flex">
          <HeaderLink Icon={ChatIcon} text="Chat" activeTop="chat" />
        </NavLink>

        <NavLink to="profile" className="flex">
          <HeaderLink Icon={Avatar} text="Me" avatar activeTop="profile" />
        </NavLink>
      </div>
    </div>
  );
};

export default BottomNavbar;
