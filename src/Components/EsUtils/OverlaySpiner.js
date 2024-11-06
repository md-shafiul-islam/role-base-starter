import React from "react";
import { Modal, Typography } from "antd";
import LoadingSpiner from "./LoadingSpiner";

const OverlaySpiner = ({ status = false, text = "", ...params }) => {
  return (
    <React.Fragment>
      <Modal open={status} footer="" closable={false}>
        <LoadingSpiner />
        <Typography style={{ textAlign: "center" }}>{text} </Typography>
      </Modal>
    </React.Fragment>
  );
};

export default OverlaySpiner;
