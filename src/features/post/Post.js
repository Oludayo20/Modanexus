import { Avatar } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import IosShareIcon from '@mui/icons-material/IosShare';
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import { useGetPostsQuery } from './postAPiSlice';
import Time from '../../utils/time';
import Helmet from '../../components/Helmet';
import useAuth from '../../hooks/useAuth';
import { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useDeletePostMutation } from './postAPiSlice';
import LoadingSpinner from '../../utils/LoadingSpinner';
import ToastContainer from '../../utils/ToastContainer';
import { memo } from 'react';

const Post = ({ postId }) => {
  const { post } = useGetPostsQuery('postList', {
    selectFromResult: ({ data }) => ({
      post: data?.entities[postId]
    })
  });

  console.log(post);

  const [deletePost, { data, isLoading, isSuccess, isError, error }] =
    useDeletePostMutation();

  console.log(data);

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const onDeletePostClicked = async () => {
    await deletePost({ postId: post?.id });
  };

  const userData = useAuth();
  let content;
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

  // if (userData?.userId === post?.userProfile?.userId) {
  //   console.log('hii');
  // } else {
  //   content = (
  //     <PersonAddIcon className="text-3xl text-cyan-800 bg-red-200 p-2 rounded-full cursor-pointer" />
  //   );
  // }

  // console.log(post);

  return (
    <Helmet title="Post">
      <div className="bg-white dark:bg-gray-800 p-5 rounded-lg mt-5">
        <div className="flex justify-between items-center">
          {isLoading && <LoadingSpinner />}
          {isSuccess && (
            <ToastContainer messages={[`Post Deleted!`]} status={'success'} />
          )}
          {isError && (
            <ToastContainer messages={error?.data?.errors} status={'error'} />
          )}
          <div className="flex items-center">
            <Avatar
              src={`https://res.cloudinary.com/dwy4eglsn/image/upload/v1686519924/${post?.userProfile?.profilePicture}.jpg`}
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
                    {post?.userProfile?.role}
                  </span>
                </p>
                <Time time={post?.dateCreated} />
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
            autoPlay
            loop
            onEnded={(event) => event.target.play()}
            src={`https://res.cloudinary.com/dwy4eglsn/video/upload/v1686615317/${post?.videoUrl}.mp4`}
            alt={post?.videoUrl}
            className="mt-2 rounded-lg h-[25rem] w-full object-cover"
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
