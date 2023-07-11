import { createSlice } from '@reduxjs/toolkit';
import { setSession } from '../../utils/jwt';

const authSlice = createSlice({
  name: 'auth',
  initialState: { token: null, userData: null },
  reducers: {
    setUserData: (state, action) => {
      const { data } = action.payload;
      state.token = data?.jwtToken.token;
      setSession(data?.jwtToken.token);
      state.userData = data;
    },
    setCredentials: (state, action) => {
      const token = action.payload;
      state.token = token;
      setSession(token);
    },
    logOut: (state, action) => {
      setSession();
      state.token = null;
    }
  }
});

export const { setUserData, setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectUserData = (state) => state.auth.userData;
export const selectCurrentToken = (state) => state.auth.token;
