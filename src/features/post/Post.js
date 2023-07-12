import { Avatar } from '@mui/material';
import IosShareIcon from '@mui/icons-material/IosShare';
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import { useGetPostsQuery } from './postAPiSlice';
import Time from '../../utils/time';
import Helmet from '../../components/Helmet';
import useAuth from '../../hooks/useAuth';
import { useState, useRef, memo } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useDeletePostMutation } from './postAPiSlice';
import LoadingSpinner from '../../utils/LoadingSpinner';
import ToastContainer from '../../utils/ToastContainer';
import { useEffect } from 'react';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useAddNewFriendMutation } from '../friends/friendApiSlice';

const Post = ({ postId }) => {
  const { post } = useGetPostsQuery('postList', {
    selectFromResult: ({ data }) => ({
      post: data?.entities[postId]
    })
  });

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
    console.log({ postId: post?.id });
    const data = await deletePost({ postId: post?.id });
    console.log(data);
  };

  const onClickAddNewFriend = async () => {
    const req = await addNewFriend(post?.userProfile?.userName);
    console.log(req);
  };

  {
    /* Video Auto Play*/
  }
  const videoRef = useRef(null);

  useEffect(() => {
    if (!videoRef.current) return;

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5 // Adjust this value as needed
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          videoRef.current.play();
        } else {
          videoRef.current.pause();
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, options);
    observer.observe(videoRef.current);

    return () => {
      observer.unobserve(videoRef.current);
    };
  }, []);

  const userData = useAuth();
  let content;

  if (userData?.userId === post?.userProfile?.userId) {
    content = (
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
    content = (
      <PersonAddIcon
        disabled={isAddNewFriendLoading}
        onClick={onClickAddNewFriend}
        className="text-3xl text-cyan-800 bg-red-200 p-2 rounded-full cursor-pointer"
      />
    );
  }

  function playVideo(video) {
    video.play();
  }

  function pauseVideo(video) {
    video.pause();
  }

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
            <div className="ml-5">
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
          {content}
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
            controls
            autoplay
            src={`https://res.cloudinary.com/dwy4eglsn/video/upload/v1686615317/${post?.videoUrl}.mp4`}
            alt={post?.videoUrl}
            class="mt-2 rounded-lg h-[25rem] w-full object-cover"
            onFocus="play"
            onBlur="pause"
          />
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

        <div className="flex mt-5 items-center">
          <ThumbUpOffAltOutlinedIcon className="cursor-pointer hover:scale-110 transition-all text-lg text-red-500" />
          <CommentOutlinedIcon className="cursor-pointer hover:scale-110 transition-all text-lg ml-2" />
          <IosShareIcon className="cursor-pointer hover:scale-110 transition-all text-lg ml-2" />
        </div>
      </div>
    </Helmet>
  );
};

const memoizedPost = memo(Post);
export default memoizedPost;
