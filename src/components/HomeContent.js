import React from 'react';
import NewPost from '../features/post/NewPost';
import PostsList from '../features/post/PostsList';

const HomeContent = () => {
  return (
    <div className="flex-1 h-[90vh] overflow-auto pb-10">
      <NewPost />
      {/* <OnYourMind /> */}
      <PostsList />
      {/* <Feeds />
      <Feeds />
      <Feeds /> */}
    </div>
  );
};

export default HomeContent;
