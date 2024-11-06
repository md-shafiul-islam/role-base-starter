import React from "react";
import { Card, Col, Row } from "antd";

import StakeholderTypeTable from "@/src/Components/StakeholderType/StakeholderTypeTable";

const stakeholderTypePageIndex = (props) => {
  return (
    <React.Fragment>
      <Row>
        <Col span={24}>
          <Card title="All Stakeholder Type">
            <Row>
              <Col span={24}>
                <StakeholderTypeTable />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default stakeholderTypePageIndex;
