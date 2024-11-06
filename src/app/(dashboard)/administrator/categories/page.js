import React from "react";
import PropTypes from "prop-types";
import { Card, Col, Row, Table } from "antd";
import CategoryTable from "@/src/Components/Category/CategoryTable";

const categoriesPageIndex = (props) => {
  return (
    <React.Fragment>
      <Row>
        <Col span={24}>
          <Card title="Categories">
            <Row>
              <Col span={24}>
                <CategoryTable />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default categoriesPageIndex;
