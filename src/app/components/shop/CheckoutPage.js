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
  thunkApplyCouponCartAction,
} from "@/src/redux/reducer/cartReducer";

import { thunkGetAllStakholderAddress } from "@/src/redux/reducer/addressReducer";
import {
  Button,
  Card,
  Checkbox,
  Col,
  Input,
  Row,
  Space,
  Spin,
  notification,
} from "antd";

import {
  UserOutlined,
  CheckCircleOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

import { isEmptyOrNull } from "../utils/Action/esFunc/gen-es/esCheckFunc";
import CstImagePlane from "./CstImagePlane";
import CstActionLink from "../utils/Action/CstActionLink";
import EsButton from "../utils/EsUtils/EsButton";

import AddNewAddForm from "../utils/EsUtils/AddNewAddForm";

import AddressList from "./AddressList";
import { getParcelPrice } from "../../../redux/reducer/parcelReducer";
import { restOrder, thunkPlaceOrder } from "@/src/redux/reducer/orderReducer";
import CouponInput from "./CouponInput";
import TextArea from "antd/es/input/TextArea";
import { useRouter } from "next/navigation";
import InfoCard from "./InfoCard";

const CheckoutPage = ({
  cart,
  addresses = [],
  checkoutAddress,
  parcelPrice,
  added,
  ...props
}) => {
  const [isAddressOpen, setIsAddressOpen] = useState(false);

  const [totalChooseWeight, setTotalChooseWeight] = useState(0);
  const [address, setAddress] = useState(null);
  const [checkOutAmount, setCheckOutAmount] = useState(0);

  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const [isOrderPlace, setIsOrderPlace] = useState(false);
  const [specialNote, setSpecialNote] = useState("");
  const [noteCost, setNoteCost] = useState(0);

  const [placeOrderKey, setPlaceOrderKey] = useState(
    `trashgasd-ordar-${Math.random() * 972987489419}`
  );

  const [api, contextHolder] = notification.useNotification();

  const router = useRouter();

  const openNotificationWithIcon = (key, title, description) => {
    api.open({
      key,
      message: title,
      description: description,
    });
  };

  useEffect(() => {
    if (!isEmptyOrNull(added)) {
      if (added.status) {
        api.open({
          key: placeOrderKey,
          message: "Sending",
          description: (
            <div className="flex flex-row items-center gap-1">
              <p>
                <span>
                  <InfoCircleOutlined />
                </span>
                <span> Ordar Palaced</span>
                <span>
                  {" "}
                  <Spin size="small" />
                </span>
              </p>
            </div>
          ),
        });

        props.getCart();
        props.restOrder();
        router.push(`/thank-you?order=${added?.response}`);
      } else {
        //esBackLogger.info("Order Plase Resp ", added);
      }
    }
  }, [added]);

  useEffect(() => {
    if (specialNote.length > 0) {
      setNoteCost(10);
    } else {
      setNoteCost(0);
    }
  }, [specialNote]);

  useEffect(() => {
    if (isEmptyOrNull(cart)) {
      props.getCart();
    } else {
      if (isEmptyOrNull(cart.id)) {
        props.getCart();
      }
    }
  }, []);

  useEffect(() => {
    if (!isEmptyOrNull(parcelPrice)) {
      //esBackLogger.info("Order Plase parcelPrice ", parcelPrice);
      if (parcelPrice.finalPrice > 0) {
        let amount = cart?.grandTotal + parcelPrice.finalPrice;
        if (!isNaN(amount)) {
          setCheckOutAmount(amount + noteCost);
        }
      } else {
        if (isNaN(cart?.grandTotal)) {
          setCheckOutAmount(cart?.grandTotal + 120 + noteCost);
        }
      }
    }
  }, [parcelPrice]);

  useEffect(() => {
    if (!isEmptyOrNull(cart)) {
      if (cart.chooseAll) {
        setTotalChooseWeight(cart.totalWeight);
      } else {
        let totalWeight = 0;
        cart &&
          cart.cartItems &&
          cart.cartItems.forEach((item) => {
            if (item.choose) {
              totalWeight = totalWeight + item.weight;
            }
          });

        setTotalChooseWeight(totalWeight);
      }
      setCheckOutAmount(cart?.grandTotal + 120 + noteCost);

      if (isEmptyOrNull(addresses)) {
        props.thunkGetAllStakholderAddress(cart?.stakeholder);
      }
    }
  }, [cart]);

  useEffect(() => {
    if (!isEmptyOrNull(addresses)) {
      let address = null;
      addresses.forEach((item) => {
        if (item.id === checkoutAddress) {
          address = item;
          setAddress(address);
        }
      });

      props.getParcelPrice({
        zone: address?.zone?.code,
        city: address?.city?.code,
        weight: totalChooseWeight,
      });
    }
  }, [checkoutAddress]);

  const onToggleAddAddress = () => {
    setIsAddressOpen(!isAddressOpen);
  };

  const getPercentage = (disconnectAmount, totalAmount) => {
    let discount = totalAmount - disconnectAmount;
    let par = (discount / totalAmount) * 100;
    return Math.round(par);
  };

  const onRemoveCartItem = (item) => {
    const cartItem = Object.assign({}, item);
    cartItem.cart = cart.id;

    props.thunkRemoveCartItem(cartItem);
  };

  const onApplyCoupon = (coupon) => {
    props.thunkApplyCouponCartAction({ id: cart?.id, code: coupon });
  };

  const onChangeSpacialNote = (note) => {
    setSpecialNote(note?.target?.value);
  };

  const onPlaceOrderAction = (e) => {
    if (!isEmptyOrNull(checkoutAddress)) {
      setIsOrderPlace(true);
      props.thunkPlaceOrder({
        note: specialNote,
        address: address.id,
        shipping: parcelPrice.finalPrice,
        cart: cart.id,
      });
      api.open({
        key: placeOrderKey,
        message: "Sending",
        description: (
          <div className="flex flex-row items-center gap-1">
            <p>
              <span>
                <InfoCircleOutlined />
              </span>
              <span> Ordar Palacing</span>
              <span>
                {" "}
                <Spin size="small" />
              </span>
            </p>
          </div>
        ),
      });
    } else {
      if (!isEmptyOrNull(addresses)) {
        openNotificationWithIcon(
          "error",
          "Address not selected",
          "Please, Select address"
        );
      } else {
        setIsAddressOpen(true);
      }
    }
  };

  return (
    <React.Fragment>
      {contextHolder}
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={24} md={24} lg={16} xl={18}>
          <Row gutter={[24, 24]}>
            <Col span={24}>
              <Card
                title={<span>Shipping Address</span>}
                extra={
                  <>
                    <EsButton
                      className="bg-gray-800"
                      type="success"
                      text="Add Address"
                      onClick={onToggleAddAddress}
                    />
                  </>
                }
              >
                <div className="flex flex-col">
                  <div className="w-full">
                    <AddressList addresses={addresses} />
                  </div>
                  <div className="flex  items-center py-3 mt-4 border-t border-dashed">
                    <EsButton
                      className="bg-gray-800"
                      type="success"
                      text="Add Address"
                      onClick={onToggleAddAddress}
                    />
                  </div>
                </div>
              </Card>
            </Col>
            {isAddressOpen ? (
              <Col span={24}>
                <Card title="Add New Address">
                  <AddNewAddForm
                    onCloseAction={onToggleAddAddress}
                    stakeholder={cart?.stakeholder}
                  />
                </Card>
              </Col>
            ) : (
              ""
            )}

            <Col span={24}>
              <Card title="Cart " className="min-h-[500px] checkout-card">
                <Row gutter={[0, 24]}>
                  {cart &&
                    cart.cartItems &&
                    cart.cartItems.map((item) => {
                      if (item.choose) {
                        return (
                          <Col
                            span={24}
                            className="py-1 sm:pr-1 md:pr-4 lg:pr-4 xl:pr-4"
                          >
                            <Row>
                              <Col span={3}>
                                <div className="w-full box-border px-1">
                                  <CstImagePlane
                                    src={item?.image}
                                    alt={item?.name}
                                    height={350}
                                    width={350}
                                  />
                                </div>
                              </Col>
                              <Col
                                sm={10}
                                md={12}
                                lg={12}
                                className="text-left pl-2"
                              >
                                <Row gutter={[0,16]}>
                                  <Col span={24}>
                                    <h4 className="text-sm font-bold ">
                                      {item?.title}
                                    </h4>
                                  </Col>
                                  <Col span={8}>No Brand</Col>
                                  <Col span={8}>
                                    Color Family: {item?.color}
                                  </Col>

                                  <Col span={8}>Size:{item?.size}</Col>
                                </Row>
                              </Col>

                              <Col sm={11} md={9} lg={9} xl={9}>
                                <Row>
                                  <Col className="text-center" span={4}>
                                    <span> Qty: {item?.qty}</span>
                                  </Col>
                                  <Col span={8}>
                                    <div className="flex flex-row items-center  text-nowrap ">
                                      {item?.discountPrice > 0 ? (
                                        <>
                                          <div className="w-full bg-slate-300 flex flex-row items-center justify-between px-2">
                                            <span className="strikediag font-semibold">
                                              <b> &#2547;</b> {item?.price}
                                            </span>
                                            <span className="ml-3">
                                              -
                                              {getPercentage(
                                                item?.discountPrice,
                                                item?.price
                                              )}
                                              %
                                            </span>
                                            <span className="font-semibold">
                                              <b> &#2547;</b>{" "}
                                              {item?.discountPrice}
                                            </span>
                                          </div>
                                        </>
                                      ) : (
                                        <div className="bg-slate-300 inline-block px-2">
                                          <span className="font-semibold">
                                            <b> &#2547;</b> {item?.price}
                                          </span>
                                        </div>
                                      )}
                                    </div>
                                  </Col>
                                  <Col span={11}>
                                    <div className="flex flex-row sm:items-start items-center justify-end text-nowrap ">
                                      <div className="text-gray-950 font-bold mr-1 pr-1">
                                        <b> &#2547;</b>
                                        {item?.subTotal}
                                      </div>
                                    </div>
                                  </Col>
                                  <Col span={1}>
                                    <div
                                      className="cursor-pointer font-bold text-red-700"
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
                        );
                      } else {
                        return "";
                      }
                    })}
                </Row>
              </Card>
            </Col>
          </Row>
        </Col>

        <Col xs={24} sm={24} md={24} lg={8} xl={6}>
          <Row gutter={[0, 24]}>
            <Col span={24}>
              <Card>
                <Row gutter={[0, 16]}>
                  {isNoteOpen ? (
                    <Col span={24}>
                      <TextArea
                        placeholder="It will charge 10TK Extra."
                        value={specialNote}
                        onChange={onChangeSpacialNote}
                      />
                    </Col>
                  ) : (
                    ""
                  )}
                  <Col span={24} className="items-end justify-end">
                    <Space>
                      <EsButton
                        type="info"
                        space="&nbsp;"
                        icon={<i className="fa-solid fa-file-lines"></i>}
                        text="Special Note"
                        onClick={() => {
                          setIsNoteOpen(!isNoteOpen);
                        }}
                      />
                      <EsButton
                        type="error"
                        space="&nbsp;"
                        icon={<i className="fa-regular fa-file"></i>}
                        text="Clear Note"
                        onClick={() => {
                          setSpecialNote("");
                        }}
                      />
                    </Space>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col span={24}>
              <Card
                title={
                  <span className="text-2xl font-bold">Order Summery</span>
                }
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
                    <CouponInput
                      onApplayAction={onApplyCoupon}
                      couponCode={cart?.couponCode}
                    />
                  </Col>
                  {cart?.couponDiscount > 0 ? (
                    <Col span={24}>
                      <Row>
                        <Col span={16}>
                          Coupon Discount{" "}
                          {cart?.couponPar > 0 ? (
                            <span>({cart?.couponPar}%)</span>
                          ) : (
                            ""
                          )}
                        </Col>
                        <Col span={8} className="text-right">
                          <span>
                            -{cart?.couponDiscount} <b> &#2547;</b>
                          </span>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={16}>After Coupon Apply</Col>
                        <Col span={8} className="text-right">
                          <span>
                            {cart?.grandTotal} <b> &#2547;</b>
                          </span>
                        </Col>
                      </Row>
                    </Col>
                  ) : (
                    ""
                  )}
                  <Col span={24}>
                    <Row>
                      <Col span={14}>Shipping Fee</Col>
                      <Col span={10} className="text-right">
                        {!isEmptyOrNull(address) ? (
                          <span>
                            {parcelPrice.finalPrice > 0
                              ? parcelPrice.finalPrice
                              : 120}
                            <b> &#2547;</b>
                          </span>
                        ) : (
                          <span>Not Set!!</span>
                        )}
                      </Col>
                    </Row>
                  </Col>
                  <Col span={24}>
                    <Row>
                      <Col span={14}>Note fee</Col>
                      <Col span={10} className="text-right">
                        {noteCost}
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
                          {checkOutAmount}
                          <b> &#2547;</b>
                        </h2>
                      </Col>
                    </Row>
                  </Col>

                  <Col span={24}>
                    <Row gutter={[0, 20]}>
                      <Col span={24}>
                        {cart?.chooseQty === 0 ? (
                          <CstActionLink
                            className="bg-green-500 hover:bg-green-600 transition-all duration-75 text-white font-bold hover:text-white uppercase w-full flex justify-center items-center px-4 py-1 box-border"
                            name={`Shop Now`}
                            pathName="/products"
                          />
                        ) : (
                          <button
                            onClick={onPlaceOrderAction}
                            disabled={isOrderPlace}
                            className="bg-orange-700 hover:bg-orange-800 transition-all duration-75 text-white font-bold hover:text-white disabled:cursor-not-allowed uppercase w-full flex justify-center items-center px-4 py-1 box-border"
                          >
                            Place Order
                          </button>
                        )}
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Card>
            </Col>
            <InfoCard />
          </Row>
        </Col>
      </Row>
    </React.Fragment>
  );
};

CheckoutPage.propTypes = {
  restOrder: PropTypes.func.isRequired,
  getCart: PropTypes.func.isRequired,
  getDecrementCartItem: PropTypes.func.isRequired,
  getIncrementCartItem: PropTypes.func.isRequired,
  thunkRemoveCartItem: PropTypes.func.isRequired,
  thunkCartItemChooseToggleAction: PropTypes.func.isRequired,
  thunkCartItemsChooseToggleAction: PropTypes.func.isRequired,
  thunkGetAllStakholderAddress: PropTypes.func.isRequired,
  thunkPlaceOrder: PropTypes.func.isRequired,
  getParcelPrice: PropTypes.func.isRequired,
  thunkApplyCouponCartAction: PropTypes.func.isRequired,
  cart: PropTypes.object,
  addresses: PropTypes.object,
  parcelPrice: PropTypes.object,
  added: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    addresses: state.address.stakeholder,
    cart: state.cart.cart,
    checkoutAddress: state.address.checkoutAddress,
    parcelPrice: state.parcel.price,
    added: state.order.added,
  };
};

const mapDispatchToProps = {
  getCart,
  getDecrementCartItem,
  getIncrementCartItem,
  thunkRemoveCartItem,
  thunkCartItemChooseToggleAction,
  thunkCartItemsChooseToggleAction,
  thunkGetAllStakholderAddress,
  getParcelPrice,
  thunkPlaceOrder,
  thunkApplyCouponCartAction,
  restOrder,
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage);
