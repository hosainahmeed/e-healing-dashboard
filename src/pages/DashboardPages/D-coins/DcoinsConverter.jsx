import React, { useState } from 'react';
import PageHeading from '../../../Components/Shared/PageHeading';
import { Button, Card, Divider, Form, Input } from 'antd';

function DcoinsConverter() {

  const [myrValue, setMyrValue] = useState(1);
  const [dcoinValue, setDcoinValue] = useState(10);
  const [isEdit, setIsEdit] = useState(false);

  const handleSave = async (values) => {
    const formData = new FormData();
    formData.append('myr', values.myr);
    formData.append('dcoin', values.dcoin);
    setMyrValue(values.myr);
    setDcoinValue(values.dcoin);

    setIsEdit(false);
  };

  return (
    <div>
      <PageHeading title={'D COIN'} />
      <div className="mt-12 max-w-screen-md">
        {isEdit ? (
          <Card>
            <Divider>Edit MYR To D COIN </Divider>
            <Form
              layout="vertical"
              style={{ width: '100%' }}
              initialValues={{ myr: myrValue, dcoin: dcoinValue }}
              onFinish={handleSave}
            >
              <Form.Item label="MYR" name="myr">
                <Input type="number" />
              </Form.Item>
              <Form.Item label="D COIN" name="dcoin">
                <Input type="number" />
              </Form.Item>
              <div className="w-full flex items-center justify-center gap-2">
                <Button
                  className="!w-full !bg-red-500 hover:!bg-red-600 !text-white"
                  onClick={() => setIsEdit(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="!w-full !bg-[var(--bg-pink-high)] hover:!bg-[var(--bg-pink-high)] !text-white"
                  htmlType="submit"
                >
                  Save
                </Button>
              </div>
            </Form>
          </Card>
        ) : (
          <Card>
            <Divider>MYR To D COIN </Divider>
            <div className="w-full h-[200px] flex items-start justify-between">
              <div>
                <h1>MYR</h1>
                <h1>{myrValue}</h1>
              </div>
              <Divider type="vertical" className="!h-[150px]" />
              <div>
                <h1>D COIN</h1>
                <h1>{dcoinValue}</h1>
              </div>
            </div>
            <Button
              className="!w-full !bg-[var(--bg-pink-high)] hover:!bg-[var(--bg-pink-high)] !text-white"
              onClick={() => setIsEdit(true)}
            >
              Update
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}

export default DcoinsConverter;
