import React from "react";
import { Form, Input, Select } from "antd";

const AddCarGeneralInfo = ({ form }) => {
  const carBrands = [
    "Toyota",
    "Honda",
    "Ford",
    "Chevrolet",
    "Nissan",
    "Hyundai",
    "Kia",
    "Mazda",
    "Subaru",
    "BMW",
    "Mercedes-Benz",
    "Audi",
    "Volkswagen",
    "Lexus",
    "Volvo",
  ];

  const carTypes = [
    "Sedan",
    "SUV",
    "Hatchback",
    "Coupe",
    "Truck",
    "Van",
    "Convertible",
    "Wagon",
  ];

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">General Car Information</h3>
      <Form layout="vertical">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item
            name="brand"
            label="Brand"
            rules={[{ required: true, message: "Please select the car brand" }]}
          >
            <Select placeholder="Select car brand">
              {carBrands.map((brand) => (
                <Select.Option key={brand} value={brand}>
                  {brand}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="model"
            label="Model"
            rules={[{ required: true, message: "Please enter the car model" }]}
          >
            <Input placeholder="E.g., Camry, Civic, F-150" />
          </Form.Item>

          <Form.Item
            name="type"
            label="Type"
            rules={[{ required: true, message: "Please select the car type" }]}
          >
            <Select placeholder="Select car type">
              {carTypes.map((type) => (
                <Select.Option key={type} value={type}>
                  {type}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="color"
            label="Color"
            rules={[{ required: true, message: "Please enter the car color" }]}
          >
            <Input placeholder="E.g., Black, White, Silver" />
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default AddCarGeneralInfo;
