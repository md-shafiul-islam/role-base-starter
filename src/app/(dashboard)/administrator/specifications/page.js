import React from "react";
import PropTypes from "prop-types";
import { Card, Col, Row, Table } from "antd";
import BrandTable from "@/src/Components/Brands/BrandTable";

const unitsPageIndex = (props) => {
  return (
    <React.Fragment>
      <Row>
        <Col span={24}>
          <Card title="All Brands">
            <Row>
              <Col span={24}>
                <BrandTable />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default unitsPageIndex;
