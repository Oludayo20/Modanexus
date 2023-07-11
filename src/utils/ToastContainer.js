import { useState, useEffect } from 'react';
import { Close } from '@mui/icons-material';
import Transition from './Transition';
import NearbyErrorIcon from '@mui/icons-material/NearbyError';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import InfoIcon from '@mui/icons-material/Info';

const ToastContainer = ({ messages, status }) => {
  const [visible, setVisible] = useState(false);
  const [currentMessage, setCurrentMessage] = useState([]);

  useEffect(() => {
    if (messages) {
      setCurrentMessage(messages);
      setVisible(true);
      const timeout = setTimeout(() => {
        setVisible(false);
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [messages]);

  const getIcon = () => {
    switch (status) {
      case 'success':
        return <CheckCircleOutlineIcon />;
      case 'error':
        return <NearbyErrorIcon />;
      case 'info':
        return <InfoIcon />;
      default:
        return null;
    }
  };

  const getBackgroundColor = () => {
    switch (status) {
      case 'success':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      case 'info':
        return 'bg-blue-500';
      default:
        return 'bg-green-500';
    }
  };

  return (
    <>
      <Transition
        className="fixed inset-0 bg-slate-500 bg-opacity-30 z-50 transition-opacity"
        show={visible}
        enter="transition ease-out duration-200"
        enterStart="opacity-0"
        enterEnd="opacity-100"
        leave="transition ease-out duration-100"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
        aria-hidden="true"
      />
      <Transition
        id={'2'}
        className="fixed inset-0 z-50 overflow-hidden flex items-start top-0 mb-4 justify-center transform px-4 sm:px-6"
        role="dialog"
        aria-modal="true"
        show={visible}
        enter="transition ease-in-out duration-200"
        enterStart="opacity-0 translate-y-4"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-in-out duration-200"
        leaveStart="opacity-100 translate-y-0"
        leaveEnd="opacity-0 translate-y-4"
      >
        <div
          className={`fixed z-50 top-0 left-0 right-0 text-white  transform transition-all duration-300 ease-in-out ${
            visible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
          }`}
        >
          <div className="flex flex-col items-center justify-center p-4 space-y-2">
            <div
              className={`${getBackgroundColor()} text-white rounded-md py-6 px-4 shadow-lg flex items-center justify-between w-96`}
            >
              <div className="flex items-center space-x-2">
                <div className="text-2xl">{getIcon()}</div>
                {currentMessage?.map((msg, index) => (
                  <div
                    key={index}
                    className=" break-after-all text-lg font-medium"
                  >
                    {msg}
                  </div>
                ))}
              </div>
              <Close
                className="cursor-pointer text-white"
                onClick={() => setVisible(false)}
              />
            </div>
          </div>
        </div>
      </Transition>
    </>
  );
};

export default ToastContainer;
