"use client";
import { Button, Card, Flex, Form, Input, Radio, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { thunkAddRegister } from "@/src/redux/reducer/userReducer";

import CstUploadFile from "@/src/Components/EsAction/CstField/CstUploadFile";
import { getUpdatedNotification } from "@/src/utils/ui/initNotification";
import { isEmptyOrNull } from "@/src/app/components/utils/Action/esFunc/gen-es/esCheckFunc";
import { redirect } from "next/navigation";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 8,
  },
};

const { Option } = Select;

const RegisterCard = ({ userRegisterResp, ...props }) => {
  const [form] = Form.useForm();

  const [isSubmit, setIsSubmit] = useState(false);
  const [registerKey, setRegisterKey] = useState(false);

  const onSubmitAction = (user) => {
    props.thunkAddRegister(user);
    getUpdatedNotification(
      "info",
      registerKey,
      "User Register request sending ..."
    );
  };

  const onFailedAction = (values) => {
    console.log("Register Failed ", values);
  };

  useEffect(() => {
    if (!isEmptyOrNull(userRegisterResp) && isSubmit) {
      if (userRegisterResp.status) {
        getUpdatedNotification(
          "success",
          registerKey,
          userRegisterResp.message
        );
        redirect("/login");
      } else {
        getUpdatedNotification("error", registerKey, userRegisterResp.message);
      }
      setIsSubmit(false);
    }
  }, [userRegisterResp]);

  return (
    <React.Fragment>
      <Form
        {...layout}
        name="register"
        onFinish={onSubmitAction}
        onFinishFailed={onFailedAction}
        autoComplete="off"
        form={form}
        layout="horizontal"
        initialValues={{
          name: null,
          email: null,
          phoneNo: null,
          pwd: null,
        }}
      >
        {(values) => {
          return (
            <React.Fragment>
              <Form.Item
                label="Name:"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input Name !",
                  },
                ]}
              >
                <Input placeholder="Name" />
              </Form.Item>

              <Form.Item
                label="Phone No."
                name="phoneNo"
                rules={[
                  {
                    required: true,
                    message: "Please input Phone No !",
                  },
                ]}
              >
                <Input placeholder="Phone No:" />
              </Form.Item>

              <Form.Item
                label="Email:"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input email !",
                  },
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>

              <Form.Item
                label="Password:"
                name="pwd"
                rules={[
                  {
                    message: "Please input password !",
                  },
                ]}
              >
                <Input.Password placeholder="Password" />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  ...layout.wrapperCol,
                  offset: 8,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Register
                </Button>
              </Form.Item>
            </React.Fragment>
          );
        }}
      </Form>
    </React.Fragment>
  );
};

RegisterCard.propTypes = {
  userRegisterResp: PropTypes.object,
  thunkAddRegister: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    userRegisterResp: state?.user?.register,
  };
};

const mapDispatchToProps = {
  thunkAddRegister,
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterCard);
