import { Card } from "antd";
import { Button, Form, Input } from "antd";
import UserOutlined from "@ant-design/icons/UserOutlined";
import { LockOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { getSignUp } from "../axios/api";
import toast from "react-hot-toast";

const Signup = () => {
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const { mutate: signupMutation } = useMutation({
    mutationFn: async (values) => getSignUp(values),
    onSuccess: () => {
      toast.success("Signup successful! Please login.");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Signup failed! Please try again."
      );
    },
  });
  const onFinish = (values) => {
    signupMutation(values);
  };
  return (
    <>
      <div
        className="h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{ backgroundImage: "url('/sean1.svg')" }}
      >
        <div className="w-[100%] h-[100%] flex ">
          <div
            className="w-[40%] h-[100%] bg-teal-600 bg-center bg-cover bg-no-repeat"
            style={{
              backgroundImage: "url('/signup2.svg')",
              backgroundSize: "80%",
            }}
          ></div>
          <div className="w-[60%] h-[100%]  flex items-center justify-center ">
            <Card
              title="⚙️Agentra"
              variant="borderless"
              className="text-center w-[40%]"
            >
              <Form
                name="basic"
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
                    { required: true, message: "Please input your Email!" },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="agentra@gmail.com"
                  />
                </Form.Item>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password prefix={<LockOutlined />} />
                </Form.Item>
                <Form.Item label={null}>
                  <Button type="primary" htmlType="submit" className="w-full">
                    Signup
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
