import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';
import pusher from './pusher';

const chatAdapter = createEntityAdapter();

const initialState = chatAdapter.getInitialState();

export const chatApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: (pusherEvent) => ({
        url: `chat/get-all-old-messages/${pusherEvent}`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        }
      }),
      transformResponse: (responseData) => {
        const loadedChat = responseData.data.map((chat) => ({
          id: chat.chatId,
          ...chat
        }));
        return chatAdapter.setAll(initialState, loadedChat);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'Chat', id: 'LIST' },
            ...result.ids.map((id) => ({ type: 'Chat', id }))
          ];
        } else return [{ type: 'Chat', id: 'LIST' }];
      }
    }),
    sendMessage: builder.mutation({
      query: (message) => ({
        url: 'chat/send-message',
        method: 'POST',
        body: message
      }),
      invalidatesTags: [{ type: 'Chat', id: 'LIST' }]
    }),
    chatLayout: builder.query({
      query: (userName) => ({
        url: `chat/get-all-latest-massages/${userName}`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        }
      })
    })
  })
});

export const {
  useGetMessagesQuery,
  useSendMessageMutation,
  useChatLayoutQuery
} = chatApiSlice;

// export const subscribeToNewMessages = (callback) => {
//   pusher.subscribe('chat-channel').bind('new-message', callback);
// };

// returns the query result object
export const selectChatResult = chatApiSlice.endpoints.getMessages.select();

// creates memoized selector
const selectChatData = createSelector(
  selectChatResult,
  (chatResult) => chatResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllChat,
  selectById: selectChatById,
  selectIds: selectChatIds
  // Pass in a selector that returns the notes slice of state
} = chatAdapter.getSelectors((state) => selectChatData(state) ?? initialState);
