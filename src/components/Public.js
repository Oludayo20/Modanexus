import React from 'react';
import OnYourMind from './OnYourMind';
import Feeds from './Feeds';
import LeftBar from './LeftBar';
import Register from '../features/auth/Register';
import { Outlet } from 'react-router-dom';
import { PublicFooter } from './PublicLayout';

const Public = () => {
  return (
    <>
      <div
        className="flex-1 h-[90vh] overflow-auto pb-10"
        // className="hidden flex-1 h-[90vh] overflow-auto lg:block flex-[0.8] pb-10 p-4"
      >
        <Outlet />
      </div>
    </>
  );
};

export default Public;
