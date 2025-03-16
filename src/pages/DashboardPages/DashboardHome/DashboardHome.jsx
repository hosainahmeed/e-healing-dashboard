import { Card, Divider } from 'antd';
import React from 'react';
import carIcon from '../../../assets/icons/carIcon.svg';
import driverIcon from '../../../assets/icons/driverIcon.svg';
import userIcon from '../../../assets/icons/userIcon.svg';
import GrowthChart from '../../../Components/charts/UserGrowthChart';
import ActivityChart from '../../../Components/charts/ActivityChart';
import RecentlyJoinedUsers from '../../../Components/tables/User/RecentlyJoinedUsers';
function DashboardHome() {
  const cardData = [
    {
      title: 'Total Drivers',
      value: '75',
      icon: <img src={driverIcon} alt="" />,
    },
    {
      title: 'Total Users',
      value: '1576',
      icon: <img src={userIcon} alt="" />,
    },
    {
      title: 'Total Cars',
      value: '40',
      icon: <img src={carIcon} alt="" />,
    },
  ];
  return (
    <div>
      <div className="flex items-center  justify-between bg-gradient-to-tr from-[#F6F6F6] via-white to-[var(--bg-pink-high)]/70 p-12 rounded-xl">
        {cardData.map((card, index) => (
          <div className="" key={index}>
            <div className="flex items-center gap-3">
              <h1>{card.icon}</h1>
              <div>
                <h1 className="text-3xl !font-semibold">{card.title}</h1>
                <h1 className="text-3xl !font-semibold text-[var(--bg-pink-high)]">
                  {card.value}
                </h1>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-4  gap-4 mt-4 xl:h-[450px]">
        <div className="w-full col-span-4 xl:col-span-3 h-full">
          <GrowthChart />
        </div>
        <div className="xl:col-span-1 col-span-4 shadow-lg">
          <ActivityChart />
        </div>
      </div>
      <div className="mt-4">
        <RecentlyJoinedUsers />
      </div>
    </div>
  );
}

export default DashboardHome;
