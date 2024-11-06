import React from "react";

const ProductPropertyItem = ({ title, description }) => {
  return (
    <div className="grid grid-cols-6 ">
      <div className="">{title}</div>
      <div className="col-span-5">{description}</div>
    </div>
  );
};

export default ProductPropertyItem;
