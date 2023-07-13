import CheckIcon from '@mui/icons-material/Check';
import PendingIcon from '@mui/icons-material/Pending';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const FriendStatus = ({ friendshipStatus }) => {
  let status;
  if (friendshipStatus === 0) {
    status = (
      <CheckIcon className="text-2xl text-white bg-red-500 p-1 rounded-full cursor-pointer" />
    );
  } else if (friendshipStatus === 2) {
    status = (
      <PersonAddIcon
        onClick={onClickAddNewFriend}
        className="text-2xl text-white bg-red-500 p-1 rounded-full cursor-pointer"
      />
    );
  } else if (friendshipStatus === 3) {
    status = (
      <PendingIcon className="text-2xl text-white bg-red-500 p-1 rounded-full cursor-pointer" />
    );
  }

  return <div>{status}</div>;
};

export default FriendStatus;
