import React from "react";
import { Col, Row } from "antd";
import StakeholderDetailsCard from "@/src/Components/Stakeholder/StakeholderDetailsCard";

const stakeholderPageIndex = ({ params, searchParams, ...props }) => {
  return (
    <React.Fragment>
      <Row>
        <Col span={24}>
          <StakeholderDetailsCard id={params.id} />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default stakeholderPageIndex;
