// add car doucment data

import React, { useEffect, useState } from 'react';
import { Form, Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { imageUrl } from '../../../../Utils/server';

const { Dragger } = Upload;

const AddCarDocument = ({ form, initialValues }) => {
  const [grantFileList, setGrantFileList] = useState([]);
  const [insuranceFileList, setInsuranceFileList] = useState([]);
  const [permitFileList, setPermitFileList] = useState([]);

  useEffect(() => {
    if (!initialValues) return;

    const setInitialFileList = (url, setState) => {
      if (url) {
        setState([
          {
            uid: '-1', // Unique ID, can be static for initial values
            name: url.split('\\').pop() || 'document',
            status: 'done',
            url: imageUrl(url),
          },
        ]);
      } else {
        setState([]);
      }
    };

    setInitialFileList(initialValues?.car_grant_image, setGrantFileList);
    setInitialFileList(
      initialValues?.car_insurance_image,
      setInsuranceFileList
    );
    setInitialFileList(
      initialValues?.e_hailing_car_permit_image,
      setPermitFileList
    );

    form.setFieldsValue({
      car_grant_image: initialValues?.car_grant_image
        ? [
            {
              uid: '-1',
              name: initialValues?.car_grant_image.split('\\').pop() || 'grant',
            },
          ]
        : undefined,
      car_insurance_image: initialValues?.car_insurance_image
        ? [
            {
              uid: '-1',
              name:
                initialValues?.car_insurance_image.split('\\').pop() ||
                'insurance',
            },
          ]
        : undefined,
      e_hailing_car_permit_image: initialValues?.e_hailing_car_permit_image
        ? [
            {
              uid: '-1',
              name:
                initialValues?.e_hailing_car_permit_image.split('\\').pop() ||
                'permit',
            },
          ]
        : undefined,
    });
  }, [initialValues, form]);

  const handleDocumentChange = (info, fieldName, setState) => {
    const { fileList } = info;
    setState(fileList);
    
    form.setFieldsValue({
      [fieldName]:
        fileList.length > 0
          ? fileList[0].originFileObj || fileList[0].url
          : undefined,
    });
  };

  const handleRemove = (file, fieldName, setState) => {
    setState([]);
    form.setFieldsValue({ [fieldName]: undefined });
    message.info('File removed');
  };

  const getDraggerProps = (fieldName, fileListState, setFileListState) => ({
    beforeUpload: () => false,
    maxCount: 1,
    accept: '.pdf,.jpg,.jpeg,.png',
    fileList: fileListState,
    onChange: (info) => handleDocumentChange(info, fieldName, setFileListState),
    onRemove: (file) => handleRemove(file, fieldName, setFileListState),
  });

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Vehicle Documents</h3>
      <Form initialValues={initialValues} layout="vertical" form={form}>
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
              {...getDraggerProps(
                'car_grant_image',
                grantFileList,
                setGrantFileList
              )}
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
              {...getDraggerProps(
                'car_insurance_image',
                insuranceFileList,
                setInsuranceFileList
              )}
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
              {...getDraggerProps(
                'e_hailing_car_permit_image',
                permitFileList,
                setPermitFileList
              )}
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
