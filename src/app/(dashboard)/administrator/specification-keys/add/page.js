import React from "react";
import { Col, Row } from "antd";
import SpcKeyAddForm from "@/src/Components/SpcKeys/SpcKeyAddForm";

const categoryPageIndex = ({ params, searchParams, ...props }) => {
  return (
    <React.Fragment>
      <Row>
        <Col span={24}>
          <SpcKeyAddForm />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default categoryPageIndex;
