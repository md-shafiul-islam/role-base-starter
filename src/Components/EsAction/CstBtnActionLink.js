import Link from "next/link";

import React from "react";

const CstBtnActionLink = ({
  title,
  pathUrl,
  name,
  icon,
  type = "",
  clazzName = "",
  wrapperClass = "",
  ...props
}) => {
  const getStyle = (type) => {
    if (type === "success") {
      return { background: `#52c41a`, color: `#FFF` };
    } else if (type === "error") {
      return { background: `#a8071a`, color: `#FFF` };
    } else {
      return { background: `#131921`, color: `#FFF` };
    }
  };
  return (
    <React.Fragment>
      <div className={wrapperClass}>
        <Link
          href={pathUrl}
          title={title ? title : ""}
          {...props}
        >
          <span
            className={clazzName}
            style={getStyle(type)}
          >
            {name} {icon}
          </span>
        </Link>
      </div>
    </React.Fragment>
  );
};

export default CstBtnActionLink;
