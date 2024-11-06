import { Card, Image } from "antd";
import Text from "antd/lib/typography/Text";

import React from "react";
import Brand from "./Brand";

const Brands = ({ brandItems = [], ...params }) => {
  return (
    <React.Fragment>
      {brandItems &&
        brandItems.map((brand, idx) => {
          return <Brand key={`brand-${idx}`} brand={brand} />;
        })}
    </React.Fragment>
  );
};

export default Brands;
