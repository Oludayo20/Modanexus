import { Avatar } from '@mui/material';
import React, { useRef, useEffect, useState } from 'react';
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import ArticleIcon from '@mui/icons-material/Article';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import Transition from '../../utils/Transition';
import CloseIcon from '@mui/icons-material/Close';
import { visibleOptions } from '../../utils/constants';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { useUploadFileMutation } from '../cloudinary/cloudinaryAdapter';
import { useAddNewPostMutation } from './postAPiSlice';
import LoadingSpinner from '../../utils/LoadingSpinner';
import ToastContainer from '../../utils/ToastContainer';
import useAuth from '../../hooks/useAuth';
import Helmet from '../../components/Helmet';

const NewPost = () => {
  const userData = useAuth();

  const modalContent = useRef(null);
  const postInputField = useRef(null);

  const [postModalOpen, setPostModalOpen] = useState(false);
  const [visibilityStatus, setVisibilityStatus] = useState(0);
  const [content, setContent] = useState('');
  const [selectedImages, setSelectedImages] = useState('');
  const [showSelectedImages, setShowSelectedImages] = useState([]);
  const [selectedVideos, setSelectedVideos] = useState('');
  const [showSelectedVideos, setShowSelectedVideos] = useState([]);
  const [selectedDocuments, setSelectedDocuments] = useState('');

  const [displayCount, setDisplayCount] = useState(3);

  const [uploadFile, { isLoading: uploadFileLoading }] =
    useUploadFileMutation();
  const [
    addNewPost,
    { isLoading: addNewPostLoading, isSuccess, isError, error }
  ] = useAddNewPostMutation();

  useEffect(() => {
    if (isSuccess) {
      setPostModalOpen(false);
      setContent('');
      setSelectedDocuments('');
      setSelectedImages('');
      setSelectedVideos('');
      setShowSelectedImages([]);
      setSelectedVideos([]);
    }
  }, [isSuccess]);

  // Post Visibility
  const visibleOption = visibleOptions.map((visible, index) => {
    return (
      <option key={index} value={visible.value}>
        {visible.label}
      </option>
    );
  });

  // Document
  const documentInputRef = useRef(null);

  const handleDocumentClick = () => {
    documentInputRef.current && documentInputRef.current.click();
  };
  const handleDocumentChange = (event) => {
    const files = event.target.files[0];
    setSelectedDocuments(files);
  };

  // Image
  const imageInputRef = useRef(null);

  const handleImageClick = () => {
    imageInputRef.current && imageInputRef.current.click();
  };

  const handleImageChange = (event) => {
    const files = event.target.files;
    setSelectedImages(files[0]);

    const loadImageDataUrls = async () => {
      const imagePromises = Array.from(files).map((file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target.result);
          reader.readAsDataURL(file);
        });
      });

      const imageDataUrls = await Promise.all(imagePromises);
      setShowSelectedImages(imageDataUrls);
    };

    loadImageDataUrls();
  };

  const handleDeleteImage = (index) => {
    setShowSelectedImages((prevImages) =>
      prevImages.filter((_, i) => i !== index)
    );
    setSelectedImages(null);
  };

  // Video
  const videoInputRef = useRef(null);

  const handleVideoClick = () => {
    videoInputRef.current && videoInputRef.current.click();
  };

  const handleVideoChange = (event) => {
    const files = event.target.files;
    setSelectedVideos(files[0]);
    const videoPromises = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const url = URL.createObjectURL(file);
      videoPromises.push(url);
    }

    Promise.all(videoPromises).then((videoUrls) => {
      setShowSelectedVideos((prevVideos) => [...prevVideos, ...videoUrls]);
    });
  };

  const handleDeleteVideo = (index) => {
    setShowSelectedVideos((prevVideos) =>
      prevVideos.filter((_, i) => i !== index)
    );
    setSelectedVideos(null);
  };

  const canPost = [
    content || selectedImages || selectedVideos || selectedDocuments
  ].every(Boolean);

  const onClickPost = async (e) => {
    e.preventDefault();

    if (!canPost) {
      return;
    }

    try {
      let imageData = null;
      let videoData = null;

      if (selectedImages) {
        const { data } = await uploadFile({
          file: selectedImages,
          fileType: 'image'
        });
        console.log(data);
        imageData = data;
      }

      if (selectedVideos) {
        const { data } = await uploadFile({
          file: selectedVideos,
          fileType: 'video'
        });
        console.log(data);
        videoData = data;
      }

      const post = await addNewPost({
        content,
        imageUrl: imageData ? imageData.public_id : selectedImages,
        videoUrl: videoData ? videoData.public_id : selectedVideos,
        documentUrl: selectedDocuments,
        visibilityStatus
      }).unwrap();
      console.log(post);
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowMore = () => {
    setDisplayCount(showSelectedImages.length) ||
      setDisplayCount(showSelectedVideos.length);
  };

  const handleShowLess = () => {
    setDisplayCount(3);
  };

  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!postModalOpen || modalContent.current.contains(target)) return;
      setPostModalOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!postModalOpen || keyCode !== 27) return;
      setPostModalOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    postModalOpen && postInputField.current.focus();
  }, [postModalOpen]);

  return (
    <Helmet title="Post">
      <div
        onClick={(e) => {
          e.stopPropagation();
          setPostModalOpen(true);
        }}
        aria-controls="search-modal"
        className="bg-white dark:bg-gray-800 p-5 rounded-lg"
      >
        <div className="flex items-center">
          <Avatar
            src={`https://res.cloudinary.com/dwy4eglsn/image/upload/v1686519924/${userData?.profilePicture}.jpg`}
            className="h-10 w-10 rounded-full object-cover"
          />
          <input
            type="text"
            placeholder="What on your mind ?"
            className="bg-gray-200 ml-5 rounded-full px-4 py-2 w-full"
          />
        </div>

        <hr className="my-5" />

        <div className="flex justify-between">
          <div className="flex items-center text-blue-500 cursor-pointer hover:bg-gray-200 rounded-lg px-2 transition-all">
            <PhotoSizeSelectActualIcon />
            <p className="ml-1 lg:ml-2">Image</p>
          </div>
          <div className="flex items-center text-green-500 cursor-pointer hover:bg-gray-200 rounded-lg px-2 transition-all">
            <VideoCameraBackIcon />
            <p className="ml-1 lg:ml-2">Video</p>
          </div>

          <div className="flex items-center text-yellow-500 cursor-pointer hover:bg-gray-200 rounded-lg px-2 transition-all">
            <ArticleIcon />
            <p className="ml-1 lg:ml-2">Article</p>
          </div>
          <div className="flex items-center text-red-500 cursor-pointer hover:bg-gray-200 rounded-lg px-2 transition-all">
            <LiveTvIcon />
            <p className="ml-1 lg:ml-2">Live</p>
          </div>
          {/* <button className="px-4 py-1 rounded-lg bg-red-500 text-white transition-all">
          Post
        </button> */}
        </div>
      </div>

      <Transition
        className="fixed inset-0 bg-slate-500 bg-opacity-30 z-50 transition-opacity"
        show={postModalOpen}
        enter="transition ease-out duration-200"
        enterStart="opacity-0"
        enterEnd="opacity-100"
        leave="transition ease-out duration-100"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
        aria-hidden="true"
      />
      {isSuccess && (
        <ToastContainer messages={[`Post Created`]} status={'success'} />
      )}
      {isError && (
        <ToastContainer messages={error?.data?.errors} status={'error'} />
      )}

      {/* Modal dialog */}
      <Transition
        id={'2'}
        className="mt-8 fixed inset-0 z-50 overflow-hidden flex items-start top-20 mb-4 justify-center transform px-4 sm:px-6"
        role="dialog"
        aria-modal="true"
        show={postModalOpen}
        enter="transition ease-in-out duration-200"
        enterStart="opacity-0 translate-y-4"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-in-out duration-200"
        leaveStart="opacity-100 translate-y-0"
        leaveEnd="opacity-0 translate-y-4"
      >
        <div
          ref={modalContent}
          className="bg-white overflow-auto max-w-2xl w-full max-h-full rounded shadow-lg"
        >
          {addNewPostLoading || uploadFileLoading || addNewPostLoading ? (
            <LoadingSpinner />
          ) : (
            ''
          )}

          <div className="p-5">
            <div className="flex items-center justify-between dark:border-gray-600">
              <h2 className="text-xl">Create a Post?</h2>

              <CloseIcon
                onClick={(e) => {
                  e.stopPropagation();
                  setPostModalOpen(false);
                }}
                className="bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              />
            </div>
            <hr className="my-5" />
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Avatar
                  src={`https://res.cloudinary.com/dwy4eglsn/image/upload/v1686519924/${userData?.profilePicture}.jpg`}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div className="ml-3">
                  <h3 className="text-md font-semibold w-full ">
                    {userData?.firstName} {userData?.lastName}
                  </h3>
                  <label htmlFor="select-option" className="text-sm mr-2">
                    Visible:
                  </label>
                  <select
                    id="select-option"
                    className="bg-gray-300 text-gray-600 text-sm rounded-lg dark:border-l-gray-700 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                    value={visibilityStatus}
                    onChange={(e) => setVisibilityStatus(e.target.value)}
                  >
                    <option value="0">To Everyone</option>
                    {visibleOption}
                  </select>
                </div>
              </div>
            </div>
            <div className="mt-2 flex items-center">
              <textarea
                placeholder="What's on your mind?"
                className="px-4 py-2 w-full resize-none focus:outline-none focus:ring-0"
                ref={postInputField}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <div className="mt-2 flex justify-center items-center">
              <div className="grid grid-rows-2 grid-flow-col">
                {selectedDocuments && (
                  <div className="relative">{selectedDocuments}</div>
                )}

                {showSelectedVideos
                  .slice(0, displayCount)
                  .map((videoUrl, index) => (
                    <div key={index} className="relative">
                      <video
                        src={videoUrl}
                        controls
                        className="h-40 w-full object-cover rounded-lg p-2"
                      />
                      <button
                        className=" bg-white rounded-md p-1 absolute top-2 right-2"
                        onClick={() => handleDeleteVideo(index)}
                      >
                        <DeleteIcon className="text-5xl text-red-500" />
                      </button>
                    </div>
                  ))}

                {showSelectedVideos.length > 3 && (
                  <div className="flex items-center">
                    {displayCount === showSelectedVideos.length ? (
                      <>
                        <button onClick={handleShowLess}>
                          <RemoveIcon className="text-5xl text-red-500" />
                          <p>show Less</p>
                        </button>
                      </>
                    ) : (
                      <>
                        <button onClick={handleShowMore}>
                          <AddIcon className="text-5xl text-red-500" />
                          <p>
                            {showSelectedVideos.length - displayCount} More...
                          </p>
                        </button>
                      </>
                    )}
                  </div>
                )}

                {showSelectedImages
                  .slice(0, displayCount)
                  .map((imageDataUrl, index) => (
                    <div className="relative" key={index}>
                      <img
                        src={imageDataUrl}
                        alt={`Image ${index}`}
                        className="h-40 w-full object-cover rounded-lg p-2"
                      />
                      <button
                        className="bg-white rounded-md p-1 absolute top-2 right-2"
                        onClick={() => handleDeleteImage(index)}
                      >
                        <DeleteIcon className="text-5xl text-red-500" />
                      </button>
                    </div>
                  ))}

                {showSelectedImages.length > 3 && (
                  <div className="flex items-center">
                    {displayCount === showSelectedImages.length ? (
                      <>
                        <button onClick={handleShowLess}>
                          <RemoveIcon className="text-5xl text-red-500" />
                          <p>Show Less</p>
                        </button>
                      </>
                    ) : (
                      <>
                        <button onClick={handleShowMore}>
                          <AddIcon className="text-5xl text-red-500" />
                          <p>
                            {showSelectedImages.length - displayCount} More...
                          </p>
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>

            <hr className="my-5" />
            <div className="flex justify-between">
              <div className="flex">
                <div className="flex items-center text-blue-500 cursor-pointer hover:bg-gray-200 rounded-lg px-2 transition-all">
                  <input
                    ref={imageInputRef}
                    type="file"
                    accept="images/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <PhotoSizeSelectActualIcon onClick={handleImageClick} />
                </div>
                <div className="flex items-center text-green-500 cursor-pointer hover:bg-gray-200 rounded-lg px-2 transition-all">
                  <input
                    ref={videoInputRef}
                    type="file"
                    accept="video/*"
                    onChange={handleVideoChange}
                    className="hidden"
                  />
                  <VideoCameraBackIcon onClick={handleVideoClick} />
                </div>

                <div className="flex items-center text-yellow-500 cursor-pointer hover:bg-gray-200 rounded-lg px-2 transition-all">
                  <input
                    ref={documentInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleDocumentChange}
                    className="hidden"
                  />
                  <ArticleIcon onClick={handleDocumentClick} />
                </div>
                <div className="flex items-center text-red-500 cursor-pointer hover:bg-gray-200 rounded-lg px-2 transition-all">
                  <LiveTvIcon />
                </div>
              </div>
              <div className="flex">
                <button
                  disabled={!canPost || uploadFileLoading || addNewPostLoading}
                  onClick={onClickPost}
                  className="px-4 py-1 rounded-lg bg-red-500 text-white transition-all"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Helmet>
  );
};

export default NewPost;
