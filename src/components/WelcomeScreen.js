import React from 'react';
import { Link } from 'react-router-dom';
import './WelcomeScreen.css';

const WelcomeScreen = () => {
  return (
    <div className="flex flex-col">
      {/* Top Layer */}
      <div className="h-[50vh] flex items-center justify-center p-4">
        <div className="contain">
          <span className="text-5xl italic font-bold">M</span>
          <span className="text-5xl italic font-bold">O</span>
          <span className="text-5xl italic font-bold">D</span>
          <span className="text-5xl italic font-bold">A</span>
          <span className="text-5xl italic font-bold">N</span>
          <span className="text-5xl italic font-bold">E</span>
          <span className="text-5xl italic font-bold">X</span>
          <span className="text-5xl italic font-bold">U</span>
          <span className="text-5xl italic font-bold">S</span>
        </div>
      </div>

      {/* Middle Layer */}
      <div className="h-[20vh] flex flex-col items-center justify-center">
        <h3 className="text-lg dark:text-white mb-6">
          Fashion social media platforms have revolutionized the way people
          engage with and explore the world of fashion. These platforms provide
          a dedicated space for fashion enthusiasts, influencers, brands, and
          consumers to connect, share, and discover the latest trends, styles,
          and inspirations.
        </h3>
      </div>

      {/* Bottom Layer */}
      <div className="h-1/1 flex items-center justify-center p-4">
        <div className="flex justify-center space-x-12">
          <Link
            to="login"
            className="w-28 text-center bg-red-500 hover:bg-gray-200 text-white font-semibold py-2 px-4 rounded"
          >
            LOGIN
          </Link>
          <Link
            to="register"
            className="w-28 text-center border-2 border-red-500 hover:bg-gray-200 text-red-500 font-semibold py-2 px-4 rounded"
          >
            REGISTER
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
