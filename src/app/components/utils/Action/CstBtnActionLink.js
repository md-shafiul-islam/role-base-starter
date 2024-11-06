import Link from "next/link";

import React from "react";

import { AlignLeftOutlined } from "@ant-design/icons";

const CstBtnActionLink = ({
  title = "",
  pathName = "",
  query = null,
  name = "",
  icon = null,
  type = "",
  clazzName = "",
  acClazzName = "",
  isBlock = false,
  isBlank = false,
  ...props
}) => {
  let btnStyle = {};
  if (type === "success") {
    btnStyle = { background: "#52c41a", color: "#FFF" };
  } else if (type === "info") {
    btnStyle = { background: "#1890ff", color: "#FFF" };
  } else if (type === "warning") {
    btnStyle = { background: "#fa8c16", color: "#FFF" };
  } else if (type === "error") {
    btnStyle = { background: "#ff4d4f", color: "#FFF" };
  } else if (type === "cool") {
    btnStyle = { background: "#006d75", color: "#FFF" };
  }

  return (
    <React.Fragment>
      <Link
        href={{
          pathname: pathName,
          query,
        }}
        target={isBlank ? "_blank" : ""}
        title={title ? title : ""}
        className={`${acClazzName}`}
        {...props}
      >
        <span
          className={`ant-btn ant-btn-default ${clazzName} ${
            isBlock ? "ant-btn-block" : ""
          }`}
          style={btnStyle}
        >
          {name} {icon}
        </span>
      </Link>
    </React.Fragment>
  );
};

export default CstBtnActionLink;
