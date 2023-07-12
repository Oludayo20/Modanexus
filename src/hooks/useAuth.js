import { useGetUserQuery } from '../features/user/userApiSlice';

const useAuth = () => {
  const { data: user } = useGetUserQuery();

  if (user) {
    const { data } = user;
    // const {firstName, userId, lastName, profilePicture, role, stateOfResidence, userName} = user;

    let userData = data;
    return userData;
  }

  return { userData: {} };
};
export default useAuth;
