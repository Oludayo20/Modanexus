import React, { useEffect, useRef, useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import { useRegisterMutation } from './authApiSlice';
import { toast } from 'react-toastify';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../utils/LoadingSpinner';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import GoogleIcon from '@mui/icons-material/Google';
import Helmet from '../../components/Helmet';
import ToastContainer from '../../utils/ToastContainer';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^\S+@\S+\.\S+$/;

const Register = () => {
  const usernameRef = useRef();

  const [register, { isLoading, isSuccess, isError, error }] =
    useRegisterMutation();

  const [username, setUsername] = useState('');
  const [validUsername, setValidUsername] = useState(false);
  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);

  const [success, setSuccess] = useState(false);

  useEffect(() => {
    usernameRef.current?.focus();
  }, []);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    if (isSuccess) {
      setSuccess(true);
    }
  }, [isSuccess]);

  const canSave =
    [validUsername, validEmail, validPassword].every(Boolean) || isLoading;

  const onSignUpClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      try {
        await register({ userName: username, email, password });
      } catch (error) {
        if (!error.status) {
          toast.error('No Server Response');
        } else if (error.status === 500) {
          toast.error('Unauthorized');
        } else if (error.status === 401) {
          toast.error('Unauthorized');
        } else {
          toast.error(error.data?.message);
        }
      }
    }
  };

  return (
    <Helmet title="Register">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-5">
        <div className="">
          {isLoading && <LoadingSpinner />}
          {success && (
            <ToastContainer
              messages={[`${username} account is created successful!!`]}
              status={'success'}
            />
          )}
          {isError && (
            <ToastContainer messages={error?.data?.errors} status={'error'} />
          )}
          <div className="flex justify-center items-center">
            <div className="flex items-center">
              <img
                src={
                  success
                    ? 'https://media.sproutsocial.com/uploads/2021/07/email-marketing-featured-image.svg'
                    : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSN5quZiLCwn-UY0jwtU6qbOEgorlV4uoxc9A&usqp=CAU'
                }
                alt=""
                className="h-40 object-cover rounded-lg"
              />
            </div>
          </div>

          <div className="flex items-center mb-4">
            {success ? (
              <div className="mt-4 container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                  <span className="text-red-500 self-center text-2xl font-semibold whitespace-nowrap">
                    Welcome {username}
                  </span>
                  <h3>
                    Your account has been created successfully! Please check
                    your email to verify your email. If you already have{' '}
                    <Link className="text-red-500 font-semibold" to="/login">
                      Try to Login.
                    </Link>
                  </h3>
                  <br />
                  <h1>Didn't get a email?</h1>
                </div>
              </div>
            ) : (
              <>
                <div className="w-full h-full">
                  <span className="text-red-500 self-center text-2xl font-semibold whitespace-nowrap">
                    Create an Account:
                  </span>

                  <form
                    onSubmit={onSignUpClicked}
                    className="mt-6"
                    action="#"
                    method="POST"
                  >
                    <div>
                      <label className="text-gray-500 inline-flex">
                        Username:
                        <div
                          className={`${validUsername ? 'valid' : 'hidden'}`}
                        >
                          <CheckIcon color="success" />
                        </div>
                        <div
                          className={`h-6 w-6 mr-2 ${
                            validUsername || !username ? 'hidden' : 'invalid'
                          }`}
                        >
                          <CloseIcon color="error" />
                        </div>
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
                      <p
                        className={`mt-2 text-gray-700 bg-red-200 px-4 py-3 rounded-lg ${
                          username && !validUsername ? '' : 'hidden'
                        }`}
                      >
                        <InfoIcon />
                        4 to 24 characters.
                        <br />
                        Must begin with a letter.
                        <br />
                        Letters, numbers, underscores, hyphens allowed.
                      </p>
                    </div>

                    <div className="mt-4">
                      <label className="text-gray-500 inline-flex">
                        Email Address:
                        <div className={`${validEmail ? 'valid' : 'hidden'}`}>
                          <CheckIcon color="success" />
                        </div>
                        <div
                          className={`h-6 w-6 mr-2 ${
                            validEmail || !email ? 'hidden' : 'invalid'
                          }`}
                        >
                          <CloseIcon color="error" />
                        </div>
                      </label>
                      <input
                        type="email"
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        placeholder="Email"
                        className="w-full px-4 py-3 text-gray-600 rounded-lg bg-gray-300 mt-2 border focus:border-red-300 focus:bg-white focus:outline-none"
                        autoFocus
                        autoComplete="on"
                        required
                      />
                      <p
                        className={`mt-2 text-gray-700 bg-red-200 px-4 py-3 rounded-lg ${
                          email && !validEmail ? 'offscreen' : 'hidden'
                        } `}
                      >
                        <InfoIcon />
                        Must be a valid email.
                        <br />
                        Either google mail or yahool.
                        <br />
                        Or any other email that can receive mail.
                      </p>
                    </div>

                    <div className="mt-4">
                      <label className="text-gray-500 inline-flex">
                        Password:
                        <div
                          className={`${validPassword ? 'valid' : 'hidden'}`}
                        >
                          <CheckIcon color="success" />
                        </div>
                        <div
                          className={`h-6 w-6 mr-2 ${
                            validPassword || !password ? 'hidden' : 'invalid'
                          }`}
                        >
                          <CloseIcon color="error" />
                        </div>
                      </label>
                      <input
                        type="password"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        placeholder="Password"
                        className="w-full px-4 py-3 text-gray-600 rounded-lg bg-gray-300 mt-2 border focus:border-red-300
                focus:bg-white focus:outline-none"
                        required
                      />
                      <p
                        className={`mt-2 text-gray-700 bg-red-200 px-4 py-3 rounded-lg ${
                          password && !validPassword ? 'offscreen' : 'hidden'
                        } `}
                      >
                        <InfoIcon />
                        8 to 24 characters.
                        <br />
                        Must include uppercase and lowercase letters, a number
                        and a special character.
                        <br />
                        Allowed special characters:{' '}
                      </p>
                    </div>

                    <button
                      type="submit"
                      className="w-full block bg-red-500 hover:bg-red-700 focus:bg-red-300 text-white font-semibold rounded-lg
              px-4 py-3 mt-6"
                      disabled={!canSave}
                    >
                      Register
                    </button>
                  </form>

                  <hr className="my-6 border-gray-300 w-full" />

                  <button
                    type="button"
                    className="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300"
                  >
                    <div className="flex items-center justify-center">
                      <GoogleIcon className="text-red-500" />
                      <span className="ml-4">Sign Up with Google</span>
                    </div>
                  </button>

                  <p className="mt-8">
                    Already have an account?{' '}
                    <Link
                      to="/login"
                      className="text-red-500 hover:text-red-700 font-semibold"
                    >
                      Login
                    </Link>
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Helmet>
  );
};

export default Register;
