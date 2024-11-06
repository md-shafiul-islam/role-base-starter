import React from "react";
import { Card, Col, Row } from "antd";

import StakeholderTable from "@/src/Components/Stakeholder/StakeholderTable";

const unitsPageIndex = (props) => {
  return (
    <React.Fragment>
      <Row>
        <Col span={24}>
          <Card title="All Stakholder">
            <Row>
              <Col span={24}>
                <StakeholderTable />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default unitsPageIndex;
