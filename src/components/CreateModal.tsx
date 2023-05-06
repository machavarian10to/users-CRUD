import { useState } from "react";
import { Modal, Form, Input, Select, Button } from "antd";
import { UserAddOutlined } from '@ant-design/icons';
import { useUserStore } from "../store";
import { User } from "../api";

function CreateModal() {
    const [createForm] = Form.useForm();
    const [showCreateModal, setShowCreateModal] = useState<boolean>(false);

    const { createUser } = useUserStore();

    const handleCreateUser = () => {
        createForm.validateFields()
        .then((user: User) => {
            createForm.resetFields();
            setShowCreateModal(false);
            createUser(user);
        })
        .catch((err) => console.log("Validate Failed:", err));
    };

  return (
    <>
        <Button 
            style={{ margin: "25px" }} type="primary" 
            onClick={() => setShowCreateModal(true)}
        >
            <UserAddOutlined />
            Create User
        </Button>
        
        <Modal
            title="Create User"
            okText="Create"
            open={showCreateModal}
            onOk={handleCreateUser}
            onCancel={() => {
                createForm.resetFields();
                setShowCreateModal(false);
            }}
        >
        <Form 
            form={createForm}
            layout="vertical"
            name="add_user_modal_form"
        >
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
    </>
  )
}

export default CreateModal