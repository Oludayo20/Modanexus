import { Link, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useSearchMutation } from '../user/userApiSlice';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Helmet from '../../components/Helmet';
import LoadingSpinner from '../../utils/LoadingSpinner';

const Search = () => {
  const handleBack = () => window.history.back();

  const [search, { isLoading, isSuccess, isError, error }] =
    useSearchMutation();

  const [searchValue, setSearchValue] = useState('');
  const [searchRes, setSearchRes] = useState(null);

  const navigate = useNavigate();

  const onSearch = async (e) => {
    e.preventDefault();
    const { data } = await search(searchValue);
    setSearchRes(data?.data);
  };

  const onClickUser = (userId) => {
    navigate(`/user/${userId}`);
  };

  let schRes;

  if (searchRes?.length > 0) {
    schRes = searchRes.map((data) => (
      <div key={data.id} onClick={() => onClickUser(data.id)}>
        <div className="flex items-center">
          <div className="relative">
            <Avatar
              src={`https://res.cloudinary.com/dwy4eglsn/image/upload/v1686519924/${data.profilePicture}.jpg`}
              style={{ backgroundColor: 'red' }}
              className="h-10 w-10 rounded-full object-cover"
            />
            <div className="bg-green-500 h-3 w-3 absolute bottom-0 rounded-full right-0"></div>
          </div>
          <div className="ml-5">
            <p className="dark:text-gray-200 text-gray-800 font-bold">
              {data.firstName} {data.lastName}
            </p>
            <div className="flex">
              <p className="mr-2">
                Role: <span className="dark:text-gray-300">{data.role}.</span>
              </p>
              <p className="mr-2">
                <LocationOnIcon />
                <span className="dark:text-gray-300">
                  {data.countryOfResidence} {data.stateOfResidence}.
                </span>
              </p>
              <p className="text-sm dark:text-gray-300">
                {Math.floor(Math.random() * 100) + 1} M-F
              </p>
            </div>
          </div>
        </div>
        <hr className="my-3" />
      </div>
    ));
  } else if (searchRes?.length === 0) {
    schRes = (
      <h3 className="dark:text-gray-200 text-gray-800">{`User with the name ${searchValue} not found!`}</h3>
    );
  }

  return (
    <Helmet title="Search">
      <div className="">
        {isLoading && <LoadingSpinner />}
        <div className="flex items-center justify-between text-slate-600 cursor-pointer">
          <ArrowBackIcon
            onClick={handleBack}
            className="w-5 h-5 dark:text-gray-200"
          />
          <div className="text-xs font-semibold  uppercase pt-1.5 pb-2 px-4">
            Search
          </div>
        </div>

        <form className="w-full" onSubmit={onSearch}>
          <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <SearchIcon className="w-5 h-5 text-gray-400 dark:text-gray-400" />
            </div>
            <input
              onChange={(e) => setSearchValue(e.target.value)}
              value={searchValue}
              type="search"
              id="default-search"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-400 focus:border-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-400 dark:focus:border-blue-400"
              placeholder="Search for username"
              required
            />
            <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-red-400 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
              Search
            </button>
          </div>
        </form>

        {searchRes && (
          <div className="bg-white dark:bg-gray-700 overflow-auto max-w-2xl w-full max-h-full rounded shadow-lg mt-4">
            {/* Search form */}
            <div className="py-4 px-2">{schRes}</div>
          </div>
        )}

        <div className="bg-white dark:bg-gray-700 overflow-auto max-w-2xl w-full max-h-full rounded shadow-lg mt-4">
          {/* Search form */}
          <div className="py-4 px-2">
            {/* Recent searches */}
            <div className="mb-3 last:mb-0">
              <div className="text-xs font-semibold text-slate-300 uppercase px-2 mb-2">
                Recent searches
              </div>
              <ul className="text-sm">
                <li>
                  <Link
                    className="flex items-center p-2 text-slate-400 hover:text-white hover:bg-green-400 rounded group"
                    to="#0"
                  >
                    <svg
                      className="w-4 h-4 fill-current text-slate-400 group-hover:text-white group-hover:text-opacity-50 shrink-0 mr-3"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.707 14.293v.001a1 1 0 01-1.414 1.414L11.185 12.6A6.935 6.935 0 017 14a7.016 7.016 0 01-5.173-2.308l-1.537 1.3L0 8l4.873 1.12-1.521 1.285a4.971 4.971 0 008.59-2.835l1.979.454a6.971 6.971 0 01-1.321 3.157l3.107 3.112zM14 6L9.127 4.88l1.521-1.28a4.971 4.971 0 00-8.59 2.83L.084 5.976a6.977 6.977 0 0112.089-3.668l1.537-1.3L14 6z" />
                    </svg>
                    <span>Form Builder - 23 hours on-demand video</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className="flex items-center p-2 text-slate-400 hover:text-white hover:bg-green-400 rounded group"
                    to="#0"
                  >
                    <svg
                      className="w-4 h-4 fill-current text-slate-400 group-hover:text-white group-hover:text-opacity-50 shrink-0 mr-3"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.707 14.293v.001a1 1 0 01-1.414 1.414L11.185 12.6A6.935 6.935 0 017 14a7.016 7.016 0 01-5.173-2.308l-1.537 1.3L0 8l4.873 1.12-1.521 1.285a4.971 4.971 0 008.59-2.835l1.979.454a6.971 6.971 0 01-1.321 3.157l3.107 3.112zM14 6L9.127 4.88l1.521-1.28a4.971 4.971 0 00-8.59 2.83L.084 5.976a6.977 6.977 0 0112.089-3.668l1.537-1.3L14 6z" />
                    </svg>
                    <span>Access Mosaic on mobile and TV</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className="flex items-center p-2 text-slate-400 hover:text-white hover:bg-green-400 rounded group"
                    to="#0"
                  >
                    <svg
                      className="w-4 h-4 fill-current text-slate-400 group-hover:text-white group-hover:text-opacity-50 shrink-0 mr-3"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.707 14.293v.001a1 1 0 01-1.414 1.414L11.185 12.6A6.935 6.935 0 017 14a7.016 7.016 0 01-5.173-2.308l-1.537 1.3L0 8l4.873 1.12-1.521 1.285a4.971 4.971 0 008.59-2.835l1.979.454a6.971 6.971 0 01-1.321 3.157l3.107 3.112zM14 6L9.127 4.88l1.521-1.28a4.971 4.971 0 00-8.59 2.83L.084 5.976a6.977 6.977 0 0112.089-3.668l1.537-1.3L14 6z" />
                    </svg>
                    <span>Product Update - Q4 2021</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className="flex items-center p-2 text-slate-400 hover:text-white hover:bg-green-400 rounded group"
                    to="#0"
                  >
                    <svg
                      className="w-4 h-4 fill-current text-slate-400 group-hover:text-white group-hover:text-opacity-50 shrink-0 mr-3"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.707 14.293v.001a1 1 0 01-1.414 1.414L11.185 12.6A6.935 6.935 0 017 14a7.016 7.016 0 01-5.173-2.308l-1.537 1.3L0 8l4.873 1.12-1.521 1.285a4.971 4.971 0 008.59-2.835l1.979.454a6.971 6.971 0 01-1.321 3.157l3.107 3.112zM14 6L9.127 4.88l1.521-1.28a4.971 4.971 0 00-8.59 2.83L.084 5.976a6.977 6.977 0 0112.089-3.668l1.537-1.3L14 6z" />
                    </svg>
                    <span>Master Digital Marketing Strategy course</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className="flex items-center p-2 text-slate-400 hover:text-white hover:bg-green-400 rounded group"
                    to="#0"
                  >
                    <svg
                      className="w-4 h-4 fill-current text-slate-400 group-hover:text-white group-hover:text-opacity-50 shrink-0 mr-3"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.707 14.293v.001a1 1 0 01-1.414 1.414L11.185 12.6A6.935 6.935 0 017 14a7.016 7.016 0 01-5.173-2.308l-1.537 1.3L0 8l4.873 1.12-1.521 1.285a4.971 4.971 0 008.59-2.835l1.979.454a6.971 6.971 0 01-1.321 3.157l3.107 3.112zM14 6L9.127 4.88l1.521-1.28a4.971 4.971 0 00-8.59 2.83L.084 5.976a6.977 6.977 0 0112.089-3.668l1.537-1.3L14 6z" />
                    </svg>
                    <span>Dedicated forms for products</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className="flex items-center p-2 text-slate-400 hover:text-white hover:bg-green-400 rounded group"
                    to="#0"
                  >
                    <svg
                      className="w-4 h-4 fill-current text-slate-400 group-hover:text-white group-hover:text-opacity-50 shrink-0 mr-3"
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
              <div className="text-xs font-semibold text-slate-400 uppercase px-2 mb-2">
                Recent pages
              </div>
              <ul className="text-sm">
                <li>
                  <Link
                    className="flex items-center p-2 text-slate-400 hover:text-white hover:bg-green-400 rounded group"
                    to="#0"
                  >
                    <svg
                      className="w-4 h-4 fill-current text-slate-400 group-hover:text-white group-hover:text-opacity-50 shrink-0 mr-3"
                      viewBox="0 0 16 16"
                    >
                      <path d="M14 0H2c-.6 0-1 .4-1 1v14c0 .6.4 1 1 1h8l5-5V1c0-.6-.4-1-1-1zM3 2h10v8H9v4H3V2z" />
                    </svg>
                    <span>
                      <span className="font-medium text-slate-400 group-hover:text-white">
                        Messages
                      </span>{' '}
                      - Conversation / … / Mike Mills
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    className="flex items-center p-2 text-slate-400 hover:text-white hover:bg-green-400 rounded group"
                    to="#0"
                  >
                    <svg
                      className="w-4 h-4 fill-current text-slate-400 group-hover:text-white group-hover:text-opacity-50 shrink-0 mr-3"
                      viewBox="0 0 16 16"
                    >
                      <path d="M14 0H2c-.6 0-1 .4-1 1v14c0 .6.4 1 1 1h8l5-5V1c0-.6-.4-1-1-1zM3 2h10v8H9v4H3V2z" />
                    </svg>
                    <span>
                      <span className="font-medium text-slate-400 group-hover:text-white">
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
      </div>
    </Helmet>
  );
};

export default Search;
