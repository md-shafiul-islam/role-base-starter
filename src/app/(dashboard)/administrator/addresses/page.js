import React from "react";
import { Card, Col, Row, Table } from "antd";
import AddressTabs from "@/src/Components/Address/AddressTabs";

const addressPageIndex = (props) => {
  return (
    <React.Fragment>
      <Row>
        <Col span={24}>
          <Card title="All Address">
            <Row>
              <Col span={24}>
                <AddressTabs />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default addressPageIndex;
