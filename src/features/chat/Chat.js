import { Avatar } from '@mui/material';
import AddCommentIcon from '@mui/icons-material/AddComment';
import CallIcon from '@mui/icons-material/Call';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditMenu from '../../components/EditMenu';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import Helmet from '../../components/Helmet';

const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const messages = [
    { id: 1, text: 'Hello!', sender: 'user', timestamp: '9:00 AM' },
    { id: 2, text: 'How are you?', sender: 'user', timestamp: '9:05 AM' },
    {
      id: 3,
      text: 'I am doing well. Thanks!',
      sender: 'other',
      timestamp: '9:10 AM'
    },
    { id: 4, text: 'What about you?', sender: 'other', timestamp: '9:15 AM' },
    { id: 5, text: "I'm good too!", sender: 'user', timestamp: '9:20 AM' }
  ];

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  return (
    <Helmet title="Chat">
      <div className="flex-1 h-[90vh] overflow-auto pb-10">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="mt-4 dark:text-gray-200">My Chat...</h1>
          <AddCommentIcon className="w-5 h-5 dark:text-gray-200" />
        </div>

        <div className="w-full bg-white dark:bg-gray-800 p-5 rounded-lg">
          {/* Header */}

          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <ArrowBackIcon className="w-5 h-5 dark:text-gray-200" /> 3
              <Avatar className="ml-6 h-10 w-10 rounded-full object-cover" />
              <div className="ml-2">
                <h1 className="text-sm dark:text-gray-200">Karo Oghene</h1>
              </div>
            </div>
            <div className="flex items-center">
              <CallIcon />
              <div className="ml-4 relative">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={toggleMenu}
                >
                  <MoreVertIcon />
                </button>
                {isOpen && (
                  <div className="absolute right-0 w-48 bg-white rounded shadow-md mt-2">
                    <ul className="py-2">
                      <li className="px-4 py-2 hover:bg-gray-100">
                        Menu Item 1
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-100">
                        Menu Item 2
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-100">
                        Menu Item 3
                      </li>
                      <li className="text-red-500 px-4 py-2 hover:bg-gray-100">
                        Block User
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Main Chat */}

          <div className="h-[65vh] bg-gray-200 m-4 p-2">
            <div className="flex flex-col gap-2 p-2">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-400 text-white'
                    }`}
                  >
                    {message.text}
                    <span className="flex justify-end text-xs text-gray-700 block">
                      {message.timestamp}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Send Message */}
          <div className="mt-4">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={toggleMenu}
                >
                  <AddIcon />
                </button>
                {isOpen && (
                  <div className="absolute bottom-full left-0 w-48 bg-white rounded shadow-md mt-2">
                    <ul className="py-2">
                      <li className="px-4 py-2 hover:bg-gray-100">
                        Open Camera
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-100">
                        Send Picture
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-100">
                        Send Video
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-100">
                        Menu Item 4
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              <input
                type="text"
                // value={inputText}
                // onChange={handleInputChange}
                placeholder="Type a message..."
                className="flex-grow px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring focus:border-blue-300"
              />
              <button
                // onClick={handleSendMessage}
                className="px-4 py-2 bg-red-500 text-white rounded-sm focus:outline-none"
              >
                Send
              </button>
            </div>
          </div>
          {/* <div className="flex flex-col gap-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              } items-end`}
            >
              <div
                className={`relative max-w-md p-3 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-black'
                }`}
              >
                <div className="relative">
                  <p>{message.text}</p>
                  <span className="text-xs text-gray-500 block mt-1">
                    {message.timestamp}
                  </span>
                </div>
                <div
                  className={`absolute w-2 h-2 bg-red-500 transform ${
                    message.sender === 'user'
                      ? '-rotate-45 -translate-y-1 translate-x-3'
                      : '-rotate-45 translate-y-1 -translate-x-3'
                  }`}
                ></div>
              </div>
            </div>
          ))}
        </div> */}
        </div>
      </div>
    </Helmet>
  );
};

export default Chat;
