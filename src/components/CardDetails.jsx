import {
  MailOutlined,
  UserOutlined,
  ClockCircleOutlined,
  InfoCircleOutlined,
  StarOutlined,
  ScheduleOutlined,
  BulbOutlined,
} from "@ant-design/icons";
import { Modal, Tag, Divider, Button } from "antd";
import dayjs from "dayjs";
import { userStore } from "../zustand/store";

const CardDetails = ({ ticket, open, setIsModalOpen }) => {
  const { user } = userStore();
  return (
    <Modal
      title={
        <div className="flex items-center gap-2 text-lg font-semibold">
          <InfoCircleOutlined /> {ticket?.title}
        </div>
      }
      open={open}
      onOk={() => setIsModalOpen(false)}
      onCancel={() => setIsModalOpen(false)}
      footer={null}
      width={600}
      bodyStyle={{
        maxHeight: "65vh",
        overflowY: "auto",
        paddingRight: "1rem",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      <div className="space-y-4 text-gray-700 ">
        <div>
          <Tag icon={<ClockCircleOutlined />} color="processing">
            Status: {ticket?.status.toUpperCase()}
          </Tag>
          <Tag icon={<StarOutlined />} color="orange">
            Priority: {ticket?.priority.toUpperCase()}
          </Tag>
        </div>

        <Divider plain>Assigned Info</Divider>
        <p>
          <UserOutlined /> <strong>Assigned To:</strong>{" "}
          {ticket?.assignedTo?.email}
        </p>
        <p>
          <MailOutlined /> <strong>Created By:</strong>{" "}
          {ticket?.createdBy?.email}
        </p>

        <Divider plain>Timeline</Divider>
        <p>
          <ScheduleOutlined /> <strong>Created At:</strong>{" "}
          {dayjs(ticket?.createdAt).format("DD MMM YYYY, hh:mm A")}
        </p>
        <p>
          <ScheduleOutlined /> <strong>Deadline:</strong>{" "}
          {dayjs(ticket?.deadline).format("DD MMM YYYY, hh:mm A")}
        </p>

        <Divider plain>Description</Divider>
        <p>{ticket?.description}</p>
        {user?.user.role != "user" && (
          <>
            <Divider plain>Helpful Notes</Divider>
            <div className="bg-gray-50 border p-3 rounded text-sm whitespace-pre-wrap max-h-48 overflow-y-auto">
              {ticket?.helpfulNotes}
            </div>

            <Divider plain>Required Skills</Divider>
            <div className="flex flex-wrap gap-2">
              {ticket?.relatedSkills.map((skill, i) => (
                <Tag key={i} icon={<BulbOutlined />} color="blue">
                  {skill}
                </Tag>
              ))}
            </div>
          </>
        )}
      </div>
      {user?.user.role != "user" && (
        <Button type="primary" className="mt-4 w-full">
          Update status
        </Button>
      )}
    </Modal>
  );
};

export default CardDetails;
