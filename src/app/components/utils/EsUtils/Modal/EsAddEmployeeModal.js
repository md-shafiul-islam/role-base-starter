import { Button, Form, Input, Modal, Select, Space } from "antd";
import React from "react";

const { Option } = Select;

const EsAddEmployeeModal = ({
  isOpen = false,
  title,
  isCloseAction,
  unitsOptions = [],
  initValues = {},

  initForm,
  submitAction,
  ...params
}) => {


  return (
    <Modal
      open={isOpen}
      title={title}
      onOk={isCloseAction}
      onCancel={isCloseAction}
      closable={false}
      footer={[
        <Button key="cancel" type="primary" onClick={isCloseAction} danger>
          Cancel
        </Button>,
        <Button key="ok" type="primary" onClick={isCloseAction}>
          Ok
        </Button>,
      ]}
    >
      <Form
        form={initForm}
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        size={"middle"}
        onFinish={submitAction}
        initialValues={initValues}
        name={params.name}
      >
        <React.Fragment>
          <Form.Item name={`id`} hidden>
            <Input />
          </Form.Item>

          <Form.Item name={`userName`} label={`Username/ইউজার নাম`}>
            <Input placeholder="username" />
          </Form.Item>

          <Form.Item name={`password`} label={`Password/পাসওয়ার্ড`}>
            <Input.Password placeholder="password" />
          </Form.Item>

          <Form.Item wrapperCol={{
            offset: 6,
            span: 16,
          }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </React.Fragment>
      </Form>
    </Modal>
  );
};

export default EsAddEmployeeModal;
