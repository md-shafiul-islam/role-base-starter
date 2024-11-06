import { Button, Card, Flex, Form, Input, Radio, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";

import CstUploadFile from "@/src/Components/EsAction/CstField/CstUploadFile";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const { Option } = Select;

const UserForm = ({
  name = "user",
  title = "Add User",
  btnText = "Submit",
  roles = [],
  initForm,
  onSubmitAction,
  onFailedAction,
  initValues = {
    name: null,
    email: null,
    phoneNo: null,
    userName: null,
    role: null,
    isActive: false,
    isVerified: false,
  },
  ...props
}) => {
  return (
    <React.Fragment>
      <Card title={title}>
        <Form
          {...layout}
          name={name}
          onFinish={onSubmitAction}
          onFinishFailed={onFailedAction}
          autoComplete="off"
          form={initForm}
          layout="horizontal"
          initialValues={initValues}
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
                  label="UserName:"
                  name="userName"
                  rules={[
                    {
                      message: "Please input UserName !",
                    },
                  ]}
                >
                  <Input placeholder="UserName" />
                </Form.Item>

                <Form.Item
                  label="Role:"
                  name="role"
                  rules={[
                    {
                      required: true,
                      message: "Select Role ",
                    },
                  ]}
                >
                  <Select
                    placeholder="Select One Role"
                    showSearch={true}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option?.children
                        ?.toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {roles &&
                      roles.map((item) => {
                        return (
                          <Option
                            key={`role-${item.publicId}`}
                            value={item.publicId}
                          >
                            {item.title}
                          </Option>
                        );
                      })}
                  </Select>
                </Form.Item>

                <Form.Item label="Active" name="isActive">
                  <Flex vertical gap="middle">
                    <Radio.Group
                      defaultValue={values?.isActive}
                      buttonStyle="solid"
                    >
                      <Radio.Button value={true}>Allow</Radio.Button>
                      <Radio.Button value={false}>Deny</Radio.Button>
                    </Radio.Group>
                  </Flex>
                </Form.Item>

                <Form.Item label="Verified" name="isVerified">
                  <Flex vertical gap="middle">
                    <Radio.Group
                      defaultValue={values?.isVerified}
                      buttonStyle="solid"
                    >
                      <Radio.Button value={true}>Allow</Radio.Button>
                      <Radio.Button value={false}>Deny</Radio.Button>
                    </Radio.Group>
                  </Flex>
                </Form.Item>

                <Form.Item
                  wrapperCol={{
                    ...layout.wrapperCol,
                    offset: 8,
                  }}
                >
                  <Button type="primary" htmlType="submit">
                    {btnText}
                  </Button>
                </Form.Item>
              </React.Fragment>
            );
          }}
        </Form>
      </Card>
    </React.Fragment>
  );
};

export default UserForm;
