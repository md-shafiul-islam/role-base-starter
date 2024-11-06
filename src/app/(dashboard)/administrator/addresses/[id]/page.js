import React from "react";
import { Col, Row } from "antd";
import BrandDetailsCard from "@/src/Components/Brands/BrandDetailsCard";

const categoryPageIndex = ({ params, searchParams, ...props }) => {
  return (
    <React.Fragment>
      <Row>
        <Col span={24}>
          <BrandDetailsCard id={params.id} />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default categoryPageIndex;
