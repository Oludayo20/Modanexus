import React from 'react';
import { useChatLayoutQuery } from './chatApiSlice';
import { Avatar } from '@mui/material';
import { useMyFriendsQuery } from '../friends/friendApiSlice';
import Time from '../../utils/time';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import LoadingSpinner from '../../utils/LoadingSpinner';

const Conversation = ({ myFriendId }) => {
  const userData = useAuth();

  const { myFriend } = useMyFriendsQuery('myFriendsList', {
    selectFromResult: ({ data }) => ({
      myFriend: data?.entities[myFriendId]
    })
  });

  const {
    data: messages,
    isLoading: messagesLoading
    // isSuccess: messagesSuccess,
    // isError: messagesError,
    // error: messagesErrorData
  } = useChatLayoutQuery(userData?.userName, {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  });

  const navigate = useNavigate();

  const onClickChat = () => navigate(`/dash/single-chat/${myFriendId}`);

  let conversation;
  if (myFriend && messages) {
    const { friendUserProfile: myFnd } = myFriend;
    const { data: msg } = messages;

    msg.forEach((ms) => {
      if (myFnd.userName === ms.senderUserName) {
        conversation = (
          <>
            <div
              onClick={onClickChat}
              className="flex justify-between items-center pt-2"
            >
              <div className="flex items-center">
                <Avatar
                  src={`https://res.cloudinary.com/dwy4eglsn/image/upload/v1686519924/${myFnd?.profilePicture}.jpg`}
                  style={{ backgroundColor: 'red' }}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div className="ml-2">
                  <h1 className="text-sm dark:text-gray-200">
                    {myFnd?.firstName} {myFnd?.lastName}
                  </h1>
                  <p>{ms?.message}</p>
                </div>
              </div>
              <div className="block">
                <p className="text-sm">
                  <Time time={ms?.dateCreated} />
                </p>
                {/* <p className="p-0.5 ml-5 w-5 text-sm text-white bg-red-500 rounded-xl flex justify-center items-center">
                  1
                </p> */}
              </div>
            </div>
            <hr className="ml-10 mt-2" />
          </>
        );
      } else if (myFnd?.userName === ms?.receiverUserName) {
        conversation = (
          <>
            <div
              onClick={onClickChat}
              className="flex justify-between items-center pt-2"
            >
              <div className="flex items-center">
                <Avatar
                  src={`https://res.cloudinary.com/dwy4eglsn/image/upload/v1686519924/${myFnd?.profilePicture}.jpg`}
                  style={{ backgroundColor: 'red' }}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div className="ml-2">
                  <h1 className="text-sm dark:text-gray-200">
                    {myFnd?.firstName} {myFnd?.lastName}
                  </h1>
                  <p>
                    <DoneAllIcon /> {ms?.message}
                  </p>
                </div>
              </div>
              <div className="block">
                <p className="text-sm">
                  <Time time={ms?.dateCreated} />
                </p>
                {/* <p className="p-0.5 ml-5 w-5 text-sm text-white bg-red-500 rounded-xl flex justify-center items-center">
                  1
                </p> */}
              </div>
            </div>
            <hr className="ml-10 mt-2" />
          </>
        );
      }
    });
  }

  return (
    <>
      {messagesLoading && <LoadingSpinner />}
      {conversation}
    </>
  );
};

export default Conversation;
