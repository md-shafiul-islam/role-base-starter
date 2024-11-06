import React from "react";
import { Card, Col, Row, Table } from "antd";
import CategoryAddForm from "@/src/Components/Category/CategoryAddForm";

const categoryPageIndex = ({ params, searchParams, ...props }) => {
  return (
    <React.Fragment>
      <Row>
        <Col span={24}>
          <CategoryAddForm />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default categoryPageIndex;
