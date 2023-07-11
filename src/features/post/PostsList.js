import React from 'react';
import { useGetPostsQuery } from './postAPiSlice';
import Post from './Post';
import LoadingSpinner from '../../utils/LoadingSpinner';
import NearbyErrorIcon from '@mui/icons-material/NearbyError';
import ToastContainer from '../../utils/ToastContainer';
import Helmet from '../../components/Helmet';

const PostsList = () => {
  const {
    data: posts,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetPostsQuery('postsList', {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  });

  let content;

  if (isSuccess) {
    const { ids } = posts;

    let allPost =
      ids?.length && ids.map((postId) => <Post key={postId} postId={postId} />);

    content = <div className="">{allPost}</div>;
  }

  return (
    <Helmet title="Post-List">
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

export default PostsList;
