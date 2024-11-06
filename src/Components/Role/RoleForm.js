import React from "react";
import { Button, Card, Flex, Form, Input, Radio, Select } from "antd";
import TextArea from "antd/es/input/TextArea";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const { Option } = Select;

const RoleForm = ({
  name = "role",
  title = "Add Role",
  btnText = "Submit",
  menus = [],
  initForm,
  onSubmitAction,
  onFailedAction,
  initValues,
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
                  label="Title:"
                  name="title"
                  rules={[
                    {
                      required: true,
                      message: "Please input title !",
                    },
                  ]}
                >
                  <Input placeholder="Title" />
                </Form.Item>

                <Form.Item
                  label="Description."
                  name="description"
                  rules={[
                    {
                      required: true,
                      message: "Please input Description !",
                    },
                  ]}
                >
                  <TextArea placeholder="Description:" />
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

export default RoleForm;
