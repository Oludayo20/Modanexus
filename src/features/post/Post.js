import { Avatar } from '@mui/material';
import IosShareIcon from '@mui/icons-material/IosShare';
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import { useGetPostsQuery } from './postAPiSlice';
import Time from '../../utils/time';
import Helmet from '../../components/Helmet';
import useAuth from '../../hooks/useAuth';
import { useState, memo, useRef } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useDeletePostMutation } from './postAPiSlice';
import LoadingSpinner from '../../utils/LoadingSpinner';
import ToastContainer from '../../utils/ToastContainer';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useAddNewFriendMutation } from '../friends/friendApiSlice';
import { useNavigate } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import PendingIcon from '@mui/icons-material/Pending';

const Post = ({ postId }) => {
  const { post } = useGetPostsQuery('postList', {
    selectFromResult: ({ data }) => ({
      post: data?.entities[postId]
    })
  });

  // Video
  const videoRef = useRef(null);

  const handlePlay = () => {
    videoRef.current.play();
  };

  const handlePause = () => {
    videoRef.current.pause();
  };
  // End of Video

  const [deletePost, { isLoading, isSuccess, isError, error }] =
    useDeletePostMutation();

  const [
    addNewFriend,
    {
      isLoading: isAddNewFriendLoading,
      isSuccess: isAddNewFriendSuccess,
      isError: isAddNewFriendIsError,
      error: isAddNewFriendError
    }
  ] = useAddNewFriendMutation();

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const onDeletePostClicked = async () => {
    // console.log({ postId: post?.id });
    const data = await deletePost({ postId: post?.id });
    // console.log(data);
  };

  const onClickAddNewFriend = async () => {
    const req = await addNewFriend(post?.userProfile?.userName);
    // console.log(req);
  };

  const userData = useAuth();
  let status;

  if (userData?.userId === post?.userProfile?.userId) {
    status = (
      <div className="ml-4 relative">
        <button className="" onClick={toggleMenu}>
          <MoreVertIcon />
        </button>
        {isOpen && (
          <div className="absolute right-0 w-48 bg-white rounded shadow-md mt-2">
            <ul className="py-2">
              <li className="px-4 py-2 hover:bg-gray-100">Edit Post</li>
              <button
                disabled={isLoading}
                onClick={onDeletePostClicked}
                className="text-red-500 px-4 py-2 hover:bg-gray-100"
              >
                Delete Post
              </button>
            </ul>
          </div>
        )}
      </div>
    );
  } else {
    if (post?.userProfile?.friendshipStatus === 0) {
      status = (
        <CheckIcon className="text-2xl text-white bg-red-500 p-1 rounded-full cursor-pointer" />
      );
    } else if (post?.userProfile?.friendshipStatus === 2) {
      status = (
        <PersonAddIcon
          onClick={onClickAddNewFriend}
          className="text-2xl text-white bg-red-500 p-1 rounded-full cursor-pointer"
        />
      );
    } else if (post?.userProfile?.friendshipStatus === 3) {
      status = (
        <PendingIcon className="text-2xl text-white bg-red-500 p-1 rounded-full cursor-pointer" />
      );
    }
  }

  const navigate = useNavigate();

  const onClickUser = (userId) => {
    navigate(`/user/${userId}`);
  };

  return (
    <Helmet title="Post">
      <div className="bg-white dark:bg-gray-800 p-5 rounded-lg mt-5">
        <div className="flex justify-between items-center">
          {(isLoading || isAddNewFriendLoading) && <LoadingSpinner />}
          {isSuccess && (
            <ToastContainer messages={[`Post Deleted!`]} status={'success'} />
          )}
          {isAddNewFriendSuccess && (
            <ToastContainer
              messages={[`Friend request sent `]}
              status={'success'}
            />
          )}
          {isError ||
            (isAddNewFriendIsError && (
              <ToastContainer
                messages={
                  error?.data?.errors || isAddNewFriendError?.data?.errors
                }
                status={'error'}
              />
            ))}
          <div className="flex items-center">
            <Avatar
              src={`https://res.cloudinary.com/dwy4eglsn/image/upload/v1686519924/${post?.userProfile?.profilePicture}.jpg`}
              style={{ backgroundColor: 'red' }}
              className="h-10 w-10 rounded-full object-cover"
            />
            <div
              className="ml-5"
              onClick={() => onClickUser(post?.userProfile?.id)}
            >
              <h1 className="dark:text-gray-200">
                {post?.userProfile?.firstName} {post?.userProfile?.lastName}
              </h1>
              <div className="flex">
                <p className="mr-2">
                  Role:{' '}
                  <span className="dark:text-gray-300">
                    {post?.userProfile?.role}.
                  </span>
                </p>
                <p>
                  <Time time={post?.dateCreated} />
                </p>
              </div>
            </div>
          </div>
          {status}
        </div>

        <p className="mt-2">{post?.content}</p>

        {post?.imageUrl && (
          <img
            src={`https://res.cloudinary.com/dwy4eglsn/image/upload/v1686519924/${post?.imageUrl}.jpg`}
            alt={post?.imageUrl}
            className="mt-2 rounded-lg h-[25rem] w-full object-cover"
          />
        )}

        {post?.videoUrl && (
          <video
            ref={videoRef}
            controls
            onFocus={handlePlay}
            onBlur={handlePause}
            alt={post?.videoUrl}
            className="mt-2 rounded-lg h-[25rem] w-full object-cover"
          >
            <source
              src={`https://res.cloudinary.com/dwy4eglsn/video/upload/v1686615317/${post?.videoUrl}.mp4`}
              type="video/mp4"
            />
          </video>
        )}

        {post?.documentUrl && (
          <object
            data={post?.documentUrl}
            type="application/pdf"
            className="mt-2 rounded-lg h-[25rem] w-full object-cover"
          >
            <p>Unable to display document</p>
          </object>
        )}

        <div className="flex mt-5 items-center justify-between">
          <div className="flex items-center">
            <p className="text-lg text-slate-400">
              {Math.floor(Math.random() * 100) + 1}
            </p>
            <ThumbUpOffAltOutlinedIcon className="ml-1 cursor-pointer hover:scale-110 transition-all text-lg text-red-500" />
          </div>
          <div className="flex flex items-center">
            <p className="text-lg text-slate-400">
              {Math.floor(Math.random() * 100) + 1}
            </p>
            <CommentOutlinedIcon className="mt-2 cursor-pointer hover:scale-110 transition-all text-lg ml-2" />
          </div>
          <div className="flex">
            <IosShareIcon className="cursor-pointer hover:scale-110 transition-all text-lg ml-2" />
          </div>
        </div>
      </div>
    </Helmet>
  );
};

const memoizedPost = memo(Post);
export default memoizedPost;
