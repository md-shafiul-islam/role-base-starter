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

const UnitForm = ({
  name = "Unit",
  title = "Add Unit",
  btnText = "Submit",
  initForm,
  units = [],
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
            console.log("Unit Values ", values);
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
                  label="Value"
                  name="value"
                  rules={[
                    {
                      required: true,
                      message: "Please input value !",
                    },
                  ]}
                >
                  <Input placeholder="Value" />
                </Form.Item>

                <Form.Item
                  label="Num"
                  name="num"
                  rules={[
                    {
                      required: true,
                      message: "Please input num !",
                    },
                  ]}
                >
                  <Input placeholder="num" />
                </Form.Item>
                <Form.Item label="Parent Unit" name={`parent`}>
                  <Select
                    showSearch={true}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option?.children
                        ?.toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {units &&
                      units.map((item) => {
                        return (
                          <Option key={`Unit-${item.id}`} value={item.id}>
                            {item.name}
                          </Option>
                        );
                      })}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Total Value"
                  name="totalValue"
                  rules={[
                    {
                      required: true,
                      message: "Please input Total Value !",
                    },
                  ]}
                >
                  <Input placeholder="Total Value" />
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

export default UnitForm;
