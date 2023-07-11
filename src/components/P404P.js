import React from 'react';
import { Outlet } from 'react-router-dom';

const NotFound = () => {
  const handleBack = () => {
    window.history.back();
  };
  return (
    <div className="bg-gradient-to-r from-purple-300 to-blue-200">
      <div className="w-9/12 m-auto py-16 min-h-screen flex items-center justify-center">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg pb-8">
          <div className="border-t border-gray-200 text-center pt-8">
            <h1 className="text-9xl font-bold text-purple-400">404</h1>
            <h1 className="text-6xl font-medium py-8">oops! Page not found</h1>
            <p className="text-2xl pb-8 px-12 font-medium">
              Oops! The page you are looking for does not exist. It might have
              been moved or deleted.
            </p>
            <button
              onClick={handleBack}
              className="bg-gradient-to-r from-purple-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white font-semibold px-6 py-3 rounded-md mr-6"
            >
              GO BACK
            </button>
            <button className="bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-500 text-white font-semibold px-6 py-3 rounded-md">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
    // <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
    //   <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
    //   <p className="text-gray-800 mb-8">Oops! Page not found.</p>
    //   <button
    //     onClick={handleBack}
    //     className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    //   >
    //     Go back
    //   </button>
    //   <Outlet />
    // </div>
  );
};

export default NotFound;
