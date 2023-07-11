import { Avatar } from '@mui/material';
import { useMyFriendsQuery } from './friendApiSlice';
import ChatIcon from '@mui/icons-material/Chat';
import BlockIcon from '@mui/icons-material/Block';
import { useNavigate } from 'react-router-dom';

const MyFriends = ({ myFriendId }) => {
  const { myFriend } = useMyFriendsQuery('myFriendsList', {
    selectFromResult: ({ data }) => ({
      myFriend: data?.entities[myFriendId]
    })
  });

  const navigate = useNavigate();

  const onClickChat = () => navigate(`/dash/single-chat/${myFriendId}`);

  let content;

  if (myFriend) {
    const { friendUserProfile: myFnd } = myFriend;

    content = (
      <>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="relative">
              <Avatar
                src={`https://res.cloudinary.com/dwy4eglsn/image/upload/v1686519924/${myFnd?.profilePicture}.jpg`}
                style={{ backgroundColor: 'red' }}
                className="h-10 w-10 rounded-full object-cover"
              />
              <div className="bg-green-500 h-3 w-3 absolute bottom-0 rounded-full right-0"></div>
            </div>
            <div onClick={onClickChat} className="ml-5">
              <p className="dark:text-gray-200 text-gray-800 font-bold">
                {myFnd?.firstName} {myFnd?.lastName}
              </p>
              <div className="flex">
                <p className="mr-2">
                  Role:{' '}
                  <span className="dark:text-gray-300">{myFnd?.role}.</span>
                </p>
                <p className="text-sm">
                  {Math.floor(Math.random() * 100) + 1} mutual friends
                </p>
              </div>
            </div>
          </div>
          <div className="flex">
            <ChatIcon
              onClick={onClickChat}
              className="text-2xl text-white bg-green-500 p-1 rounded-full cursor-pointer"
            />
            <BlockIcon className="ml-4 text-2xl text-white bg-red-500 p-1 rounded-full cursor-pointer" />
          </div>
        </div>
        <hr className="my-3" />
      </>
    );
  }

  return <>{content}</>;
};

export default MyFriends;
