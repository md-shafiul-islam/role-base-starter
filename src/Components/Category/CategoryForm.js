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

const CategoryForm = ({
  name = "category",
  title = "Add Category",
  btnText = "Submit",
  initForm,
  categories = [],
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
                  label="Name"
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

                <Form.Item label="Description" name={`description`}>
                  <TextArea placeholder="Description" />
                </Form.Item>

                <Form.Item
                  label="Slug"
                  name="slug"
                  rules={[
                    {
                      required: true,
                      message: "Please input slug !",
                    },
                  ]}
                >
                  <Input placeholder="Slug" />
                </Form.Item>

                <Form.Item
                  label="Key"
                  name="key"
                  rules={[
                    {
                      required: true,
                      message: "Please input Key !",
                    },
                  ]}
                >
                  <Input placeholder="Key" />
                </Form.Item>
                <Form.Item label="Parent Category" name={`parent`}>
                  <Select
                    showSearch={true}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option?.children
                        ?.toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {categories &&
                      categories.map((item) => {
                        return (
                          <Option key={`category-${item.id}`} value={item.id}>
                            {item.name}
                          </Option>
                        );
                      })}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="URL"
                  name="actionUrl"
                  rules={[
                    {
                      required: true,
                      message: "Please input URL !",
                    },
                  ]}
                >
                  <Input placeholder="Key" />
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

export default CategoryForm;
