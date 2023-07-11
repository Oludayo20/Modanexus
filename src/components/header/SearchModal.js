import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Transition from '../../utils/Transition';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

function SearchModal({ hidden, feed, active, text }) {
  const modalContent = useRef(null);
  const searchInput = useRef(null);

  const [searchModalOpen, setSearchModalOpen] = useState(false);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!searchModalOpen || modalContent.current.contains(target)) return;
      setSearchModalOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!searchModalOpen || keyCode !== 27) return;
      setSearchModalOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    searchModalOpen && searchInput.current.focus();
  }, [searchModalOpen]);

  return (
    <>
      {/* <button
        className={`md:ml-10 cursor-pointer flex flex-col justify-center items-center ${
          feed
            ? 'text-black/60 hover:text-black dark:text-white/75 dark:hover:text-white lg:-mb-1.5 space-y-1'
            : 'text-gray-500 hover:text-gray-700'
        } ${active && '!text-black dark:!text-white'}`}
        onClick={(e) => {
          e.stopPropagation();
          setSearchModalOpen(true);
        }}
        aria-controls="search-modal"
      >
        <SearchRoundedIcon className="!h-7 !w-7 lg:!-mb-1 " />

        <h4
          className={`text-sm ${
            feed && 'hidden lg:flex justify-center w-full mx-auto'
          }`}
        >
          {text}
        </h4>
      </button> */}

      <form className="w-full">
        <label
          for="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Mockups, Logos..."
            required
          />
          <button
            type="submit"
            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>
      {/* Modal BackDrop */}
      <Transition
        className="fixed inset-0 bg-slate-500 bg-opacity-30 z-50 transition-opacity"
        show={searchModalOpen}
        enter="transition ease-out duration-200"
        enterStart="opacity-0"
        enterEnd="opacity-100"
        leave="transition ease-out duration-100"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
        aria-hidden="true"
      />
      {/* Modal dialog */}
      <Transition
        id={'2'}
        className="fixed inset-0 z-50 overflow-hidden flex items-start top-20 mb-4 justify-center transform px-4 sm:px-6"
        role="dialog"
        aria-modal="true"
        show={searchModalOpen}
        enter="transition ease-in-out duration-200"
        enterStart="opacity-0 translate-y-4"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-in-out duration-200"
        leaveStart="opacity-100 translate-y-0"
        leaveEnd="opacity-0 translate-y-4"
      >
        <div
          ref={modalContent}
          className="bg-white overflow-auto max-w-2xl w-full max-h-full rounded shadow-lg"
        >
          {/* Search form */}
          <form className="border-b border-green-500">
            <div className="relative">
              <label htmlFor={'searchId'} className="sr-only">
                Search
              </label>
              <input
                id={'searchId'}
                className="w-full border-0 focus:ring-transparent placeholder-slate-600 appearance-none py-3 pl-10 pr-4"
                type="search"
                placeholder="Search Anything…"
                ref={searchInput}
              />
              <button
                className="absolute inset-0 right-auto group"
                type="submit"
                aria-label="Search"
              >
                <svg
                  className="w-4 h-4 shrink-0 fill-current text-slate-600 group-hover:text-green-500 ml-4 mr-2"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
                  <path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
                </svg>
              </button>
            </div>
          </form>
          <div className="py-4 px-2">
            {/* Recent searches */}
            <div className="mb-3 last:mb-0">
              <div className="text-xs font-semibold text-slate-500 uppercase px-2 mb-2">
                Recent searches
              </div>
              <ul className="text-sm">
                <li>
                  <Link
                    className="flex items-center p-2 text-slate-600 hover:text-white hover:bg-green-500 rounded group"
                    to="#0"
                    onClick={() => setSearchModalOpen(!searchModalOpen)}
                  >
                    <svg
                      className="w-4 h-4 fill-current text-slate-600 group-hover:text-white group-hover:text-opacity-50 shrink-0 mr-3"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.707 14.293v.001a1 1 0 01-1.414 1.414L11.185 12.6A6.935 6.935 0 017 14a7.016 7.016 0 01-5.173-2.308l-1.537 1.3L0 8l4.873 1.12-1.521 1.285a4.971 4.971 0 008.59-2.835l1.979.454a6.971 6.971 0 01-1.321 3.157l3.107 3.112zM14 6L9.127 4.88l1.521-1.28a4.971 4.971 0 00-8.59 2.83L.084 5.976a6.977 6.977 0 0112.089-3.668l1.537-1.3L14 6z" />
                    </svg>
                    <span>Form Builder - 23 hours on-demand video</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className="flex items-center p-2 text-slate-600 hover:text-white hover:bg-green-500 rounded group"
                    to="#0"
                    onClick={() => setSearchModalOpen(!searchModalOpen)}
                  >
                    <svg
                      className="w-4 h-4 fill-current text-slate-600 group-hover:text-white group-hover:text-opacity-50 shrink-0 mr-3"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.707 14.293v.001a1 1 0 01-1.414 1.414L11.185 12.6A6.935 6.935 0 017 14a7.016 7.016 0 01-5.173-2.308l-1.537 1.3L0 8l4.873 1.12-1.521 1.285a4.971 4.971 0 008.59-2.835l1.979.454a6.971 6.971 0 01-1.321 3.157l3.107 3.112zM14 6L9.127 4.88l1.521-1.28a4.971 4.971 0 00-8.59 2.83L.084 5.976a6.977 6.977 0 0112.089-3.668l1.537-1.3L14 6z" />
                    </svg>
                    <span>Access Mosaic on mobile and TV</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className="flex items-center p-2 text-slate-600 hover:text-white hover:bg-green-500 rounded group"
                    to="#0"
                    onClick={() => setSearchModalOpen(!searchModalOpen)}
                  >
                    <svg
                      className="w-4 h-4 fill-current text-slate-600 group-hover:text-white group-hover:text-opacity-50 shrink-0 mr-3"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.707 14.293v.001a1 1 0 01-1.414 1.414L11.185 12.6A6.935 6.935 0 017 14a7.016 7.016 0 01-5.173-2.308l-1.537 1.3L0 8l4.873 1.12-1.521 1.285a4.971 4.971 0 008.59-2.835l1.979.454a6.971 6.971 0 01-1.321 3.157l3.107 3.112zM14 6L9.127 4.88l1.521-1.28a4.971 4.971 0 00-8.59 2.83L.084 5.976a6.977 6.977 0 0112.089-3.668l1.537-1.3L14 6z" />
                    </svg>
                    <span>Product Update - Q4 2021</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className="flex items-center p-2 text-slate-600 hover:text-white hover:bg-green-500 rounded group"
                    to="#0"
                    onClick={() => setSearchModalOpen(!searchModalOpen)}
                  >
                    <svg
                      className="w-4 h-4 fill-current text-slate-600 group-hover:text-white group-hover:text-opacity-50 shrink-0 mr-3"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.707 14.293v.001a1 1 0 01-1.414 1.414L11.185 12.6A6.935 6.935 0 017 14a7.016 7.016 0 01-5.173-2.308l-1.537 1.3L0 8l4.873 1.12-1.521 1.285a4.971 4.971 0 008.59-2.835l1.979.454a6.971 6.971 0 01-1.321 3.157l3.107 3.112zM14 6L9.127 4.88l1.521-1.28a4.971 4.971 0 00-8.59 2.83L.084 5.976a6.977 6.977 0 0112.089-3.668l1.537-1.3L14 6z" />
                    </svg>
                    <span>Master Digital Marketing Strategy course</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className="flex items-center p-2 text-slate-600 hover:text-white hover:bg-green-500 rounded group"
                    to="#0"
                    onClick={() => setSearchModalOpen(!searchModalOpen)}
                  >
                    <svg
                      className="w-4 h-4 fill-current text-slate-600 group-hover:text-white group-hover:text-opacity-50 shrink-0 mr-3"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.707 14.293v.001a1 1 0 01-1.414 1.414L11.185 12.6A6.935 6.935 0 017 14a7.016 7.016 0 01-5.173-2.308l-1.537 1.3L0 8l4.873 1.12-1.521 1.285a4.971 4.971 0 008.59-2.835l1.979.454a6.971 6.971 0 01-1.321 3.157l3.107 3.112zM14 6L9.127 4.88l1.521-1.28a4.971 4.971 0 00-8.59 2.83L.084 5.976a6.977 6.977 0 0112.089-3.668l1.537-1.3L14 6z" />
                    </svg>
                    <span>Dedicated forms for products</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className="flex items-center p-2 text-slate-600 hover:text-white hover:bg-green-500 rounded group"
                    to="#0"
                    onClick={() => setSearchModalOpen(!searchModalOpen)}
                  >
                    <svg
                      className="w-4 h-4 fill-current text-slate-600 group-hover:text-white group-hover:text-opacity-50 shrink-0 mr-3"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.707 14.293v.001a1 1 0 01-1.414 1.414L11.185 12.6A6.935 6.935 0 017 14a7.016 7.016 0 01-5.173-2.308l-1.537 1.3L0 8l4.873 1.12-1.521 1.285a4.971 4.971 0 008.59-2.835l1.979.454a6.971 6.971 0 01-1.321 3.157l3.107 3.112zM14 6L9.127 4.88l1.521-1.28a4.971 4.971 0 00-8.59 2.83L.084 5.976a6.977 6.977 0 0112.089-3.668l1.537-1.3L14 6z" />
                    </svg>
                    <span>Product Update - Q4 2021</span>
                  </Link>
                </li>
              </ul>
            </div>
            {/* Recent pages */}
            <div className="mb-3 last:mb-0">
              <div className="text-xs font-semibold text-slate-600 uppercase px-2 mb-2">
                Recent pages
              </div>
              <ul className="text-sm">
                <li>
                  <Link
                    className="flex items-center p-2 text-slate-600 hover:text-white hover:bg-green-500 rounded group"
                    to="#0"
                    onClick={() => setSearchModalOpen(!searchModalOpen)}
                  >
                    <svg
                      className="w-4 h-4 fill-current text-slate-600 group-hover:text-white group-hover:text-opacity-50 shrink-0 mr-3"
                      viewBox="0 0 16 16"
                    >
                      <path d="M14 0H2c-.6 0-1 .4-1 1v14c0 .6.4 1 1 1h8l5-5V1c0-.6-.4-1-1-1zM3 2h10v8H9v4H3V2z" />
                    </svg>
                    <span>
                      <span className="font-medium text-slate-600 group-hover:text-white">
                        Messages
                      </span>{' '}
                      - Conversation / … / Mike Mills
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    className="flex items-center p-2 text-slate-600 hover:text-white hover:bg-green-500 rounded group"
                    to="#0"
                    onClick={() => setSearchModalOpen(!searchModalOpen)}
                  >
                    <svg
                      className="w-4 h-4 fill-current text-slate-600 group-hover:text-white group-hover:text-opacity-50 shrink-0 mr-3"
                      viewBox="0 0 16 16"
                    >
                      <path d="M14 0H2c-.6 0-1 .4-1 1v14c0 .6.4 1 1 1h8l5-5V1c0-.6-.4-1-1-1zM3 2h10v8H9v4H3V2z" />
                    </svg>
                    <span>
                      <span className="font-medium text-slate-600 group-hover:text-white">
                        Messages
                      </span>{' '}
                      - Conversation / … / Eva Patrick
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Transition>
    </>
  );
}

export default SearchModal;
