import React, { useState } from 'react';
import { Table, Space, Avatar, Button, Modal, Select } from 'antd';
import { UserOutlined, PhoneOutlined } from '@ant-design/icons';
import { CgBlock } from 'react-icons/cg';
import { IoIosWarning, IoIosMail } from 'react-icons/io';
import {
  useGetAllUserOrDriverQuery,
  useGetSingleUserOrDriverQuery,
  useUpdateUserStatusMutation,
  useUserTripStatesQuery,
} from '../../../Redux/services/dashboard apis/userApis/userApis';
import toast from 'react-hot-toast';
const AllUsers = ({ recentUser }) => {
  const [showModal, setShowModal] = useState(false);
  const [blockUserId, setBlockUserId] = useState(null);
  const [isUserBlock, setUserBlock] = useState(false);
  const [userDetails, setUserDetails] = useState(false);
  const [userID, setUserID] = useState(null);
  const Tabs = ['User Statics', 'User Documents'];
  const [tab, setTab] = useState(Tabs[0]);
  const { data: singleUser, isLoading: singleUserDataLoading } =
    useGetSingleUserOrDriverQuery({ id: userID });
  const { data: statsData, isLoading: statsLoading } = useUserTripStatesQuery({
    id: userID,
  });
  console.log(statsData);
  const params = { role: 'USER' };
  const {
    data: userData,
    isLoading: userDataLoading,
    refetch,
  } = useGetAllUserOrDriverQuery({ params });
  const [updateUserStatus] = useUpdateUserStatusMutation();
  const user = singleUser?.data;
  const singleUserData = {
    name: user?.name,
    email: user?.email,
  };
  console.log(singleUserData);
  const handleStatusChange = async (userId, newStatus) => {
    // try {
    //   const res = await updateUserStatus({
    //     userId,
    //     status: newStatus,
    //   }).unwrap();
    //   console.log(res);
    //   toast.success('User status updated successfully');
    //   refetch();
    // } catch (error) {
    //   toast.error('Failed to update user status');
    //   console.error('Update error:', error);
    // }
  };

  const userDataShowing = recentUser
    ? userData?.data?.result.slice(0, 4)
    : userData?.data?.result;

  const users = userDataShowing?.map((user) => ({
    key: user?._id,
    id: user?._id,
    authId: user?.authId?._id,
    name: user?.name,
    isBlocked: user?.authId?.isBlocked,
    email: user?.email,
    role: user?.role,
    contactNumber: user?.phoneNumber,
    isOnline: user?.isOnline,
    status: user?.userAccountStatus,
    joined: new Date(user?.createdAt).toLocaleDateString(),
    avatar: null,
  }));

  const columns = [
    {
      title: 'Client Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space size="middle">
          <Avatar icon={<UserOutlined />} src={record.avatar} />
          {text}
        </Space>
      ),
    },
    {
      title: 'Contact Number',
      dataIndex: 'contactNumber',
      key: 'contactNumber',
      render: (phone) => (
        <Space>
          <PhoneOutlined />
          {phone}
        </Space>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (email) => (
        <Space>
          <IoIosMail />
          {email}
        </Space>
      ),
    },
    {
      title: 'Joined',
      dataIndex: 'joined',
      key: 'joined',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status, record) => (
        <Select
          defaultValue={status}
          style={{ width: 120 }}
          onChange={(value) => handleStatusChange(record?.authId, value)}
        >
          <Select.Option value={true}>Verified</Select.Option>
          <Select.Option value={false}>Unverified</Select.Option>
        </Select>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={() => {
              setUserDetails(true);
              setUserID(record.id);
            }}
            className="ant-btn ant-btn-primary"
          >
            <UserOutlined />
          </Button>
          <Button
            onClick={() => {
              setBlockUserId(record?.authId);
              setUserBlock(record?.isBlocked);
              setShowModal(true);
            }}
            className={` ${
              record?.isBlocked ? '!bg-red-300' : '!bg-green-200'
            } ant-btn ant-btn-default`}
          >
            <CgBlock />
          </Button>
        </Space>
      ),
    },
  ];

  const handleUnblockUser = async () => {
    if (!blockUserId) {
      return toast.error('Please select a user to block');
    }
    try {
      const data = {
        authId: blockUserId,
        isBlocked: false,
      };
      const res = await updateUserStatus({ data }).unwrap();
      if (res?.success) {
        toast.success('User successfully unblocked');
        setShowModal(false);
      }
      refetch();
    } catch (error) {
      toast.error('Failed to unblock user');
      console.error('Update error:', error);
    }
  };
  const handleBlockUser = async () => {
    if (!blockUserId) {
      return toast.error('Please select a user to block');
    }
    try {
      const data = {
        authId: blockUserId,
        isBlocked: true,
      };
      const res = await updateUserStatus({ data }).unwrap();
      if (res?.success) {
        toast.success('User successfully blocked');
        setShowModal(false);
      }
      refetch();
    } catch (error) {
      toast.error('Failed to block user');
      console.error('Update error:', error);
    }
  };

  return (
    <div className="w-full overflow-x-auto">
      <Table
        loading={userDataLoading}
        columns={columns}
        dataSource={users}
        rowKey="id"
        pagination={
          userData?.data?.meta?.total > 5
            ? {
                pageSize: userData?.data?.meta?.limit,
                total: userData?.data?.meta?.total,
                showSizeChanger: false,
              }
            : false
        }
        bordered
      />
      <Modal
        visible={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
        className="modal-container"
      >
        <div className="flex flex-col items-center">
          <IoIosWarning size={60} color="#f6a112" />
          <h1 className="text-2xl font-bold text-black">Warning</h1>
          <p className="text-lg text-black">
            Are you sure you want to {isUserBlock ? 'unblock' : 'block'} this
            user?
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <Button
              type="primary"
              className="!bg-[var(--bg-pink-high)] !text-white"
              onClick={isUserBlock ? handleUnblockUser : handleBlockUser}
            >
              Yes
            </Button>
            <Button onClick={() => setShowModal(false)}>Cancel</Button>
          </div>
        </div>
      </Modal>
      <Modal
        centered
        visible={userDetails}
        onCancel={() => setUserDetails(false)}
        footer={null}
      >
        {!singleUserDataLoading && !statsLoading ? (
          <div>
            
          </div>
        ) : (
          <>
            <div className="mx-auto p-1 border rounded-sm !w-fit center-center my-3">
              {Tabs.map((item) => (
                <Button
                  key={item}
                  style={{ width: '200px', justifyContent: 'center' }}
                  className={`${
                    item === tab
                      ? '!bg-[var(--bg-pink-high)] !text-white !border-0 !rounded-sm'
                      : '!border-0 !rounded-none !text-black !border-black !bg-transparent'
                  }`}
                  onClick={() => setTab(item)}
                >
                  {item}
                </Button>
              ))}
            </div>

            <div className="max-w-[700px] mx-auto bg-[var(--black-200)] p-4 rounded-md">
              {tab === 'User Statics' ? (
                <div className="grid grid-cols-2">
                  <div className="pb-6 pr-6 text-center border-b border-r">
                    <div className="text-2xl font-bold">12</div>
                    <div className="text-gray-500 text-sm">Total Listings</div>
                  </div>
                  <div className="pb-6 pl-6 text-center border-b">
                    <div className="text-2xl font-bold">3</div>
                    <div className="text-gray-500 text-sm">Active Listings</div>
                  </div>
                  <div className="pt-6 pr-6 text-center border-r">
                    <div className="text-2xl font-bold">8</div>
                    <div className="text-gray-500 text-sm">
                      Approved Listings
                    </div>
                  </div>
                  <div className="pt-6 pl-6 text-center">
                    <div className="text-2xl font-bold">1</div>
                    <div className="text-gray-500 text-sm">
                      Rejected Listings
                    </div>
                  </div>
                </div>
              ) : (
                ''
              )}
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default AllUsers;
