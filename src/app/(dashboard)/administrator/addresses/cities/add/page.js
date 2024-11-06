import React from "react";
import { Col, Row } from "antd";
import BrandAddForm from "@/src/Components/Brands/BrandAddForm";

const categoryPageIndex = ({ params, searchParams, ...props }) => {
  return (
    <React.Fragment>
      <Row>
        <Col span={24}>
          <BrandAddForm />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default categoryPageIndex;
