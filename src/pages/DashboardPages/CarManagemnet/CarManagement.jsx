import React, { useState } from 'react';
import PageHeading from '../../../Components/Shared/PageHeading';
import { FaPlus } from 'react-icons/fa6';
import Button from '../../../Components/Shared/Button';
import { Modal } from 'antd';
import AddNewCar from '../../../Components/page component/CarManage/AddNewCar';
import CarManagementTable from '../../../Components/tables/CarManagetables/CarManageTable';
import { Link } from 'react-router-dom';
function CarManagement() {
  // const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <div className="flex items-center justify-between">
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
            // handler={() => setShowModal(true)}
          />
        </Link>
      </div>
      <CarManagementTable />
      {/* <Modal
        width={1200}
        open={showModal}
        footer={null}
        onCancel={() => setShowModal(false)}
        title={
          <div className="flex items-center justify-center w-full">
            <h1 className="font-semibold text-3xl">Add New Car</h1>
          </div>
        }
      >
        <AddNewCar />
      </Modal> */}
    </div>
  );
}

export default CarManagement;

// import React, { useState } from 'react';
// import PageHeading from '../../../Components/Shared/PageHeading';
// import { FaPlus } from 'react-icons/fa6';
// import Button from '../../../Components/Shared/Button';
// import { Modal } from 'antd';
// import AddNewCar from '../../../Components/page component/CarManage/AddNewCar';
// import CarManagementTable from '../../../Components/tables/CarManagetables/CarManageTable';
// import CarForm from '../../../Components/page component/CarManage/ImageUploadForm';
// import ImageUploadForm from '../../../Components/page component/CarManage/ImageUploadForm';
// import { Link } from 'react-router-dom';

// function CarManagement() {
//   const [showModal, setShowModal] = useState(false);
//   return (
//     <div>
//       <div className="flex items-center justify-between">
//         <PageHeading title={'Car Management'} />
//         <Link to={'/car-management/new-car-add'}>
//           <Button
//             style={{ marginTop: '1rem' }}
//             text={'Add New Car'}
//             icon={<FaPlus />}
//             classNames={
//               'button-white !bg-[var(--bg-pink-high)] !text-[var(--color-white)]'
//             }
//             type={'button'}
//             // handler={() => setShowModal(true)}
//           />
//         </Link>
//       </div>
//       <CarManagementTable />
//       <Modal
//         width={1200}
//         open={showModal}
//         footer={null}
//         onCancel={() => setShowModal(false)}
//         title={
//           <div className="flex items-center justify-center w-full">
//             <h1 className="font-semibold text-3xl">Add New Car</h1>
//           </div>
//         }
//       >
//         <AddNewCar />
//       </Modal>
//     </div>
//   );
// }

// export default CarManagement;
