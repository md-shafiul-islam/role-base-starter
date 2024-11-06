import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Modal, Space } from "antd";
import React, { useEffect, useState } from "react";

const ConfrimOrderModal = ({
  icon = <ExclamationCircleOutlined />,
  title,
  content,
  isOpen,
  onClose,
  onShipped,
  ...props
}) => {
  const [isShipped, setIsShipped] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsShipped(!isOpen);
    }
  }, [isOpen]);

  const onShippedAction = () => {
    //esBackLogger.info("onShippedAction !!");

    if (!isShipped) {
      //esBackLogger.info("Is onShippedAction Action");
      onShipped();
      setIsShipped(true);
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
          <button onClick={onClose} className="px-5 py-1 text-lg font-semibold text-white bg-teal-600 hover:bg-teal-800 mx-2">
            Close
          </button>,
          <button
            onClick={onShippedAction}
            disabled={isShipped}
            className={`bg-orange-700 text-lg font-semibold text-white hover:bg-orange-800 px-5 py-1 cursor-pointer ${
              isShipped ? "cursor-not-allowed" : ""
            }`}
          >
            Shipped
          </button>,
        ]}
      >
        {content}
      </Modal>
    </>
  );
};

export default ConfrimOrderModal;
