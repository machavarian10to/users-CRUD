import { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Select } from "antd";
import { DeleteOutlined  } from '@ant-design/icons';
import { User } from "../api";
import { useUserStore } from "../store";
import { Link } from 'react-router-dom';
import CreateModal from "../components/CreateModal";

const UsersTable = () => {
  const [updateForm] = Form.useForm();

  const [userId, setUserId] = useState<number>(0);
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);

  const { users, getUsers, updateUser, deleteUser } = useUserStore();
  
  useEffect(() => {
    getUsers();
  }, [getUsers]);    

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Street",
      dataIndex: ["address", "street"],
      key: "street",
    },
    {
      title: "City",
      dataIndex: ["address", "city"],
      key: "city",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (user: { id: number }) => (
        <Button type="primary" danger onClick={() => deleteUser(user.id)}>
          <DeleteOutlined />
          Delete
        </Button>
      ),
    },
  ];

  const handleUserClick = (user: User) => {
    setShowUpdateModal(true);
    setUserId(user.id)
    updateForm.setFieldsValue({
      name: user?.name,
      email: user?.email,
      gender: user?.gender,
      address: {
        street: user?.address?.street,
        city: user?.address?.city,
      },
      phone: user?.phone,
    });
  }

  const handleUpdateUser = () => {
    updateForm.validateFields()
      .then((user) => {
        updateForm.resetFields();
        setShowUpdateModal(false);
        updateUser(userId, user);
      })
      .catch((err) => console.log("Validate Failed:", err));
  };

  return (
    <div style={{ padding: "20px" }}>
      <CreateModal />

      <Link to="/pie-chart" style={{ textDecoration: 'none', color: '#1677ff'}}>
        View Chart
      </Link>

      {/* UPDATE User Modal */}
      <Modal
        title="Edit User"
        okText="Update"
        open={showUpdateModal}
        onOk={handleUpdateUser}
        onCancel={() => setShowUpdateModal(false)}
      >
        <Form form={updateForm}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter a name' }]}
          >
            <Input />
          </Form.Item>
        
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please enter an email' },
              { type: 'email', message: 'Please enter a valid email' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true, message: 'Please select a gender' }]}
          >
            <Select>
              <Select.Option value="male">Male</Select.Option>
              <Select.Option value="female">Female</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name={['address', 'street']}
            label="Street"
            rules={[{ required: true, message: 'Please enter a street' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={['address', 'city']}
            label="City"
            rules={[{ required: true, message: 'Please enter a city' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone"
            rules={[{ required: true, message: 'Please enter a phone number' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      <Table 
        columns={columns} 
        dataSource={users.map(user => ({ ...user, key: user.id }))}
        onRow={user => ({ onDoubleClick: () => handleUserClick(user)})} 
      />
    </div>
  );
};

export default UsersTable;