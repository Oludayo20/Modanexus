import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';

const Notification = () => {
  const handleBack = () => window.history.back();

  return (
    <div className="">
      <div className="flex items-center justify-between text-slate-600">
        <ArrowBackIcon
          onClick={handleBack}
          className="w-5 h-5 dark:text-gray-200"
        />
        <div className="text-xs dark:text-gray-200 font-semibold  uppercase pt-1.5 pb-2 px-4">
          Notifications
        </div>
      </div>

      <ul>
        <li className="border-b border-slate-500 last:border-0">
          <Link className="block py-2 px-4 hover:bg-slate-50" to="#0">
            <span className="block text-sm mb-2">
              📣{' '}
              <span className="font-medium text-slate-800">
                Edit your information in a swipe
              </span>{' '}
              Sint occaecat cupidatat non proident, sunt in culpa qui officia
              deserunt mollit anim.
            </span>
            <span className="block text-xs font-medium text-slate-400">
              Feb 12, 2021
            </span>
          </Link>
        </li>
        <li className="border-b border-slate-500 last:border-0">
          <Link className="block py-2 px-4 hover:bg-slate-50" to="#0">
            <span className="block text-sm mb-2">
              📣{' '}
              <span className="font-medium text-slate-800">
                Edit your information in a swipe
              </span>{' '}
              Sint occaecat cupidatat non proident, sunt in culpa qui officia
              deserunt mollit anim.
            </span>
            <span className="block text-xs font-medium text-slate-400">
              Feb 9, 2021
            </span>
          </Link>
        </li>
        <li className="border-b border-slate-500 last:border-0">
          <Link className="block py-2 px-4 hover:bg-slate-50" to="#0">
            <span className="block text-sm mb-2">
              🚀
              <span className="font-medium text-slate-800">
                Say goodbye to paper receipts!
              </span>{' '}
              Sint occaecat cupidatat non proident, sunt in culpa qui officia
              deserunt mollit anim.
            </span>
            <span className="block text-xs font-medium text-slate-400">
              Jan 24, 2020
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Notification;
