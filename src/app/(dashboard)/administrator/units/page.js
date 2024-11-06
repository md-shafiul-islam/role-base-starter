import React from "react";
import PropTypes from "prop-types";
import { Card, Col, Row, Table } from "antd";
import UnitTable from "@/src/Components/Unit/UnitTable";

const unitsPageIndex = (props) => {
  return (
    <React.Fragment>
      <Row>
        <Col span={24}>
          <Card title="Units">
            <Row>
              <Col span={24}>
                <UnitTable />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default unitsPageIndex;
