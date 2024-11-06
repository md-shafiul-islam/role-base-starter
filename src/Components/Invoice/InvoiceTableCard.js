"use client";
import { thunkAllInvoiceByStatus } from "@/src/redux/reducer/invoiceReducer";
import { Card, Col, Row, Table } from "antd";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { getInvoiceCols } from "@/src/utils/ui/cols/invoice-cols";

export const InvoiceTableCard = ({
  invoicesResp,
  title = "All Invoice",
  ...props
}) => {
  return (
    <React.Fragment>
      <Row>
        <Col span={24}>
          <Card title={title}>
            <Table
              bordered
              dataSource={invoicesResp}
              columns={getInvoiceCols()}
            />
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

InvoiceTableCard.propTypes = {
  thunkAllInvoiceByStatus: PropTypes.func.isRequired,
  invoicesResp: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return {
    invoicesResp: state.invoice.invoices,
  };
};

const mapDispatchToProps = {
  thunkAllInvoiceByStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceTableCard);
