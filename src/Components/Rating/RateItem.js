import { Card, Col, Progress } from "antd";
import React from "react";

const RateItem = ({ item, ...params }) => {
  return (
    <React.Fragment>
      <Col
        xs={{ span: 24 }}
        sm={{ span: 24 }}
        md={{ span: 12 }}
        lg={{ span: 8 }}
        xl={{ span: 8 }}
        xxl={{ span: 8 }}
      >
        <Card className="ratings-card">
          <h4>{item?.rateKey?.name}</h4>
          <Progress
            strokeColor={{ from: "#108ee9", to: "#87d068" }}
            percent={item?.inValue * 10}
            format={(per) => {
              return `${per / 10}/10`;
            }}
            size="small"
          />
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default RateItem;
