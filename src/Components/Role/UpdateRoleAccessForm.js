import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { Button, Card, Flex, Form, Input, Radio, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import EsButton from "../EsUtils/EsButton";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const UpdateRoleAccessForm = ({
  title = "Update Role Access ",
  name = "roleAccess",
  onSubmitAction,
  onFailedAction,
  initForm,
  initValues,
  onCancel,
  ...props
}) => {
  const radioOptions = [
    { label: "Allow", value: true },
    { label: "Deny", value: false },
  ];
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
                <Form.Item label="View" name="isView">
                  <Flex vertical gap="middle">
                    <Radio.Group
                      defaultValue={values?.isView}
                      buttonStyle="solid"
                    >
                      <Radio.Button value={true}>Allow</Radio.Button>
                      <Radio.Button value={false}>Deny</Radio.Button>
                    </Radio.Group>
                  </Flex>
                </Form.Item>

                <Form.Item label="Add" name="isAdd">
                  <Flex vertical gap="middle">
                    <Radio.Group
                      defaultValue={values?.isAdd}
                      buttonStyle="solid"
                    >
                      <Radio.Button value={true}>Allow</Radio.Button>
                      <Radio.Button value={false}>Deny</Radio.Button>
                    </Radio.Group>
                  </Flex>
                </Form.Item>

                <Form.Item label="Edit" name="isEdit">
                  <Flex vertical gap="middle">
                    <Radio.Group
                      defaultValue={values?.isEdit}
                      buttonStyle="solid"
                    >
                      <Radio.Button value={true}>Allow</Radio.Button>
                      <Radio.Button value={false}>Deny</Radio.Button>
                    </Radio.Group>
                  </Flex>
                </Form.Item>

                <Form.Item label="Approve" name="isApprove">
                  <Flex vertical gap="middle">
                    <Radio.Group
                      defaultValue={values?.isApprove}
                      buttonStyle="solid"
                    >
                      <Radio.Button value={true}>Allow</Radio.Button>
                      <Radio.Button value={false}>Deny</Radio.Button>
                    </Radio.Group>
                  </Flex>
                </Form.Item>

                <Form.Item label="Remove" name="isRemove">
                  <Flex vertical gap="middle">
                    <Radio.Group
                      defaultValue={values?.isRemove}
                      buttonStyle="solid"
                    >
                      <Radio.Button value={true}>Allow</Radio.Button>
                      <Radio.Button value={false}>Deny</Radio.Button>
                    </Radio.Group>
                  </Flex>
                </Form.Item>

                <Form.Item label="All" name="isAll">
                  <Flex vertical gap="middle">
                    <Radio.Group
                      defaultValue={values?.isAll}
                      buttonStyle="solid"
                    >
                      <Radio.Button value={true}>Allow</Radio.Button>
                      <Radio.Button value={false}>Deny</Radio.Button>
                    </Radio.Group>
                  </Flex>
                </Form.Item>

                <Form.Item label="Auth" name="isAuth">
                  <Flex vertical gap="middle">
                    <Radio.Group
                      defaultValue={values?.isAuth}
                      buttonStyle="solid"
                    >
                      <Radio.Button value={true}>Allow</Radio.Button>
                      <Radio.Button value={false}>Deny</Radio.Button>
                    </Radio.Group>
                  </Flex>
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

                <Form.Item
                  wrapperCol={{
                    ...layout.wrapperCol,
                    offset: 8,
                  }}
                >
                  <Space>
                    <Button type="primary" htmlType="submit">
                      Update
                    </Button>
                    <Button type="primary" danger onClick={onCancel}>
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

export default UpdateRoleAccessForm;
