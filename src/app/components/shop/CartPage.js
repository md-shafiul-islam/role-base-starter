"use client";

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  getCart,
  getDecrementCartItem,
  getIncrementCartItem,
  thunkRemoveCartItem,
  thunkCartItemChooseToggleAction,
  thunkCartItemsChooseToggleAction,
} from "@/src/redux/reducer/cartReducer";
import { Card, Checkbox, Col, Row } from "antd";
import { isEmptyOrNull } from "../utils/Action/esFunc/gen-es/esCheckFunc";
import CstImagePlane from "./CstImagePlane";
import CstActionLink from "../utils/Action/CstActionLink";
import InfoCard from "./InfoCard";

const CartPage = ({ cart, ...props }) => {
  useEffect(() => {
    if (isEmptyOrNull(cart)) {
      props.getCart();
    } else {
      if (isEmptyOrNull(cart.id)) {
        props.getCart();
      }
    }
  }, []);

  const onIncrement = (item) => {
    const cartItem = Object.assign({}, item);
    cartItem.cart = cart.id;

    props.getIncrementCartItem(cartItem);
  };

  const onDecrement = (item) => {
    const cartItem = Object.assign({}, item);
    cartItem.cart = cart.id;

    props.getDecrementCartItem(cartItem);
  };

  const onRemoveCartItem = (item) => {
    const cartItem = Object.assign({}, item);
    cartItem.cart = cart.id;

    props.thunkRemoveCartItem(cartItem);
  };

  const onToggleAllAction = (e) => {
    props.thunkCartItemsChooseToggleAction({
      id: cart.id,
    });
  };

  const onToggleAction = (item) => {
    props.thunkCartItemChooseToggleAction({
      cartItem: item.target.name,
      id: cart.id,
    });
  };

  return (
    <React.Fragment>
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={24} md={24} lg={16} xl={18}>
          <Card title="Cart " className="min-h-[500px]">
            <Row>
              {/* Start Scroll */}
              <Col span={24} className="overflow-x-auto">
                <div className="sm:w-[500px] xxs:w-[500px] md:w-full w-full">
                  <Row className="mb-3">
                    <Col span={24}>
                      <Card className="px-1 text-center xs:w-[600px] xxs:w-[500px]">
                        <Row>
                          <Col md={5} lg={5} xl={5}>
                            <Row gutter={(16, 16)}>
                              <Col span={6}>
                                <Checkbox
                                  checked={cart?.chooseAll}
                                  onChange={onToggleAllAction}
                                >
                                  All
                                </Checkbox>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                  </Row>

                  <Row gutter={[0, 16]}>
                    {cart &&
                      cart.cartItems &&
                      cart.cartItems.map((item) => {
                        return (
                          <React.Fragment>
                            <Col span={24}>
                              <Card className="cart-item text-center">
                                <Row gutter={[12, 12]}>
                                  <Col
                                    span={4}
                                    className="!flex flex-col justify-center items-start"
                                  >
                                    <div className="font-semibold">
                                      <Checkbox
                                        name={item?.id}
                                        onChange={onToggleAction}
                                        checked={item.choose}
                                      ></Checkbox>
                                    </div>

                                    <div className="w-full">
                                      <CstImagePlane
                                        src={item?.image}
                                        alt={item?.name}
                                        height={350}
                                        width={350}
                                      />
                                    </div>
                                  </Col>

                                  <Col span={14} className="text-left pl-2 ">
                                    <div className="flex flex-row xs:flex-col xxs:flex-col sm:flex-col md:flex-col lg:flex-row gap-1 sm:gap-2 xs:gap-3">
                                      <div className="title w-full font-semibold">
                                        {item.title}
                                      </div>
                                      <div className="w-full text-sm flex flex-row gap-2">
                                        <div>
                                          {item?.color} & {item?.size}
                                        </div>
                                        <div className="text-nowrap">
                                          {item?.discountPrice > 0 ? (
                                            <>
                                              <span className="text-gray-950 font-bold mr-1">
                                                <b> &#2547;</b>
                                                {item?.discountPrice}
                                              </span>

                                              <span>
                                                <sup className="strikediag font-semibold">
                                                  <b> &#2547;</b> {item?.price}
                                                </sup>
                                              </span>
                                            </>
                                          ) : (
                                            <span className="text-gray-950 font-semibold">
                                              <b> &#2547;</b> {item?.price}
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </Col>

                                  <Col span={6}>
                                    <Row gutter={[0, 20]}>
                                      <Col span={6}>
                                        <div className="w-full flex flex-col items-center justify-between font-semibold">
                                          <span
                                            onClick={() => {
                                              if (item.stkQty > item?.qty) {
                                                onIncrement(item);
                                              }
                                            }}
                                            className={` ${
                                              item?.qty >= item.stkQty
                                                ? "text-gray-300 cursor-not-allowed"
                                                : "text-gray-800 cursor-pointer hover:text-gray-950"
                                            } `}
                                          >
                                            <i className="fa-solid fa-angle-up"></i>
                                          </span>
                                          <span>{item?.qty}</span>
                                          <span
                                            onClick={() => {
                                              if (item.qty > 1) {
                                                onDecrement(item);
                                              }
                                            }}
                                            className={`${
                                              item?.qty <= 1
                                                ? "text-gray-300 cursor-not-allowed"
                                                : "text-gray-800 hover:text-gray-950 cursor-pointer"
                                            } `}
                                          >
                                            <i className="fa-solid fa-angle-down"></i>
                                          </span>
                                        </div>
                                      </Col>
                                      <Col span={18}>
                                        <Row>
                                          <Col span={20}>
                                            <div className="w-full pr-1 font-semibold">
                                              {item?.subTotal}
                                              <b> &#2547;</b>
                                            </div>
                                          </Col>
                                          <Col span={4}>
                                            <div
                                              className="w-12 cursor-pointer"
                                              onClick={() => {
                                                onRemoveCartItem(item);
                                              }}
                                            >
                                              <i className="fa-solid fa-trash-can"></i>
                                            </div>
                                          </Col>
                                        </Row>
                                      </Col>
                                    </Row>
                                  </Col>
                                </Row>
                              </Card>
                            </Col>
                          </React.Fragment>
                        );
                      })}
                  </Row>
                </div>
              </Col>
              {/* End Scroll */}
            </Row>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={24} lg={8} xl={6}>
          <Card
            title={<span className="text-2xl font-bold">Order Summery</span>}
            className="text-left "
          >
            <Row gutter={[24, 24]} className="text-3xl font-semibold">
              <Col span={24}>
                <Row>
                  <Col span={14}>Subtotal ({cart?.chooseQty} Items)</Col>
                  <Col span={10} className="text-right">
                    {cart?.chooseAmount}
                    <b> &#2547;</b>
                  </Col>
                </Row>
              </Col>
              <Col span={24}>
                <Row>
                  <Col span={14}>Shipping Fee</Col>
                  <Col span={10} className="text-right">
                    {cart?.chooseTotalAmount > 0 ? 120 : 0}
                    <b> &#2547;</b>
                  </Col>
                </Row>
              </Col>
              <Col span={24}>
                <Row>
                  <Col span={14} className="font-bold">
                    <h2 className="text-xl">Total</h2>{" "}
                  </Col>
                  <Col span={10} className="text-right">
                    <h2 className="text-xl ">
                      {cart?.chooseAmount > 0 ? cart?.chooseAmount + 120 : 0}
                      <b> &#2547;</b>
                    </h2>
                  </Col>
                </Row>
              </Col>
              <Col span={24}>
                <Row>
                  <Col span={24}>
                    <CstActionLink
                      className="bg-orange-700 hover:bg-orange-800 transition-all duration-75 text-white font-bold hover:text-white uppercase w-full flex justify-center items-center px-4 py-2 box-border"
                      name={`Proceed to checkout (${
                        !isEmptyOrNull(cart?.chooseQty) ? cart?.chooseQty : 0
                      })`}
                      pathName="/checkout"
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>

          <InfoCard />
        </Col>
      </Row>
    </React.Fragment>
  );
};

CartPage.propTypes = {
  getCart: PropTypes.func.isRequired,
  getDecrementCartItem: PropTypes.func.isRequired,
  getIncrementCartItem: PropTypes.func.isRequired,
  thunkRemoveCartItem: PropTypes.func.isRequired,
  thunkCartItemChooseToggleAction: PropTypes.func.isRequired,
  thunkCartItemsChooseToggleAction: PropTypes.func.isRequired,
  cart: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart,
  };
};

const mapDispatchToProps = {
  getCart,
  getDecrementCartItem,
  getIncrementCartItem,
  thunkRemoveCartItem,
  thunkCartItemChooseToggleAction,
  thunkCartItemsChooseToggleAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
