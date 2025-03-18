import React, { useState } from 'react';
import { Form, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const ImageUploadForm = () => {
  const [fileList, setFileList] = useState([]);

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

  const handleSubmit = (values) => {
    const imageFiles = fileList.filter((file) =>
      file.type.startsWith('image/')
    );
    if (imageFiles.length > 5) {
      message.error('You can upload a maximum of 5 images.');
    } else {
      console.log('Uploaded images:', imageFiles);
    }
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item label="Upload Images">
        <Upload
          action=""
          listType="picture-card"
          fileList={fileList}
          onChange={handleChange}
          beforeUpload={() => false}
          maxCount={5}
          showUploadList={{ showPreviewIcon: false }}
        >
          <Button icon={<UploadOutlined />}>Select Images</Button>
        </Upload>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ImageUploadForm;
