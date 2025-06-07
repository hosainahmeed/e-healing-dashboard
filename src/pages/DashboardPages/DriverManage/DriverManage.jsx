import React  from 'react';
import PageHeading from '../../../Components/Shared/PageHeading';
import Button from '../../../Components/Shared/Button';
import { FaPlus } from 'react-icons/fa';
import { Modal } from 'antd';
import DriverRegistrationForm from '../../../Components/page component/DriverRegistrationForm';
import DriverTable from '../../../Components/tables/driver/DriverTable';
import { Link } from 'react-router-dom';

function DriverManage() {
  // const [showModal, setShowModal] = useState(true);
  return (
    <div>
      <div className="flex items-center justify-between">
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
            // handler={() => setShowModal(true)}
          />
        </Link>
      </div>
      {/* <Modal
        width={800}
        open={showModal}
        footer={null}
        onCancel={() => setShowModal(false)}
        title={
          <div className="flex items-center justify-center w-full">
            <h1 className="font-semibold text-3xl">Add New Driver</h1>
          </div>
        }
      >
        <DriverRegistrationForm />
      </Modal> */}
      <div className="mt-4">
        <DriverTable />
      </div>
    </div>
  );
}

export default DriverManage;
