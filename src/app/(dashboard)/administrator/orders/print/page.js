import { Card, Col, Row, Table } from "antd";
import React from "react";
import OrderSppingPrintPage from "@/src/Components/Order/OrderSppingPrintPage";

const orderPrintPage = ({ params, searchParams }) => {
  esBackLogger.info("Pring Page ", params);
  return (
    <React.Fragment>
      <Row>
        <Col span={24}>
          <OrderSppingPrintPage status={searchParams.status} />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default orderPrintPage;
