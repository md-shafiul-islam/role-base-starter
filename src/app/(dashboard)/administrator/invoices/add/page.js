import { Card, Col, Row, Table } from "antd";
import React from "react";
import InvoiceAddForm from "@/src/Components/Invoice/InvoiceAddForm";

const invoiceIndexPage = () => {
  return (
    <React.Fragment>
      <Row>
        <Col span={24}>
          <InvoiceAddForm />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default invoiceIndexPage;
