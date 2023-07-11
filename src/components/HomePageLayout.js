import React from 'react';
import { Outlet } from 'react-router';
import HomeNavbar from './HomeNavbar';
import LeftHomeLayout from './LeftHomeLayout';
import RightHomeLayout from './RightHomeLayout';
import BottomNavbar from './BottomNavbar';

const PageLayout = () => {
  return (
    <>
      <HomeNavbar />
      <main className="bg-gray-200 dark:bg-gray-600 h-[92vh] fixed top-[8vh] left-0 w-full py-5">
        <div className="container mx-auto flex justify-between gap-10">
          <LeftHomeLayout />
          <Outlet />
          <RightHomeLayout />
        </div>
      </main>
      <BottomNavbar />
    </>
  );
};

export default PageLayout;
