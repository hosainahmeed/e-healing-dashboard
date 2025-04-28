import React from 'react';
import { BsPatchQuestion } from 'react-icons/bs';
import { FaCoins, FaRegUserCircle } from 'react-icons/fa';
import { FaCarOn } from 'react-icons/fa6';
import { LuChartNoAxesCombined } from 'react-icons/lu';
import {
  MdAdminPanelSettings,
  MdOutlineDateRange,
  MdOutlinePrivacyTip,
} from 'react-icons/md';
import {  RiTeamFill } from 'react-icons/ri';
import { TbCategoryPlus } from 'react-icons/tb';
import DashboardIcon from '../../assets/sidebarIcons/passive/dashboard.svg';
import DashboardIconActive from '../../assets/sidebarIcons/active/dashboard.svg';

export const SidebarLink = [
  {
    path: '/',
    label: 'Dashboard',
    icon: {
      active: <img className='w-5 h-5 object-cover' src={DashboardIconActive} />,
      inactive: <img className='w-5 h-5 object-cover' src={DashboardIcon} />,
    },
  },
  {
    path: '/user-management',
    label: 'User',
    icon: <FaRegUserCircle size={24} />,
  },
  {
    path: '/driver-management',
    label: 'Driver',
    icon: <TbCategoryPlus size={24} />,
  },
  {
    path: '/booking-management',
    label: 'Booking',
    icon: <MdOutlineDateRange size={24} />,
  },
  {
    path: '/earnings-management',
    label: 'Earnings',
    icon: <LuChartNoAxesCombined size={24} />,
  },
  {
    path: '/d-coins-management',
    label: 'D Coins',
    icon: <FaCoins size={24} />,
  },
  {
    path: '/car-management',
    label: 'Car Management',
    icon: <FaCarOn size={24} />,
  },
];

export const SettingLinks = [
  {
    path: '/terms-condition',
    label: 'Terms & Condition',
    icon: <RiTeamFill size={24} />,
  },
  {
    path: '/privacy-policy',
    label: 'Privacy Policy',
    icon: <MdOutlinePrivacyTip size={24} />,
  },
  {
    path: '/profile-setting',
    label: 'Profile Setting',
    icon: <MdAdminPanelSettings size={24} />,
  },
  {
    path: '/faq-management',
    label: 'FAQ',
    icon: <BsPatchQuestion size={24} />,
  },
];
