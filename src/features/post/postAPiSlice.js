import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';

const postsAdapter = createEntityAdapter();

const initialState = postsAdapter.getInitialState();

export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => ({
        url: '/posts',
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        }
      }),
      transformResponse: (responseData) => {
        const loadedPosts = responseData.data.map((post, index) => {
          index = post._id;
          return post;
        });
        return postsAdapter.setAll(initialState, loadedPosts);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'Post', id: 'LIST' },
            ...result.ids.map((id) => ({ type: 'Post', id }))
          ];
        } else return [{ type: 'Post', id: 'LIST' }];
      }
    }),
    addNewPost: builder.mutation({
      query: (initialPost) => {
        // console.log(initialPost);

        return {
          url: '/posts',
          method: 'POST',
          body: {
            ...initialPost
          }
        };
      },
      invalidatesTags: [{ type: 'Post', id: 'LIST' }]
    }),
    updatePost: builder.mutation({
      query: (postId) => ({
        url: '/posts',
        method: 'PATCH',
        body: {
          postId
        }
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Post', id: arg.id }]
    }),
    deletePost: builder.mutation({
      query: ({ postId }) => ({
        url: `/posts/${postId}`,
        method: 'DELETE',
        body: { postId }
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Post', id: arg.id }]
    }),
    getAUserPost: builder.query({
      query: (id) => ({
        url: `posts/get-post-by-user-profile-id/${id}`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        }
      })
    })
  })
});

export const {
  useGetPostsQuery,
  useAddNewPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useGetAUserPostQuery
} = postsApiSlice;

// returns the query result object
export const selectPostsResult = postsApiSlice.endpoints.getPosts.select();

// creates memoized selector
const selectPostsData = createSelector(
  selectPostsResult,
  (postsResult) => postsResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds
  // Pass in a selector that returns the notes slice of state
} = postsAdapter.getSelectors(
  (state) => selectPostsData(state) ?? initialState
);
