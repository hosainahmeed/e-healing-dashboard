import React from 'react';
import { Divider, Tabs } from 'antd';
import General from './DrivingInformation Parts/General';
import Driving from './DrivingInformation Parts/Driving';
import Car from './DrivingInformation Parts/Car';
import Documents from './DrivingInformation Parts/Documents';
import Statics from './DrivingInformation Parts/Statics';
import { useGetSingleUserOrDriverQuery } from '../../Redux/services/dashboard apis/userApis/userApis';
const onChange = (key) => {
  console.log(key);
};
function DriverInfotmation({ id }) {
  const { data, isLoading } = useGetSingleUserOrDriverQuery({ id });

  if (isLoading) {
    return (
      <div>
        <div className="flex items-center flex-col justify-center">
          <div className="w-24 h-24 bg-gray-200 animate-pulse rounded-full"></div>
          <div className='w-full'>
            <Divider></Divider>
            <div className=" flex items-start gap-2 justify-start">
              {Array.from({ length: 7 }).map((_, x) => (
                <div
                  key={x}
                  className="w-12 h-3 bg-gray-200 animate-pulse rounded-md mb-2"
                ></div>
              ))}
            </div>
            <div className='w-56 mt-7 h-4 bg-gray-200 animate-pulse rounded-md'></div>
            <div className='w-32 mt-2  h-4 bg-gray-200 animate-pulse rounded-md'></div>
            <div className='w-56 mt-7 h-4 bg-gray-200 animate-pulse rounded-md'></div>
            <div className='w-32 mt-2  h-4 bg-gray-200 animate-pulse rounded-md'></div>
            <div className='w-56 mt-7 h-4 bg-gray-200 animate-pulse rounded-md'></div>
            <div className='w-32 mt-2  h-4 bg-gray-200 animate-pulse rounded-md'></div>
            <div className='w-56 mt-7 h-4 bg-gray-200 animate-pulse rounded-md'></div>
            <div className='w-32 mt-2  h-4 bg-gray-200 animate-pulse rounded-md'></div>
            <div className='w-56 mt-7 h-4 bg-gray-200 animate-pulse rounded-md'></div>
            <div className='w-32 mt-2  h-4 bg-gray-200 animate-pulse rounded-md'></div>
          </div>
        </div>
      </div>
    );
  }
  console.log(data);
  const driver_data = {
    name: 'Md Mojahid Islam',
    email: 'michelle.rivera@example.com',
    password: 'driver1123',
    address: 'San Francisco, United States',
    contact_no: '+99007007007',
    national_id_passport: '759175632578',
    driving_license_no: '759175632578',
    license_type: 'Havy vichale',
    license_expire: '15th August 2027',
    car_model: 'Model 3 Long Range 2023',
    color: 'Midnight Silver Metallic',
    license_plate: 'EV-5678',
    statics: {
      get_rating: 4.5,
      total_rating: 5,
      driving_info: {
        daily: {
          total_earn: 2000,
          hand_cash: 1000,
          online_cash: 1000,
          active_hours: 10,
          trip_distance: 10,
        },
        Weekly: {
          total_earn: 12000,
          hand_cash: 1000,
          online_cash: 1000,
          active_hours: 10,
          trip_distance: 10,
        },
        Monthly: {
          total_earn: 30000,
          hand_cash: 1000,
          online_cash: 1000,
          active_hours: 10,
          trip_distance: 10,
        },
        Yearly: {
          total_earn: 132000,
          hand_cash: 1000,
          online_cash: 1000,
          active_hours: 10,
          trip_distance: 10,
        },
      },
    },
    car_model_image:
      'https://www.stratstone.com/-/media/stratstone/blog/2024/top-10-best-supercars-of-2024/mclaren-750s-driving-dynamic-hero-1920x774px.ashx',
    national_id_passport_img:
      'https://img.freepik.com/premium-vector/turkey-driving-licence-isolated-white-background-turkish-driving-licence-person-driver-license_360685-568.jpg',
    psv_license_img:
      'https://img.freepik.com/premium-vector/turkey-driving-licence-isolated-white-background-turkish-driving-licence-person-driver-license_360685-568.jpg',
    driving_license_img:
      'https://img.freepik.com/premium-vector/turkey-driving-licence-isolated-white-background-turkish-driving-licence-person-driver-license_360685-568.jpg',
  };

  const items = [
    {
      key: '1',
      label: 'Genaral',
      children: <General data={driver_data} />,
    },
    {
      key: '2',
      label: 'Driving',
      children: <Driving data={driver_data} />,
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
            src="https://res.cloudinary.com/dmwcbhehi/image/upload/f_auto/q_auto/v1718014093/Driver%20profiles/Michael_Christensen_Profile_Picture_o3r40d.jpg"
            alt=""
          />
        </div>
      </div>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
}

export default DriverInfotmation;
