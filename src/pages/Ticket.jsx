import { useState } from "react";
import { Button, Card, Drawer, Form, Input, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { createTicket } from "../axios/api";
import { useMutation } from "@tanstack/react-query";
const Ticket = () => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const { mutate: createTicketMutation } = useMutation({
    mutationFn: async (values) => createTicket(values),
    onSuccess: () => {
      form.resetFields();
      setOpen(false);
      console.log("Ticket created successfully!");
    },
  });
  const onFinish = (values) => {
    createTicketMutation(values);
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <div className="flex items-center justify-end">
        <Button onClick={showDrawer} type="primary">
          Create
        </Button>
      </div>
      <div
        className="h-[65vh] w-full rounded-2xl bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{ backgroundImage: "url('/sean3.svg')" }}
      >
        Ticket
      </div>
      <Drawer
        title="Drawer with extra actions"
        placement={"right"}
        width={500}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={onClose}>
              OK
            </Button>
          </Space>
        }
      >
        <div>
          <Card
            title="Fill the ticket info"
            variant="borderless"
            style={{ width: "100%" }}
          >
            <Form
              form={form}
              name="basic"
              layout="vertical"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Ticket Title"
                name="title"
                rules={[
                  { required: true, message: "Please input the ticket title!" },
                ]}
              >
                <Input
                  prefix={<ExclamationCircleOutlined />}
                  placeholder="issue realted queryparam"
                />
              </Form.Item>

              <Form.Item
                label="Ticket Description"
                name="description"
                rules={[
                  { required: true, message: "Please Describe the issue!" },
                ]}
              >
                <TextArea rows={4} placeholder="briefly describe the issue" />
              </Form.Item>
              <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Card>
          <div className="mt-6 p-4 rounded-xl bg-gray-50 border">
            <h3 className="font-semibold mb-2">After Ticket Creation:</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
              <li>Your ticket will be analyzed by our agent.</li>
              <li>It will be assigned to the best-fit moderator.</li>
              <li>This process may take some time — please be patient.</li>
              <li>You can track your ticket status on the Ticket Dashboard.</li>
            </ul>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default Ticket;
