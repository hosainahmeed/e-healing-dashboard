import { Button } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

function General({ data }) {
  return (
    <div>
      <h1>{data.driver_id}</h1>
      <h1 className="text-base text-[#222]]">
        Name: <br /> <span className="text-gray-500">{data?.name}</span>
      </h1>
      <h1 className="text-base text-[#222]]">
        Email:
        <br /> <span className="text-gray-500">{data?.email}</span>
      </h1>
      <h1 className="text-base text-[#222]]">
        Password: <br />
        <span className="text-gray-500">{data?.password}</span>
      </h1>
      <h1 className="text-base text-[#222]]">
        Address: <br />
        <span className="text-gray-500">{data?.address}</span>
      </h1>
      <h1 className=" text-base text-[#222]]">
        Contact No :
        <br /> <span className="text-gray-500">{data?.phone_number}</span>
      </h1>
      <Link to={'/add-car'} state={data.driver_id}>
        <Button className="!w-full hover:!bg-[var(--bg-pink-high !bg-[var(--bg-pink-high)] !text-white">
          Edit
        </Button>
      </Link>
    </div>
  );
}

export default General;
