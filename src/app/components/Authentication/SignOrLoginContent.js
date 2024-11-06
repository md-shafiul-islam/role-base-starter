"use client";
import React from "react";
import { signIn } from "next-auth/react";
import { Button, Checkbox, Col, Form, Input, Row } from "antd";
import { esFrontLogger } from "@/src/utils/es-loger/esFrontLogger";

const SignOrLoginContent = (params) => {
  const onSubmitAction = async (user) => {
    const login = await signIn("credentials", {
      username: user.name,
      password: user.pwd,
      redirect: false,
    });

    esFrontLogger.info("Sign in ", login);
  };

  const onFinishFailed = (e) => {
    //esBackLogger.info("Login Error", e);
  };
  return (
    <React.Fragment>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Form
            className="w-full"
            name="basic"
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 12,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onSubmitAction}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="name"
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
              name="pwd"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 6,
                span: 12,
              }}
            >
              <Button type="primary" htmlType="submit" block>
                Log In
              </Button>
            </Form.Item>
          </Form>
        </Col>

        <Col span={24}>
          <div className="flex flex-row justify-center items-center">
            <div className="w-16 h-16 rounded-lg border-gray-500 text-sky-400">
              <i className="fa-brands fa-google"></i>
            </div>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default SignOrLoginContent;
