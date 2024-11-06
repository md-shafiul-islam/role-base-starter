import { Card, Col, Row, Table } from "antd";
import React from "react";
import OrderTableCard from "@/src/Components/Order/OrderTableCard";

const orderPandingIndexPage = () => {
  return (
    <React.Fragment>
      <Row>
        <Col span={24}>
          <OrderTableCard title={"Pending order"} status="pending" />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default orderPandingIndexPage;
