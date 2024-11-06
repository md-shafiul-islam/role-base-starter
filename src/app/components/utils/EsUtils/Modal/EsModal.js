import { Button, Form, Input, Modal, Select, Space } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { waitUntilSymbol } from "next/dist/server/web/spec-extension/fetch-event";
import React from "react";

const { Option } = Select;

const EsModal = ({
  isOpen = false,
  title,
  handleOk,
  handleCancel,
  unitsOptions = [],
  initValues = {},
  batchId,
  initForm,
  ...params
}) => {
  const submitAction = (values) => {
    params.finalizeAction(values);
  };

  return (
    <Modal
      open={isOpen}
      title={title}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" type="primary" onClick={handleCancel} danger>
          Cancel
        </Button>,
        <Button key="ok" type="primary" onClick={handleOk}>
          Ok
        </Button>,
      ]}
    >
      <Form
        form={initForm}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        layout="horizontal"
        size={"middle"}
        onFinish={submitAction}
        initialValues={initValues}
        name={params.name}
      >
        <React.Fragment>
          <Form.Item name={`pubId`} hidden>
            <Input />
          </Form.Item>

          <Form.Item name={`productQty`} label={`পণ্যর পরিমাণ`}>
            <Input />
          </Form.Item>

          <Form.Item name={`unitId`} label={`পণ্যর পরিমাণ`}>
            <Select placeholder="Select Product Unit ...">
              {unitsOptions?.map((unit) => {
                return <Option value={unit?.id}>{unit?.name}</Option>;
              })}
            </Select>
          </Form.Item>
          <Form.Item name={`profit`} label={`একক লাভ`}>
            <Input placeholder="1,2,3,5,6" />
          </Form.Item>
          <Form.Item name={`profitPar`} label={`একক লাভ (%)`}>
            <Input placeholder="1,2,3,5,6" />
          </Form.Item>

          <Form.Item name={`note`} label="Note">
            <TextArea />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Space>
          </Form.Item>
        </React.Fragment>
      </Form>
    </Modal>
  );
};

export default EsModal;
