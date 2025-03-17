import { Button } from 'antd';
import React from 'react';

function Documents({ data }) {
  const { national_id_passport_img, psv_license_img, driving_license_img } =
    data;

  return (
    <div>
      <h1 className="text-base text-[#222]]">
        National ID/Passport :: <br />{' '}
        <div className="w-48 h-28 rounded-md overflow-hidden mb-3">
          <img
            className="w-full h-full object-cover"
            src={national_id_passport_img}
            alt=""
          />
        </div>
      </h1>
      <h1 className="text-base text-[#222]]">
        PSV License :
        <br />{' '}
        <div className="w-48 h-28 rounded-md overflow-hidden mb-3">
          <img
            className="w-full h-full object-cover"
            src={psv_license_img}
            alt=""
          />
        </div>
      </h1>
      <h1 className="text-base text-[#222]]">
        Driving License : <br />
        <div className="w-48 h-28 rounded-md overflow-hidden mb-3">
          <img
            className="w-full h-full object-cover"
            src={driving_license_img}
            alt=""
          />
        </div>
      </h1>

      <Button className="!w-full hover:!bg-[var(--bg-pink-high !bg-[var(--bg-pink-high)] !text-white">
        Edit
      </Button>
    </div>
  );
}

export default Documents;
