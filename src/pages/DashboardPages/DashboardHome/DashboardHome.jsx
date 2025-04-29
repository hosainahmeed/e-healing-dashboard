import { Card, Divider } from 'antd';
import React from 'react';
import carIcon from '../../../assets/icons/carIcon.svg';
import driverIcon from '../../../assets/icons/driverIcon.svg';
import userIcon from '../../../assets/icons/userIcon.svg';
import GrowthChart from '../../../Components/charts/UserGrowthChart';
import ActivityChart from '../../../Components/charts/ActivityChart';
import RecentlyJoinedUsers from '../../../Components/tables/User/RecentlyJoinedUsers';
import { useGetTotalOverviewQuery } from '../../../Redux/services/dashboard apis/total-overview/totalOverviewApis';
import Loader from '../../../Components/Shared/Loaders/Loader';
function DashboardHome() {
  const { data, isLoading } = useGetTotalOverviewQuery();
  const cardData = [
    {
      title: 'Total Drivers',
      value: isLoading ? <Loader /> : Number(data?.data?.totalDriver) || 0,
      icon: <img src={driverIcon} alt="" />,
    },
    {
      title: 'Total Users',
      value: isLoading ? <Loader /> : Number(data?.data?.totalUser) || 0,
      icon: <img src={userIcon} alt="" />,
    },
    {
      title: 'Total Cars',
      value: isLoading ? <Loader /> : Number(data?.data?.totalCars) || 0,
      icon: <img src={carIcon} alt="" />,
    },
  ];

  return (
    <div>
      <div className="flex items-center  justify-between bg-gradient-to-tr from-[#F6F6F6] via-white to-[var(--bg-pink-high)]/70 p-12 rounded-xl">
        {cardData.map((card, index) => (
          <div className="" key={index}>
            <div
              className={`flex ${
                index !== 2 ? 'border-r-2' : ''
              } px-12 items-center justify-center gap-3`}
            >
              <div className="w-28 h-28 flex items-center justify-center">
                {card.icon}
              </div>
              <div className="flex items-start flex-col justify-center ">
                <h1 className="text-3xl !font-semibold leadingflex items-center justify-center -4">
                  {card.title}
                </h1>
                <h1 className="text-3xl !font-semibold leading-4 text-[var(--bg-pink-high)]">
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
          {isLoading ? (
            <div className="w-full h-full flex items-center justify-center">
              <Loader />
            </div>
          ) : (
            <ActivityChart activity={data?.data} />
          )}
        </div>
      </div>
      <div className="mt-4">
        <RecentlyJoinedUsers />
      </div>
    </div>
  );
}

export default DashboardHome;
