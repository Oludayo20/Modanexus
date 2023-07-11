import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';

const friendsAdapter = createEntityAdapter({});
const friendsRequestAdapter = createEntityAdapter({});
const myFriendsAdapter = createEntityAdapter({});

const initialState = friendsAdapter.getInitialState();
const initialRequestState = friendsRequestAdapter.getInitialState();
const initialMyFriendsState = myFriendsAdapter.getInitialState();

export const friendsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    myFriends: builder.query({
      query: () => 'friends',
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData) => {
        const myLoadedFriends = responseData?.data.map((user) => {
          user.userId = user._id;
          return user;
        });
        return myFriendsAdapter.setAll(initialMyFriendsState, myLoadedFriends);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'MyFriends', id: 'LIST' },
            ...result.ids.map((id) => ({ type: 'Friend', id }))
          ];
        } else return [{ type: 'MyFriends', id: 'LIST' }];
      }
    }),
    getFriends: builder.query({
      query: () => 'userprofile/GetUsersProfile',
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData) => {
        const loadedUsers = responseData?.data.map((user) => {
          user.userId = user._id;
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
    receivedFriendRequest: builder.query({
      query: () => 'friends/received-friend-requests',
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData) => {
        const loadedFriendsRequest = responseData?.data.map((user) => {
          user.userId = user._id;
          return user;
        });
        return friendsAdapter.setAll(initialRequestState, loadedFriendsRequest);
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
      query: (friendUserName) => ({
        url: `friends/SendFriendRequest/${friendUserName}`,
        method: 'POST',
        body: { friendUserName }
      }),
      invalidatesTags: [{ type: 'Friend', id: 'LIST' }]
    }),
    acceptFriendRequest: builder.mutation({
      query: (friendUserName) => ({
        url: `friends/AcceptFriendRequest/${friendUserName}`,
        method: 'PUT',
        body: { friendUserName }
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Friend', id: arg.id }]
    }),
    deleteFriendRequest: builder.mutation({
      query: (friendUserName) => ({
        url: `friends/delete-friend/${friendUserName}`,
        method: 'DELETE',
        body: { friendUserName }
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Friend', id: arg.id }]
    })
  })
});

export const {
  useMyFriendsQuery,
  useGetFriendsQuery,
  useAddNewFriendMutation,
  useReceivedFriendRequestQuery,
  useAcceptFriendRequestMutation,
  useDeleteFriendRequestMutation
} = friendsApiSlice;

// for my friend requests
export const selectMyFriendsResult =
  friendsApiSlice.endpoints.myFriends.select();

const selectMyFriendsData = createSelector(
  selectMyFriendsResult,
  (MyFriendsResult) => MyFriendsResult.data
);

export const {
  selectAll: selectAllMyFriends,
  selectById: selectMyFriendsById,
  selectIds: selectMyFriendsIds
  // Pass in a selector that returns the users slice of state
} = friendsAdapter.getSelectors(
  (state) => selectMyFriendsData(state) ?? initialRequestState
);

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

// for friend requests
export const selectFriendsRequestResult =
  friendsApiSlice.endpoints.receivedFriendRequest.select();

const selectFriendsRequestData = createSelector(
  selectFriendsRequestResult,
  (friendsRequestResult) => friendsRequestResult.data
);

export const {
  selectAll: selectAllFriendsRequest,
  selectById: selectFriendRequestById,
  selectIds: selectFriendRequestIds
  // Pass in a selector that returns the users slice of state
} = friendsAdapter.getSelectors(
  (state) => selectFriendsRequestData(state) ?? initialRequestState
);
