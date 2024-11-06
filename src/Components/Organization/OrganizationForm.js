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

const OrganizationForm = ({
  name = "organization",
  title = "Add Organization",
  btnText = "Submit",
  stakeTypes = [],
  initForm,
  onSubmitAction,
  onFailedAction,
  initValues,
  ...props
}) => {
  const onImageChange = (name, url, values) => {
    values[name] = url;
    initForm.setFieldsValue(values);
  };

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
                      message: "Please input Org. Name !",
                    },
                  ]}
                >
                  <Input placeholder="Organization Name" />
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
                      message: "Please input Email !",
                    },
                  ]}
                >
                  <Input placeholder="Email" />
                </Form.Item>

                <Form.Item
                  label="Trade License No:"
                  name="tradeLicense"
                  rules={[
                    {
                      message: "Please input Address 2 !",
                    },
                  ]}
                >
                  <Input placeholder="rade License No" />
                </Form.Item>

                <Form.Item label="Contract" name={`contract`}>
                  <TextArea placeholder="Contract" />
                </Form.Item>

                <Form.Item
                  label="Image:"
                  name="image"
                  rules={[
                    {
                      message: "Please upload Signature!",
                    },
                  ]}
                >
                  <CstUploadFile
                    onChangeAction={(url) => {
                      onImageChange("image", url, values);
                    }}
                    imgLoc="image"
                  />
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

export default OrganizationForm;
