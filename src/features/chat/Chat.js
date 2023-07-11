import { useEffect, useRef, useState } from 'react';
import { Avatar } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import AddCommentIcon from '@mui/icons-material/AddComment';
import DoneIcon from '@mui/icons-material/Done';
import CallIcon from '@mui/icons-material/Call';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import Helmet from '../../components/Helmet';
import useAuth from '../../hooks/useAuth';
import SendIcon from '@mui/icons-material/Send';
import { useSendMessageMutation } from './chatApiSlice';
import { useParams } from 'react-router-dom';
import { useMyFriendsQuery } from '../friends/friendApiSlice';
import Message from './Message';
import LoadingSpinner from '../../utils/LoadingSpinner';
import ToastContainer from '../../utils/ToastContainer';

const Chat = () => {
  const { id: friendId } = useParams();
  const userData = useAuth();
  const modalContent = useRef(null);

  const { myFriend } = useMyFriendsQuery('myFriendsList', {
    selectFromResult: ({ data }) => ({
      myFriend: data?.entities[friendId]
    })
  });

  const [sendMessage, { isLoading, isSuccess, isError, error }] =
    useSendMessageMutation();

  const [messageText, setMessageText] = useState('');

  let pE;
  if (userData?.id > myFriend?.friendUserProfile?.id) {
    pE = `${userData?.userName}-${myFriend?.friendUserProfile?.userName}`;
  } else {
    pE = `${myFriend?.friendUserProfile.userName}-${userData?.userName}`;
  }

  const canSendMsg = [
    messageText && userData?.userName && myFriend?.friendUserProfile.userName
  ].every(Boolean);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (canSendMsg) {
      try {
        await sendMessage({
          senderUserName: userData.userName,
          receiverUserName: myFriend.friendUserProfile.userName,
          message: messageText,
          pusherEvent: pE
        }).unwrap();

        setMessageText('');
      } catch (error) {
        console.log('Error sending message:', error);
      }
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const [addFile, setAddFile] = useState(false);

  const handleBack = () => window.history.back();

  let contentHead;

  if (myFriend) {
    const { friendUserProfile } = myFriend;

    contentHead = (
      <div className="flex items-center">
        <ArrowBackIcon
          onClick={handleBack}
          className="w-5 h-5 dark:text-gray-200"
        />
        <Avatar
          src={`https://res.cloudinary.com/dwy4eglsn/image/upload/v1686519924/${friendUserProfile?.profilePicture}.jpg`}
          style={{ backgroundColor: 'red' }}
          className="ml-3 h-10 w-10 rounded-full object-cover"
        />
        <div className="ml-2">
          <h1 className="text-2sm dark:text-gray-200">
            {friendUserProfile?.firstName} {friendUserProfile?.lastName}
          </h1>
          <div className="flex">
            <p className="font-bold">Online</p>
            <p className="ml-2">
              Role:{' '}
              <span className="dark:text-gray-300">
                {friendUserProfile?.role}
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  const toggleMenuTop = () => setIsOpen(!isOpen);
  const toggleFileMenu = () => setAddFile(!addFile);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!addFile || !isOpen || modalContent.current.contains(target)) return;
      setIsOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  return (
    <Helmet title="Chat">
      <div className="flex-1 h-[90vh] overflow-auto pb-28">
        {/* {isSuccess && (
          <ToastContainer
            messages={[
              `Message sent to ${myFriend.friendUserProfile.userName} Successfully!!!`
            ]}
            status={'success'}
          />
        )} */}
        {isError && (
          <ToastContainer messages={error?.data?.errors} status={'error'} />
        )}
        <div className="w-full bg-white dark:bg-gray-800 p-5 rounded-lg">
          {/* Header */}

          <div className="flex justify-between items-center">
            {contentHead}
            <div className="flex items-center">
              <CallIcon />
              <div className="ml-4 relative">
                <button
                  className="bg-gray-700 text-white rounded"
                  onClick={toggleMenuTop}
                >
                  <MoreVertIcon />
                </button>
                {isOpen && (
                  <div className="absolute right-0 w-48 bg-white rounded shadow-md mt-2">
                    <ul className="py-2">
                      <li className="px-4 py-2 hover:bg-gray-100">React</li>
                      <li className="px-4 py-2 hover:bg-gray-100">
                        Add to Group
                      </li>
                      <li className="text-red-500 px-4 py-2 hover:bg-gray-100">
                        Report User
                      </li>
                      <li className="text-red-500 px-4 py-2 hover:bg-gray-100">
                        Block User
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Main Chat */}
          {isLoading && <LoadingSpinner />}

          <Message
            pE={pE}
            sender={userData?.userName}
            receiver={myFriend?.friendUserProfile?.userName}
          />
          {/* Send Message */}
          <div className="mt-4">
            <form
              // className="flex items-center justify-content-center"
              action="submit"
              onSubmit={handleSendMessage}
            >
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <button
                    className="p-4 bg-red-500 text-white rounded-lg focus:outline-none"
                    onClick={toggleFileMenu}
                  >
                    <AddIcon />
                  </button>
                  {addFile && (
                    <div className="absolute bottom-full left-0 w-48 bg-white rounded shadow-md mt-2">
                      <ul className="py-2">
                        <li className="px-4 py-2 hover:bg-gray-100">
                          Open Camera
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-100">
                          Send Document
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-100">
                          Send Picture
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-100">
                          Send Video
                        </li>
                      </ul>
                    </div>
                  )}
                </div>

                <input
                  type="text"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Send a message..."
                  className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                />
                <button
                  disabled={!canSendMsg}
                  className={`p-4 ${
                    !canSendMsg ? 'bg-red-300' : 'bg-red-500'
                  } text-white rounded-lg focus:outline-none`}
                >
                  <SendIcon />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Helmet>
  );
};

export default Chat;
