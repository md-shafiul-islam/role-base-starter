"use client";

import { Card, Col, Row } from "antd";
import PropTypes from "prop-types";

import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import CstImage from "../CstImage";
import { thunkProductsExceptCategory } from "@/src/redux/reducer/productReducer";
import { isEmptyOrNull } from "../../utils/Action/esFunc/gen-es/esCheckFunc";
import CstActionItem from "../../utils/Action/CstActionItem";

export const ProductsSuggestion = ({
  category,
  size = 6,
  productsResp,
  ...props
}) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    //esBackLogger.info("Product Category " + category);
    props.thunkProductsExceptCategory({ id: category, size });
  }, []);

  useEffect(() => {
    if (!isEmptyOrNull(productsResp)) {
      if (productsResp.status) {
        setProducts(productsResp.response);
      }
    }
  }, [productsResp]);

  return (
    <React.Fragment>
      <Row gutter={[16, 16]}>
        {products &&
          products.map((product) => {
            return (
              <Col xs={24} sm={24} md={12} lg={6} xl={4}>
                <CstActionItem actionUrl={`/products/${product?.id}`}>
                  <Card>
                    <CstImage
                      width={200}
                      height={200}
                      src={product?.image?.location}
                      alt={product?.image?.altTag}
                      title={product?.image?.title}
                    />
                    <div className="w-full items-start justify-center flex flex-col gap-5">
                      <div className="py-3 text-lg font-medium">
                        {" "}
                        {product?.title}
                      </div>
                      <div className="text-lg text-gray-500">
                        {product?.variant?.dicountPrice > 0 ? (
                          <span className="text-gray-800">
                            <b> &#2547; {product?.variant?.dicountPrice}</b>
                          </span>
                        ) : (
                          ""
                        )}

                        {product?.variant?.dicountPrice > 0 ? (
                          <sup className="strikediag p-1 ml-3">
                            &#2547; {product?.variant?.price}{" "}
                          </sup>
                        ) : (
                          product?.variant?.price
                        )}
                      </div>
                    </div>
                  </Card>
                </CstActionItem>
              </Col>
            );
          })}
      </Row>
    </React.Fragment>
  );
};

ProductsSuggestion.propTypes = {
  thunkProductsExceptCategory: PropTypes.func.isRequired,
  productsResp: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    productsResp: state.product.catExcProducts,
  };
};

const mapDispatchToProps = { thunkProductsExceptCategory };

export default connect(mapStateToProps, mapDispatchToProps)(ProductsSuggestion);
