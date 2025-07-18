import React, { useState, useEffect } from 'react';
import { Button, Steps, Form, Input, Upload, Select, DatePicker } from 'antd';
import { FaCameraRetro, FaPlus, FaUser } from 'react-icons/fa';
import moment from 'moment';
import { imageUrl } from '../../Utils/server';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import {
  useCreateDriverMutation,
  useGetDriverQuery,
  useUpdateDriverMutation,
} from '../../Redux/services/dashboard apis/userApis/driverApis';
import { useGetAllCarsQuery } from '../../Redux/services/carApis';

const { Step } = Steps;

const DriverRegistrationForm = () => {
  const location = useLocation();
  const id = location.state;
  const { data, isLoading } = useGetDriverQuery(
    { driverId: id },
    { skip: !id }
  );
  const [updateDriver] = useUpdateDriverMutation();
  const [createDriver] = useCreateDriverMutation();
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const { data: carData } = useGetAllCarsQuery();
  console.log(carData);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    password: '',
    phoneNumber: '',
    idOrPassportNo: '',
    drivingLicenseNo: '',
    licenseType: '',
    licenseExpiry: null,
    id_or_passport_image: null,
    psv_license_image: null,
    driving_license_image: null,
    profile_image: null,
  });

  const [imgUrl, setImageUrl] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const [documentImages, setDocumentImages] = useState({
    id_or_passport_image: [],
    psv_license_image: [],
    driving_license_image: [],
  });

  useEffect(() => {
    if (data && data.data) {
      const fetchedData = data?.data;

      const populatedData = {
        name: fetchedData?.name || '',
        email: fetchedData?.email || '',
        address: fetchedData?.address || '',
        phoneNumber: fetchedData?.phoneNumber || '',
        idOrPassportNo: fetchedData?.idOrPassportNo || '',
        drivingLicenseNo: fetchedData?.drivingLicenseNo || '',
        licenseType: fetchedData?.licenseType || '',
        licenseExpiry: fetchedData?.licenseExpiry
          ? moment(fetchedData?.licenseExpiry)
          : null,
      };

      setFormData({
        ...populatedData,
        id_or_passport_image: fetchedData?.id_or_passport_image,
        psv_license_image: fetchedData?.psv_license_image,
        driving_license_image: fetchedData?.driving_license_image,
        profile_image: fetchedData?.profile_image,
      });

      form.setFieldsValue(populatedData);

      if (fetchedData?.profile_image) {
        setImageUrl(imageUrl(fetchedData?.profile_image));
      }

      const newDocumentImages = {};
      [
        'id_or_passport_image',
        'psv_license_image',
        'driving_license_image',
      ].forEach((key) => {
        if (fetchedData[key]) {
          newDocumentImages[key] = [
            {
              uid: `-${key}`,
              name: `${key}.jpg`,
              status: 'done',
              url: imageUrl(fetchedData[key]),
              isExisting: true,
            },
          ];
        } else {
          newDocumentImages[key] = [];
        }
      });

      setDocumentImages(newDocumentImages);

      form.setFieldsValue({
        ...populatedData,
        id_or_passport_image: newDocumentImages.id_or_passport_image,
        psv_license_image: newDocumentImages.psv_license_image,
        driving_license_image: newDocumentImages.driving_license_image,
      });
    }
  }, [data, form]);

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
        submitFormData.append('profile_image', imageFile);
      } else if (
        finalData.profile_image &&
        typeof finalData.profile_image === 'string'
      ) {
        submitFormData.append('profile_image', finalData.profile_image);
      } else {
        submitFormData.append('profile_image', finalData.profile_image);
      }

      Object.keys(finalData).forEach((key) => {
        if (
          key !== 'profile_image' &&
          finalData[key] !== undefined &&
          finalData[key] !== null
        ) {
          if (finalData[key] && finalData[key].format) {
            submitFormData.append(key, finalData[key].format('YYYY-MM-DD'));
          } else if (
            key === 'id_or_passport_image' ||
            key === 'psv_license_image' ||
            key === 'driving_license_image'
          ) {
            const currentDocImages = documentImages[key] || [];

            const newFiles = currentDocImages.filter(
              (file) => file.originFileObj && !file.isExisting
            );

            if (newFiles.length > 0) {
              newFiles.forEach((file) => {
                submitFormData.append(key, file.originFileObj);
              });
            } else {
              const existingFile = currentDocImages.find(
                (file) => file.isExisting
              );
              if (existingFile && finalData[key]) {
                submitFormData.append(key, finalData[key]);
              }
            }
          } else {
            submitFormData.append(key, finalData[key]);
          }
        }
      });

      if (id) {
        submitFormData.append('id', id);
      }

      if (id) {
        await updateDriver({ data: submitFormData })
          .unwrap()
          .then((res) => {
            if (res?.success) {
              toast.success(res?.message || 'Driver updated successfully!');
            } else {
              toast.error(res?.message || 'Failed to update driver!');
            }
          });
      } else {
        const res = await createDriver({ data: submitFormData }).unwrap();
        if (res?.success) {
          toast.success('Driver added successfully!');
        } else {
          toast.error('Failed to add driver!');
        }
      }
    } catch (error) {
      console.log('Submission failed:', error);
      toast.error(error?.data?.message || 'Something went wrong!');
    }
  };

  const handleCancel = () => {
    toast.info('Registration cancelled');
    form.resetFields();
    setCurrent(0);
    setFormData({
      name: '',
      email: '',
      address: '',
      password: '',
      phoneNumber: '',
      idOrPassportNo: '',
      drivingLicenseNo: '',
      licenseType: '',
      licenseExpiry: null,
      id_or_passport_image: null,
      psv_license_image: null,
      driving_license_image: null,
      profile_image: null,
    });
    setImageUrl(null);
    setImageFile(null);
    setDocumentImages({
      id_or_passport_image: [],
      psv_license_image: [],
      driving_license_image: [],
    });
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
    form.setFieldsValue({ profile_image: undefined });
  };

  const handleDocumentChange =
    (fieldName) =>
    ({ fileList }) => {
      const updatedFileList = fileList.map((file) => {
        if (file.originFileObj) {
          return {
            ...file,
            isExisting: false,
          };
        }
        return file;
      });

      setDocumentImages((prev) => ({
        ...prev,
        [fieldName]: updatedFileList,
      }));

      form.setFieldsValue({
        [fieldName]: updatedFileList,
      });
    };

  const handleDocumentRemove = (fieldName) => (file) => {
    setDocumentImages((prev) => ({
      ...prev,
      [fieldName]: prev[fieldName].filter((item) => item.uid !== file.uid),
    }));
    return true;
  };

  const uploadButton = (
    <div className="flex flex-col items-center border border-gray-600 border-dashed rounded-full w-24 h-24 justify-center">
      {imgUrl ? (
        <div className="relative w-24 h-24">
          <img
            src={imgUrl}
            alt="profile_image"
            className="w-full h-full rounded-full object-cover"
          />

          <div
            className="absolute top-0 right-0 border border-dashed w-6 h-6 bg-red-500 flex items-center justify-center rounded-full cursor-pointer"
            onClick={handleRemoveAvatar}
            title="Remove image"
          >
            <span className="text-white text-xs font-bold">×</span>
          </div>
        </div>
      ) : (
        <div className="flex relative !cursor-pointer w-full h-full flex-col items-center">
          <FaUser className="text-gray-400 !mt-4" size={32} />
          <div className="mt-2 text-gray-500">Upload</div>
          <div className="absolute bottom-0 right-0 border border-dashed w-6 h-6 bg-[var(--bg-pink-high)] flex items-center justify-center rounded-full cursor-pointer">
            <FaCameraRetro
              className="!cursor-pointer "
              onClick={(e) => e.stopPropagation()}
              color="white"
            />
          </div>
        </div>
      )}
    </div>
  );

  const documentUploadButton = (
    <div className="flex flex-col items-center">
      <FaPlus />
      <div className="mt-2">Upload</div>
    </div>
  );

  if (id && isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        Loading driver data...
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto py-4">
      <Steps current={current} className="!mb-8">
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>

      <Form requiredMark={false} form={form} layout="vertical">
        {current === 0 && (
          <div>
            <div className="flex justify-center mb-6">
              <Form.Item name="profile_image" className="mb-6">
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

            {!id && (
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  { required: true, message: 'Please enter password' },
                  { min: 6, message: 'Password must be at least 6 characters' },
                ]}
              >
                <Input.Password placeholder="Password" size="large" />
              </Form.Item>
            )}

            <Form.Item
              name="phoneNumber"
              label="Contact No"
              rules={[
                { required: true, message: 'Please enter contact number' },
              ]}
            >
              <Input placeholder="Contact number" size="large" />
            </Form.Item>

            <Form.Item
              name="address"
              label="Address"
              rules={[{ required: true, message: 'Please enter address' }]}
            >
              <Input placeholder="Address" size="large" />
            </Form.Item>
          </div>
        )}

        {current === 1 && (
          <div>
            <Form.Item
              name="idOrPassportNo"
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
              name="licenseExpiry"
              label="License Expiry"
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
            <Form.Item name="id_or_passport_image" label="National ID/Passport">
              <Upload
                listType="picture-card"
                beforeUpload={() => false}
                fileList={documentImages.id_or_passport_image}
                onChange={handleDocumentChange('id_or_passport_image')}
                onRemove={handleDocumentRemove('id_or_passport_image')}
                maxCount={1}
              >
                {documentImages.id_or_passport_image.length === 0 &&
                  documentUploadButton}
              </Upload>
            </Form.Item>

            <Form.Item name="psv_license_image" label="PSV License">
              <Upload
                listType="picture-card"
                beforeUpload={() => false}
                fileList={documentImages.psv_license_image}
                onChange={handleDocumentChange('psv_license_image')}
                onRemove={handleDocumentRemove('psv_license_image')}
                maxCount={1}
              >
                {documentImages.psv_license_image.length === 0 &&
                  documentUploadButton}
              </Upload>
            </Form.Item>

            <Form.Item name="driving_license_image" label="Driving License">
              <Upload
                listType="picture-card"
                beforeUpload={() => false}
                fileList={documentImages.driving_license_image}
                onChange={handleDocumentChange('driving_license_image')}
                onRemove={handleDocumentRemove('driving_license_image')}
                maxCount={1}
              >
                {documentImages.driving_license_image.length === 0 &&
                  documentUploadButton}
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
                {carData?.data?.cars?.map((car) => (
                  <Select.Option key={car._id} value={car._id}>
                    {car.name}
                  </Select.Option>
                ))}
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
            loading={isLoading}
          >
            {current < steps.length - 1 ? 'Next' : id ? 'Update' : 'Submit'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DriverRegistrationForm;
