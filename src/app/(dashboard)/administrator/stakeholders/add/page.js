import React from "react";
import { Col, Row } from "antd";
import BrandAddForm from "@/src/Components/Brands/BrandAddForm";
import StakeholderAddForm from "@/src/Components/Stakeholder/StakeholderAddForm";

const categoryPageIndex = ({ params, searchParams, ...props }) => {
  return (
    <React.Fragment>
      <Row>
        <Col span={24}>
          <StakeholderAddForm />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default categoryPageIndex;
