"use client";

import { Card, Rate } from "antd";
import Meta from "antd/es/card/Meta";
import React from "react";
import CstImage from "./CstImage";

import ItemDesc from "./ItemDesc";
import CstActionItem from "../../../Components/EsAction/CstActionItem";

const ProductItem = ({ item, cardClass, ...props }) => {
  return (
    <React.Fragment>
      <CstActionItem actionUrl={`/products/${item?.id}`}>
        <Card className={`xxs:text-xs xs:text-xs ${cardClass}`}>
          <div className="flex flex-col gap-5">
            <div>
              <CstImage
                src={item?.image?.location}
                alt={item?.title}
                height={500}
                width={500}
              />
            </div>
            <div className="h-12 text-sm md:text-lg font-semibold xs:font-medium xxs:font-medium xs:text-xs xxs:text-xs">
              <h1 className="w-full text-wrap overflow-hidden text-ellipsis line-clamp-2">
                {item?.title}
              </h1>
            </div>
            <h4 className="text-xl md:text-xl font-semibold xs:font-medium xxs:font-medium xs:text-sm xxs:text-sm">
              {item?.variant?.dicountPrice > 0 ? (
                <b> &#2547; {item?.variant?.dicountPrice}</b>
              ) : (
                ""
              )}

              {item?.variant?.dicountPrice > 0 ? (
                <sup className="strikediag  text-gray-500 p-1 sm:p-0 xs:p-0 xxs:p-0 ml-3 ">
                  <b>&#2547;</b> {item?.variant?.price}{" "}
                </sup>
              ) : (
                item?.variant?.price
              )}
            </h4>
            <div>
              {/* <Rate
                className="text-gray-600"
                allowHalf
                defaultValue={4.7}
                disabled
              /> */}
            </div>
          </div>
        </Card>
      </CstActionItem>
    </React.Fragment>
  );
};

export default ProductItem;
