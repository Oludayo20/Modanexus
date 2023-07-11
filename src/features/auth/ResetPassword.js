import React, { useEffect, useRef, useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import { useResetPasswordMutation } from './authApiSlice';
import { toast } from 'react-toastify';
import { Link, NavLink, useLocation } from 'react-router-dom';
import LoadingSpinner from '../../utils/LoadingSpinner';
import ToastContainer from '../../utils/ToastContainer';
import Helmet from '../../components/Helmet';

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^\S+@\S+\.\S+$/;

const ResetPassword = () => {
  const usernameRef = useRef();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get('code');

  const [resetPassword, { isLoading, isSuccess, isError, error }] =
    useResetPasswordMutation();

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validConfirmPassword, setConfirmValidPassword] = useState(false);

  const [success, setSuccess] = useState(false);

  useEffect(() => {
    usernameRef.current?.focus();
  }, []);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
    setConfirmValidPassword(password === confirmPassword);
  }, [password, confirmPassword]);

  useEffect(() => {
    if (isSuccess) {
      setSuccess(true);
    }
  }, [isSuccess]);

  const canSave =
    [validEmail, validPassword, confirmPassword].every(Boolean) || isLoading;

  const onSignUpClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      try {
        await resetPassword({ email, password, confirmPassword, code });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Helmet title="Reset-Password">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-5">
        <div className="">
          {isLoading && <LoadingSpinner />}
          {success && (
            <ToastContainer
              messages={[`Password is reset successful!!`]}
              status={'success'}
            />
          )}
          {isError && (
            <ToastContainer messages={error?.data.errors} status={'error'} />
          )}
          <div className="flex justify-center items-center">
            <div className="flex items-center">
              <img
                src="https://static.lingoapp.com/assets/images/email/il-password-reset@2x.png"
                alt="reset password image"
                className="h-40 object-cover rounded-lg"
              />
            </div>
          </div>
          <div className="flex items-center mb-4">
            {success ? (
              <div className="mt-4 container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                  <span className="text-red-500 self-center text-2xl font-semibold whitespace-nowrap">
                    Hi {email.substring(0, 3) + '...' + '@gmail.com'}
                  </span>
                  <h3>
                    Your password is reset successfully. try to
                    <Link className="text-red-500 font-semibold" to="/signIn">
                      Login now.
                    </Link>
                  </h3>
                </div>
              </div>
            ) : (
              <>
                <div className="w-full h-full">
                  <span className="text-red-500 self-center text-2xl font-semibold whitespace-nowrap">
                    Reset Password:
                  </span>

                  <form
                    onSubmit={onSignUpClicked}
                    className="mt-6"
                    action="#"
                    method="POST"
                  >
                    <div className="">
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
                        4 to 24 characters.
                        <br />
                        Must begin with a letter.
                        <br />
                        Letters, numbers, underscores, hyphens allowed.
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

                    <div className="mt-4">
                      <label className="text-gray-500 inline-flex">
                        Confirm Password:
                        <div
                          className={`${
                            validConfirmPassword ? 'valid' : 'hidden'
                          }`}
                        >
                          <CheckIcon color="success" />
                        </div>
                        <div
                          className={`h-6 w-6 mr-2 ${
                            validConfirmPassword || !confirmPassword
                              ? 'hidden'
                              : 'invalid'
                          }`}
                        >
                          <CloseIcon color="error" />
                        </div>
                      </label>
                      <input
                        type="password"
                        name="Confirm password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                        placeholder="Confirm Password"
                        className="w-full px-4 py-3 text-gray-600 rounded-lg bg-gray-300 mt-2 border focus:border-red-300
                focus:bg-white focus:outline-none"
                        required
                      />
                      <p
                        className={`mt-2 text-gray-700 bg-red-200 px-4 py-3 rounded-lg ${
                          confirmPassword && !validConfirmPassword
                            ? 'offscreen'
                            : 'hidden'
                        } `}
                      >
                        <InfoIcon />
                        Must match the first password input field.
                      </p>
                    </div>

                    <button
                      type="submit"
                      className="w-full block bg-red-500 hover:bg-red-700 focus:bg-red-300 text-white font-semibold rounded-lg
              px-4 py-3 mt-6"
                      disabled={!canSave}
                    >
                      Reset Password
                    </button>
                  </form>

                  <hr className="my-6 border-gray-300 w-full" />

                  <p className="mt-8">
                    Already have an account?{' '}
                    <Link
                      to="/login"
                      className="text-red-500 hover:text-blue-700 font-semibold"
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

export default ResetPassword;
