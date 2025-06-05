import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllUser, updateUser } from "../axios/api";
import dayjs from "dayjs";
import { Button, Card, Drawer, Form, Input, Select, Space, Table } from "antd";
import { useState } from "react";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";

const Users = () => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const columns = [
    {
      title: "S.No.",
      render: (_, record, index) => index + 1,
      key: "index",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Id",
      dataIndex: "_id",
      key: "_id",
      render: (text) => <span className="text-gray-500 ">{text}</span>,
    },
    {
      title: "Member Since",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => dayjs(text).format("DD/MM/YYYY"),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space
          onClick={() => {
            form.setFieldsValue({
              email: record.email,
              role: record.role,
              skills: record.skills || [],
            });
            showDrawer();
          }}
          size="middle"
        >
          <a>Update</a>
        </Space>
      ),
    },
  ];
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUser,
    keepPreviousData: true,
  });
  const { mutate: updateUserMutation } = useMutation({
    mutationFn: async (userData) => updateUser(userData),
    onSuccess: () => {
      form.resetFields();
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User updated successfully!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update user");
    },
  });
  const onFinish = (values) => {
    updateUserMutation(values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
      <div className="h-[60vh]  w-full rounded-2xl bg-cover bg-center bg-no-repeat">
        <Table
          className="bg-white/10 backdrop-blur-md rounded-xl shadow"
          columns={columns}
          dataSource={data?.data?.users}
          pagination={{ pageSize: 7 }}
        />
      </div>
      <Drawer
        title="Drawer with extra actions"
        placement={"right"}
        width={500}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={() => form.resetFields()}>Clear</Button>
          </Space>
        }
      >
        <Card title="User Info">
          <Form
            name="basic"
            form={form}
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please input the ticket title!" },
              ]}
            >
              <Input
                prefix={<ExclamationCircleOutlined />}
                placeholder="Enter the updated email"
              />
            </Form.Item>
            <Form.Item
              label="Role"
              name="role"
              rules={[{ required: true, message: "Please select a role!" }]}
            >
              <Select
                placeholder="Select a role"
                allowClear
                options={[
                  { value: "user", label: "User" },
                  { value: "admin", label: "Admin" },
                  { value: "moderator", label: "Moderator" },
                ]}
              >
                <Select.Option value="user">User</Select.Option>
                <Select.Option value="admin">Admin</Select.Option>
                <Select.Option value="moderator">Moderator</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Skills" name="skills">
              <Select
                mode="tags"
                style={{ width: "100%" }}
                placeholder="Enter skills and press Enter"
                tokenSeparators={[","]}
              />
            </Form.Item>
            <Form.Item label={null}>
              <Button type="primary" htmlType="submit">
                Update user
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Drawer>
    </div>
  );
};

export default Users;
