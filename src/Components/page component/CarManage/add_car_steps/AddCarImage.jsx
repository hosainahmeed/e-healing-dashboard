import React, { useState } from 'react';
import { Form, Upload, Image } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const AddCarImage = ({ form }) => {
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState([]);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
  };

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
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
          >
            {fileList.length >= 5 ? null : uploadButton}
          </Upload>
        </Form.Item>

        {previewImage && (
          <Image
            wrapperStyle={{ display: 'none' }}
            preview={{
              visible: !!previewImage,
              onVisibleChange: (visible) => !visible && setPreviewImage(''),
            }}
            src={previewImage}
          />
        )}
      </>
    </>
  );
};

export default AddCarImage;
// import React, { useEffect } from 'react';
// import { Form, Upload, message } from 'antd';
// import { PlusOutlined } from '@ant-design/icons';
// import { imageUrl } from '../../../../Utils/server';

// const AddCarImage = ({
//   form,
//   initialValues,
//   setImageData,
//   existingImages,
//   isEditMode,
// }) => {
//   useEffect(() => {
//     if (initialValues) {
//       form.setFieldsValue(initialValues);
//     }
//   }, [form, initialValues]);

//   const normFile = (e) => {
//     if (Array.isArray(e)) {
//       return e;
//     }
//     return e?.fileList;
//   };

//   const beforeUpload = (file) => {
//     const isImage = file.type.startsWith('image/');
//     if (!isImage) {
//       message.error('You can only upload image files!');
//     }
//     const isLt2M = file.size / 1024 / 1024 < 2;
//     if (!isLt2M) {
//       message.error('Image must be smaller than 2MB!');
//     }
//     return isImage && isLt2M;
//   };
//   const getBase64 = (file) =>
//     new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => resolve(reader.result);
//       reader.onerror = (error) => reject(error);
//     });
//   const handleChange = ({ fileList }) => {
//     setImageData((prev) => ({
//       ...prev,
//       car_image: fileList,
//     }));
//   };

//   const getInitialFileList = () => {
//     if (!existingImages || !isEditMode) return [];

//     return existingImages.map((imagePath) => {
//       return imageUrl(imagePath);
//     });
//   };

//   return (
//     <div>
//       <h2 className="text-xl font-semibold mb-4">Upload Car Images</h2>

//       <Form.Item
//         name="car_image"
//         valuePropName="fileList"
//         getValueFromEvent={normFile}
//         rules={[
//           {
//             required: !isEditMode,
//             message: 'Please upload at least one car image',
//           },
//         ]}
//         initialValue={getInitialFileList()}
//       >
//         <Upload
//           listType="picture-card"
//           beforeUpload={beforeUpload}
//           onChange={handleChange}
//           multiple
//           maxCount={5}
//           customRequest={({ onSuccess }) => {
//             // Simulate a successful upload to prevent actual API call during form handling
//             setTimeout(() => onSuccess('ok'), 0);
//           }}
//           onPreview={async (file) => {
//             if (!file.url && !file.preview) {
//               file.preview = await getBase64(file.originFileObj);
//             }
//             const image = new Image();
//             image.src = file.url || file.preview;
//             const imgWindow = window.open('');
//             imgWindow.document.write(image.outerHTML);
//           }}
//         >
//           <div>
//             <PlusOutlined />
//             <div style={{ marginTop: 8 }}>Upload</div>
//           </div>
//         </Upload>
//       </Form.Item>

//       <p className="text-gray-500 mt-2">
//         Upload clear images of your car from different angles (max 5 images,
//         each under 2MB)
//       </p>
//     </div>
//   );
// };

// export default AddCarImage;
