import React from "react";
import StandardForm from "../../../../../Components/StandardForm";
import { Col, Row } from "antd";

const standardAddPage = (props) => {
  return (
    <>
      <Row justify="center" align="middle">
        <Col span={6} align="center">
          <StandardForm />
        </Col>
      </Row>
    </>
  );
};
export default standardAddPage;
