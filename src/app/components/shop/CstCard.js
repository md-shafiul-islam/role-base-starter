import React from "react";

const CstCard = ({
  title,
  description,
  cover,
  direction = "col",
  extra = "",
  children,
  footer,
  ...params
}) => {
  return (
    <div className={`w-full h-full flex flex-${direction}`}>
      <div className="flex flex-row justify-between items-center">
        <div>
          <h2 className="text-lg">{title ? title : ""}</h2>
        </div>
        <div className="">{extra}</div>
      </div>
      <div className="cst-body p-2">{children}</div>
      <div className="">{description && description}</div>
      {footer ? <div className="p-2">{footer}</div> : ""}
    </div>
  );
};

export default CstCard;
