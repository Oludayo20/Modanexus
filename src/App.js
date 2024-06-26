import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Register from './features/auth/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PublicLayout } from './components/PublicLayout';
import Login from './features/auth/Login';
import P404P from './components/P404P';
import VerifyUserEmail from './features/auth/VerifyUserEmail';
import ResendVerificationEmail from './features/auth/ResendVerificationEmail';
import ForgetPassword from './features/auth/ForgetPassword';
import ResetPassword from './features/auth/ResetPassword';
import HomePageLayout from './components/HomePageLayout';
import RequireAuth from './features/auth/RequireAuth';
import UserProfile from './features/user/UserProfile';
import HomeContent from './components/HomeContent';
import CompleteRegistration from './features/user/CompleteRegistration';
import ChatLayout from './features/chat/ChatLayout';
import Chat from './features/chat/Chat';
import WelcomeScreen from './components/WelcomeScreen';
import MainLayout from './components/MainLayout';
import Search from './features/search/Search';
import Notification from './features/notification/Notification';
import User from './features/user/User';

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="*" element={<P404P />} />

          {/* PublicLayout Routes */}
          <Route element={<PublicLayout />}>
            <Route index element={<WelcomeScreen />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="auth/verifyEmail" element={<VerifyUserEmail />} />
            <Route path="resendEmail" element={<ResendVerificationEmail />} />
            <Route path="forgetPassword" element={<ForgetPassword />} />
            <Route path="auth/resetPassword" element={<ResetPassword />} />
            <Route
              path="completeRegistration"
              element={<CompleteRegistration />}
            />
          </Route>

          {/* Protected Routes */}
          <Route element={<RequireAuth />}>
            <Route element={<HomePageLayout />}>
              <Route element={<MainLayout />}>
                <Route path="home" element={<HomeContent />} />
                <Route path="profile" element={<UserProfile />} />
                <Route path="chat" element={<ChatLayout />} />
                <Route path="single-chat/:id" element={<Chat />} />
                <Route path="user/:id" element={<User />} />
                <Route path="search" element={<Search />} />
                <Route path="notification" element={<Notification />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
