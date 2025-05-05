import React from 'react';
import { useAddNewDcoinMutation } from '../../../Redux/services/dashboard apis/d-coin-apis/dCoinsApis';
import { FaPlus } from 'react-icons/fa';
import { Button, Divider, Input } from 'antd';
import { Form } from 'antd';
import toast from 'react-hot-toast';

function AddDcoins({ setShowModal }) {
  const [addNewDcoin, { isLoading: addingDcoin }] = useAddNewDcoinMutation();
  const [form] = Form.useForm();
  const handleSave = async (values) => {
    try {
      if (values.myr <= 0 || values.dcoin <= 0) {
        toast.error('Both MYR and D COIN must be greater than zero');
        return;
      }

      const data = {
        coin: values.dcoin,
        MYR: values.myr,
      };

      const res = await addNewDcoin({ data }).unwrap();
      if (res?.success) {
        toast.success(
          res?.message || 'DCoin conversion rate updated successfully'
        );
        form.resetFields();
        setShowModal(false);
      } else {
        toast.error(res?.message || 'Failed to update DCoin conversion rate');
      }
    } catch (error) {
      toast.error('Failed to update DCoin conversion rate');
      console.error(error);
    }
  };

  return (
    <>
      <Divider>Add MYR To D COIN</Divider>
      <Form
        form={form}
        requiredMark={false}
        layout="vertical"
        style={{ width: '100%' }}
        onFinish={(values) => handleSave(values)}
      >
        <Form.Item
          label="MYR"
          name="myr"
          rules={[{ required: true, message: 'Please enter MYR value' }]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          label="D COIN"
          name="dcoin"
          rules={[{ required: true, message: 'Please enter D COIN value' }]}
        >
          <Input type="number" />
        </Form.Item>

        <Button
          icon={<FaPlus />}
          className="!w-full !bg-[var(--bg-pink-high)] hover:!bg-[var(--bg-pink-high)] !text-white"
          htmlType="submit"
          loading={addingDcoin}
        >
          Add
        </Button>
      </Form>
    </>
  );
}

export default AddDcoins;
