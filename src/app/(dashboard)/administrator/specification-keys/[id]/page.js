import React from "react";
import { Col, Row } from "antd";
import SpcKeyDetailsCard from "@/src/Components/SpcKeys/SpcKeyDetailsCard";

const categoryPageIndex = ({ params, searchParams, ...props }) => {
  return (
    <React.Fragment>
      <Row>
        <Col span={24}>
          <SpcKeyDetailsCard id={params.id} />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default categoryPageIndex;
