import React, { useState } from 'react';
import {
  Button,
  Steps,
  Form,
  Input,
  Upload,
  Select,
  DatePicker,
  message,
} from 'antd';
import { FaCameraRetro, FaPlus, FaUser, FaEdit } from 'react-icons/fa';

const { Step } = Steps;

const DriverRegistrationForm = () => {
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({});
  const [imageUrl, setImageUrl] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const steps = [
    {
      title: 'General',
      content: 'general-info',
    },
    {
      title: 'Driving',
      content: 'driving-info',
    },
    {
      title: 'Docs',
      content: 'document-info',
    },
    {
      title: 'Car',
      content: 'car-info',
    },
  ];

  const handleNext = async () => {
    try {
      const values = await form.validateFields();
      const updatedData = { ...formData, ...values };
      setFormData(updatedData);
      setCurrent(current + 1);
    } catch (error) {
      console.log('Validation failed:', error);
    }
  };

  const handlePrev = () => {
    setCurrent(current - 1);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const finalData = { ...formData, ...values };

      const submitFormData = new FormData();

      if (imageFile) {
        submitFormData.append('avatar', imageFile);
      }

      Object.keys(finalData).forEach((key) => {
        if (key !== 'avatar' && finalData[key] !== undefined) {
          if (finalData[key] && finalData[key].format) {
            submitFormData.append(key, finalData[key].format('YYYY-MM-DD'));
          } else if (
            key === 'nationalIdDoc' ||
            key === 'psvLicense' ||
            key === 'drivingLicenseDoc'
          ) {
            if (finalData[key] && finalData[key].fileList) {
              finalData[key].fileList.forEach((file, index) => {
                if (file.originFileObj) {
                  submitFormData.append(`${key}_${index}`, file.originFileObj);
                }
              });
            }
          } else {
            submitFormData.append(key, finalData[key]);
          }
        }
      });

      console.log('Form data submitted:');
     console.log(submitFormData)

      message.success('Driver added successfully!');
    } catch (error) {
      console.log('Validation failed:', error);
    }
  };

  const handleCancel = () => {
    message.info('Registration cancelled');
    form.resetFields();
    setCurrent(0);
    setFormData({});
    setImageUrl(null);
    setImageFile(null);
  };

  const handleAvatarChange = ({ fileList }) => {
    if (fileList.length > 0 && fileList[0].originFileObj) {
      const file = fileList[0].originFileObj;
      setImageFile(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImageUrl(null);
      setImageFile(null);
    }
  };

  const handleRemoveAvatar = (e) => {
    e.stopPropagation();
    setImageUrl(null);
    setImageFile(null);
    form.setFieldsValue({ avatar: undefined });
  };

  const uploadButton = (
    <div className="flex flex-col items-center border border-gray-600 border-dashed rounded-full w-24 h-24 justify-center">
      {imageUrl ? (
        <div className="relative w-24 h-24">
          <img
            src={imageUrl}
            alt="avatar"
            className="w-full h-full rounded-full object-cover"
          />
          <div
            className="absolute bottom-0 right-0 border border-dashed w-6 h-6 bg-[var(--bg-pink-high)] flex items-center justify-center rounded-full cursor-pointer"
            onClick={(e) => e.stopPropagation()}
          >
            <FaCameraRetro color="white" />
          </div>
          <div
            className="absolute top-0 right-0 border border-dashed w-6 h-6 bg-red-500 flex items-center justify-center rounded-full cursor-pointer"
            onClick={handleRemoveAvatar}
            title="Remove image"
          >
            <span className="text-white text-xs font-bold">×</span>
          </div>
        </div>
      ) : (
        <>
          <FaUser className="text-gray-400" size={32} />
          <div className="mt-2 text-gray-500">Upload</div>
        </>
      )}
    </div>
  );

  const documentUploadButton = (
    <div className="flex flex-col items-center">
      <FaPlus />
      <div className="mt-2">Upload</div>
    </div>
  );

  return (
    <div className="w-full max-w-3xl mx-auto py-4">
      <Steps current={current} className="!mb-8">
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>

      <Form
        requiredMark={false}
        form={form}
        layout="vertical"
        initialValues={formData}
      >
        {current === 0 && (
          <div>
            <div className="flex justify-center mb-6">
              <Form.Item name="avatar" className="mb-6">
                <Upload
                  listType="picture"
                  className="avatar-uploader"
                  showUploadList={false}
                  beforeUpload={() => false}
                  onChange={handleAvatarChange}
                  maxCount={1}
                >
                  {uploadButton}
                </Upload>
              </Form.Item>
            </div>

            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: 'Please enter name' }]}
            >
              <Input placeholder="Full name" size="large" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Please enter email' },
                { type: 'email', message: 'Please enter a valid email' },
              ]}
            >
              <Input placeholder="Email address" size="large" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: 'Please enter password' }]}
            >
              <Input.Password placeholder="Password" size="large" />
            </Form.Item>

            <Form.Item
              name="address"
              label="Address"
              rules={[{ required: true, message: 'Please enter address' }]}
            >
              <Input placeholder="Address" size="large" />
            </Form.Item>

            <Form.Item
              name="contactNo"
              label="Contact No"
              rules={[
                { required: true, message: 'Please enter contact number' },
              ]}
            >
              <Input placeholder="Contact number" size="large" />
            </Form.Item>
          </div>
        )}

        {current === 1 && (
          <div>
            <Form.Item
              name="nationalId"
              label="National ID/Passport"
              rules={[
                {
                  required: true,
                  message: 'Please enter National ID/Passport',
                },
              ]}
            >
              <Input placeholder="National ID/Passport number" size="large" />
            </Form.Item>

            <Form.Item
              name="drivingLicenseNo"
              label="Driving License No"
              rules={[
                {
                  required: true,
                  message: 'Please enter driving license number',
                },
              ]}
            >
              <Input placeholder="Driving license number" size="large" />
            </Form.Item>

            <Form.Item
              name="licenseType"
              label="License Type"
              rules={[{ required: true, message: 'Please enter license type' }]}
            >
              <Input placeholder="License type" size="large" />
            </Form.Item>

            <Form.Item
              name="licenseExpire"
              label="License Expire"
              rules={[{ required: true, message: 'Please select expiry date' }]}
            >
              <DatePicker
                placeholder="Select date"
                size="large"
                style={{ width: '100%' }}
                format="DD MMM YYYY"
              />
            </Form.Item>
          </div>
        )}

        {current === 2 && (
          <div>
            <Form.Item name="nationalIdDoc" label="National ID/Passport">
              <Upload listType="picture-card" beforeUpload={() => false}>
                {documentUploadButton}
              </Upload>
            </Form.Item>

            <Form.Item name="psvLicense" label="PSV License">
              <Upload listType="picture-card" beforeUpload={() => false}>
                {documentUploadButton}
              </Upload>
            </Form.Item>

            <Form.Item name="drivingLicenseDoc" label="Driving License">
              <Upload listType="picture-card" beforeUpload={() => false}>
                {documentUploadButton}
              </Upload>
            </Form.Item>
          </div>
        )}

        {current === 3 && (
          <div>
            <Form.Item
              name="assignedCar"
              label="Assign A Car"
              rules={[{ required: true, message: 'Please select a car' }]}
            >
              <Select placeholder="Select an available car" size="large">
                <Select.Option value="car1">
                  Toyota Camry (ABC123)
                </Select.Option>
                <Select.Option value="car2">Honda Civic (XYZ789)</Select.Option>
                <Select.Option value="car3">
                  Ford Explorer (DEF456)
                </Select.Option>
              </Select>
            </Form.Item>
          </div>
        )}
      </Form>

      <div className="flex justify-between mt-6">
        <Button danger size="large" className="px-8" onClick={handleCancel}>
          Cancel
        </Button>

        <div className="flex gap-4 items-center">
          {current > 0 && (
            <Button size="large" className="mr-2" onClick={handlePrev}>
              Previous
            </Button>
          )}

          <Button
            type="primary"
            size="large"
            className="px-8 !bg-purple-600"
            onClick={current < steps.length - 1 ? handleNext : handleSubmit}
          >
            {current < steps.length - 1 ? 'Next' : 'Save'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DriverRegistrationForm;
