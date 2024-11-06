import Link from "next/link";
import React from "react";

const CstButtonActionLink = ({
  type,
  title,
  to,
  name,
  icon,
  clazzName = "ant-btn ant-btn-default",
}) => {
  let btnBg = "";
  if (type === "success") {
    btnBg = "btn-success";
  } else if (type === "info") {
    btnBg = "btn-info";
  } else if (type === "warning") {
    btnBg = "btn-warning";
  } else if (type === "error") {
    btnBg = "btn-error";
  } else if (type === "cst") {
    btnBg = "btn-cst";
  }

  return (
    <React.Fragment>
      <Link
        href={to}
        className={`${clazzName} ${btnBg}`}
        title={title ? title : ""}
      >
        <span>{icon}</span>
        <span>{name}</span>
      </Link>
    </React.Fragment>
  );
};

export default CstButtonActionLink;
