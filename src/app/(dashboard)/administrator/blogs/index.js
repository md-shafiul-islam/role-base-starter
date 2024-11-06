import React from "react";
import PropTypes from "prop-types";
import { Card, Col, Row } from "antd";

const blogPageIndex = (props) => {
  return (
    <React.Fragment>
      <Row>
        <Col span={24}>
          <Card title="Blog"></Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

blogPageIndex.propTypes = {};

export default blogPageIndex;
