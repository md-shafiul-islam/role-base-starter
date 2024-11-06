import React from "react";
import PropTypes from "prop-types";
import { Card, Col, Row } from "antd";

const newPageIndex = (props) => {
  return (
    <React.Fragment>
      <Row>
        <Col span={24}>
          <Card title="news"></Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

newPageIndex.propTypes = {};

export default newPageIndex;
