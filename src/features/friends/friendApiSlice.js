import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';

const friendsAdapter = createEntityAdapter({});

const initialState = friendsAdapter.getInitialState();

export const friendsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFriend: builder.query({
      query: () => 'userprofile',
      validateStatus: (response) => response.status === 200
    }),
    getFriends: builder.query({
      query: () => '/friends',
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData) => {
        console.log(responseData);
        const loadedUsers = responseData?.data.map((user) => {
          user.id = user._id;
          return user;
        });
        return friendsAdapter.setAll(initialState, loadedUsers);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'Friend', id: 'LIST' },
            ...result.ids.map((id) => ({ type: 'Friend', id }))
          ];
        } else return [{ type: 'Friend', id: 'LIST' }];
      }
    }),

    addNewFriend: builder.mutation({
      query: (initialUserData) => ({
        url: '/users',
        method: 'POST',
        body: {
          ...initialUserData
        }
      }),
      invalidatesTags: [{ type: 'Friend', id: 'LIST' }]
    }),
    updateUser: builder.mutation({
      query: (initialUserData) => ({
        url: '/users',
        method: 'PATCH',
        body: {
          ...initialUserData
        }
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Friend', id: arg.id }]
    }),
    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: `/users`,
        method: 'DELETE',
        body: { id }
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Friend', id: arg.id }]
    })
  })
});

export const {
  useGetFriendQuery,
  useGetFriendsQuery,
  useAddNewFriendMutation,
  useUpdateUserMutation,
  useDeleteUserMutation
} = friendsApiSlice;

// returns the query result object
export const selectFriendsResult =
  friendsApiSlice.endpoints.getFriends.select();

// creates memoized selector
const selectFriendsData = createSelector(
  selectFriendsResult,
  (friendsResult) => friendsResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllFriends,
  selectById: selectFriendById,
  selectIds: selectFriendIds
  // Pass in a selector that returns the users slice of state
} = friendsAdapter.getSelectors(
  (state) => selectFriendsData(state) ?? initialState
);
