import React from "react";

const IconShortText = ({ icon = {}, text = "", ...props }) => {
  return (
    <div {...props}>
      {icon} &nbsp; {text}
    </div>
  );
};

export default IconShortText;
