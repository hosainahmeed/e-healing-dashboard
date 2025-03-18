import React from "react";
import { Form, Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;

const AddCarDocument = ({ form }) => {
  const uploadProps = {
    beforeUpload: () => false,
    maxCount: 1,
    accept: ".pdf,.jpg,.jpeg,.png",
    onRemove: () => {
      message.info("File removed");
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
                message: "Please upload the vehicle grant document",
              },
            ]}
          >
            <Dragger {...uploadProps}>
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
                message: "Please upload the insurance certificate",
              },
            ]}
          >
            <Dragger {...uploadProps}>
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
                message: "Please upload the e-hailing car permit",
              },
            ]}
          >
            <Dragger {...uploadProps}>
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
