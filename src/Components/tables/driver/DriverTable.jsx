import React, { useState } from 'react';
import { Table, Tag, Space, Avatar, Button, Modal, Select } from 'antd';
import { UserOutlined, PhoneOutlined } from '@ant-design/icons';
import { CgBlock } from 'react-icons/cg';
import { IoIosMail, IoIosWarning } from 'react-icons/io';
import { Link } from 'react-router-dom';

const DriverTable = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDriverModal, setShowDriverModal] = useState(false);
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
      avatar: `https://tinypng.com/images/social/website.jpg`,
    },
    {
      id: 2,
      name: 'Russell Veum',
      contactNumber: '983-842-7095',
      email: 'Nigel16@hotmail.com',
      joined: '2025-01-10',
      status: 'Inactive',
      avatar: `https://tinypng.com/images/social/website.jpg`,
    },
    {
      id: 3,
      name: 'Tracy Grady',
      contactNumber: '564-667-5097',
      email: 'rrian@yandex.ru',
      joined: '2025-01-10',
      status: 'Inactive',
      avatar: `https://tinypng.com/images/social/website.jpg`,
    },
    {
      id: 44444444444444,
      name: 'Dana Daniel',
      contactNumber: '443-393-4346',
      email: 'rrian@yandex.ru',
      joined: '2025-01-10',
      status: 'Active',
      avatar: `https://tinypng.com/images/social/website.jpg`,
    },
    {
      id: 43333333333,
      name: 'Dana Daniel',
      contactNumber: '443-393-4346',
      email: 'rrian@yandex.ru',
      joined: '2025-01-10',
      status: 'Active',
      avatar: `https://tinypng.com/images/social/website.jpg`,
    },
    {
      id: 4333333,
      name: 'Dana Daniel',
      contactNumber: '443-393-4346',
      email: 'rrian@yandex.ru',
      joined: '2025-01-10',
      status: 'Active',
      avatar: `https://tinypng.com/images/social/website.jpg`,
    },
    {
      id: 4333,
      name: 'Dana Daniel',
      contactNumber: '443-393-4346',
      email: 'rrian@yandex.ru',
      joined: '2025-01-10',
      status: 'Active',
      avatar: `https://tinypng.com/images/social/website.jpg`,
    },
    {
      id: 433,
      name: 'Dana Daniel',
      contactNumber: '443-393-4346',
      email: 'rrian@yandex.ru',
      joined: '2025-01-10',
      status: 'Active',
      avatar: `https://tinypng.com/images/social/website.jpg`,
    },
    {
      id: 43,
      name: 'Dana Daniel',
      contactNumber: '443-393-4346',
      email: 'rrian@yandex.ru',
      joined: '2025-01-10',
      status: 'Active',
      avatar: `https://tinypng.com/images/social/website.jpg`,
    },
  ];

  const columns = [
    {
      title: 'Talent Name',
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
      title: 'Online Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={`${status === 'Active' ? 'green' : 'red'}`}>{status}</Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={() => setShowDriverModal(true)}
            className="ant-btn ant-btn-primary"
          >
            <UserOutlined />
          </Button>
          <Link
            to={`https://mail.google.com/mail/?view=cm&fs=1&to=${record.email}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="ant-btn ant-btn-primary">
              <IoIosMail />
            </Button>
          </Link>
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
        pagination={
          users.length > 5
            ? {
                defaultPageSize: 5,
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
      <Modal
        open={showDriverModal}
        onCancel={() => setShowDriverModal(false)}
        footer={null}
      >
        {/* TODO : Add Driver Modal thats show all the information of the driver */}
      </Modal>
    </div>
  );
};

export default DriverTable;
