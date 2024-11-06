"use client";
import React, { useEffect, useState } from "react";

import { Col, Input, Row } from "antd";

const CouponInput = ({ onApplayAction, couponCode, ...props }) => {
  const [coupon, setCoupon] = useState("");

  useEffect(() => {
    setCoupon(couponCode);
  }, [couponCode]);

  const onChangeCoupon = (e) => {
    setCoupon(e.target.value);
  };

  return (
    <Row gutter={[12, 12]}>
      <Col span={16}>
        {" "}
        <Input
          size="large"
          placeholder="Coupon"
          prefix={
            <span className="text-green-600">
              <i className=" fa-solid fa-ticket"></i>
            </span>
          }
          value={coupon}
          onChange={onChangeCoupon}
        />
      </Col>
      <Col span={8}>
        <button
          className="w-full bg-green-500 box-border rounded-lg py-[2px] px-3"
          onClick={() => {
            onApplayAction(coupon);
          }}
        >
          Apply
        </button>
      </Col>
    </Row>
  );
};

CouponInput.propTypes = {};

export default CouponInput;
