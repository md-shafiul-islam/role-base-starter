"use client";
import React from "react";

import { Badge } from "antd";

const TopCart = ({ text = "", itemCount, onCartClick, ...porps }) => {
  return (
    <React.Fragment>
      <Badge
        count={itemCount}
        className="text-white cursor-pointer"
        color="orange"
        offset={[10, 0]}
      >
        <i className="fa-solid fa-cart-shopping text-lg text-white"></i>
      </Badge>
    </React.Fragment>
  );
};

export default TopCart;
