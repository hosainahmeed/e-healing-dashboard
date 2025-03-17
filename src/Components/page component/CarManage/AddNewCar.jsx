import { Button, Form, message, Steps } from 'antd';
import React, { useState, useEffect } from 'react';
import AddCarImage from './add_car_steps/AddCarImage';
import AddCarGeneralInfo from './add_car_steps/AddCarGeneralInfo';
import AddCarDocument from './add_car_steps/AddCarDocument';
import AddCarLicenseInfo from './add_car_steps/AddCarLicenseInfo';

const { Step } = Steps;

function AddNewCar() {
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const [imageData, setImageData] = useState({
    imageFile: null,
    imagePreview: null,
  });
  const [generalInfo, setGeneralInfo] = useState({});
  const [licenseInfo, setLicenseInfo] = useState({});
  const [documentInfo, setDocumentInfo] = useState({});

  useEffect(() => {
    setFormData({
      ...imageData,
      ...generalInfo,
      ...licenseInfo,
      ...documentInfo,
    });
  }, [imageData, generalInfo, licenseInfo, documentInfo]);

  const steps = [
    {
      title: 'Edit Car Image',
      content: (
        <AddCarImage
          form={form}
          initialValues={imageData}
          setImageData={setImageData}
        />
      ),
    },
    {
      title: 'Edit General Information',
      content: (
        <AddCarGeneralInfo
          form={form}
          initialValues={generalInfo}
          setGeneralInfo={setGeneralInfo}
        />
      ),
    },
    {
      title: 'Edit License Information',
      content: (
        <AddCarLicenseInfo
          form={form}
          initialValues={licenseInfo}
          setLicenseInfo={setLicenseInfo}
        />
      ),
    },
    {
      title: 'Vehicle Grant',
      content: (
        <AddCarDocument
          form={form}
          initialValues={documentInfo}
          setDocumentInfo={setDocumentInfo}
        />
      ),
    },
  ];

  // Handle field validation and step transition
  const handleNext = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();

      // Update the appropriate state based on current step
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

      // Move to next step
      setCurrent(current + 1);
      // Reset form fields for the next step
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
    // Pre-fill the form with saved data when going back
    const stepData = [imageData, generalInfo, licenseInfo, documentInfo][
      current - 1
    ];
    form.setFieldsValue(stepData);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();

      // Update document info with final step values
      setDocumentInfo((prevData) => ({ ...prevData, ...values }));

      // Create FormData object for submission
      const submitFormData = new FormData();

      // Handle image file
      if (imageData.imageFile) {
        submitFormData.append('avatar', imageData.imageFile);
      }

      // Process all form data
      const allData = {
        ...generalInfo,
        ...licenseInfo,
        ...documentInfo,
        ...values,
      };

      Object.entries(allData).forEach(([key, value]) => {
        if (key !== 'imageFile' && value !== undefined) {
          // Handle date objects
          if (value && value.format) {
            submitFormData.append(key, value.format('YYYY-MM-DD'));
          }
          // Handle file lists for documents
          else if (
            key === 'nationalIdDoc' ||
            key === 'psvLicense' ||
            key === 'drivingLicenseDoc'
          ) {
            if (value && value.fileList) {
              value.fileList.forEach((file, index) => {
                if (file.originFileObj) {
                  submitFormData.append(`${key}_${index}`, file.originFileObj);
                }
              });
            }
          }
          // Handle regular values
          else {
            submitFormData.append(key, value);
          }
        }
      });

      // Here you would typically send the data to your API
      // await api.post('/cars', submitFormData);

      console.log('Form data submitted:', formData);
      message.success('Car added successfully!');

      // Reset form after successful submission
      form.resetFields();
      setCurrent(0);
      setFormData({});
      setImageData({ imageFile: null, imagePreview: null });
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
      <Steps current={current} className="mb-8">
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>

      <Form form={form} layout="vertical" className="mb-6">
        {steps[current].content}
      </Form>

      <div className="flex gap-4 items-center mt-6">
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
          loading={loading}
        >
          {current < steps.length - 1 ? 'Next' : 'Save'}
        </Button>
      </div>
    </div>
  );
}

export default AddNewCar;
