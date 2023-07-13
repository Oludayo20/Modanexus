import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';

const usersAdapter = createEntityAdapter({});

const initialState = usersAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => 'userprofile',
      validateStatus: (response) => response.status === 200
    }),
    getUsers: builder.query({
      query: () => '/userprofile',
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData) => {
        // console.log(responseData);
        const loadedUsers = responseData?.data.map((user) => {
          user.id = user._id;
          return user;
        });
        return usersAdapter.setAll(initialState, loadedUsers);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'User', id: 'LIST' },
            ...result.ids.map((id) => ({ type: 'User', id }))
          ];
        } else return [{ type: 'User', id: 'LIST' }];
      }
    }),
    completeReg: builder.mutation({
      query: (credentials) => ({
        url: 'userprofile',
        method: 'POST',
        body: { ...credentials }
      })
    }),
    search: builder.mutation({
      query: (userName) => ({
        url: `userprofile/search-for-a-user-profile?userName=${userName}`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        }
      })
    }),
    updateUser: builder.mutation({
      query: (initialUserData) => ({
        url: '/users',
        method: 'PATCH',
        body: {
          ...initialUserData
        }
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'User', id: arg.id }]
    }),
    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: `/users`,
        method: 'DELETE',
        body: { id }
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'User', id: arg.id }]
    })
  })
});

export const {
  useGetUserQuery,
  useGetUsersQuery,
  useCompleteRegMutation,
  useSearchMutation,
  useUpdateUserMutation,
  useDeleteUserMutation
} = usersApiSlice;

// returns the query result object
export const selectUsersResult = usersApiSlice.endpoints.getUsers.select();

// creates memoized selector
const selectUsersData = createSelector(
  selectUsersResult,
  (usersResult) => usersResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds
  // Pass in a selector that returns the users slice of state
} = usersAdapter.getSelectors(
  (state) => selectUsersData(state) ?? initialState
);
