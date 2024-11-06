import React from "react";
import { Col, Row } from "antd";
import { Content } from "antd/lib/layout/layout";
import Product from "./Product";

const Products = ({products, ...params}) => {

  return (
    <React.Fragment>
      <Content className="product-container" >
        <Row>
          {products &&
            products.map((product, idx) => {
              return (
                <React.Fragment key={`product-${idx}`}>
                  <Col xs={{span:24}} sm={{span:24}} md={{span:12}} lg={{span:8}} xl={{span:6}}  className="product">
                    <Product product={product} />
                  </Col>
                </React.Fragment>
              );
            })}
        </Row>
      </Content>
    </React.Fragment>
  );
};

export default Products;
