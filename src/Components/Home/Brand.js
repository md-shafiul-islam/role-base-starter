import { Card, Image } from "antd";
import Text from "antd/lib/typography/Text";
import React from "react";
const Brand = ({brand:{ title, src, image}, ...params}) => {
  return (
    <React.Fragment>
      <Card>
        <div className="below-main-cat-card">
          <Image width={80} src={src} alt="not available" />
          <Text>
            <h3 className="below-main-cat-card-h1"> {title} </h3>
          </Text>
        </div>
      </Card>
    </React.Fragment>
  );
};

export default Brand;
