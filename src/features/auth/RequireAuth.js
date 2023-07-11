import React from 'react';
import { selectCurrentToken } from './authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { isValidToken } from '../../utils/jwt';
import { setUserData, setCredentials } from './authSlice';

const RequireAuth = () => {
  const navigate = useNavigate();
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
