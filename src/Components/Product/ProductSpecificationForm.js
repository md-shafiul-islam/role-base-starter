import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Card, Form, Input, Select, Space } from "antd";
import { thunkAllSpecKey } from "@/src/redux/reducer/specKeyReducer";

import { connect } from "react-redux";
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

const ProductSpecificationForm = ({
  title = "Add Product Specification",
  name = "specification",
  onSubmitAction,
  onFailedAction,
  initValues = {},
  spcKeys = [],
  onCancel,
  btnText,
  isUpdate = false,
  specification = {
    description: null,
    isFeature: false,
    name: null,
    value: null,
    spsKey: null,
  },
  ...props
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    props.thunkAllSpecKey();
  }, []);

  useEffect(() => {
    if (isUpdate) {
      form.setFieldsValue(specification);
    }
  }, [isUpdate]);

  console.log("Product Update Spec, ", specification);
  return (
    <React.Fragment>
      <Card title={title}>
        <Form
          {...layout}
          name={name}
          onFinish={onSubmitAction}
          onFinishFailed={onFailedAction}
          autoComplete="off"
          form={form}
          layout="horizontal"
          initialValues={specification}
        >
          {(values) => {
            return (
              <React.Fragment>
                <Form.Item
                  name="spsKey"
                  label="Specification Key:"
                  rules={[
                    {
                      required: true,
                      message: "Select specification Key!",
                    },
                  ]}
                >
                  <Select
                    placeholder="Select One Key"
                    style={{ width: `100%` }}
                    showSearch={true}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option?.children
                        ?.toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {spcKeys &&
                      spcKeys.map((item) => {
                        return (
                          <Option key={`spcKeys-${item.id}`} value={item._id}>
                            {item.name}
                          </Option>
                        );
                      })}
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Value"
                  name="value"
                  rules={[
                    {
                      message: "Missing Value",
                    },
                  ]}
                >
                  <Input placeholder="Value" />
                </Form.Item>

                <Form.Item
                  label="Description"
                  name="description"
                  rules={[
                    {
                      message: "Missing last description",
                    },
                  ]}
                >
                  <TextArea placeholder="Description" />
                </Form.Item>

                <Form.Item
                  wrapperCol={{
                    ...layout.wrapperCol,
                    offset: 8,
                  }}
                >
                  <Space>
                    <Button type="primary" htmlType="submit">
                      {btnText}
                    </Button>

                    <Button
                      type="primary"
                      variant="solid"
                      danger
                      onClick={onCancel}
                    >
                      Cancel
                    </Button>
                  </Space>
                </Form.Item>
              </React.Fragment>
            );
          }}
        </Form>
      </Card>
    </React.Fragment>
  );
};

ProductSpecificationForm.propTypes = {
  spcKeys: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    spcKeys: state?.spcKey?.specKeys,
  };
};

const mapDispatchToProps = { thunkAllSpecKey };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductSpecificationForm);
