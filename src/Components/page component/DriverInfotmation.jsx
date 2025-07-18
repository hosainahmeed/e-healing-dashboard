import React from 'react';
import { Card, Divider, Tabs } from 'antd';
import General from './DrivingInformation Parts/General';
import Driving from './DrivingInformation Parts/Driving';
import Car from './DrivingInformation Parts/Car';
import Documents from './DrivingInformation Parts/Documents';
import Statics from './DrivingInformation Parts/Statics';
import { useGetDriverQuery } from '../../Redux/services/dashboard apis/userApis/driverApis';
import { imageUrl } from '../../Utils/server';
function DriverInfotmation({ id }) {
  const { data, isLoading } = useGetDriverQuery({ driverId: id });
  if (isLoading) {
    return <Card loading></Card>;
  }

  const driver_data = data?.data;
  const driver_data_genarale = {
    driver_id: id,
    name: driver_data?.name || 'N/A',
    email: driver_data?.email || 'N/A',
    role: driver_data?.role || 'N/A',
    profile_image: driver_data?.profile_image || 'N/A',
    phone_number: driver_data?.phoneNumber || 'N/A',
    address: driver_data?.address || 'N/A',
    isOnline: driver_data?.isOnline || 'N/A',
  };

  const driver_data_driving = {
    idOrPassportNo: driver_data?.idOrPassportNo || 'N/A',
    drivingLicenseNo: driver_data?.drivingLicenseNo || 'N/A',
    licenseType: driver_data?.licenseType || 'N/A',
    licenseExpiry: driver_data?.licenseExpiry || 'N/A',
  };

  const items = [
    {
      key: '1',
      label: 'Genaral',
      children: <General data={driver_data_genarale} />,
    },
    {
      key: '2',
      label: 'Driving',
      children: <Driving data={driver_data_driving} />,
    },
    {
      key: '3',
      label: 'Car',
      children: <Car data={driver_data} />,
    },
    {
      key: '4',
      label: 'Documents',
      children: <Documents data={driver_data} />,
    },
    {
      key: '5',
      label: 'Statics',
      children: <Statics data={driver_data} />,
    },
  ];
  return (
    <div>
      <div className="w-full flex items-center justify-center">
        <div className="w-24 h-24 rounded-full overflow-hidden shadow">
          <img
            className="w-full h-full object-cover"
            src={imageUrl(driver_data_genarale.profile_image)}
            alt="Profile"
          />
        </div>
      </div>
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
}

export default DriverInfotmation;
