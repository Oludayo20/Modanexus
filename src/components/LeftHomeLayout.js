import Sponsor from './Sponsor';
import UserProfile from '../features/user/UserProfile';

const LeftHomeLayout = () => {
  return (
    <div className="hidden lg:block flex-[0.6] mb-20 h-[90vh] overflow-auto pb-10">
      <UserProfile />
      <br />
      <Sponsor />
    </div>
  );
};

export default LeftHomeLayout;
