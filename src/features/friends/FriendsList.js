import React from 'react';
import { useGetFriendsQuery } from './friendApiSlice';
import Friend from './Friend';
import LoadingSpinner from '../../utils/LoadingSpinner';
import NearbyErrorIcon from '@mui/icons-material/NearbyError';
import ToastContainer from '../../utils/ToastContainer';
import Helmet from '../../components/Helmet';

const FriendsList = () => {
  const {
    data: friends,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetFriendsQuery('friendsList', {
    // pollingInterval: 15000,
    // refetchOnFocus: true,
    // refetchOnMountOrArgChange: true
  });

  let content;

  if (isSuccess) {
    const { ids } = friends;

    let allFriend =
      ids?.length &&
      ids.map((friendId) => <Friend key={friendId} friendId={friendId} />);

    content = <div className="">{allFriend}</div>;
  }

  return (
    <Helmet title="Friend-List">
      <div className="">
        {isLoading && <LoadingSpinner />}
        {isError && (
          <ToastContainer
            messages={error?.data?.errors}
            Icon={NearbyErrorIcon}
            color={'bg-red-500'}
          />
        )}
        {content}
      </div>
    </Helmet>
  );
};

export default FriendsList;
