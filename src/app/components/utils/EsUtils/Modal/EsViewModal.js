import { Button, Modal, Select } from "antd";

import React from "react";

const EsViewModal = ({
  isOpen = false,
  title,
  handleOk,
  btnName = "Ok",
  width = 650,
  isClosable = false,
  isFooter = true,
  ...params
}) => {
  return (
    <Modal
      style={{
        top: 20,
      }}
      closable={isClosable}
      open={isOpen}
      title={title}
      onOk={handleOk}
      onCancel={handleOk}
      width={width}
      footer={
        isFooter
          ? isFooter
          : [
              <Button key="ok" type="primary" onClick={handleOk}>
                {btnName}
              </Button>,
            ]
      }
    >
      {params?.children}
    </Modal>
  );
};

export default EsViewModal;
