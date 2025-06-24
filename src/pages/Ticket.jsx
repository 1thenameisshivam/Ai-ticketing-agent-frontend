import { useState } from "react";
import {
  Button,
  Card,
  Drawer,
  Empty,
  Form,
  Input,
  Popover,
  Segmented,
  Tag,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import { createTicket, getTickets } from "../axios/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import CreateTicketInfo from "../components/CreateTicketInfo";
import CardDetails from "../components/CardDetails";

const Ticket = () => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [statusFilter, setStatusFilter] = useState("in-progress");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const queryClient = useQueryClient();

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

  const tickets = data?.data?.tickets || [];
  const filteredTickets = tickets.filter((t) => t.status === statusFilter);
  const cardColor =
    statusFilter === "in-progress"
      ? "bg-blue-50 border-blue-100"
      : "bg-green-50 border-green-100";

  const getStatusTag = (status) => {
    const tagMap = {
      "in-progress": <Tag color="processing">In Progress</Tag>,
      closed: <Tag color="success">Closed</Tag>,
    };
    return tagMap[status] || <Tag color="default">{status}</Tag>;
  };

  const getPriorityTag = (priority) => {
    const colors = { high: "red", medium: "orange", low: "blue" };
    return (
      <Tag color={colors[priority] || "default"}>{priority.toUpperCase()}</Tag>
    );
  };

  const onFinish = (values) => createTicketMutation(values);
  const onClose = () => setOpen(false);

  return (
    <>
      <div className="px-6 py-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            🎟️ Ticket Dashboard
          </h1>
          <div className="flex gap-4">
            <Popover
              placement="top"
              content={`Click to refresh tickets.This will fetch the latest tickets staus from the server.`}
            >
              <Button
                onClick={() =>
                  queryClient.invalidateQueries({ queryKey: ["ticket"] })
                }
                type="primary"
                icon={<RedoOutlined />}
              >
                Refresh
              </Button>
            </Popover>
            <Button
              onClick={() => setOpen(true)}
              type="primary"
              className="rounded-lg px-5 py-2"
            >
              + Create Ticket
            </Button>
          </div>
        </div>

        <div className="flex justify-center mb-6 ">
          <Segmented
            options={[
              {
                label: "In Progress",
                value: "in-progress",
                icon: <ClockCircleOutlined />,
              },
              {
                label: "Closed",
                value: "closed",
                icon: <CheckCircleOutlined />,
              },
            ]}
            value={statusFilter}
            onChange={setStatusFilter}
          />
        </div>
        {filteredTickets?.length > 0 ? (
          <>
            <section className="bg-white rounded-3xl shadow-lg p-6 max-h-[70vh] hide-scrollbar overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTickets.map((ticket) => (
                  <Card
                    onClick={() => {
                      showModal();
                      setSelectedTicket(ticket);
                    }}
                    key={ticket._id}
                    title={
                      <span className="font-semibold text-gray-700">
                        {ticket.title}
                      </span>
                    }
                    className={`rounded-xl border cursor-pointer ${cardColor} hover:shadow-md transition`}
                    extra={getStatusTag(ticket.status)}
                  >
                    <p className="text-gray-600 mb-1">
                      <strong>Description:</strong> {ticket.description}
                    </p>
                    <p className="text-gray-600 mb-1">
                      <strong>Assigned To:</strong> {ticket.assignedTo?.email}
                    </p>
                    <p className="text-gray-600 mb-1">
                      <strong>Priority:</strong>{" "}
                      {getPriorityTag(ticket.priority)}
                    </p>
                    <p className="text-gray-400 text-sm mt-2">
                      Created on:
                      {dayjs(ticket.createdAt).format("DD MMM YYYY")}
                    </p>
                  </Card>
                ))}
              </div>
            </section>
          </>
        ) : (
          <Empty description="🙁 No Tickets Found" className="my-10" />
        )}
      </div>
      <CardDetails
        ticket={selectedTicket}
        open={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <Drawer
        title="Raise a Ticket"
        placement="right"
        width={500}
        onClose={onClose}
        open={open}
        extra={<Button onClick={() => form.resetFields()}>Clear</Button>}
      >
        <Card title="Fill the ticket info" variant="borderless">
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
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
                placeholder="Issue related queryparam"
              />
            </Form.Item>

            <Form.Item
              label="Ticket Description"
              name="description"
              rules={[
                { required: true, message: "Please describe the issue!" },
              ]}
            >
              <TextArea rows={4} placeholder="Briefly describe the issue" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
        <CreateTicketInfo />
      </Drawer>
    </>
  );
};
export default Ticket;
