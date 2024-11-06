import React from "react";
import { Card, Col, Row, Table } from "antd";
import UnitDetailsCard from "@/src/Components/Unit/UnitDetailsCard";

const categoryPageIndex = ({ params, searchParams, ...props }) => {
  return (
    <React.Fragment>
      <Row>
        <Col span={24}>
          <UnitDetailsCard id={params.id} />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default categoryPageIndex;
