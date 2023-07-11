import React from 'react';
import { Outlet } from 'react-router';
import LeftHomeLayout from './LeftHomeLayout';
import RightHomeLayout from './RightHomeLayout';

const MainLayout = () => {
  return (
    <div className="bg-gray-200 dark:bg-gray-600 h-[92vh] fixed top-[8vh] bottom-[8vh] left-0 w-full py-5">
      <div className="container mx-auto flex justify-between gap-10">
        <LeftHomeLayout />
        <div className="flex-1 h-[90vh] overflow-auto pb-10">
          <div className="relative">
            <Outlet />
          </div>
        </div>
        <RightHomeLayout />
      </div>
    </div>
  );
};

export default MainLayout;
