import { Button, Card, Form, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const StakeholderTypeForm = ({
  name = "stakeholderType",
  title = "Add Stakeholder Type",
  btnText = "Submit",
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
                  label="Title"
                  name="title"
                  rules={[
                    {
                      required: true,
                      message: "Please input Title !",
                    },
                  ]}
                >
                  <Input placeholder="Title" />
                </Form.Item>

                <Form.Item
                  label="Value"
                  name="value"
                  rules={[
                    {
                      required: true,
                      message: "Please input value !",
                    },
                  ]}
                >
                  <Input placeholder="Value " />
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

export default StakeholderTypeForm;
