import React from "react";
import { Col, Row } from "antd";
import StakeholderTypeDetailsCard from "@/src/Components/StakeholderType/StakeholderTypeDetailsCard";

const categoryPageIndex = ({ params, searchParams, ...props }) => {
  return (
    <React.Fragment>
      <Row>
        <Col span={24}>
          <StakeholderTypeDetailsCard id={params?.id} />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default categoryPageIndex;
