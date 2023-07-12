import React from 'react';
import {
  useGetFriendsQuery,
  useReceivedFriendRequestQuery
} from './friendApiSlice';
import AddFriend from './AddFriend';
import LoadingSpinner from '../../utils/LoadingSpinner';
import ToastContainer from '../../utils/ToastContainer';
import Helmet from '../../components/Helmet';
import FriendRequest from './FriendRequest';

const FriendsList = () => {
  const {
    data: friends,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetFriendsQuery('friendsList', {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  });

  const {
    data: friendRequest,
    // isLoading: friendRequestLoading,
    isSuccess: friendRequestSuccess
    // isError: friendRequestIsError,
    // error: friendRequestError
  } = useReceivedFriendRequestQuery('friendsRequestList', {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  });

  let friendListContent;
  let friendRequestContent;

  if (isSuccess) {
    const { ids } = friends;

    let allFriend = ids?.length ? (
      ids.map((friendId) => <AddFriend key={friendId} friendId={friendId} />)
    ) : (
      <h1>No friends</h1>
    );

    friendListContent = <div className="">{allFriend}</div>;
  }

  if (friendRequestSuccess) {
    const { ids } = friendRequest;

    let allFriendRequest = ids?.length ? (
      ids.map((friendRequestId) => (
        <FriendRequest
          key={friendRequestId}
          friendRequestId={friendRequestId}
        />
      ))
    ) : (
      <h1 className="text-gray-500">No Friend Request</h1>
    );

    friendRequestContent = <div className="">{allFriendRequest}</div>;
  }
  return (
    <Helmet title="Friend-List">
      {isLoading && <LoadingSpinner />}
      {isError && (
        <ToastContainer messages={error?.data?.errors} status={'error'} />
      )}
      <div className="overflow-auto bg-white dark:bg-gray-800 p-5 mt-5 rounded-lg">
        <h1 className="dark:text-gray-200 text-gray-800">Add Friends:</h1>

        <div className="mt-2 overflow-auto h-[20vh]">{friendListContent}</div>
      </div>

      <div className="overflow-auto bg-white dark:bg-gray-800 p-5 mt-5 rounded-lg">
        <h1 className="dark:text-gray-200 text-gray-800">Friend Request:</h1>

        <div className="mt-2 overflow-auto h-auto">{friendRequestContent}</div>
      </div>
    </Helmet>
  );
};

export default FriendsList;
