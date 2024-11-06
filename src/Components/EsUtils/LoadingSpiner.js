import React from "react";
import { Col, Row, Space, Spin } from "antd";

const LoadingSpiner = () => {
  return (
    <Row>
      <Col align="center" span={24}>
        <Space size="middle" align="center" >
          <Spin size="large" />
        </Space>
      </Col>
    </Row>
  );
};

export default LoadingSpiner;
