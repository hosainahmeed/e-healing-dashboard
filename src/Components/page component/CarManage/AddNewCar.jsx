import { Button, Form, message, Steps } from 'antd';
import React, { useState, useEffect } from 'react';
import AddCarImage from './add_car_steps/AddCarImage';
import AddCarGeneralInfo from './add_car_steps/AddCarGeneralInfo';
import AddCarDocument from './add_car_steps/AddCarDocument';
import AddCarLicenseInfo from './add_car_steps/AddCarLicenseInfo';
import {
  useCreateNewCarMutation,
  useGetSingleCarDataQuery,
  useUpdateCarMutation,
} from '../../../Redux/services/carApis';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import dayjs from 'dayjs';
const { Step } = Steps;

function AddNewCar() {
  const location = useLocation();
  const id = location.state;
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [addNewCar] = useCreateNewCarMutation();
  const [initialData, setInitialData] = useState({});
  const { data: singleCarData, isLoading: singleCarLoading } =
    useGetSingleCarDataQuery({ carId: id });
  const [updateCar, { isLoading: isUpdating }] = useUpdateCarMutation();

  const [imageData, setImageData] = useState({
    car_image: [],
  });
  const [generalInfo, setGeneralInfo] = useState({});
  const [licenseInfo, setLicenseInfo] = useState({});
  const [documentInfo, setDocumentInfo] = useState({});

  useEffect(() => {
    const evpExpiry = dayjs(singleCarData?.data?.evpExpiry);
    const registrationDate = dayjs(singleCarData?.data?.registrationDate);

    const data = {
      brand: singleCarData?.data?.brand,
      model: singleCarData?.data?.model,
      type: singleCarData?.data?.type,
      seats: singleCarData?.data?.seats,
      evpNumber: singleCarData?.data?.evpNumber,
      evpExpiry: evpExpiry,
      carNumber: singleCarData?.data?.carNumber,
      color: singleCarData?.data?.color,
      carLicensePlate: singleCarData?.data?.carLicensePlate,
      vin: singleCarData?.data?.vin,
      insuranceStatus: singleCarData?.data?.insuranceStatus,
      registrationDate: registrationDate,
      car_image: singleCarData?.data?.car_image || [],
      car_grant_image: singleCarData?.data?.car_grant_image,
      car_insurance_image: singleCarData?.data?.car_insurance_image,
      e_hailing_car_permit_image:
        singleCarData?.data?.e_hailing_car_permit_image,
      isAssigned: singleCarData?.data?.isAssigned,
    };
    setInitialData(data);
  }, [singleCarData, form]);

  useEffect(() => {
    setFormData({
      ...imageData,
      ...generalInfo,
      ...licenseInfo,
      ...documentInfo,
    });
  }, [imageData, generalInfo, licenseInfo, documentInfo]);
  useEffect(() => {
    setImageData(singleCarData?.data?.car_image);
  }, [singleCarData]);

  const steps = [
    {
      title: 'Car Image',
      content: (
        <AddCarImage
          form={form}
          initialValues={imageData}
          setImageData={setImageData}
        />
      ),
    },
    {
      title: 'General Information',
      content: (
        <AddCarGeneralInfo
          form={form}
          initialValues={generalInfo}
          setGeneralInfo={setGeneralInfo}
        />
      ),
    },
    {
      title: ' License Information',
      content: (
        <AddCarLicenseInfo
          form={form}
          initialValues={initialData}
          setLicenseInfo={setLicenseInfo}
        />
      ),
    },
    {
      title: 'Vehicle Grant',
      content: (
        <AddCarDocument
          form={form}
          initialValues={initialData}
          setDocumentInfo={setDocumentInfo}
        />
      ),
    },
  ];

  const handleNext = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();

      switch (current) {
        case 0:
          setImageData((prevData) => ({ ...prevData, ...values }));
          break;
        case 1:
          setGeneralInfo((prevData) => ({ ...prevData, ...values }));
          break;
        case 2:
          setLicenseInfo((prevData) => ({ ...prevData, ...values }));
          break;
        case 3:
          setDocumentInfo((prevData) => ({ ...prevData, ...values }));
          break;
        default:
          break;
      }

      setCurrent(current + 1);
      form.resetFields();
    } catch (error) {
      console.error('Validation failed:', error);
      message.error('Please complete all required fields');
    } finally {
      setLoading(false);
    }
  };

  const handlePrev = () => {
    setCurrent(current - 1);

    const stepData = [imageData, generalInfo, licenseInfo, documentInfo][
      current - 1
    ];
    form.setFieldsValue(stepData);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      setDocumentInfo((prevData) => ({ ...prevData, ...values }));
      const submitFormData = new FormData();
      const allData = {
        ...generalInfo,
        ...licenseInfo,
        ...documentInfo,
        ...values,
      };
      if (imageData.car_image && Array.isArray(imageData.car_image)) {
        imageData.car_image.forEach((file) => {
          submitFormData.append('car_image', file);
        });
      }

      Object.entries(allData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (value && value.format) {
            submitFormData.append(key, value.format('YYYY-MM-DD'));
          } else if (
            key === 'car_grant_image' ||
            key === 'car_insurance_image' ||
            key === 'e_hailing_car_permit_image'
          ) {
            if (value && value.fileList) {
              const file = value.fileList[0]?.originFileObj;
              if (file) {
                submitFormData.append(key, file);
              }
            } else if (value && value.file) {
              submitFormData.append(key, value.file);
            } else if (value && typeof value !== 'object') {
              submitFormData.append(key, value);
            }
          } else if (key !== 'car_image') {
            submitFormData.append(key, value);
          }
        }
      });

      await addNewCar({ submitFormData });

      toast.success('Car added successfully!');
      form.resetFields();
      setCurrent(0);
      setFormData({});
      setImageData({ car_image: [] });
      setGeneralInfo({});
      setLicenseInfo({});
      setDocumentInfo({});
    } catch (error) {
      console.error('Submission failed:', error);
      message.error('Failed to add car. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Steps current={current} className="!my-12">
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>

      <Form
        requiredMark={false}
        initialValues={initialData}
        form={form}
        layout="vertical"
        className="mb-6"
      >
        {steps[current].content}
      </Form>

      <div className="flex gap-4 items-center mt-4">
        {current > 0 && (
          <Button size="large" onClick={handlePrev} disabled={loading}>
            Previous
          </Button>
        )}
        <Button
          type="primary"
          size="large"
          className="px-8 !bg-purple-600"
          onClick={current < steps.length - 1 ? handleNext : handleSubmit}
          loading={loading || (id && isUpdating)}
          disabled={id && singleCarLoading}
        >
          {current < steps.length - 1 ? 'Next' : id ? 'Update' : 'Save'}
        </Button>
      </div>
    </div>
  );
}

export default AddNewCar;
