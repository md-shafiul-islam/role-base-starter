import Link from "next/link";
import React from "react";

const CstActionLink = ({
  title,
  to,
  name,
  icon,
  clazzName = "",
  lIcon,
  ...props
}) => {
  return (
    <React.Fragment>
      <Link href={to} title={title} {...props}>
        <span className={clazzName}>
          {lIcon}
          {name}
          {icon}
        </span>
      </Link>
    </React.Fragment>
  );
};

export default CstActionLink;
