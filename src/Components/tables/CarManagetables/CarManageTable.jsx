import React, { useState } from 'react';
import { Table, Space, Avatar, Button, Modal, Tabs, Image } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const CarManagementTable = () => {
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Sample data with multiple car views
  const cars = [
    {
      id: 1,
      carImages: [
        'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?cs=srgb&dl=pexels-mikebirdy-170811.jpg&fm=jpg',
        'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/627678/pexels-photo-627678.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      ],
      carBrand: 'Tesla',
      carModel: 'Model 3 Long Range 2023',
      carPlate: 'EV-5678',
      carColor: 'Midnight Silver Metallic',
      assignedDriver: 'Marvin McKinney',
      driverImage: 'https://randomuser.me/api/portraits/men/86.jpg',
      carType: 'Sedan',
      evpNumber: 'EV-5678',
      evpValidityPeriod: 'EV-5678',
      registrationDate: '12th June 2023',
      insuranceStatus: 'Active (Valid until Jan 2026)',
      documents: {
        grant: '/api/placeholder/400/320',
        insurance: '/api/placeholder/400/320',
        permit: '/api/placeholder/400/320',
      },
    },
    {
      id: 2,
      carImages: [
        'https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      ],
      carBrand: 'BMW',
      carModel: 'X5 xDrive40i 2023',
      carPlate: 'BM-7823',
      carColor: 'Alpine White',
      assignedDriver: 'Jessica Reynolds',
      driverImage: 'https://randomuser.me/api/portraits/women/44.jpg',
      carType: 'SUV',
      evpNumber: 'BM-7823',
      evpValidityPeriod: 'BM-7823',
      registrationDate: '3rd March 2023',
      insuranceStatus: 'Active (Valid until May 2025)',
      documents: {
        grant: '/api/placeholder/400/320',
        insurance: '/api/placeholder/400/320',
        permit: '/api/placeholder/400/320',
      },
    },
  ];

  // Table columns configuration
  const columns = [
    {
      title: 'Car Image',
      dataIndex: 'carImages',
      key: 'carImage',
      render: (images) => (
        <div className="w-16 h-16 rounded-md overflow-hidden">
          <img
            src={images[0]}
            alt="Car"
            className="w-full h-full object-cover"
          />
        </div>
      ),
    },
    {
      title: 'Car Brand/Model',
      dataIndex: 'carBrand',
      key: 'carBrand',
      render: (text, record) => (
        <div>
          <div className="font-medium">{text}</div>
          <div className="text-sm text-gray-500">{record.carModel}</div>
        </div>
      ),
    },
    {
      title: 'Car Plate/Color',
      dataIndex: 'carPlate',
      key: 'carPlate',
      render: (text, record) => (
        <div>
          <div className="font-medium">{text}</div>
          <div className="text-sm text-gray-500">{record.carColor}</div>
        </div>
      ),
    },
    {
      title: 'Assigned Driver',
      dataIndex: 'assignedDriver',
      key: 'assignedDriver',
      render: (text, record) => (
        <div className="flex items-center">
          <Avatar src={record.driverImage} size={32} className="mr-2" />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          <Button
            type="primary"
            shape="circle"
            icon={<EyeOutlined />}
            onClick={() => {
              setSelectedCar(record);
              setActiveImageIndex(0);
              setDetailModalVisible(true);
            }}
            className="bg-blue-400 hover:bg-blue-500"
          />
          <Button
            type="primary"
            shape="circle"
            icon={<EditOutlined />}
            className="bg-green-400 hover:bg-green-500"
          />
          <Button danger shape="circle" icon={<DeleteOutlined />} />
        </Space>
      ),
    },
  ];

  // Components for the tabs to keep the main component clean
  const CarDetailsTab = ({ car }) => (
    <div className="p-4">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2">
          <div className="mb-6">
            <img
              src={car.carImages[activeImageIndex]}
              alt="Car"
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {car.carImages.map((image, index) => (
              <div
                key={index}
                className={`w-24 h-24 rounded-lg overflow-hidden cursor-pointer ${
                  activeImageIndex === index ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setActiveImageIndex(index)}
              >
                <img
                  src={image}
                  alt={`Car view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        {/* TODO: please refine this page make this more shoreter reuseable and make more optimize code  */}
        <div className="w-full md:w-1/2">
          <div className="grid grid-cols-1 gap-4">
            {[
              { label: 'Car Brand', value: car.carBrand },
              { label: 'Car Model', value: car.carModel },
              { label: 'Car Type', value: car.carType },
              { label: 'Color', value: car.carColor },
              { label: 'License Plate', value: car.carPlate },
              { label: 'EVP Number', value: car.evpNumber },
              { label: 'EVP Validity Period', value: car.evpValidityPeriod },
              { label: 'Registration Date', value: car.registrationDate },
              { label: 'Insurance Status', value: car.insuranceStatus },
            ].map((item, index) => (
              <div
                key={index}
                className="flex flex-col border-b border-[#dadada] pb-2"
              >
                <span className="text-gray-500">{item.label}:</span>
                <span className="font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const DriverDetailsTab = ({ car }) => (
    <div className="p-4">
      <div className="flex items-center mb-6">
        <Avatar src={car.driverImage} size={64} className="mr-4" />
        <div>
          <h3 className="text-xl font-medium">{car.assignedDriver}</h3>
          <p className="text-gray-500">Professional Driver</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { label: 'Phone', value: '+1 (555) 123-4567' },
          { label: 'Email', value: 'driver@example.com' },
          { label: 'License Number', value: 'DL-12345678' },
          { label: 'Experience', value: '5 years' },
        ].map((item, index) => (
          <div key={index} className="flex flex-col border-b pb-2">
            <span className="text-gray-500">{item.label}:</span>
            <span className="font-medium">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const DocumentsTab = ({ car }) => (
    <div className="p-4">
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Vehicle Documents</h3>
        <p className="text-gray-500 mb-4">
          All official documents related to this vehicle
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="border rounded-lg p-4">
            <h4 className="font-medium mb-2">Vehicle Grant</h4>
            <div className="mb-2 h-40 bg-gray-100 flex items-center justify-center rounded overflow-hidden">
              <img
                src={car.documents.grant}
                alt="Vehicle Grant"
                className="w-full h-full object-cover"
              />
            </div>
            <Button type="primary" className="bg-blue-500 w-full">
              View Document
            </Button>
          </div>

          <div className="border rounded-lg p-4">
            <h4 className="font-medium mb-2">Vehicle Insurance</h4>
            <div className="mb-2 h-40 bg-gray-100 flex items-center justify-center rounded overflow-hidden">
              <img
                src={car.documents.insurance}
                alt="Vehicle Insurance"
                className="w-full h-full object-cover"
              />
            </div>
            <Button type="primary" className="bg-blue-500 w-full">
              View Document
            </Button>
          </div>

          <div className="border rounded-lg p-4">
            <h4 className="font-medium mb-2">E-hailing Vehicle Permit</h4>
            <div className="mb-2 h-40 bg-gray-100 flex items-center justify-center rounded overflow-hidden">
              <img
                src={car.documents.permit}
                alt="E-hailing Permit"
                className="w-full h-full object-cover"
              />
            </div>
            <Button type="primary" className="bg-blue-500 w-full">
              View Document
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full overflow-x-auto">
      <Table
        columns={columns}
        dataSource={cars}
        rowKey="id"
        pagination={false}
      />

      {selectedCar && (
        <Modal
          title={`${selectedCar.carBrand} ${selectedCar.carModel}`}
          open={detailModalVisible}
          onCancel={() => setDetailModalVisible(false)}
          footer={null}
          width={800}
        >
          <Tabs
            defaultActiveKey="1"
            items={[
              {
                key: '1',
                label: 'Car Details',
                children: <CarDetailsTab car={selectedCar} />,
              },
              {
                key: '2',
                label: 'Driver Details',
                children: <DriverDetailsTab car={selectedCar} />,
              },
              {
                key: '3',
                label: 'Car Document',
                children: <DocumentsTab car={selectedCar} />,
              },
            ]}
          />
        </Modal>
      )}
    </div>
  );
};

export default CarManagementTable;
