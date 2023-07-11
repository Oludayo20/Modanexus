import React from 'react';
import Sponsor from './Sponsor';
import Footer from './Footer';

const RightHomeLayout = () => {
  return (
    <div className="hidden lg:block flex-[0.6]">
      <Sponsor />
      <Footer />
    </div>
  );
};

export default RightHomeLayout;
