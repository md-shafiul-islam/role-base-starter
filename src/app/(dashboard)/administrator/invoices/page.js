import { Card, Col, Row, Table } from "antd";
import React from "react";
import InvoiceTableCard from "@/src/Components/Invoice/InvoiceTableCard";

const invoiceIndexPage = () => {
  return (
    <React.Fragment>
      <Row className="bg-slate-400">
        <Col span={24}>
          <InvoiceTableCard title={"Invoice"}  />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default invoiceIndexPage;
