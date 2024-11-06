"use client";
import React, { useEffect, useState } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Card, Col, Row, Table } from "antd";
import { thunkAllProduct } from "@/src/redux/reducer/productReducer";
import { getProductAdminCols } from "@/src/utils/ui/cols/products-cols";
export const AdminProductTable = ({ products, ...props }) => {
  useEffect(() => {
    props.thunkAllProduct();
  }, []);

  return (
    <Row>
      <Col span={24}>
        <Card title="Product">
          <Table dataSource={products} columns={getProductAdminCols()} />
        </Card>
      </Col>
    </Row>
  );
};

AdminProductTable.propTypes = {
  products: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return {
    products: state.product.products,
  };
};

const mapDispatchToProps = {
  thunkAllProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminProductTable);
