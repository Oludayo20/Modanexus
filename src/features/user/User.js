import React from 'react';
import { useParams } from 'react-router-dom';
import {
  useAddNewFriendMutation,
  useGetFriendsQuery
} from '../friends/friendApiSlice';
import Post from '../post/Post';
import { Avatar } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LoadingSpinner from '../../utils/LoadingSpinner';
import CheckIcon from '@mui/icons-material/Check';
import PendingIcon from '@mui/icons-material/Pending';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useGetAUserPostQuery } from '../post/postAPiSlice';

const User = () => {
  const { id } = useParams();

  const { user } = useGetFriendsQuery('friendList', {
    selectFromResult: ({ data }) => ({
      user: data?.entities[id]
    })
  });

  const {
    data,
    isLoading: postLoading,
    isSuccess: postSuccess,
    isError: postIsError,
    error: postError
  } = useGetAUserPostQuery(id, {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  });

  const [addNewFriend, { isLoading, isSuccess, isError, error }] =
    useAddNewFriendMutation();

  const onClickAddNewFriend = async () => {
    await addNewFriend(user?.userName);
  };

  let status;

  if (user?.friendshipStatus === 0) {
    status = (
      <CheckIcon className="text-2xl text-white bg-red-500 p-1 rounded-full cursor-pointer" />
    );
  } else if (user?.friendshipStatus === 2) {
    status = (
      <PersonAddIcon
        onClick={onClickAddNewFriend}
        className="text-2xl text-white bg-red-500 p-1 rounded-full cursor-pointer"
      />
    );
  } else if (user?.friendshipStatus === 3) {
    status = (
      <PendingIcon className="text-2xl text-white bg-red-500 p-1 rounded-full cursor-pointer" />
    );
  }

  let content;
  // console.log(user);

  if (user != null) {
    content = (
      <div className="h-[90vh] overflow-auto pro">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-5 dark:text-gray-200">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Avatar
                src={`https://res.cloudinary.com/dwy4eglsn/image/upload/v1686519924/${user?.profilePicture}.jpg`}
                style={{ backgroundColor: 'red' }}
                className="h-10 w-10 rounded-full object-cover"
              />
              <div className="ml-5">
                <h1 className="dark:text-gray-200">
                  {user?.firstName} {user?.lastName}
                </h1>
                <p>Role: {user?.role}</p>
              </div>
            </div>
            {status}
          </div>

          <hr className="my-5" />

          <div className="flex items-center">
            <LocationOnIcon className="text-lg" />
            <p className="ml-5">
              {user?.stateOfResidence}, {user?.countryOfResidence}
            </p>
          </div>

          <div className="flex items-center mt-2">
            <WorkIcon className="text-lg" />
            <p className="ml-5">Some Degree</p>
          </div>

          <hr className="my-5" />

          <div className="flex justify-between items-center">
            <p>Who view your profile ?</p>
            <h2>300</h2>
          </div>

          <div className="flex justify-between items-center mt-2">
            <p>Impress from your friend</p>
            <h2>3900</h2>
          </div>

          <hr className="my-5" />

          <h2>Social Media</h2>
          <div className="flex justify-between mt-5">
            <div className="flex items-center">
              <TwitterIcon className="text-lg" />
              <p className="ml-5 font-semibold">Twitter</p>
            </div>
          </div>

          <div className="flex justify-between mt-5">
            <div className="flex items-center">
              <InstagramIcon className="text-lg" />
              <p className="ml-5 font-semibold">Instagram</p>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    content = <LoadingSpinner />;
  }

  let userPost;

  if (postSuccess) {
    const { data: posts } = data;

    let allPost =
      posts?.length &&
      posts.map((post) => <Post key={post.id} postId={post.id} />);

    userPost = <div className="">{allPost}</div>;
  }

  const handleBack = () => window.history.back();

  return (
    <div className="">
      <div>
        <div className="flex items-center justify-between text-slate-600">
          <ArrowBackIcon
            onClick={handleBack}
            className="w-5 h-5 dark:text-gray-200"
          />
          <div className="text-xs dark:text-gray-200 font-semibold uppercase pt-1.5 pb-2 px-4">
            User Profile
          </div>
        </div>
        {content}
      </div>
      <div className="mt-4">
        <div className="flex items-center justify-between text-slate-600">
          <div className="text-xs dark:text-gray-200 font-semibold uppercase pt-1.5 px-4">
            User Posts
          </div>
          <div className="text-xs dark:text-gray-200 font-semibold uppercase pt-1.5 px-4">
            User Activities
          </div>
        </div>
        <div className="mb-20">{userPost}</div>
      </div>
    </div>
  );
};

export default User;
