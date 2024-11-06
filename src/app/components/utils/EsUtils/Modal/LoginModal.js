import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
} from "antd";
import { signIn } from "next-auth/react";

import React from "react";

const LoginModal = ({
  isOpen = false,
  title,
  handleOk,
  btnName = "Ok",
  width = 650,
  onLoginFailed,
  onLogin,
  isClosable = false,
  ...params
}) => {
  const submitAction = (values) => {
    params.finalizeAction(values);
  };

  const onSignInWthGoogle = () => {
    signIn("google");
  };

  return (
    <Modal
      closable={isClosable}
      open={isOpen}
      title={title}
      onCancel={handleOk}
      width={width}
      footer={[]}
    >
      <Form
        name="login"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onLogin}
        onFinishFailed={onLoginFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        {/* <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item> */}

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            SignIn
          </Button>
        </Form.Item>
      </Form>
      <Row>
        <Col span={24}>
          <div className="flex flex-row justify-center items-center">
            <div
              className="w-52 h-9 flex flex-row justify-center items-center rounded-lg border-gray-500 bg-[#d34836] text-white cursor-pointer text-xl font-semibold gap-5"
              onClick={onSignInWthGoogle}
            >
              <span><i className="fa-brands fa-google"></i></span><span>Google</span>
            </div>
          </div>
        </Col>
      </Row>
    </Modal>
  );
};

export default LoginModal;
