import { useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

function HeaderLink({ Icon, text, feed, active, avatar, hidden, activeTop }) {
  const location = useLocation();
  const { pathname } = location;

  const session = '';
  const userData = useAuth();

  return (
    <div
      className={`md:ml-10 ${
        hidden && 'hidden md:inline-flex'
      } cursor-pointer flex flex-col justify-center items-center ${
        feed
          ? 'text-black/60 hover:text-black dark:text-white/75 dark:hover:text-white lg:-mb-1.5 space-y-1'
          : 'text-gray-500 hover:text-gray-700'
      } ${
        pathname.includes(active) ||
        (pathname.includes(activeTop) && '!text-black dark:!text-white')
      }`}
    >
      {pathname.includes(activeTop) && (
        <span className="mb-2 lg:inline-flex h-0.5 w-[calc(100%+20px)] bg-black dark:bg-white rounded-t-full" />
      )}

      {avatar ? (
        <Icon
          className="!h-7 !w-7 lg:!-mb-1"
          src={`https://res.cloudinary.com/dwy4eglsn/image/upload/v1686519924/${userData?.profilePicture}.jpg`}
        />
      ) : (
        <Icon />
      )}

      <h4
        className={`text-sm ${
          feed && 'hidden lg:flex justify-center w-full mx-auto'
        }`}
      >
        {text}
      </h4>
      {pathname.includes(active) && (
        <span className="lg:inline-flex h-0.5 w-[calc(100%+20px)] bg-black dark:bg-white rounded-t-full" />
      )}
    </div>
  );
}

export default HeaderLink;
