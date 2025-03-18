import React, { useState } from "react";
import { Form, Upload, Image } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const AddCarImage = ({ form }) => {
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
  };

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);

    // Update the form field value with the uploaded files
    const fileArray = newFileList.map((file) => file.originFileObj || file);
    form.setFieldsValue({ car_image: fileArray });
  };

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <Form.Item
        name="car_image"
        label="Car Images"
        rules={[
          { required: true, message: "Please upload at least one car image" },
        ]}
        extra="Upload up to 5 images of your car (front, back, side views)"
      >
        <Upload
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          beforeUpload={() => false} // Prevent auto upload
          maxCount={5}
          multiple
        >
          {fileList.length >= 5 ? null : uploadButton}
        </Upload>
      </Form.Item>
      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: !!previewImage,
            onVisibleChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};

export default AddCarImage;
