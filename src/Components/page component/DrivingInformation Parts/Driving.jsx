import { Button } from 'antd';
import React from 'react';

function Driving({ data }) {
  const {
    national_id_passport,
    driving_license_no,
    license_type,
    license_expire,
  } = data;
  return (
    <div>
      <h1 className="text-base text-[#222]]">
        National ID/Passport :: <br />{' '}
        <span className="text-gray-500">{national_id_passport}</span>
      </h1>
      <h1 className="text-base text-[#222]]">
        Driving License No :
        <br /> <span className="text-gray-500">{driving_license_no}</span>
      </h1>
      <h1 className="text-base text-[#222]]">
        License Type : <br />
        <span className="text-gray-500">{license_type}</span>
      </h1>
      <h1 className="text-base text-[#222]]">
        License Expire : <br />
        <span className="text-gray-500">{license_expire}</span>
      </h1>

      <Button className="!w-full hover:!bg-[var(--bg-pink-high !bg-[var(--bg-pink-high)] !text-white">
        Edit
      </Button>
    </div>
  );
}

export default Driving;
