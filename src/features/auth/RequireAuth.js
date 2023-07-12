import React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { isValidToken } from '../../utils/jwt';
import { setCredentials } from './authSlice';

const RequireAuth = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const token = localStorage.getItem('token');
  dispatch(setCredentials(token));

  const isValid = isValidToken(token);

  const content =
    token && isValid ? (
      <Outlet />
    ) : (
      <Navigate to="/login" state={{ from: location }} replace />
    );
  return content;
};

export default RequireAuth;
