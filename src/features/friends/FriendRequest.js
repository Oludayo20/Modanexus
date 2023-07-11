import { Avatar } from '@mui/material';
import {
  useReceivedFriendRequestQuery,
  useAcceptFriendRequestMutation,
  useDeleteFriendRequestMutation
} from './friendApiSlice';
import CheckIcon from '@mui/icons-material/Check';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import LoadingSpinner from '../../utils/LoadingSpinner';
import ToastContainer from '../../utils/ToastContainer';

const FriendRequest = ({ friendRequestId }) => {
  const { friendRequest } = useReceivedFriendRequestQuery('friendList', {
    selectFromResult: ({ data }) => ({
      friendRequest: data?.entities[friendRequestId]
    })
  });

  const [acceptFriendRequest, { isLoading, isSuccess, isError, error }] =
    useAcceptFriendRequestMutation();

  const [
    deleteFriendRequest,
    {
      isLoading: deleteFriendRequestLoading,
      isSuccess: deleteFriendRequestSuccess,
      isError: deleteFriendRequestIsError,
      error: deleteFriendRequestError
    }
  ] = useDeleteFriendRequestMutation();

  const onClickAcceptNewFriend = async () => {
    await acceptFriendRequest(friendRequest?.friendUserProfile?.userName);
  };

  const onClickDeleteNewFriend = async () => {
    await deleteFriendRequest(friendRequest?.friendUserProfile?.userName);
  };

  let content;

  content = (
    <>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="relative">
            <Avatar
              src={`https://res.cloudinary.com/dwy4eglsn/image/upload/v1686519924/${friendRequest?.friendUserProfile?.profilePicture}.jpg`}
              style={{ backgroundColor: 'red' }}
              className="h-10 w-10 rounded-full object-cover"
            />
            <div className="bg-green-500 h-3 w-3 absolute bottom-0 rounded-full right-0"></div>
          </div>
          <div className="ml-5">
            <p className="dark:text-gray-200 text-gray-800 font-bold">
              {friendRequest?.friendUserProfile?.firstName}{' '}
              {friendRequest?.friendUserProfile?.lastName}
            </p>
            <div className="flex">
              <p className="mr-2">
                Role:{' '}
                <span className="dark:text-gray-300">
                  {friendRequest?.friendUserProfile?.role}.
                </span>
              </p>
              <p className="text-sm">
                {Math.floor(Math.random() * 100) + 1} mutual friends
              </p>
            </div>
          </div>
        </div>
        <CheckIcon
          onClick={onClickAcceptNewFriend}
          className="mr-2 text-2xl text-white bg-green-500 p-1 rounded-full cursor-pointer"
        />
        <DeleteForeverIcon
          onClick={onClickDeleteNewFriend}
          className="text-2xl text-white bg-red-500 p-1 rounded-full cursor-pointer"
        />
      </div>
      <hr className="my-3" />
    </>
  );

  return (
    <>
      {(isLoading || deleteFriendRequestLoading) && <LoadingSpinner />}
      {isSuccess && (
        <ToastContainer
          messages={[
            `${friendRequest?.firstName} ${friendRequest?.lastName} Added Successfully!!!`
          ]}
          status={'success'}
        />
      )}
      {deleteFriendRequestSuccess && (
        <ToastContainer
          messages={[
            `${friendRequest?.firstName} ${friendRequest?.lastName} deleted Successfully!!!`
          ]}
          status={'success'}
        />
      )}
      {(isError || deleteFriendRequestIsError) && (
        <ToastContainer
          messages={
            error?.data?.errors || deleteFriendRequestError?.data?.errors
          }
          status={'error'}
        />
      )}
      {content}
    </>
  );
};

export default FriendRequest;
