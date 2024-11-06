import React from "react";
import { Card, Col, Row, Table } from "antd";
import CategoryDetailsCard from "@/src/Components/Category/CategoryDetailsCard";

const categoryPageIndex = ({ params, searchParams, ...props }) => {
  return (
    <React.Fragment>
      <Row>
        <Col span={24}>
          <CategoryDetailsCard id={params.id} />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default categoryPageIndex;
