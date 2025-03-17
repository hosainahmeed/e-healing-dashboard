import { Button, Card } from 'antd';
import React from 'react';

function Car({ data }) {
  const { car_model, color, license_plate,car_model_image } = data;
  return (
    <div>
        <div className='w-48 h-28 rounded-md overflow-hidden mb-3'>
            <img className='w-full h-full object-cover' src={car_model_image} alt="" />
        </div>
      <div>
        <h1 className="text-base text-[#222]]">
          Car Model : <br /> <span className="text-gray-500">{car_model}</span>
        </h1>
        <h1 className="text-base text-[#222]]">
          Color :
          <br /> <span className="text-gray-500">{color}</span>
        </h1>
        <h1 className="text-base text-[#222]]">
          License Plate: <br />
          <span className="text-gray-500">{license_plate}</span>
        </h1>

        <Button className="!w-full hover:!bg-[var(--bg-pink-high !bg-[var(--bg-pink-high)] !text-white">
          Edit
        </Button>
      </div>
    </div>
  );
}

export default Car;
