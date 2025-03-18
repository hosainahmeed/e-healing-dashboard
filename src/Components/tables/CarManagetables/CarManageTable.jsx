import React, { useState } from 'react';
import { Table, Space, Avatar, Button, Modal, Tabs, Image } from 'antd';
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { imageUrl } from '../../../Utils/server';
import DocumentCard from '../../page component/CarManage/CarDetails/DocumentCard';
import DriverDetailsTab from '../../page component/CarManage/CarDetails/DriverDetailsTab';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const CarImage = ({ src }) => (
  <div className="w-16 h-16 rounded-md overflow-hidden">
    <img src={imageUrl(src)} alt="Car" className="w-full h-full object-cover" />
  </div>
);

const DriverInfo = ({ driver }) => {
  if (!driver) {
    return (
      <div className="flex items-center text-yellow-600">
        <UserOutlined className="mr-2" />
        <span>No Driver Assigned To This Car</span>
      </div>
    );
  }

  return (
    <div className="flex items-center">
      <Avatar
        src={imageUrl(driver.profile_image)}
        size={32}
        className="mr-2"
        icon={<UserOutlined />}
      />
      <span>{driver.name}</span>
    </div>
  );
};

const ActionButtons = ({ record, onViewDetails }) => (
  <Space size="small">
    <Button
      type="primary"
      shape="circle"
      icon={<EyeOutlined />}
      onClick={() => onViewDetails(record)}
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
);

const DetailField = ({ label, value }) => (
  <div className="flex justify-between border-b border-[#dadada] pb-2">
    <span className="text-gray-500 leading-none">{label}:</span>
    <span className="font-medium leading-none">{value}</span>
  </div>
);

const ImageThumbnails = ({ images, activeIndex, onSelect }) => (
  <div className="flex flex-wrap gap-2 mb-4">
    {images.map((image, index) => (
      <div
        key={index}
        className={`w-24 h-24 rounded-lg overflow-hidden cursor-pointer ${
          activeIndex === index ? 'ring-2 ring-blue-500' : ''
        }`}
        onClick={() => onSelect(index)}
      >
        <img
          src={imageUrl(image)}
          alt={`Car view ${index + 1}`}
          className="w-full h-full object-cover"
        />
      </div>
    ))}
  </div>
);

// Tab components
const CarDetailsTab = ({ car }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Define details to display
  const details = [
    { label: 'Car Brand', value: car.brand },
    { label: 'Car Model', value: car.model },
    { label: 'Car Type', value: car.type },
    { label: 'Color', value: car.color },
    { label: 'License Plate', value: car.carLicensePlate },
    { label: 'EVP Number', value: car.evpNumber },
    { label: 'EVP Expiry Date', value: formatDate(car.evpExpiry) },
    { label: 'Registration Date', value: formatDate(car.registrationDate) },
    {
      label: 'Insurance Status',
      value: car.insuranceStatus === 'active' ? 'Active' : 'Inactive',
    },
  ];

  // Add driver information if available
  if (car.assignedDriver) {
    details.push({
      label: 'Assigned Driver',
      value: car.assignedDriver.name,
    });
    details.push({
      label: 'Driver License',
      value: car.assignedDriver.drivingLicenseNo,
    });
    details.push({
      label: 'License Expiry',
      value: formatDate(car.assignedDriver.licenseExpiry),
    });
  } else {
    details.push({
      label: 'Driver Status',
      value: 'No Driver Assigned',
    });
  }

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2">
          <div className="mb-6">
            <img
              src={imageUrl(car.car_image[activeImageIndex])}
              alt="Car"
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
          <ImageThumbnails
            images={car.car_image}
            activeIndex={activeImageIndex}
            onSelect={setActiveImageIndex}
          />
        </div>
        <div className="w-full md:w-1/2">
          <div className="grid grid-cols-1 gap-4">
            {details.map((item, index) => (
              <DetailField key={index} label={item.label} value={item.value} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const DocumentsTab = ({ car }) => (
  <div className="p-4">
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-2">Vehicle Documents</h3>
      <p className="text-gray-500 mb-4">
        All official documents related to this vehicle
      </p>

      <div className="">
        <DocumentCard title="Vehicle Grant" imageSrc={car.car_grant_image} />
        <DocumentCard
          title="Vehicle Insurance"
          imageSrc={car.car_insurance_image}
        />
        <DocumentCard
          title="E-hailing Vehicle Permit"
          imageSrc={car.e_hailing_car_permit_image}
        />
      </div>
    </div>
  </div>
);



// Main component
const CarManagementTable = ({ carsData = [] }) => {
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  const handleViewDetails = (car) => {
    setSelectedCar(car);
    setDetailModalVisible(true);
  };

  // Table columns configuration
  const columns = [
    {
      title: 'Car Image',
      dataIndex: 'car_image',
      key: 'carImage',
      render: (images) => <CarImage src={images?.[0]} />,
    },
    {
      title: 'Car Brand/Model',
      dataIndex: 'brand',
      key: 'carBrand',
      render: (text, record) => (
        <div>
          <div className="font-medium">{text}</div>
          <div className="text-sm text-gray-500">{record.model}</div>
        </div>
      ),
    },
    {
      title: 'Car Plate/Color',
      dataIndex: 'carLicensePlate',
      key: 'carPlate',
      render: (text, record) => (
        <div>
          <div className="font-medium">{text}</div>
          <div className="text-sm text-gray-500">{record.color}</div>
        </div>
      ),
    },
    {
      title: 'Assigned Driver',
      dataIndex: 'assignedDriver',
      key: 'assignedDriver',
      render: (driver) => <DriverInfo driver={driver} />,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <ActionButtons record={record} onViewDetails={handleViewDetails} />
      ),
    },
  ];

  // Sample data (you would replace this with real data)
  const sampleCars = [
    {
      _id: '67d8eab88d36243e1e860794',
      brand: 'Toyota',
      model: 'Camry',
      type: 'Sedan',
      seats: 5,
      evpNumber: 'EVP123456',
      evpExpiry: '2025-08-30',
      carNumber: 'XYZ-9876',
      color: 'Black',
      carLicensePlate: 'AB123CD',
      vin: '1HGCM82633A123456',
      insuranceStatus: 'active',
      registrationDate: '2023-06-15',
      car_image: [
        'https://m.atcdn.co.uk/ect/media/%7Bresize%7D/4b14ab0c7868451baf5912779f112f40.jpg',
        'https://m.atcdn.co.uk/ect/media/%7Bresize%7D/4b14ab0c7868451baf5912779f112f40.jpg',
        'https://m.atcdn.co.uk/ect/media/%7Bresize%7D/4b14ab0c7868451baf5912779f112f40.jpg',
      ],
      car_grant_image:
        'https://m.atcdn.co.uk/ect/media/%7Bresize%7D/4b14ab0c7868451baf5912779f112f40.jpg',
      car_insurance_image:
        'https://m.atcdn.co.uk/ect/media/%7Bresize%7D/4b14ab0c7868451baf5912779f112f40.jpg',
      e_hailing_car_permit_image:
        'https://m.atcdn.co.uk/ect/media/%7Bresize%7D/4b14ab0c7868451baf5912779f112f40.jpg',
      isAssigned: false,
      createdAt: '2025-03-18T03:38:32.673Z',
      updatedAt: '2025-03-18T03:38:32.673Z',
    },
    {
      _id: '67d3fca0801c924150e0ec01',
      brand: 'Prius',
      model: 'Plus',
      type: 'Premium',
      seats: 5,
      evpNumber: 'EVP123456',
      evpExpiry: '2025-08-30',
      carNumber: 'XYZ-9876',
      color: 'Silver',
      carLicensePlate: 'AB123CD',
      vin: '1HGCM82633A123456',
      insuranceStatus: 'active',
      registrationDate: '2023-06-15',
      car_image: [
        'uploads\\car_image\\1741946016251-black-luxury-jeep-min.jpg',
        'uploads\\car_image\\1741946016268-modern-luxury-white-car-min.jpg',
        'uploads\\car_image\\1741946016289-white-offroader-jeep-min.jpg',
      ],
      car_grant_image: 'uploads\\car_grant_image\\1741946016313-car-grant.png',
      car_insurance_image:
        'uploads\\car_insurance_image\\1741946016314-car-insurance.png',
      e_hailing_car_permit_image:
        'uploads\\e_hailing_car_permit_image\\1741946016315-car-insurance.png',
      isAssigned: true,
      createdAt: '2025-03-14T09:53:36.365Z',
      updatedAt: '2025-03-18T03:20:43.827Z',
      assignedDriver: {
        _id: '67d3bc8b3c618cb4557d1def',
        authId: '67d3bc8b3c618cb4557d1ded',
        name: 'Lucifer',
        email: 'thakursaad613@gmail.com',
        profile_image: 'uploads\\profile_image\\1741929611240-hae-in.png',
        phoneNumber: '+1234567890',
        address: '123 Main Street, City, Country',
        isOnline: false,
        idOrPassportNo: 'A123456789',
        drivingLicenseNo: 'DL123456789',
        licenseType: 'Commercial',
        licenseExpiry: '2025-12-31',
        id_or_passport_image:
          'uploads\\id_or_passport_image\\1741929611255-image.png',
        psv_license_image:
          'uploads\\psv_license_image\\1741929611258-image.png',
        driving_license_image:
          'uploads\\driving_license_image\\1741929611261-image.png',
        userAccountStatus: 'verified',
        role: 'DRIVER',
        assignedCar: '67d3fca0801c924150e0ec01',
      },
    },
  ];

  const getTabItems = (car) => {
    const tabs = [
      {
        key: '1',
        label: 'Car Details',
        children: <CarDetailsTab car={car} />,
      },
      {
        key: '2',
        label: 'Driver Details',
        children: <DriverDetailsTab driver={car.assignedDriver} />,
      },
      {
        key: '3',
        label: 'Car Documents',
        children: <DocumentsTab car={car} />,
      },
    ];

    return tabs;
  };

  return (
    <div className="w-full overflow-x-auto">
      <Table
        columns={columns}
        dataSource={carsData.length > 0 ? carsData : sampleCars}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
      />

      {selectedCar && (
        <Modal
          title={`${selectedCar.brand} ${selectedCar.model}`}
          open={detailModalVisible}
          onCancel={() => setDetailModalVisible(false)}
          footer={null}
          width={800}
        >
          <Tabs defaultActiveKey="1" items={getTabItems(selectedCar)} />
        </Modal>
      )}
    </div>
  );
};

export default CarManagementTable;
