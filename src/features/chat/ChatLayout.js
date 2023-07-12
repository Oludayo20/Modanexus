import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Helmet from '../../components/Helmet';
import { useMyFriendsQuery } from '../friends/friendApiSlice';
import MyFriendsList from '../friends/MyFriendsList';
import Conversation from './Conversation';
import LoadingSpinner from '../../utils/LoadingSpinner';
import ToastContainer from '../../utils/ToastContainer';

const ChatLayout = () => {
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
        <Conversation key={myFriendId} myFriendId={myFriendId} />
      ))
    ) : (
      <h1>No Conversation</h1>
    );

    MyFriendsListContent = <div className="">{allMyFriends}</div>;
  }

  return (
    <Helmet title="Chat-Layout">
      <div className="">
        {isLoading && <LoadingSpinner />}
        {isError && (
          <ToastContainer messages={error?.data?.errors} status={'error'} />
        )}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-lg">
          <div className="flex justify-between items-center">
            <h1 className="mt-4 dark:text-gray-200">My Chat...</h1>
            <MyFriendsList />
            {/* <AddCommentIcon className="w-5 h-5 dark:text-gray-200" /> */}
          </div>

          <div className="flex justify-between items-center bg-white dark:bg-gray-800 rounded-lg">
            <form className="">
              <div className="relative lg:w-[25vw]">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <SearchIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                  placeholder="David..."
                  required
                />
                <button
                  type="submit"
                  className="text-white absolute right-2.5 bottom-2.5 bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                >
                  Search
                </button>
              </div>
            </form>
            <MoreVertIcon className="ml-10 w-5 h-5 text-gray-500 dark:text-gray-400" />
          </div>
        </div>

        <h1 className="mt-4 dark:text-gray-200">Messages...</h1>

        <div className="w-full bg-white dark:bg-gray-800 p-5 rounded-lg">
          {MyFriendsListContent}
          {/* <div className="flex justify-between items-center mt-2">
            <div className="flex items-center">
              <Avatar className="h-10 w-10 rounded-full object-cover" />
              <div className="ml-2">
                <h1 className="text-sm dark:text-gray-200">John Doo</h1>
                <p>How Much?</p>
              </div>
            </div>
            <div className="block">
              <p className="text-sm">3:14 AM</p>
              <p className="p-0.5 ml-5 w-5 text-sm text-white bg-red-500 rounded-xl flex justify-center items-center">
                2
              </p>
            </div>
          </div>
          <hr className="ml-10 mt-2" /> */}
        </div>
        {/* <h1 className="mt-4 dark:text-gray-200">Other Messages...</h1> */}

        {/* <div className="w-full bg-white dark:bg-gray-800 p-5 rounded-lg">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Avatar className="h-10 w-10 rounded-full object-cover" />
              <div className="ml-2">
                <h1 className="text-sm dark:text-gray-200">Dammy Olawale</h1>
                <div className="inline-flex">
                  <DoneIcon className="mr-2" />
                  <p>Hello</p>
                </div>
              </div>
            </div>
            <p className="text-sm">3:14 AM</p>
          </div>
          <hr className="ml-10" />
          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center">
              <Avatar className="h-10 w-10 rounded-full object-cover" />
              <div className="ml-2">
                <h1 className="text-sm dark:text-gray-200">
                  Micheal James John
                </h1>
                <div className="inline-flex">
                  <DoneAllIcon className="mr-2" />
                  <p>Hello</p>
                </div>
              </div>
            </div>
            <p className="text-sm">3:14 AM</p>
          </div>
          <hr className="ml-10" />
          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center">
              <Avatar className="h-10 w-10 rounded-full object-cover" />
              <div className="ml-2">
                <h1 className="text-sm dark:text-gray-200">Mr. Jonathan</h1>
                <div className="inline-flex">
                  <DoneAllIcon className="mr-2" />
                  <p>Good Day Jonathan</p>
                </div>
              </div>
            </div>
            <p className="text-sm">Yesterday</p>
          </div>
          <hr className="ml-10" />
          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center">
              <Avatar className="h-10 w-10 rounded-full object-cover" />
              <div className="ml-2">
                <h1 className="text-sm dark:text-gray-200">Amadu Samuel</h1>
                <div className="inline-flex">
                  <DoneAllIcon className="mr-2" />
                  <p>Managing Director</p>
                </div>
              </div>
            </div>
            <p className="text-sm">3 Days Ago</p>
          </div>
          <hr className="ml-10" />
          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center">
              <Avatar className="h-10 w-10 rounded-full object-cover" />
              <div className="ml-2">
                <h1 className="text-sm dark:text-gray-200">Babalola Emma</h1>
                <div className="inline-flex">
                  <DoneAllIcon className="mr-2" />
                  <p>Managing Director</p>
                </div>
              </div>
            </div>
            <p className="text-sm">3 Days Ago</p>
          </div>
          <hr className="ml-10" />
          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center">
              <Avatar className="h-10 w-10 rounded-full object-cover" />
              <div className="ml-2">
                <h1 className="text-sm dark:text-gray-200">Amadu Samuel</h1>
                <div className="inline-flex">
                  <DoneAllIcon className="mr-2" />
                  <p>Managing Director</p>
                </div>
              </div>
            </div>
            <p className="text-sm">3 Days Ago</p>
          </div>
          <hr className="ml-10" />
          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center">
              <Avatar className="h-10 w-10 rounded-full object-cover" />
              <div className="ml-2">
                <h1 className="text-sm dark:text-gray-200">Amadu Samuel</h1>
                <div className="inline-flex">
                  <DoneAllIcon className="mr-2" />
                  <p>Managing Director</p>
                </div>
              </div>
            </div>
            <p className="text-sm">3 Days Ago</p>
          </div>
          <hr className="ml-10" />
          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center">
              <Avatar className="h-10 w-10 rounded-full object-cover" />
              <div className="ml-2">
                <h1 className="text-sm dark:text-gray-200">Amadu Samuel</h1>
                <div className="inline-flex">
                  <DoneAllIcon className="mr-2" />
                  <p>Managing Director</p>
                </div>
              </div>
            </div>
            <p className="text-sm">3 Days Ago</p>
          </div>
          <hr className="ml-10" />
        </div> */}
      </div>
    </Helmet>
  );
};

export default ChatLayout;
