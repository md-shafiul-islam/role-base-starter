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

const { Option } = Select;

const BrandForm = ({
  name = "Brand",
  title = "Add Brand",
  btnText = "Submit",
  initForm,
  brands = [],
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

                <Form.Item label="Description" name={`description`}>
                  <TextArea placeholder="Description" />
                </Form.Item>

                <Form.Item
                  label="Tag Line:"
                  name="tagLine"
                  rules={[
                    {
                      required: true,
                      message: "Please input Tag Line !",
                    },
                  ]}
                >
                  <Input placeholder="Tag Line" />
                </Form.Item>
                
                <Form.Item
                  label="Logo Url"
                  name="logoUrl"
                  rules={[
                    {
                      required: true,
                      message: "Please input Logo Url !",
                    },
                  ]}
                >
                  <Input placeholder="logoUrl" />
                </Form.Item>

                <Form.Item
                  label="Website"
                  name="website"
                  rules={[
                    {
                      required: true,
                      message: "Please input website !",
                    },
                  ]}
                >
                  <Input placeholder="Website" />
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

export default BrandForm;
