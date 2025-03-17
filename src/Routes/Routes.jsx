import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Auth/Login';
import ForgetPassword from '../pages/Auth/ForgetPassword';
import Otp from '../pages/Auth/Otp';
import ResetPassword from '../pages/Auth/ResetPassword';
import Dashboard from '../Layout/Dashboard';
import DashboardHome from '../pages/DashboardPages/DashboardHome/DashboardHome';
import UsersManage from '../pages/DashboardPages/UsersManage/UsersManage';
import DriverManage from '../pages/DashboardPages/DriverManage/DriverManage';
import BookingsPage from '../pages/DashboardPages/BookingsManage/BookingsPage';
import EarningManage from '../Components/Earning/EarningManage';
import EarningPage from '../pages/DashboardPages/EarningManage/EarningPage';
import DcoinsConverter from '../pages/DashboardPages/D-coins/DcoinsConverter';
import CarManagement from '../pages/DashboardPages/CarManagemnet/CarManagement';

export const Routes = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />,
    children: [
      {
        path: '/',
        element: <DashboardHome />,
      },
      {
        path: '/user-management',
        element: <UsersManage />,
      },
      {
        path: '/driver-management',
        element: <DriverManage />,
      },
      {
        path: '/booking-management',
        element: <BookingsPage />,
      },
      {
        path: '/earnings-management',
        element: <EarningPage />,
      },
      {
        path: '/d-coins-management',
        element: <DcoinsConverter />,
      },
      {
        path: '/car-management',
        element: <CarManagement />,
      },
      {
        path: '/terms-condition',
        element: <h1>Home</h1>,
      },
      {
        path: '/privacy-policy',
        element: <h1>Home</h1>,
      },
      {
        path: '/profile-setting',
        element: <h1>Home</h1>,
      },
      {
        path: '/faq-management',
        element: <h1>Home</h1>,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/forgot-password',
    element: <ForgetPassword />,
  },
  {
    path: '/otp',
    element: <Otp />,
  },
  {
    path: '/reset-password',
    element: <ResetPassword />,
  },
]);
