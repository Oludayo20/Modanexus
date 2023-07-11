import React, { useEffect, useRef, useState } from 'react';
import { Outlet, useNavigate } from 'react-router';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import { useResendVerifyEmailMutation } from './authApiSlice';
import { toast } from 'react-toastify';
import { Link, NavLink } from 'react-router-dom';
import LoadingSpinner from '../../utils/LoadingSpinner';
import ToastContainer from '../../utils/ToastContainer';
import Helmet from '../../components/Helmet';

const EMAIL_REGEX = /^\S+@\S+\.\S+$/;

const ResendVerificationEmail = () => {
  const emailRef = useRef();

  const [resendVerifyEmail, { data, isLoading, isSuccess, isError, error }] =
    useResendVerifyEmailMutation();

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);

  const [success, setSuccess] = useState(false);

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    if (isSuccess) {
      setSuccess(true);
    }
  }, [isSuccess]);

  const canSave = [validEmail].every(Boolean) || isLoading;

  const onResendEmailClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      try {
        await resendVerifyEmail(email);
      } catch (error) {
        if (!error.status) {
          toast.error('No Server Response');
        } else if (error.status === 400) {
          toast.error('Missing Username or Password');
        } else if (error.status === 401) {
          toast.error('Unauthorized');
        } else {
          toast.error(error.data?.message);
        }
      }
    }
  };

  return (
    <Helmet title="Resend-Verification-Email">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-5">
        <div className="">
          {isLoading && <LoadingSpinner />}
          {success && (
            <ToastContainer
              messages={['Email sent successful!!']}
              status={'success'}
            />
          )}
          {isError && (
            <ToastContainer messages={error?.data.errors} status={'error'} />
          )}
          <div className="flex justify-center items-center">
            <div className="flex items-center">
              <img
                src="https://media.sproutsocial.com/uploads/2021/07/email-marketing-featured-image.svg"
                alt="resend email"
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
                    Verification link have been sent successfully!! Please check
                    your email to verify your email. If you already have{' '}
                    <Link className="text-red-500 font-semibold" to="/login">
                      Try to Login.
                    </Link>
                  </h3>
                </div>
              </div>
            ) : (
              <>
                <div className="w-full h-full">
                  <span className="self-center text-2xl font-semibold whitespace-nowrap">
                    Resend Verification Email:
                  </span>

                  <form
                    onSubmit={onResendEmailClicked}
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
                        ref={emailRef}
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

                    <button
                      type="submit"
                      className="w-full block bg-red-500 hover:bg-red-700 focus:bg-red-300 text-white font-semibold rounded-lg
              px-4 py-3 mt-6"
                      disabled={!canSave}
                    >
                      Send Mail
                    </button>
                  </form>

                  <hr className="my-6 border-gray-300 w-full" />

                  <p className="mt-8">
                    Already verified email?{' '}
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

export default ResendVerificationEmail;
