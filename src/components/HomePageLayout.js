import React from 'react';
import { Outlet } from 'react-router';
import HomeNavbar from './HomeNavbar';
import BottomNavbar from './BottomNavbar';

const PageLayout = () => {
  return (
    <div className="">
      <HomeNavbar />
      {/* <MainLayout /> */}
      <Outlet />
      <BottomNavbar />
    </div>
  );
};

export default PageLayout;
