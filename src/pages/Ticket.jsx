import { useState } from "react";
import { Button, Card, Drawer, Empty, Form, Input, Space, Tag } from "antd";
import TextArea from "antd/es/input/TextArea";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { createTicket, getTickets } from "../axios/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import { userStore } from "../zustand/store";
const Ticket = () => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const { user } = userStore();
  const queryClient = useQueryClient();
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const { data } = useQuery({
    queryKey: ["ticket"],
    queryFn: getTickets,
    keepPreviousData: true,
  });
  const { mutate: createTicketMutation } = useMutation({
    mutationFn: async (values) => createTicket(values),
    onSuccess: () => {
      form.resetFields();
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["ticket"] });
      toast.success("Ticket created successfully!");
    },
  });

  const inProgress = data?.data?.tickets.filter(
    (t) => t.status === "in-progress"
  );
  const closed = data?.data?.tickets.filter((t) => t.status === "closed");

  const getStatusTag = (status) => {
    if (status === "in-progress")
      return <Tag color="processing">In Progress</Tag>;
    if (status === "closed") return <Tag color="success">Closed</Tag>;
    return <Tag color="default">{status}</Tag>;
  };
  console.log(data?.data?.tickets);
  const getPriorityTag = (priority) => {
    const colors = {
      high: "red",
      medium: "orange",
      low: "blue",
    };
    return (
      <Tag color={colors[priority] || "default"}>{priority.toUpperCase()}</Tag>
    );
  };
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
        className="h-[65vh] w-full rounded-2xl bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/sean3.svg')" }}
      >
        {data?.data?.tickets.length > 0 ? (
          <>
            <div className="flex">
              <h2 className=" w-1/2 pl-4 pt-2 text-lg text-white font-semibold ">
                🟡 In Progress
              </h2>
              <h2 className=" w-1/2 pl-3 pt-2 text-lg font-semibold mb-2">
                ✅ Closed
              </h2>
            </div>
            <div className="flex scrollbar overflow-y-auto hide-scrollbar h-[55vh] w-full p-4">
              {/* In-Progress */}
              <div className="w-1/2 pr-4 flex flex-col gap-3">
                {inProgress?.map((ticket) => (
                  <Card
                    key={ticket._id}
                    title={ticket.title}
                    variant={"bordered"}
                    className="mb-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-md text-white"
                    extra={getStatusTag(ticket.status)}
                  >
                    <p>
                      <strong>Description:</strong> {ticket.description}
                    </p>
                    <p>
                      <strong>Assigned To:</strong> {ticket.assignedTo?.email}
                    </p>
                    {user?.user.role !== "user" && (
                      <p>
                        <strong>Deadline:</strong>
                        <Tag color="cyan">
                          {dayjs(ticket.deadline).format("DD MMM YYYY")}
                        </Tag>
                      </p>
                    )}
                    <p>
                      <strong>Priority:</strong>{" "}
                      {getPriorityTag(ticket.priority)}
                    </p>
                    {user?.user.role !== "user" && (
                      <p>
                        <strong>Skills:</strong>{" "}
                        {ticket.relatedSkills?.join(", ")}
                      </p>
                    )}
                    {user?.user.role !== "user" && (
                      <p>
                        <strong>Helpful Notes:</strong> {ticket.helpfulNotes}
                      </p>
                    )}
                    <p className="text-gray-500 text-sm mt-2">
                      Created on:{" "}
                      {dayjs(ticket.createdAt).format("DD MMM YYYY")}
                    </p>
                  </Card>
                ))}
              </div>

              {/* Closed */}
              <div className="w-1/2 flex flex-col gap-3 ">
                {closed?.map((ticket) => (
                  <Card
                    key={ticket._id}
                    title={ticket.title}
                    variant={"bordered"}
                    className="mb-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-md text-white"
                    extra={getStatusTag(ticket.status)}
                  >
                    <p>
                      <strong>Description:</strong> {ticket.description}
                    </p>
                    <p>
                      <strong>Assigned To:</strong> {ticket.assignedTo?.email}
                    </p>
                    <p>
                      <strong>Deadline:</strong>{" "}
                      <Tag color="cyan">
                        {dayjs(ticket.deadline).format("DD MMM YYYY")}
                      </Tag>
                    </p>
                    <p>
                      <strong>Priority:</strong>{" "}
                      {getPriorityTag(ticket.priority)}
                    </p>
                    <p>
                      <strong>Skills:</strong>{" "}
                      {ticket.relatedSkills?.join(", ")}
                    </p>
                    <p>
                      <strong>Helpful Notes:</strong> {ticket.helpfulNotes}
                    </p>
                    <p className="text-gray-500 text-sm mt-2">
                      Created on:{" "}
                      {dayjs(ticket.createdAt).format("DD MMM YYYY")}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          </>
        ) : (
          <p className="text-black text-2xl flex items-center justify-center h-full">
            <>🙁No Data Found</>
          </p>
        )}
      </div>
      <Drawer
        title="Raise a Ticket"
        placement={"right"}
        width={500}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={() => form.resetFields()}>Clear</Button>
            {/* <Button type="primary" onClick={onClose}>
              OK
            </Button> */}
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
