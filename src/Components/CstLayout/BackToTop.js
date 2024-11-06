import { BackTop } from "antd";
import React from "react";

const BackToTop = () => {
  const style = {
    height: 35,
    width: 35,
    lineHeight: "40px",
    borderRadius: 4,
    backgroundColor: "#1088e9",
    color: "#fff",
    textAlign: "center",
    fontSize: 14,
  };
  return (
    <div style={{ height: "", padding: 8 }}>
      <BackTop style={{ left: 10 }}>
        <div style={style}>UP</div>
      </BackTop>
    </div>
  );
};

export default BackToTop;
