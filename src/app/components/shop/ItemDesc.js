import { Rate } from "antd";
import React from "react";

const ItemDesc = ({ regularPrice, rating, discountPrice, ...props }) => {
  return (
    <React.Fragment>
      <div className="flex flex-col">
        <div className="flex flex-col">
          <span className="text-sm">{regularPrice}</span>
          <span className="text-base">{discountPrice}</span>
        </div>
        <div>
          <Rate allowHalf defaultValue={rating} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default ItemDesc;
