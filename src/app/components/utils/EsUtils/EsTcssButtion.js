import React from "react";

const EsTcssButtion = ({
  name = "",
  leftIcone = "",
  rIcone = "",
  ...props
}) => {
  return (
    <div className="w-full ">
      <button
        className="w-full px-4 py-1 flex flex-row justify-center items-center gap-4 "
        {...props}
      >
        <span>{leftIcone}</span>
        <span>{name}</span>
        <span>{rIcone}</span>
      </button>
    </div>
  );
};

export default EsTcssButtion;
