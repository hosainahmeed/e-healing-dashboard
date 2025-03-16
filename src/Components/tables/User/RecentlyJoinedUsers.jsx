import React, { useState } from 'react';
import { Table, Tag, Space, Avatar, Button, Modal } from 'antd';
import { UserOutlined, PhoneOutlined } from '@ant-design/icons';
import { CgBlock } from 'react-icons/cg';
import { IoIosWarning } from 'react-icons/io';

const RecentlyJoinedUsers = () => {
  const [showModal, setShowModal] = useState(false);
  const [blockUserId, setBlockUserId] = useState(null);
  console.log(blockUserId);
  const users = [
    {
      id: 1,
      name: 'Theodore Mosciski',
      contactNumber: '901-474-6265',
      email: 'maka@yandex.ru',
      joined: '2025-01-10',
      status: 'Active',
      avatar: '/api/placeholder/40/40',
    },
    {
      id: 2,
      name: 'Russell Veum',
      contactNumber: '983-842-7095',
      email: 'Nigel16@hotmail.com',
      joined: '2025-01-10',
      status: 'Active',
      avatar: '/api/placeholder/40/40',
    },
    {
      id: 3,
      name: 'Tracy Grady',
      contactNumber: '564-667-5097',
      email: 'rrian@yandex.ru',
      joined: '2025-01-10',
      status: 'Active',
      avatar: '/api/placeholder/40/40',
    },
    {
      id: 4,
      name: 'Dana Daniel',
      contactNumber: '443-393-4346',
      email: 'rrian@yandex.ru',
      joined: '2025-01-10',
      status: 'Active',
      avatar: '/api/placeholder/40/40',
    },
  ];

  const columns = [
    {
      title: 'Client Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space size="middle">
          <Avatar src={record.avatar} />
          {text}
        </Space>
      ),
    },
    {
      title: 'Contact Number',
      dataIndex: 'contactNumber',
      key: 'contactNumber',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
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
      render: (status) => <Tag color="green">{status}</Tag>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button className="ant-btn ant-btn-primary">
            <UserOutlined />
          </Button>
          <Button
            onClick={() => {
              setBlockUserId(record.id);
              setShowModal(true);
            }}
            className="ant-btn ant-btn-default"
          >
            <CgBlock />
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="w-full overflow-x-auto">
      <Table
        columns={columns}
        dataSource={users}
        rowKey="id"
        pagination={false}
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
            Are you sure you want to block this user?
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <Button
              type="primary"
              className="!bg-[var(--bg-pink-high)] !text-white"
            >
              Yes
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default RecentlyJoinedUsers;
