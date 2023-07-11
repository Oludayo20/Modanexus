import React from 'react';
import Sponsor from './Sponsor';
import FriendsList from '../features/friends/FriendsList';
import Footer from './Footer';

const RightHomeLayout = () => {
  return (
    <div className="hidden lg:block flex-[0.6]">
      <Sponsor />
      <FriendsList />
      <Footer />
    </div>
  );
};

export default RightHomeLayout;
