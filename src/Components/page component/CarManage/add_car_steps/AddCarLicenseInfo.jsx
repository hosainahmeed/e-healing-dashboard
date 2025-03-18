import React from "react";
import { Form, Input, DatePicker, InputNumber, Select } from "antd";

const AddCarLicenseInfo = ({ form }) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">License Information</h3>
      <Form layout="vertical">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item
            name="carNumber"
            label="Car Number"
            rules={[{ required: true, message: "Please enter the car number" }]}
          >
            <Input placeholder="E.g., XYZ-9876" />
          </Form.Item>

          <Form.Item
            name="carLicensePlate"
            label="License Plate"
            rules={[
              {
                required: true,
                message: "Please enter the license plate number",
              },
            ]}
          >
            <Input placeholder="E.g., AB123CD" />
          </Form.Item>

          <Form.Item
            name="evpNumber"
            label="EVP Number"
            rules={[{ required: true, message: "Please enter the EVP number" }]}
          >
            <Input placeholder="Environmental Vehicle Permit Number" />
          </Form.Item>

          <Form.Item
            name="evpExpiry"
            label="EVP Expiry Date"
            rules={[
              { required: true, message: "Please select the EVP expiry date" },
            ]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="seats"
            label="Number of Seats"
            rules={[
              { required: true, message: "Please enter number of seats" },
            ]}
          >
            <InputNumber
              min={1}
              max={20}
              placeholder="E.g., 5"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            name="vin"
            label="VIN"
            rules={[{ required: true, message: "Please enter the VIN" }]}
          >
            <Input placeholder="Vehicle Identification Number" />
          </Form.Item>

          <Form.Item
            name="registrationDate"
            label="Registration Date"
            rules={[
              {
                required: true,
                message: "Please select the registration date",
              },
            ]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="insuranceStatus"
            label="Insurance Status"
            rules={[
              { required: true, message: "Please select insurance status" },
            ]}
          >
            <Select placeholder="Select insurance status">
              <Select.Option value="active">Active</Select.Option>
              <Select.Option value="expired">Expired</Select.Option>
              <Select.Option value="pending">Pending</Select.Option>
            </Select>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default AddCarLicenseInfo;
