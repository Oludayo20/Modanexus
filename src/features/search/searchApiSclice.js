import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    search: builder.mutation({
      query: (credentials) => ({
        url: 'userprofile',
        method: 'POST',
        body: { ...credentials }
      })
    })
  })
});

export const { useSearchMutation } = usersApiSlice;
