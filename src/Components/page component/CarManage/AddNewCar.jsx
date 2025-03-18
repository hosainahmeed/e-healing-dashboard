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
  console.log(formData);
  const [imageData, setImageData] = useState({
    imageFile: [],
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
      title: ' Car Image',
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

      // Handle multiple image files
      if (imageData.imageFile && Array.isArray(imageData.imageFile)) {
        imageData.imageFile.forEach((file) => {
          submitFormData.append(`car_image`, file);
        });
      } else if (imageData.imageFile) {
        // Handle single file case
        submitFormData.append('car_image', imageData.imageFile);
      }

      // Process all form data
      const allData = {
        ...generalInfo,
        ...licenseInfo,
        ...documentInfo,
        ...values,
      };

      Object.entries(allData).forEach(([key, value]) => {
        if (key !== 'imageFile' && key !== 'car_image' && value !== undefined) {
          // Handle date objects
          if (value && value.format) {
            submitFormData.append(key, value.format('YYYY-MM-DD'));
          }
          // Handle file lists for documents
          else if (
            key === 'car_grant_image' ||
            key === 'car_insurance_image' ||
            key === 'e_hailing_car_permit_image'
          ) {
            if (value && value.fileList) {
              value.fileList.forEach((file) => {
                if (file.originFileObj) {
                  submitFormData.append(`${key}`, file.originFileObj);
                }
              });
            } else if (value && !value.fileList) {
              // Handle single file that's not in a fileList format
              submitFormData.append(key, value);
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
      <Steps current={current} className="!my-12">
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>

      <Form requiredMark={false} form={form} layout="vertical" className="mb-6">
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


// 2nd

// import { Button, Form, message } from "antd";
// import React, { useState, useEffect } from "react";
// import AddCarImage from "./add_car_steps/AddCarImage";
// import AddCarGeneralInfo from "./add_car_steps/AddCarGeneralInfo";
// import AddCarDocument from "./add_car_steps/AddCarDocument";
// import AddCarLicenseInfo from "./add_car_steps/AddCarLicenseInfo";

// function AddNewCar({ initialValues }) {
//   const [form] = Form.useForm();
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (initialValues) {
//       form.setFieldsValue(initialValues);
//     }
//   }, [initialValues, form]);

//   const handleSubmit = async () => {
//     try {
//       setLoading(true);
//       const values = await form.validateFields();

//       const submitFormData = new FormData();

//       // Append all fields to FormData
//       Object.entries(values).forEach(([key, value]) => {
//         if (key === "car_image" && Array.isArray(value)) {
//           value.forEach((file, index) => {
//             submitFormData.append(
//               `car_image_${index}`,
//               file.originFileObj || file
//             );
//           });
//         } else if (key.endsWith("_image") && value && value.fileList) {
//           submitFormData.append(
//             key,
//             value.fileList[0].originFileObj || value.fileList[0]
//           );
//         } else if (value) {
//           submitFormData.append(key, value);
//         }
//       });

//       // Submit the form data to your API
//       // await api.post('/cars', submitFormData);

//       console.log("Form data submitted:", submitFormData);
//       message.success("Car added successfully!");

//       // Reset form after submission
//       form.resetFields();
//     } catch (error) {
//       console.error("Submission failed:", error);
//       message.error("Failed to add car. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto">
//       <h2 className="text-2xl font-bold mb-6">Add New Car</h2>

//       <Form
//         requiredMark={false}
//         form={form}
//         layout="vertical"
//         initialValues={initialValues}
//       >
//         {/* Car Image Upload */}
//         <div className="mb-8">
//           <AddCarImage form={form} />
//         </div>

//         {/* General Information */}
//         <div className="mb-8">
//           <AddCarGeneralInfo form={form} />
//         </div>

//         {/* License Information */}
//         <div className="mb-8">
//           <AddCarLicenseInfo form={form} />
//         </div>

//         {/* Vehicle Grant / Documents */}
//         <div className="mb-8">
//           <AddCarDocument form={form} />
//         </div>

//         {/* Submit Button */}
//         <div className="flex justify-end mt-6">
//           <Button
//             type="primary"
//             size="large"
//             className="px-8 !bg-purple-600"
//             onClick={handleSubmit}
//             loading={loading}
//           >
//             Save
//           </Button>
//         </div>
//       </Form>
//     </div>
//   );
// }

// export default AddNewCar;

// 3rd


// import React, { useState, useEffect } from "react";
// import {
//   Form,
//   Upload,
//   Input,
//   Select,
//   DatePicker,
//   InputNumber,
//   Button,
//   Image,
//   message,
// } from "antd";
// import { PlusOutlined, InboxOutlined } from "@ant-design/icons";
// import moment from "moment";

// const { Dragger } = Upload;

// const AddNewCar = ({ data }) => {
//   const [form] = Form.useForm();
//   const [loading, setLoading] = useState(false);
//   const [previewImage, setPreviewImage] = useState("");
//   const [fileList, setFileList] = useState([]);
//   const [carGrantFile, setCarGrantFile] = useState([]);
//   const [carInsuranceFile, setCarInsuranceFile] = useState([]);
//   const [eHailingPermitFile, setEHailingPermitFile] = useState([]);

//   // Set initial values when `data` changes
//   useEffect(() => {
//     if (data) {
//       // Set form fields
//       form.setFieldsValue({
//         brand: data.brand || "",
//         model: data.model || "",
//         type: data.type || "",
//         color: data.color || "",
//         carNumber: data.carNumber || "",
//         carLicensePlate: data.carLicensePlate || "",
//         evpNumber: data.evpNumber || "",
//         evpExpiry: data.evpExpiry ? moment(data.evpExpiry) : null,
//         seats: data.seats || "",
//         vin: data.vin || "",
//         registrationDate: data.registrationDate
//           ? moment(data.registrationDate)
//           : null,
//         insuranceStatus: data.insuranceStatus || "",
//       });

//       // Set file lists for images and documents
//       if (data.car_image) {
//         const initialFileList = data.car_image.map((image, index) => ({
//           uid: `-${index + 1}`,
//           name: `car_image_${index + 1}.png`,
//           status: "done",
//           url: image,
//         }));
//         setFileList(initialFileList);
//       }

//       if (data.car_grant_image) {
//         setCarGrantFile([
//           {
//             uid: "-1",
//             name: "car_grant_image.png",
//             status: "done",
//             url: data.car_grant_image,
//           },
//         ]);
//       }

//       if (data.car_insurance_image) {
//         setCarInsuranceFile([
//           {
//             uid: "-1",
//             name: "car_insurance_image.png",
//             status: "done",
//             url: data.car_insurance_image,
//           },
//         ]);
//       }

//       if (data.e_hailing_car_permit_image) {
//         setEHailingPermitFile([
//           {
//             uid: "-1",
//             name: "e_hailing_car_permit_image.png",
//             status: "done",
//             url: data.e_hailing_car_permit_image,
//           },
//         ]);
//       }
//     }
//   }, [data, form]);

//   // Handle image preview
//   const handlePreview = async (file) => {
//     if (!file.url && !file.preview) {
//       file.preview = await getBase64(file.originFileObj);
//     }
//     setPreviewImage(file.url || file.preview);
//   };

//   // Handle car image upload
//   const handleCarImageChange = ({ fileList: newFileList }) => {
//     setFileList(newFileList);
//     form.setFieldsValue({ car_image: newFileList });
//   };

//   // Handle document uploads
//   const handleCarGrantChange = ({ fileList }) => setCarGrantFile(fileList);
//   const handleInsuranceChange = ({ fileList }) => setCarInsuranceFile(fileList);
//   const handlePermitChange = ({ fileList }) => setEHailingPermitFile(fileList);

//   // Convert file to base64
//   const getBase64 = (file) =>
//     new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => resolve(reader.result);
//       reader.onerror = (error) => reject(error);
//     });

//   // Handle form submission
//   const handleSubmit = async () => {
//     try {
//       setLoading(true);
//       const values = await form.validateFields();

//       const submitFormData = new FormData();

//       // Append car images
//       if (values.car_image && Array.isArray(values.car_image)) {
//         values.car_image.forEach((file, index) => {
//           submitFormData.append(
//             `car_image_${index}`,
//             file.originFileObj || file
//           );
//         });
//       }

//       // Append documents
//       if (carGrantFile.length > 0) {
//         submitFormData.append(
//           "car_grant_image",
//           carGrantFile[0].originFileObj || carGrantFile[0]
//         );
//       }
//       if (carInsuranceFile.length > 0) {
//         submitFormData.append(
//           "car_insurance_image",
//           carInsuranceFile[0].originFileObj || carInsuranceFile[0]
//         );
//       }
//       if (eHailingPermitFile.length > 0) {
//         submitFormData.append(
//           "e_hailing_car_permit_image",
//           eHailingPermitFile[0].originFileObj || eHailingPermitFile[0]
//         );
//       }

//       // Append other fields
//       Object.entries(values).forEach(([key, value]) => {
//         if (key !== "car_image" && value) {
//           submitFormData.append(key, value);
//         }
//       });

//       // Submit the form data to your API
//       // await api.post('/cars', submitFormData);

//       console.log("Form data submitted:", submitFormData);
//       message.success("Car added successfully!");

//       // Reset form after submission
//       form.resetFields();
//       setFileList([]);
//       setCarGrantFile([]);
//       setCarInsuranceFile([]);
//       setEHailingPermitFile([]);
//     } catch (error) {
//       console.error("Submission failed:", error);
//       message.error("Failed to add car. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto">
//       <h2 className="text-2xl font-bold mb-6">Add New Car</h2>

//       <Form
//         requiredMark={false}
//         form={form}
//         layout="vertical"
//         onFinish={handleSubmit}
//       >
//         {/* Car Image Upload */}
//         <div className="mb-8">
//           <Form.Item
//             name="car_image"
//             label="Car Images"
//             rules={[
//               {
//                 required: true,
//                 message: "Please upload at least one car image",
//               },
//             ]}
//             extra="Upload up to 5 images of your car (front, back, side views)"
//           >
//             <Upload
//               listType="picture-card"
//               fileList={fileList}
//               onPreview={handlePreview}
//               onChange={handleCarImageChange}
//               beforeUpload={() => false}
//               maxCount={5}
//               multiple
//             >
//               {fileList.length >= 5 ? null : (
//                 <div>
//                   <PlusOutlined />
//                   <div style={{ marginTop: 8 }}>Upload</div>
//                 </div>
//               )}
//             </Upload>
//           </Form.Item>
//           {previewImage && (
//             <Image
//               wrapperStyle={{ display: "none" }}
//               preview={{
//                 visible: !!previewImage,
//                 onVisibleChange: (visible) => !visible && setPreviewImage(""),
//               }}
//               src={previewImage}
//             />
//           )}
//         </div>

//         {/* General Information */}
//         <div className="mb-8">
//           <h3 className="text-lg font-medium mb-4">General Car Information</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <Form.Item
//               name="brand"
//               label="Brand"
//               rules={[
//                 { required: true, message: "Please enter the car brand" },
//               ]}
//             >
//               <Input placeholder="E.g., Toyota, Honda, Ford" />
//             </Form.Item>

//             <Form.Item
//               name="model"
//               label="Model"
//               rules={[
//                 { required: true, message: "Please enter the car model" },
//               ]}
//             >
//               <Input placeholder="E.g., Camry, Civic, F-150" />
//             </Form.Item>

//             <Form.Item
//               name="type"
//               label="Type"
//               rules={[{ required: true, message: "Please enter the car type" }]}
//             >
//               <Input placeholder="E.g., Sedan, SUV, Hatchback" />
//             </Form.Item>

//             <Form.Item
//               name="color"
//               label="Color"
//               rules={[
//                 { required: true, message: "Please enter the car color" },
//               ]}
//             >
//               <Input placeholder="E.g., Black, White, Silver" />
//             </Form.Item>
//           </div>
//         </div>

//         {/* License Information */}
//         <div className="mb-8">
//           <h3 className="text-lg font-medium mb-4">License Information</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <Form.Item
//               name="carNumber"
//               label="Car Number"
//               rules={[
//                 { required: true, message: "Please enter the car number" },
//               ]}
//             >
//               <Input placeholder="E.g., XYZ-9876" />
//             </Form.Item>

//             <Form.Item
//               name="carLicensePlate"
//               label="License Plate"
//               rules={[
//                 {
//                   required: true,
//                   message: "Please enter the license plate number",
//                 },
//               ]}
//             >
//               <Input placeholder="E.g., AB123CD" />
//             </Form.Item>

//             <Form.Item
//               name="evpNumber"
//               label="EVP Number"
//               rules={[
//                 { required: true, message: "Please enter the EVP number" },
//               ]}
//             >
//               <Input placeholder="Environmental Vehicle Permit Number" />
//             </Form.Item>

//             <Form.Item
//               name="evpExpiry"
//               label="EVP Expiry Date"
//               rules={[
//                 {
//                   required: true,
//                   message: "Please select the EVP expiry date",
//                 },
//               ]}
//             >
//               <DatePicker style={{ width: "100%" }} />
//             </Form.Item>

//             <Form.Item
//               name="seats"
//               label="Number of Seats"
//               rules={[
//                 { required: true, message: "Please enter number of seats" },
//               ]}
//             >
//               <InputNumber
//                 min={1}
//                 max={20}
//                 placeholder="E.g., 5"
//                 style={{ width: "100%" }}
//               />
//             </Form.Item>

//             <Form.Item
//               name="vin"
//               label="VIN"
//               rules={[{ required: true, message: "Please enter the VIN" }]}
//             >
//               <Input placeholder="Vehicle Identification Number" />
//             </Form.Item>

//             <Form.Item
//               name="registrationDate"
//               label="Registration Date"
//               rules={[
//                 {
//                   required: true,
//                   message: "Please select the registration date",
//                 },
//               ]}
//             >
//               <DatePicker style={{ width: "100%" }} />
//             </Form.Item>

//             <Form.Item
//               name="insuranceStatus"
//               label="Insurance Status"
//               rules={[
//                 { required: true, message: "Please select insurance status" },
//               ]}
//             >
//               <Select placeholder="Select insurance status">
//                 <Select.Option value="active">Active</Select.Option>
//                 <Select.Option value="inactive">Inactive</Select.Option>
//               </Select>
//             </Form.Item>
//           </div>
//         </div>

//         {/* Vehicle Documents */}
//         <div className="mb-8">
//           <h3 className="text-lg font-medium mb-4">Vehicle Documents</h3>
//           <div className="space-y-6">
//             <Form.Item
//               name="car_grant_image"
//               label="Vehicle Grant Document"
//               rules={[
//                 {
//                   required: true,
//                   message: "Please upload the vehicle grant document",
//                 },
//               ]}
//             >
//               <Dragger
//                 fileList={carGrantFile}
//                 onChange={handleCarGrantChange}
//                 beforeUpload={() => false}
//                 maxCount={1}
//               >
//                 <p className="ant-upload-drag-icon">
//                   <InboxOutlined />
//                 </p>
//                 <p className="ant-upload-text">
//                   Click or drag vehicle grant document to upload
//                 </p>
//                 <p className="ant-upload-hint">
//                   Support for a single PDF, JPG, JPEG or PNG file.
//                 </p>
//               </Dragger>
//             </Form.Item>

//             <Form.Item
//               name="car_insurance_image"
//               label="Insurance Certificate"
//               rules={[
//                 {
//                   required: true,
//                   message: "Please upload the insurance certificate",
//                 },
//               ]}
//             >
//               <Dragger
//                 fileList={carInsuranceFile}
//                 onChange={handleInsuranceChange}
//                 beforeUpload={() => false}
//                 maxCount={1}
//               >
//                 <p className="ant-upload-drag-icon">
//                   <InboxOutlined />
//                 </p>
//                 <p className="ant-upload-text">
//                   Click or drag insurance certificate to upload
//                 </p>
//                 <p className="ant-upload-hint">
//                   Support for a single PDF, JPG, JPEG or PNG file.
//                 </p>
//               </Dragger>
//             </Form.Item>

//             <Form.Item
//               name="e_hailing_car_permit_image"
//               label="E-Hailing Car Permit"
//               rules={[
//                 {
//                   required: true,
//                   message: "Please upload the e-hailing car permit",
//                 },
//               ]}
//             >
//               <Dragger
//                 fileList={eHailingPermitFile}
//                 onChange={handlePermitChange}
//                 beforeUpload={() => false}
//                 maxCount={1}
//               >
//                 <p className="ant-upload-drag-icon">
//                   <InboxOutlined />
//                 </p>
//                 <p className="ant-upload-text">
//                   Click or drag e-hailing car permit to upload
//                 </p>
//                 <p className="ant-upload-hint">
//                   Support for a single PDF, JPG, JPEG or PNG file.
//                 </p>
//               </Dragger>
//             </Form.Item>
//           </div>
//         </div>

//         {/* Submit Button */}
//         <div className="flex justify-end mt-6">
//           <Button
//             type="primary"
//             size="large"
//             htmlType="submit"
//             className="px-8 !bg-purple-600"
//             loading={loading}
//           >
//             Save
//           </Button>
//         </div>
//       </Form>
//     </div>
//   );
// };

// export default AddNewCar;
