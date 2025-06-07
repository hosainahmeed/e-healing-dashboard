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
import TermsCondition from '../pages/DashboardPages/terms&condition/TermsCondition';
import PrivateRoute from './PrivetRoute';
import PrivacyPolicy from '../pages/DashboardPages/privacy&policy/PrivacyPolicy';
import Profile from '../pages/DashboardPages/ProfilePages/Profile';
import AddNewCar from '../Components/page component/CarManage/AddNewCar';
import AddCarImage from '../Components/page component/CarManage/add_car_steps/AddCarImage';
import AddCarGeneralInfo from '../Components/page component/CarManage/add_car_steps/AddCarGeneralInfo';
import FrequentlyAskedQuestions from '../pages/DashboardPages/FrequentlyAskedQuestions/FrequentlyAskedQuestions';
import DriverRegistrationForm from '../Components/page component/DriverRegistrationForm';

export const Routes = createBrowserRouter([
  {
    path: '/',
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
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
        path: '/car-management/new-car-add',
        element: <AddNewCar />,
      },
      {
        path: '/add-new-driver',
        element: <DriverRegistrationForm />,
      },
      {
        path: '/car-management/edit-car/:id',
        element: <AddNewCar />,
      },
      {
        path: '/terms-condition',
        element: <TermsCondition />,
      },
      {
        path: '/privacy-policy',
        element: <PrivacyPolicy />,
      },
      {
        path: '/profile-setting',
        element: <Profile />,
      },
      {
        path: '/faq-management',
        element: <FrequentlyAskedQuestions />,
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
