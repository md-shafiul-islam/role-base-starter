import Link from "next/link";
import React from "react";

const CstQueryActionLinkWrapper = ({
  title,
  pathName,
  query,
  name,
  clazzName = "",
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
        <a title={title ? title : ""}>{props.children}</a>
      </Link>
    </React.Fragment>
  );
};

export default CstQueryActionLinkWrapper;
