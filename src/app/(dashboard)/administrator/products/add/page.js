import React from "react";
import { Card, Col, Row } from "antd";
import ProductAddForm from "../../../../../Components/Product/ProductAddForm";

const productAddPage = () => {
  return (
    <React.Fragment>
      <Row>
        <Col span={24}>
          <Card title="Add Product Or Services">
            <ProductAddForm />
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default productAddPage;
