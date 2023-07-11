import React, { useEffect, useRef, useState } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { Link, NavLink } from 'react-router-dom';
import { useLoginMutation } from './authApiSlice';
import { useDispatch } from 'react-redux';
import { setUserData, setCredentials } from './authSlice';
import LoadingSpinner from '../../utils/LoadingSpinner';
import ToastContainer from '../../utils/ToastContainer';
import GoogleIcon from '@mui/icons-material/Google';
import { setSession } from '../../utils/jwt';
import Helmet from '../../components/Helmet';

const Login = () => {
  const usernameRef = useRef();

  const [Login, { data, isLoading, isSuccess, isError, error }] =
    useLoginMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    usernameRef.current?.focus();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      if (data?.data.isRegistrationComplete === false) {
        navigate('/completeRegistration');
      } else {
        navigate('/dash');
      }
    }
  }, [isSuccess, navigate, data]);

  const canSave = [username, password].every(Boolean) || isLoading;

  const onLoginClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      try {
        const { data } = await Login({ userName: username, password });
        dispatch(setCredentials(data?.data.jwtToken.token));
      } catch (error) {
        console.log(error);
      }
    } else {
      return toast.error('Please input Username and Password');
    }
  };

  return (
    <Helmet title="Login">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-5">
        <div className="">
          {isLoading && <LoadingSpinner />}
          {isSuccess && (
            <ToastContainer
              messages={[`Welcome back ${username}`]}
              status={'success'}
            />
          )}
          {isError && (
            <ToastContainer
              messages={[error?.data?.errors || error?.error]}
              status={'error'}
            />
          )}
          <div className="flex justify-center items-center">
            <div className="flex items-center">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSN5quZiLCwn-UY0jwtU6qbOEgorlV4uoxc9A&usqp=CAU"
                alt="Login Image"
                className="h-40 object-cover rounded-lg"
              />
            </div>
          </div>
          <div className="flex items-center mb-4">
            <>
              <div className="w-full h-full">
                <span className="text-red-500 self-center text-2xl font-semibold whitespace-nowrap">
                  Welcome Back!!!
                </span>

                <form
                  onSubmit={onLoginClicked}
                  className="mt-6"
                  action="#"
                  method="POST"
                >
                  <div>
                    <label className="text-gray-500 inline-flex">
                      Username:
                    </label>
                    <input
                      type="text"
                      name="username"
                      ref={usernameRef}
                      placeholder="Username"
                      className="w-full px-4 py-3 text-gray-600 rounded-lg bg-gray-300 mt-2 border focus:border-red-300 focus:bg-white focus:outline-none"
                      onChange={(e) => setUsername(e.target.value)}
                      value={username}
                      autoFocus
                      autoComplete="on"
                      required
                    />
                  </div>

                  <div className="mt-4">
                    <label className="text-gray-500 inline-flex">
                      Password:
                    </label>
                    <input
                      type="password"
                      name="password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      placeholder="Password"
                      className="w-full px-4 py-3 text-gray-600 rounded-lg bg-gray-300 mt-2 border focus:border-red-300 focus:bg-white focus:outline-none"
                      required
                    />
                  </div>
                  <div className="inline flex mt-4 text-black text-xs font-semibold">
                    <div className="inline-flex">
                      <input
                        type="checkbox"
                        id="persist"
                        // onChange={handleToggle}
                        // checked={persist}
                      />
                      <label htmlFor="persist" className="pl-1">
                        Trust This Device
                      </label>
                    </div>
                    <div className="flex ml-auto text-red-500">
                      <Link to="/forgetPassword">Forgot Your Password?</Link>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full block bg-red-500 hover:bg-red-700 focus:bg-red-300 text-white font-semibold rounded-lg
              px-4 py-3 mt-6"
                    disabled={!canSave}
                  >
                    Login
                  </button>
                </form>

                <hr className="my-6 border-gray-300 w-full" />

                <button
                  type="button"
                  className="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300"
                >
                  <div className="flex items-center justify-center">
                    <GoogleIcon className="text-red-500" />
                    <span className="ml-4">Login with Google</span>
                  </div>
                </button>

                <p className="mt-8">
                  Don't have an account?{' '}
                  <Link
                    to="/register"
                    className="text-red-500 hover:text-red-700 font-semibold"
                  >
                    Register
                  </Link>
                </p>
              </div>
            </>
          </div>
        </div>
      </div>
    </Helmet>
  );
};

export default Login;
