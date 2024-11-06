import React from "react";
import { Card, Col, Row, Table } from "antd";
import UnitAddForm from "@/src/Components/Unit/UnitAddForm";

const categoryPageIndex = ({ params, searchParams, ...props }) => {
  return (
    <React.Fragment>
      <Row>
        <Col span={24}>
          <UnitAddForm />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default categoryPageIndex;
