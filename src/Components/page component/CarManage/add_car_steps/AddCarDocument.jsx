import React, { useState, useEffect } from 'react';
import { Form, Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

const AddCarDocument = ({ form, initialValues, setDocumentInfo }) => {
  const [carGrantFile, setCarGrantFile] = useState([]);
  const [carInsuranceFile, setCarInsuranceFile] = useState([]);
  const [eHailingPermitFile, setEHailingPermitFile] = useState([]);

  // Set form values when initialValues change
  useEffect(() => {
    if (initialValues && Object.keys(initialValues).length > 0) {
      form.setFieldsValue(initialValues);

      // Set file lists if they exist in initialValues
      if (
        initialValues.car_grant_image &&
        initialValues.car_grant_image.fileList
      ) {
        setCarGrantFile(initialValues.car_grant_image.fileList);
      }

      if (
        initialValues.car_insurance_image &&
        initialValues.car_insurance_image.fileList
      ) {
        setCarInsuranceFile(initialValues.car_insurance_image.fileList);
      }

      if (
        initialValues.e_hailing_car_permit_image &&
        initialValues.e_hailing_car_permit_image.fileList
      ) {
        setEHailingPermitFile(
          initialValues.e_hailing_car_permit_image.fileList
        );
      }
    }
  }, [initialValues, form]);

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleCarGrantChange = async ({ fileList }) => {
    setCarGrantFile(fileList);

    if (fileList.length > 0 && fileList[0].originFileObj) {
      const file = fileList[0].originFileObj;
      const preview = await getBase64(file);

      setDocumentInfo((prev) => ({
        ...prev,
        car_grant_image: file,
        car_grant_preview: preview,
      }));

      form.setFieldsValue({ car_grant_image: file });
    } else {
      setDocumentInfo((prev) => ({
        ...prev,
        car_grant_image: null,
        car_grant_preview: null,
      }));

      form.setFieldsValue({ car_grant_image: null });
    }
  };

  const handleInsuranceChange = async ({ fileList }) => {
    setCarInsuranceFile(fileList);

    if (fileList.length > 0 && fileList[0].originFileObj) {
      const file = fileList[0].originFileObj;
      const preview = await getBase64(file);

      setDocumentInfo((prev) => ({
        ...prev,
        car_insurance_image: file,
        car_insurance_preview: preview,
      }));

      form.setFieldsValue({ car_insurance_image: file });
    } else {
      setDocumentInfo((prev) => ({
        ...prev,
        car_insurance_image: null,
        car_insurance_preview: null,
      }));

      form.setFieldsValue({ car_insurance_image: null });
    }
  };

  const handlePermitChange = async ({ fileList }) => {
    setEHailingPermitFile(fileList);

    if (fileList.length > 0 && fileList[0].originFileObj) {
      const file = fileList[0].originFileObj;
      const preview = await getBase64(file);

      setDocumentInfo((prev) => ({
        ...prev,
        e_hailing_car_permit_image: file,
        e_hailing_permit_preview: preview,
      }));

      form.setFieldsValue({ e_hailing_car_permit_image: file });
    } else {
      setDocumentInfo((prev) => ({
        ...prev,
        e_hailing_car_permit_image: null,
        e_hailing_permit_preview: null,
      }));

      form.setFieldsValue({ e_hailing_car_permit_image: null });
    }
  };

  const uploadProps = {
    beforeUpload: () => false, // Prevent auto upload
    maxCount: 1,
    accept: '.pdf,.jpg,.jpeg,.png',
    onRemove: () => {
      message.info('File removed');
    },
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Vehicle Documents</h3>

      <Form layout="vertical">
        <div className="space-y-6">
          <Form.Item
            name="car_grant_image"
            label="Vehicle Grant Document"
            rules={[
              {
                required: true,
                message: 'Please upload the vehicle grant document',
              },
            ]}
          >
            <Dragger
              {...uploadProps}
              fileList={carGrantFile}
              onChange={handleCarGrantChange}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag vehicle grant document to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single PDF, JPG, JPEG or PNG file.
              </p>
            </Dragger>
          </Form.Item>

          <Form.Item
            name="car_insurance_image"
            label="Insurance Certificate"
            rules={[
              {
                required: true,
                message: 'Please upload the insurance certificate',
              },
            ]}
          >
            <Dragger
              {...uploadProps}
              fileList={carInsuranceFile}
              onChange={handleInsuranceChange}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag insurance certificate to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single PDF, JPG, JPEG or PNG file.
              </p>
            </Dragger>
          </Form.Item>

          <Form.Item
            name="e_hailing_car_permit_image"
            label="E-Hailing Car Permit"
            rules={[
              {
                required: true,
                message: 'Please upload the e-hailing car permit',
              },
            ]}
          >
            <Dragger
              {...uploadProps}
              fileList={eHailingPermitFile}
              onChange={handlePermitChange}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag e-hailing car permit to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single PDF, JPG, JPEG or PNG file.
              </p>
            </Dragger>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default AddCarDocument;
