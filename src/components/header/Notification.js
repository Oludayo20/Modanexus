import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Transition from '../../utils/Transition';
import NotificationsIcon from '@mui/icons-material/Notifications';

function Notifications({ feed, active, text }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef(null);
  const dropdown = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <div className="relative inline-flex">
      <button
        ref={trigger}
        className={`ml- mr-2 md:ml-2 !h-7 !w-7 lg:!-mb-1 cursor-pointer flex flex-col justify-center items-center ${
          feed
            ? 'text-black/60 hover:text-black dark:text-white/75 dark:hover:text-white lg:-mb-1.5 space-y-1'
            : 'text-gray-500 hover:text-gray-700'
        } ${active && '!text-black dark:!text-white'}`}
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <NotificationsIcon className="!h-7 !w-7 lg:!-mb-1 " />
        <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></div>
        <h4
          className={`text-sm ${
            feed && 'hidden lg:flex justify-center w-full mx-auto'
          }`}
        >
          {text}
        </h4>
      </button>

      <Transition
        // className="bg-white  mt-1 fixed py-2.5 inset-0 z-50 overflow-hidden flex items-start top-20 mb-4 justify-center transform px-4 sm:px-6"
        className="origin-top-right z-[-5] absolute top-full right-0 fixed mr-5 px-20 flex items-start justify-center transform -mr-48 sm:mr-0 min-w-80 bg-white dark:bg-gray-700 border border-slate-200 py-2.5 rounded shadow-lg overflow-hidden mt-1"
        show={dropdownOpen}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div
          className=""
          ref={dropdown}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
        >
          <div className="text-xs font-semibold text-slate-400 uppercase pt-1.5 pb-2 px-4">
            Notifications
          </div>
          <ul>
            <li className="border-b border-slate-200 last:border-0">
              <Link
                className="block py-2 px-4 hover:bg-slate-50"
                to="#0"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span className="block text-sm mb-2">
                  📣{' '}
                  <span className="font-medium text-slate-800">
                    Edit your information in a swipe
                  </span>{' '}
                  Sint occaecat cupidatat non proident, sunt in culpa qui
                  officia deserunt mollit anim.
                </span>
                <span className="block text-xs font-medium text-slate-400">
                  Feb 12, 2021
                </span>
              </Link>
            </li>
            <li className="border-b border-slate-200 last:border-0">
              <Link
                className="block py-2 px-4 hover:bg-slate-50"
                to="#0"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span className="block text-sm mb-2">
                  📣{' '}
                  <span className="font-medium text-slate-800">
                    Edit your information in a swipe
                  </span>{' '}
                  Sint occaecat cupidatat non proident, sunt in culpa qui
                  officia deserunt mollit anim.
                </span>
                <span className="block text-xs font-medium text-slate-400">
                  Feb 9, 2021
                </span>
              </Link>
            </li>
            <li className="border-b border-slate-200 last:border-0">
              <Link
                className="block py-2 px-4 hover:bg-slate-50"
                to="#0"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span className="block text-sm mb-2">
                  🚀
                  <span className="font-medium text-slate-800">
                    Say goodbye to paper receipts!
                  </span>{' '}
                  Sint occaecat cupidatat non proident, sunt in culpa qui
                  officia deserunt mollit anim.
                </span>
                <span className="block text-xs font-medium text-slate-400">
                  Jan 24, 2020
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  );
}

export default Notifications;
