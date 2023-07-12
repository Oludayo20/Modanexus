import React, { useEffect, useRef, useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import { useCompleteRegMutation } from './userApiSlice';
import { Link, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../utils/LoadingSpinner';
import ToastContainer from '../../utils/ToastContainer';
import NearbyErrorIcon from '@mui/icons-material/NearbyError';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {
  countryOptions,
  rolesOptions,
  stateOptions
} from '../../utils/constants';
import { useUploadFileMutation } from '../cloudinary/cloudinaryAdapter';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;

const CompleteRegistration = () => {
  const usernameRef = useRef();

  const navigate = useNavigate();

  const [completeReg, { isSuccess, isError, error }] = useCompleteRegMutation();

  const [uploadFile, { isLoading }] = useUploadFileMutation();

  const [err, setErr] = useState(null);

  const [firstName, setFirstName] = useState('');
  const [validFirstName, setValidFirstName] = useState(false);

  const [lastName, setLastName] = useState('');
  const [validLastName, setValidLastName] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

  const [profilePicture, setProfilePicture] = useState('');
  const [showProfilePic, setShowProfilePic] = useState('');

  useEffect(() => {
    usernameRef.current?.focus();
  }, []);

  useEffect(() => {
    setValidFirstName(USER_REGEX.test(firstName));
  }, [firstName]);

  useEffect(() => {
    setValidLastName(USER_REGEX.test(lastName));
  }, [lastName]);

  useEffect(() => {
    if (isSuccess) {
      navigate('/home');
    }
  }, [isSuccess, navigate]);

  const canSave =
    [
      validFirstName,
      validLastName,
      selectedCountry,
      selectedState,
      selectedRole,
      profilePicture
    ].every(Boolean) || isLoading;

  const onCompleteRegistrationClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      try {
        const { data } = await uploadFile({
          file: profilePicture,
          fileType: 'image'
        });
        console.log(data);

        if (data) {
          await completeReg({
            firstName,
            lastName,
            countryOfResidence: selectedCountry,
            stateOfResidence: selectedState,
            role: selectedRole,
            profilePicture: data.public_id
          }).unwrap();
        }
      } catch (error) {
        setErr(error.error);
      }
    }
  };

  const countriesOptions = countryOptions.map((country, index) => {
    return (
      <option key={index} value={country.label}>
        {country.label}
      </option>
    );
  });

  const stateArray = stateOptions[selectedCountry] || [];

  const states = stateArray.map((state, index) => {
    return (
      <option key={index} value={state.label}>
        {state.label}
      </option>
    );
  });

  const roleOptions = rolesOptions.map((role, index) => {
    return (
      <option key={index} value={role.label}>
        {role.label}
      </option>
    );
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePicture(file);
        setShowProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current && fileInputRef.current.click();
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-5">
      <div className="">
        {isLoading && <LoadingSpinner />}
        {isSuccess && (
          <ToastContainer
            messages={[`Registration Completed`]}
            Icon={CheckCircleOutlineIcon}
            color={'bg-green-500'}
          />
        )}
        {isError && (
          <ToastContainer
            messages={error?.data?.errors}
            Icon={NearbyErrorIcon}
            color={'bg-red-500'}
          />
        )}
        {err && (
          <ToastContainer
            message={[`${err}`]}
            Icon={NearbyErrorIcon}
            color={'bg-red-500'}
          />
        )}
        <div className="flex items-center mb-4">
          <div className="w-full h-full">
            <span className="text-red-500 self-center text-2xl font-semibold whitespace-nowrap">
              Complete Your Registration:
            </span>

            <form
              onSubmit={onCompleteRegistrationClicked}
              className="mt-2"
              action="#"
              method="POST"
            >
              <figure className="max-w-lg mb-4">
                <label
                  htmlFor="select-option"
                  className="text-gray-400 inline-flex"
                >
                  Profile Picture:
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  // className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400"
                  className="hidden"
                />
                <div
                  className="flex justify-center items-center"
                  onClick={handleImageClick}
                >
                  <div className="flex items-center">
                    <img
                      className="h-40 object-cover rounded-lg"
                      src={
                        showProfilePic
                          ? showProfilePic
                          : 'https://static.vecteezy.com/system/resources/previews/020/213/738/original/add-profile-picture-icon-upload-photo-of-social-media-user-vector.jpg'
                      }
                      alt="Profile Picture"
                    />
                  </div>
                </div>
              </figure>
              <div>
                <label className="text-gray-400 inline-flex">
                  FirstName:
                  <div className={`${validFirstName ? 'valid' : 'hidden'}`}>
                    <CheckIcon color="success" />
                  </div>
                  <div
                    className={`h-6 w-6 mr-2 ${
                      validFirstName || !firstName ? 'hidden' : 'invalid'
                    }`}
                  >
                    <CloseIcon color="error" />
                  </div>
                </label>
                <input
                  type="text"
                  name="firstName"
                  ref={usernameRef}
                  placeholder="FirstName"
                  className="w-full px-4 py-3 text-gray-600 rounded-lg bg-gray-300 mt-2 border focus:border-red-300 focus:bg-white focus:outline-none"
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                  autoFocus
                  autoComplete="on"
                  required
                />
                <p
                  className={`mt-2 text-gray-700 bg-red-200 px-4 py-3 rounded-lg ${
                    firstName && !validFirstName ? '' : 'hidden'
                  }`}
                >
                  <InfoIcon />
                  4 to 24 characters.
                  <br />
                  Must begin with a letter.
                  <br />
                  Letters, numbers, underscores, hyphens are not allowed.
                </p>
              </div>

              <div className="mt-4">
                <label className="text-gray-400 inline-flex">
                  LastName:
                  <div className={`${validLastName ? 'valid' : 'hidden'}`}>
                    <CheckIcon color="success" />
                  </div>
                  <div
                    className={`h-6 w-6 mr-2 ${
                      validLastName || !lastName ? 'hidden' : 'invalid'
                    }`}
                  >
                    <CloseIcon color="error" />
                  </div>
                </label>
                <input
                  type="lastName"
                  name="lastName"
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                  placeholder="LastName"
                  className="w-full px-4 py-3 text-gray-600 rounded-lg bg-gray-300 mt-2 border focus:border-red-300 focus:bg-white focus:outline-none"
                  autoFocus
                  autoComplete="on"
                  required
                />
                <p
                  className={`mt-2 text-gray-700 bg-red-200 px-4 py-3 rounded-lg ${
                    lastName && !validLastName ? 'offscreen' : 'hidden'
                  } `}
                >
                  <InfoIcon />
                  4 to 24 characters.
                  <br />
                  Must begin with a letter.
                  <br />
                  Letters, numbers, underscores, hyphens are not allowed.
                </p>
              </div>

              <div className="flex items-center justify-center">
                <div className="mt-4">
                  <label
                    htmlFor="select-option"
                    className="text-gray-400 inline-flex"
                  >
                    Country:
                  </label>
                  <select
                    id="select-option"
                    className="bg-gray-300 text-gray-600 text-lg rounded-l-lg px-4 py-3  border-l-gray-100 dark:border-l-gray-700 mt-2 border border-l-2 focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                  >
                    <option value="">Select your country</option>
                    {countriesOptions}
                  </select>
                </div>

                <div className="mt-4">
                  <label
                    htmlFor="select-option"
                    className="text-gray-400 inline-flex"
                  >
                    State:
                  </label>
                  <select
                    id="select-option"
                    className="bg-gray-300 text-gray-600 text-lg rounded-r-lg px-4 py-3  border-l-gray-100 dark:border-l-gray-700 mt-2 border border-l-2 focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                    // className="flex-shrink-0 z-10 inline-flex items-center text-lg text-center px-4 py-3 text-gray-600 bg-gray-300 mt-2 border border-gray-300 rounded-r-lg dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                  >
                    <option value="">Select your state</option>
                    {states}
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="select-option"
                  className="text-gray-400 inline-flex"
                >
                  Role:
                </label>
                <select
                  id="select-option"
                  className="mt-2 text-gray-600 bg-gray-300  px-4 py-3 text-lg rounded-lg focus:ring-red-500 focus:border-red-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                >
                  <option value="">Select a Role</option>
                  {roleOptions}
                </select>
              </div>

              <button
                type="submit"
                className="w-full block bg-red-500 hover:bg-red-700 focus:bg-red-300 text-white font-semibold rounded-lg
              px-4 py-3 mt-6"
                disabled={!canSave}
              >
                Complete Registration
              </button>
            </form>

            <hr className="my-6 border-gray-300 w-full" />

            <p className="mt-8">
              Already done this? Please{' '}
              <Link
                to="/login"
                className="text-red-500 hover:text-red-700 font-semibold"
              >
                Login Again.
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompleteRegistration;
