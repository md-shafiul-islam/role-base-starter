import React from "react";
import { Col, Row } from "antd";
import StakeholderTypeAddForm from "@/src/Components/StakeholderType/StakeholderTypeAddForm";

const categoryPageIndex = ({ params, searchParams, ...props }) => {
  return (
    <React.Fragment>
      <Row>
        <Col span={24}>
          <StakeholderTypeAddForm />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default categoryPageIndex;
