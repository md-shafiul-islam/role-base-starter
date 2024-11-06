import React from "react";
import PropTypes from "prop-types";
import { Card, Col, Row, Table } from "antd";
import SpcKeyTable from "@/src/Components/SpcKeys/SpcKeyTable";

const unitsPageIndex = (props) => {
  return (
    <React.Fragment>
      <Row>
        <Col span={24}>
          <Card title="All Specification Key">
            <Row>
              <Col span={24}>
                <SpcKeyTable />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default unitsPageIndex;
