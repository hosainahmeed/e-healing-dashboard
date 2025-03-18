import React, { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload, Form, Button } from 'antd';

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
//TODO : Make this a component right way
const AddCarImage = ({ form, initialValues, setImageData }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState([]);
  const [submittedImages, setSubmittedImages] = useState([]);
  console.log(fileList);
  useEffect(() => {
    if (initialValues?.imagePreview) {
      const previews = Array.isArray(initialValues.imagePreview)
        ? initialValues.imagePreview
        : [initialValues.imagePreview];

      const initialFileList = previews.map((preview, index) => ({
        uid: `-${index + 1}`,
        name: `car_image_${index + 1}.png`,
        status: 'done',
        url: preview,
      }));

      setFileList(initialFileList);
    }
  }, [initialValues]);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  // const handleChange = async ({ fileList: newFileList }) => {
  //   setFileList(newFileList);

  //   if (newFileList.length > 0) {
  //     const fileArray = [];
  //     const previewArray = [];

  //     for (const fileItem of newFileList) {
  //       if (fileItem.originFileObj) {
  //         fileArray.push(fileItem.originFileObj);
  //         const preview = await getBase64(fileItem.originFileObj);
  //         previewArray.push(preview);
  //       } else if (fileItem.url) {
  //         previewArray.push(fileItem.url);
  //       }
  //     }

  //     setImageData({
  //       imageFile: fileArray,
  //       imagePreview: previewArray,
  //       car_image: fileArray,
  //     });

  //     form.setFieldsValue({
  //       car_image: fileArray,
  //     });
  //   } else {
  //     setImageData({
  //       imageFile: null,
  //       imagePreview: null,
  //       car_image: null,
  //     });

  //     form.setFieldsValue({
  //       car_image: null,
  //     });
  //   }
  // };
  const handleChange = ({ fileList }) => {
    setFileList(
      fileList.map((file) => {
        if (file.originFileObj) {
          return file.originFileObj;
        }
        return file;
      })
    );
  };


  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'none',
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  return (
    <>
      <Form.Item
        name="car_image"
        label="Car Images"
        rules={[
          { required: true, message: 'Please upload at least one car image' },
        ]}
        extra="Upload up to 5 images of your car (front, back, side views)"
      >
        <Upload
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          beforeUpload={() => false}
          maxCount={5}
          multiple
          className="car_upload"
        >
          {fileList.length >= 5 ? null : uploadButton}
        </Upload>
      </Form.Item>
      {previewImage && (
        <Image
          wrapperStyle={{
            display: 'none',
          }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}


      {submittedImages.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <h3>Uploaded Images:</h3>
          <div style={{ display: 'flex', gap: '10px' }}>
            {submittedImages.map((file) => (
              <Image
                key={file.uid}
                width={100}
                src={file.url || file.preview}
                alt="Uploaded Image"
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default AddCarImage;
