import React, { useState } from 'react';
import PageHeading from '../../../Components/Shared/PageHeading';
import {
  Button,
  Card,
  Divider,
  Form,
  Input,
  Modal,
  Pagination,
  Popconfirm,
} from 'antd';
import {
  useGetDCoinsQuery,
  useUpdateDCoinMutation,
  useDeleteDCoinMutation,
} from '../../../Redux/services/dashboard apis/d-coin-apis/dCoinsApis';
import toast from 'react-hot-toast';
import { FaPlus } from 'react-icons/fa';
import AddDcoins from './AddDcoins';

function DcoinsConverter() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showModal, setShowModal] = useState(false);

  const { data, isLoading } = useGetDCoinsQuery({
    page: currentPage,
    limit: pageSize,
  });

  const [updateDCoin, { isLoading: isUpdating }] = useUpdateDCoinMutation();
  const [deleteDCoin, { isLoading: isDeleting }] = useDeleteDCoinMutation();
  const [editingId, setEditingId] = useState(null);

  const handleSave = async (values, id) => {
    try {
      const updateData = {
        dCoinId: id,
        coin: values.dcoin,
        MYR: values.myr,
      };

      const res = await updateDCoin({ updateData }).unwrap();
      if (res?.success) {
        toast.success(
          res?.message || 'DCoin conversion rate updated successfully'
        );
        setEditingId(null);
      }
    } catch (error) {
      toast.error('Failed to update DCoin conversion rate');
      console.error(error);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    console.log(id);
    if (!id) {
      return toast.error('D-coin not found');
    }
    try {
      const data = {
        dCoinId: id,
      };
      const res = await deleteDCoin({ data }).unwrap();
      if (res?.success) {
        toast.success(res?.message || 'DCoin deleted successfully');
      }
    } catch (error) {
      toast.error('Failed to delete DCoin');
      console.error(error);
    }
  };

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        Loading DCoin data...
      </div>
    );
  }

  const meta = data?.data?.meta || {
    page: 1,
    limit: 10,
    total: 0,
    totalPage: 1,
  };

  return (
    <div>
      <PageHeading title={'D COIN'} />
      <div className="w-full flex items-center justify-end">
        <Button
          className="!bg-[var(--bg-pink-high)] !text-white"
          onClick={() => setShowModal(true)}
          icon={<FaPlus />}
        >
          Add D-coin
        </Button>
      </div>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.data?.dCoins?.map((dcoin) => (
          <Card
            key={dcoin._id}
            className="shadow-md hover:shadow-lg transition-shadow"
          >
            {editingId === dcoin._id ? (
              <>
                <Divider>Edit MYR To D COIN</Divider>
                <Form
                  requiredMark={false}
                  layout="vertical"
                  style={{ width: '100%' }}
                  initialValues={{
                    myr: dcoin.MYR,
                    dcoin: dcoin.coin,
                  }}
                  onFinish={(values) => handleSave(values, dcoin._id)}
                >
                  <Form.Item
                    label="MYR"
                    name="myr"
                    rules={[
                      { required: true, message: 'Please enter MYR value' },
                    ]}
                  >
                    <Input type="number" min={0} step="0.01" />
                  </Form.Item>
                  <Form.Item
                    label="D COIN"
                    name="dcoin"
                    rules={[
                      { required: true, message: 'Please enter D COIN value' },
                    ]}
                  >
                    <Input type="number" min={0} />
                  </Form.Item>
                  <div className="w-full flex items-center justify-center gap-2">
                    <Button
                      className="!w-full !bg-red-500 hover:!bg-red-600 !text-white"
                      onClick={handleCancel}
                      disabled={isUpdating}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="!w-full !bg-[var(--bg-pink-high)] hover:!bg-[var(--bg-pink-high)] !text-white"
                      htmlType="submit"
                      loading={isUpdating}
                    >
                      Save
                    </Button>
                  </div>
                </Form>
              </>
            ) : (
              <>
                <Divider>MYR To D COIN</Divider>
                <div className="w-full h-[200px] flex items-start justify-between">
                  <div className="text-center">
                    <h1 className="text-lg font-semibold">MYR</h1>
                    <h1 className="text-3xl mt-4">{dcoin.MYR}</h1>
                  </div>
                  <Divider type="vertical" className="!h-[150px]" />
                  <div className="text-center">
                    <h1 className="text-lg font-semibold">D COIN</h1>
                    <h1 className="text-3xl mt-4">{dcoin.coin}</h1>
                  </div>
                </div>
                <div className="text-xs text-gray-500 mb-4 text-center">
                  Last updated: {new Date(dcoin.updatedAt).toLocaleDateString()}
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Popconfirm
                    title="Delete the D-coin"
                    description="Are you sure to delete this D-coin"
                    onConfirm={() => handleDelete(dcoin._id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button danger className="!w-full" disabled={isDeleting}>
                      Delete
                    </Button>
                  </Popconfirm>
                  <Button
                    className="!w-full !bg-[var(--bg-pink-high)] hover:!bg-[var(--bg-pink-high)] !text-white"
                    onClick={() => setEditingId(dcoin._id)}
                  >
                    Update
                  </Button>
                </div>
              </>
            )}
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {meta.total > 0 && (
        <div className="flex justify-center mt-8 mb-6">
          <Pagination
            current={meta.page}
            pageSize={9}
            total={meta.total}
            onChange={handlePageChange}
          />
        </div>
      )}
      <Modal
        visible={showModal}
        footer={null}
        onCancel={() => setShowModal(false)}
      >
        <AddDcoins setShowModal={setShowModal} />
      </Modal>
    </div>
  );
}

export default DcoinsConverter;
