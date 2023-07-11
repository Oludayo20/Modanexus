import React, { useEffect, useRef } from 'react';
import { useGetMessagesQuery } from './chatApiSlice';
import Time from '../../utils/time';
import LoadingSpinner from '../../utils/LoadingSpinner';
import ToastContainer from '../../utils/ToastContainer';

const Message = ({ sender, receiver, pE }) => {
  const messagesContainerRef = useRef(null);

  const {
    data: messages,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetMessagesQuery(pE, {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  });

  useEffect(() => {
    // Scroll to the last message when the component renders
    messagesContainerRef.current.scrollTop =
      messagesContainerRef.current.scrollHeight;
  }, [messages]);

  let content;

  if (isSuccess) {
    const { id, entities } = messages;

    content = (
      <>
        {Object.values(entities)?.map((message) => (
          <div
            key={message.chatId}
            className={`flex flex-col ${
              message?.senderUserName === sender ? 'items-end' : 'items-start'
            } my-2`}
          >
            <div
              className={`py-2 px-4 max-w-[32vw] ${
                message?.receiverUserName === receiver
                  ? 'bg-red-500 rounded-l-lg'
                  : 'bg-gray-300 rounded-r-lg'
              } text-white text-sm`}
            >
              {message?.message}
              <span
                className={`flex ${
                  message?.senderUserName === sender
                    ? 'justify-start'
                    : 'justify-end'
                } text-gray-700 block`}
              >
                <Time time={message?.dateCreated} />
              </span>
            </div>
          </div>
        ))}
      </>
    );
  }

  return (
    <div
      ref={messagesContainerRef}
      className="lg:h-[70vh] h-[60vh] dark:bg-gray-400 my-4 p-2 overflow-y-auto"
    >
      {isLoading && <LoadingSpinner />}
      {isError && (
        <ToastContainer messages={error?.data?.errors} status={'error'} />
      )}
      {content}
    </div>
  );
};

export default Message;
