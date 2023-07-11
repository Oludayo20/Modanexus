import React from 'react';

import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Call, GitHub } from '@mui/icons-material';

const Footer = () => {
  return (
    <div className="bg-white rounded-lg p-5 dark:bg-gray-800 mt-4">
      <div className="">
          <span className="text-sm text-gray-500 dark:text-gray-300 sm:text-center">
            © 2023 <a href="">Maverick Dev™</a>. All Rights Reserved.{' '}
          </span>

          <span className="text-sm text-gray-500 dark:text-gray-300 sm:text-center">
            Terms and Condition
          </span>

          <div className="flex mt-4 space-x-6 sm:justify-center md:mt-0">
            <a
              href="#"
              className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              <FacebookIcon />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              <InstagramIcon />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
            <TwitterIcon />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              <GitHub />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              <Call />
            </a>
          </div>
        </div>
    </div>
  );
};

export default Footer;
