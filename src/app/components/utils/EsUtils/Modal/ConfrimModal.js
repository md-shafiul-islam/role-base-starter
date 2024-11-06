
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Modal, Space } from "antd";
import React, { useEffect, useState } from "react";


const ConfrimModal = ({
  icon = <ExclamationCircleOutlined />,
  title,
  content,
  okText = "Yes",
  cancelText = "Cancel",
  isOpen,
  onConfrim,
  onCancel,
  ...props
}) => {
  return (
    <>
      <Modal
        maskClosable={false}
        // closeIcon={true}
        closable={false}
        title={title}
        open={isOpen}
        onOk={onConfrim}
        onCancel={onCancel}
        okText={okText}
        cancelText={cancelText}
        cancelButtonProps={{ type: "primary", danger: true }}
      >
        <span>{content}</span>
      </Modal>
    </>
  );
};

export default ConfrimModal;
