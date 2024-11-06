import { Card, Col, Row, Table } from "antd";
import React from "react";
import OrderTableCard from "@/src/Components/Order/OrderTableCard";

const orderIndexPage = () => {
  return (
    <React.Fragment>
      <Row>
        <Col span={24}>
          <OrderTableCard title={"Delivery order"} status="delivered" />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default orderIndexPage;
