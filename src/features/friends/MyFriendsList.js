import React, { useRef, useState } from 'react';
import AddCommentIcon from '@mui/icons-material/AddComment';

import { useMyFriendsQuery } from './friendApiSlice';
import MyFriends from './MyFriends';
import Transition from '../../utils/Transition';
import LoadingSpinner from '../../utils/LoadingSpinner';
import ToastContainer from '../../utils/ToastContainer';
import { useEffect } from 'react';

const MyFriendsList = () => {
  const modalContent = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const {
    data: myFriends,
    isLoading,
    isSuccess,
    isError,
    error
  } = useMyFriendsQuery('myFriendsList', {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  });

  let MyFriendsListContent;

  if (isSuccess) {
    const { ids } = myFriends;

    let allMyFriends = ids?.length ? (
      ids.map((myFriendId) => (
        <MyFriends key={myFriendId} myFriendId={myFriendId} />
      ))
    ) : (
      <h1>No friend Available</h1>
    );

    MyFriendsListContent = <div className="">{allMyFriends}</div>;
  }

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!isOpen || modalContent.current.contains(target)) return;
      setIsOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  return (
    <>
      <AddCommentIcon
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(true);
        }}
        className="mt-4 w-5 h-5 dark:text-gray-200"
      />

      <Transition
        className="fixed inset-0 bg-slate-500 bg-opacity-30 z-50 transition-opacity"
        show={isOpen}
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
        className="fixed inset-0 z-50 overflow-auto flex items-end bottom-0 justify-center transform px-4 sm:px-6"
        role="dialog"
        aria-modal="true"
        show={isOpen}
        enter="transition ease-in-out duration-200"
        enterStart="opacity-0 translate-y-4"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-in-out duration-200"
        leaveStart="opacity-100 translate-y-0"
        leaveEnd="opacity-0 translate-y-4"
      >
        <div className="overflow-hidden bg-white dark:bg-gray-800 max-w-2xl h-[50vh] w-full max-h-full rounded-t-xl shadow-lg">
          <h1 className="dark:text-gray-200 text-gray-800 p-4">
            My Friend List:{' '}
          </h1>
          {isLoading && <LoadingSpinner />}
          {isError && (
            <ToastContainer messages={error?.data?.errors} status={'error'} />
          )}
          {/* <div className="p-5 mt-2 rounded-lg pb-10"> */}
          <div className="p-5 overflow-auto h-[35vh] pb-10">
            {MyFriendsListContent}
          </div>
          {/* </div> */}
        </div>
      </Transition>
    </>
  );
};

export default MyFriendsList;
