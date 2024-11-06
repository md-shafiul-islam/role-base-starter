import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Modal, Space } from "antd";
import React, { useEffect, useState } from "react";
import EsButton from "../EsButton";
const ConfrimOrderModal = ({
  icon = <ExclamationCircleOutlined />,
  title,
  content,
  isOpen,
  onClose,
  onCancel,
  onApprove,
  ...props
}) => {
  const [isApprove, setIsApprove] = useState(false);
  const [isCancel, setIsCancel] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsApprove(!isOpen);
      setIsCancel(!isOpen);
    }
  }, [isOpen]);

  const onApproveAction = () => {
    //esBackLogger.info("Is Approve !!");

    if (!isApprove) {
      //esBackLogger.info("Is Approve Action");
      onApprove();
      setIsApprove(true);
    }
  };

  const onCancelAction = () => {
    //esBackLogger.info("Is Approve Action");
    if (!isCancel) {
      onCancel();
      setIsCancel(true);
    }
  };
  return (
    <>
      <Modal
        style={{
          top: 20,
        }}
        maskClosable={false}
        width={`90%`}
        closable={false}
        title={title}
        open={isOpen}
        footer={[
          <EsButton type="coole" text="Close" onClick={onClose} />,
          <EsButton
            className={isCancel ? "cursor-not-allowed" : "cursor-pointer"}
            isDisable={isCancel}
            type="error"
            text="Cancel"
            onClick={onCancelAction}
          />,
          <EsButton
            className={isApprove ? "cursor-not-allowed" : "cursor-pointer"}
            type="success"
            text="Approve"
            onClick={onApproveAction}
            isDisable={isApprove}
          />,
        ]}
      >
        {content}
      </Modal>
    </>
  );
};

export default ConfrimOrderModal;
