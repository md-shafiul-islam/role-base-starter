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

const StakeholderForm = ({
  name = "stakeholder",
  title = "Add Stakeholder",
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
                  label="First Name:"
                  name="firstName"
                  rules={[
                    {
                      required: true,
                      message: "Please input First Name !",
                    },
                  ]}
                >
                  <Input placeholder="First Name" />
                </Form.Item>

                <Form.Item
                  label="Last Name:"
                  name="lastName"
                  rules={[
                    {
                      message: "Please input Last Name !",
                    },
                  ]}
                >
                  <Input placeholder="Last Name" />
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
                  label="Address 1:"
                  name="address1"
                  rules={[
                    {
                      required: true,
                      message: "Please input Address 1 !",
                    },
                  ]}
                >
                  <Input placeholder="Address 1" />
                </Form.Item>

                <Form.Item
                  label="Address 2:"
                  name="address2"
                  rules={[
                    {
                      message: "Please input Address 2 !",
                    },
                  ]}
                >
                  <Input placeholder="Address 2" />
                </Form.Item>

                <Form.Item label="Description" name={`description`}>
                  <TextArea placeholder="Description" />
                </Form.Item>

                <Form.Item
                  label="Gender"
                  name="gender"
                  rules={[
                    {
                      required: true,
                      message: "Select a Gender",
                    },
                  ]}
                >
                  <div className="w-48">
                    <Flex vertical gap="middle">
                      <Radio.Group
                        name="gender"
                        block
                        options={[
                          { label: "Male", value: "Male" },
                          { label: "Female", value: "Female" },
                        ]}
                        defaultValue={values.gender ? values.gender : ""}
                        optionType="button"
                        buttonStyle="solid"
                      />
                    </Flex>
                  </div>
                </Form.Item>

                <Form.Item
                  label="Stakeholder Type:"
                  name="stakeType"
                  rules={[
                    {
                      required: true,
                      message: "Select Stakeholder Type!",
                    },
                  ]}
                >
                  <Select
                    placeholder="Select One Type"
                    showSearch={true}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option?.children
                        ?.toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {stakeTypes &&
                      stakeTypes.map((item) => {
                        return (
                          <Option key={`stakeType-${item.id}`} value={item.id}>
                            {item.title}
                          </Option>
                        );
                      })}
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Ref. Code:"
                  name="refCode"
                  rules={[
                    {
                      message: "Please input Ref Code !",
                    },
                  ]}
                >
                  <Input placeholder="Ref. Code" />
                </Form.Item>
                <Form.Item
                  label="Signature:"
                  name="signature"
                  rules={[
                    {
                      message: "Please upload Signature!",
                    },
                  ]}
                >
                  <CstUploadFile
                    onChangeAction={(url) => {
                      onImageChange("signature", url, values);
                    }}
                    imgLoc="signatures"
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

export default StakeholderForm;
