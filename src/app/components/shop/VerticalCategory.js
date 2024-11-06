"use client";
import React, { useEffect, useState } from "react";

import { Menu } from "antd";

import { isEmptyOrNull } from "../utils/Action/esFunc/gen-es/esCheckFunc";

export const VerticalCategory = ({ categories, ...props }) => {
  const [isSmallScren, setIsSmallScren] = useState([]);

  useEffect(() => {
    //esBackLogger.info("Categories ", categories);
  }, [categories]);
  useEffect(() => {
    let innWidth = window.innerWidth;

    if (!isEmptyOrNull(window)) {
      window.onresize = (e) => {
        innWidth = window.innerWidth;
        if (760 >= innWidth) {
          setIsSmallScren(true);
        } else {
          setIsSmallScren(false);
        }
      };

      if (760 >= innWidth) {
        setIsSmallScren(true);
      } else {
        setIsSmallScren(false);
      }
    }
  }, []);

  return (
    <React.Fragment>
      <div className={`sm:w-full w-full ${isSmallScren ? "py-1" : ""}`}>
        <Menu
          mode={isSmallScren ? "horizontal" : "vertical"}
          items={categories}
        />
      </div>
    </React.Fragment>
  );
};

export default VerticalCategory;
