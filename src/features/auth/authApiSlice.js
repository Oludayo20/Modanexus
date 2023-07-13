import { apiSlice } from '../../app/api/apiSlice';
import { logOut, setCredentials } from './authSlice';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (credentials) => ({
        url: 'auth/Register',
        method: 'POST',
        body: { ...credentials }
      })
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/Login',
        method: 'POST',
        body: { ...credentials }
      })
    }),
    verifyEmail: builder.mutation({
      query: ({ userId, code }) => ({
        url: 'auth/ConfirmEmailUserEmail',
        params: { userId, code },
        method: 'POST',
        body: { userId, code }
      })
    }),
    resendVerifyEmail: builder.mutation({
      query: (email) => ({
        url: 'auth/ResendEmailConfirmation',
        params: { email },
        method: 'POST',
        body: { email }
      })
    }),
    forgetPassword: builder.mutation({
      query: (email) => ({
        url: 'auth/ForgotPassword',
        params: { email },
        method: 'POST',
        body: { email }
      })
    }),
    resetPassword: builder.mutation({
      query: (credentials) => ({
        url: '/auth/ResetPassword',
        method: 'POST',
        body: { ...credentials }
      })
    }),
    SignOut: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST'
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // console.log(data);
          dispatch(logOut());
          setTimeout(() => {
            dispatch(apiSlice.util.resetApiState());
          }, 1000);
        } catch (err) {
          // console.log(err);
        }
      }
    }),
    refresh: builder.mutation({
      query: () => ({
        url: '/auth/refresh',
        method: 'GET'
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // console.log(data);
          const { accessToken } = data;
          dispatch(setCredentials({ accessToken }));
        } catch (err) {
          // console.log(err);
        }
      }
    })
  })
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useVerifyEmailMutation,
  useResendVerifyEmailMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useSignOutMutation,
  useRefreshMutation
} = authApiSlice;
