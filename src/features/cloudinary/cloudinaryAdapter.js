import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const cloudinaryApi = createApi({
  reducerPath: 'cloudinaryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_CLOUDINARY_URL
  }),
  endpoints: (builder) => ({
    uploadFile: builder.mutation({
      query: ({ file, fileType }) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'oludayo');

        if (fileType === 'video') {
          formData.append('resource_type', 'video');
        }

        return {
          url: 'upload',
          method: 'POST',
          body: formData
        };
      }
    })
  })
});

export const { useUploadFileMutation } = cloudinaryApi;
