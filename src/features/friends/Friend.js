import { Avatar } from '@mui/material';
import { useGetFriendsQuery } from './friendApiSlice';

const Friend = ({ friendId }) => {
  const { friend } = useGetFriendsQuery('friendList', {
    selectFromResult: ({ data }) => ({
      friend: data?.entities[friendId]
    })
  });

  // console.log(friend);

  return (
    <div className="bg-white dark:bg-gray-800 p-5 mt-5 rounded-lg">
      <h1>FriendList</h1>

      <div className="mt-2">
        <div className="flex items-center cursor-pointer rounded-lg px-2 py-1">
          <div className="relative">
            <Avatar className="h-10 w-10 rounded-full object-cover" />
            <div className="bg-green-500 h-3 w-3 absolute bottom-0 rounded-full right-0"></div>
          </div>
          <div className="ml-5">
            <p className="dark:text-gray-200 text-gray-800 font-bold">
              Karo Ed
            </p>
            <p className="text-sm">23 mutual friends</p>
          </div>
        </div>
      </div>

      <div className="mt-2">
        <div className="flex items-center cursor-pointer rounded-lg px-2 py-1">
          <div className="relative">
            <Avatar className="h-10 w-10 rounded-full object-cover" />
            <div className="bg-green-500 h-3 w-3 absolute bottom-0 rounded-full right-0"></div>
          </div>
          <div className="ml-5">
            <p className="dark:text-gray-200 text-gray-800 font-bold">
              Brownie Weed
            </p>
            <p className="text-sm">20 mutual friends</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Friend;
