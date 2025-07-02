import React from 'react';
import PageHeading from '../../../Components/Shared/PageHeading';
import Button from '../../../Components/Shared/Button';
import { FaPlus } from 'react-icons/fa';
import DriverTable from '../../../Components/tables/driver/DriverTable';
import { Link } from 'react-router-dom';

function DriverManage() {
  return (
    <div>
      <PageHeading title={'Driver'} />
      <Link to={'/add-new-driver'}>
        <Button
          style={{ marginTop: '1rem' }}
          text={'Add New Driver'}
          icon={<FaPlus />}
          classNames={
            'button-white !bg-[var(--bg-pink-high)] !text-[var(--color-white)]'
          }
          type={'button'}
        />
      </Link>
      <div className="mt-4">
        <DriverTable />
      </div>
    </div>
  );
}

export default DriverManage;
