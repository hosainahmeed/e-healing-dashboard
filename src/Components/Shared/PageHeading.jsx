import React from 'react';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { Alert } from 'antd';

function PageHeading({ title }) {
  return (
    <Alert
      showIcon={false}
      message={
        <Link className="flex items-center gap-2" to={-1}>
          <FaArrowLeftLong /> {title}
        </Link>
      }
      className="flex !items-center !my-3 w-full justify-between"
    />
  );
}

export default PageHeading;
