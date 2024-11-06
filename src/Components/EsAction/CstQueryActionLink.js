import Link from "next/link";
import React from "react";

const CstQueryActionLink = ({
  title,
  pathName,
  query,
  name,
  lIcon = null,
  rIcon = null,
  clazzName = "",
  ancClassName="",
  ...props
}) => {
  return (
    <React.Fragment>
      <Link
        href={{
          pathname: pathName,
          query,
        }}
        {...props}
      >
        <a title={title ? title : ""} className={ancClassName}>
          <span className={clazzName}>
            {lIcon} {name} {rIcon}
          </span>
        </a>
      </Link>
    </React.Fragment>
  );
};

export default CstQueryActionLink;
