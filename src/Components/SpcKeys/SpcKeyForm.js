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


const SpcKeyForm = ({
  name = "spcKey",
  title = "Add spcKey",
  btnText = "Submit",
  initForm,
  spcKeys = [],
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
                  label="Value"
                  name="value"
                  rules={[
                    {
                      required: true,
                      message: "Please input Value No !",
                    },
                  ]}
                >
                  <Input placeholder="Value No:" />
                </Form.Item>

                <Form.Item
                  label="Type:"
                  name="type"
                  rules={[
                    {
                      required: true,
                      message: "Please input Type !",
                    },
                  ]}
                >
                  <Input placeholder="Type as Number" />
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

export default SpcKeyForm;
