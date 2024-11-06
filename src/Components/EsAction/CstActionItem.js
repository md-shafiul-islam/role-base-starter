"use client";
import React from "react";

import Link from "next/link";

const CstActionItem = ({
  actionUrl = "",
  isBlank = false,
  children,
  ...props
}) => {
  return (
    <React.Fragment>
      <Link
        href={actionUrl}
        target={isBlank ? "_blank" : ""}
        className="decoration-none"
      >
        {children}
      </Link>
    </React.Fragment>
  );
};

export default CstActionItem;
