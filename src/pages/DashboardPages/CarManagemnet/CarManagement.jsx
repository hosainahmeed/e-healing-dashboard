import React from 'react';
import PageHeading from '../../../Components/Shared/PageHeading';
import { FaPlus } from 'react-icons/fa6';
import Button from '../../../Components/Shared/Button';
import CarManagementTable from '../../../Components/tables/CarManagetables/CarManageTable';
import { Link } from 'react-router-dom';
function CarManagement() {
  return (
    <div>
      <PageHeading title={'Car Management'} />
      <Link to={'/car-management/new-car-add'}>
        <Button
          style={{ marginTop: '1rem' }}
          text={'Add New Car'}
          icon={<FaPlus />}
          classNames={
            'button-white !bg-[var(--bg-pink-high)] !text-[var(--color-white)]'
          }
          type={'button'}
        />
      </Link>
      <CarManagementTable />
    </div>
  );
}

export default CarManagement;
