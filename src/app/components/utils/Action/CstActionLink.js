import Link from "next/link";
import React from "react";

const CstActionLink = ({
  title = "",
  isBlank = false,
  name = "",
  icon = null,
  rIcon = null,
  to = "",
  spClass = "",
  ...props
}) => {
  return (
    <React.Fragment>
      <Link
        href={to}
        target={isBlank ? "_blank" : ""}
        title={title ? title : ""}
        {...props}
      >
        <span className={spClass}>
          {icon !== null ? <>{icon}&nbsp; </> : ""}
          {name}
          {rIcon !== null ? <>&nbsp; {rIcon}</> : ""}
        </span>
      </Link>
    </React.Fragment>
  );
};

export default CstActionLink;
