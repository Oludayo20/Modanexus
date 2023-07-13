import { Avatar } from '@mui/material';
import { useAddNewFriendMutation, useGetFriendsQuery } from './friendApiSlice';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import useAuth from '../../hooks/useAuth';
import LoadingSpinner from '../../utils/LoadingSpinner';
import ToastContainer from '../../utils/ToastContainer';
import CheckIcon from '@mui/icons-material/Check';
import PendingIcon from '@mui/icons-material/Pending';
import { useNavigate } from 'react-router-dom';

const AddFriend = ({ friendId }) => {
  const { friend } = useGetFriendsQuery('friendList', {
    selectFromResult: ({ data }) => ({
      friend: data?.entities[friendId]
    })
  });

  const [addNewFriend, { isLoading, isSuccess, isError, error }] =
    useAddNewFriendMutation();

  const userData = useAuth();

  const navigate = useNavigate();

  let content;

  const onClickAddNewFriend = async () => {
    await addNewFriend(friend?.userName);
  };

  let status;

  if (friend?.friendshipStatus === 0) {
    status = (
      <CheckIcon className="text-2xl text-white bg-red-500 p-1 rounded-full cursor-pointer" />
    );
  } else if (friend?.friendshipStatus === 2) {
    status = (
      <PersonAddIcon
        onClick={onClickAddNewFriend}
        className="text-2xl text-white bg-red-500 p-1 rounded-full cursor-pointer"
      />
    );
  } else if (friend?.friendshipStatus === 3) {
    status = (
      <PendingIcon className="text-2xl text-white bg-red-500 p-1 rounded-full cursor-pointer" />
    );
  }

  const onClickUser = (userId) => {
    navigate(`/user/${userId}`);
  };

  if (userData?.id === friend?.id) {
  } else {
    content = (
      <>
        <div className="flex justify-between items-center">
          <div
            className="flex items-center"
            onClick={() => onClickUser(friend?.id)}
          >
            <div className="relative">
              <Avatar
                src={`https://res.cloudinary.com/dwy4eglsn/image/upload/v1686519924/${friend?.profilePicture}.jpg`}
                style={{ backgroundColor: 'red' }}
                className="h-10 w-10 rounded-full object-cover"
              />
              <div className="bg-green-500 h-3 w-3 absolute bottom-0 rounded-full right-0"></div>
            </div>
            <div className="ml-5">
              <p className="dark:text-gray-200 text-gray-800 font-bold">
                {friend?.firstName} {friend?.lastName}
              </p>
              <div className="flex">
                <p className="mr-2">
                  Role:{' '}
                  <span className="dark:text-gray-300">{friend?.role}.</span>
                </p>
                <p className="text-sm">
                  {Math.floor(Math.random() * 100) + 1} mutual friends
                </p>
              </div>
            </div>
          </div>
          {status}
        </div>
        <hr className="my-3" />
      </>
    );
  }

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {isSuccess && (
        <ToastContainer
          messages={[
            `${friend?.firstName} ${friend?.lastName} Added Successfully!!!`
          ]}
          status={'success'}
        />
      )}
      {isError && (
        <ToastContainer messages={error?.data?.errors} status={'error'} />
      )}
      {content}
    </>
  );
};

export default AddFriend;
