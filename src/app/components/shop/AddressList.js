"use client";
import { Card, Col, Row } from "antd";
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { setCheckoutAddress } from "@/src/redux/reducer/addressReducer";
import { isEmptyOrNull } from "../utils/Action/esFunc/gen-es/esCheckFunc";

const AddressList = ({ addresses, checkoutAddress, ...props }) => {
  useEffect(() => {
    if (!isEmptyOrNull(addresses)) {
      if (isEmptyOrNull(checkoutAddress)) {
        addresses.forEach((address, idx) => {
          if (idx === 0) {
            props.setCheckoutAddress(address.id);
          }
        });
      }
    }
  }, [addresses]);
  const onSelectAction = (id) => {
    if (id === checkoutAddress) {
      props.setCheckoutAddress("");
    } else {
      props.setCheckoutAddress(id);
    }
  };
  return (
    <React.Fragment>
      <Row gutter={[16, 16]}>
        {addresses?.map((address) => {
          return (
            <React.Fragment>
              <Col sm={12} md={8} lg={6} xl={6}>
                <div
                  className={`w-full  ${
                    checkoutAddress === address.id
                      ? " border-teal-500"
                      : " border-transparent"
                  }  border-2 border-solid  rounded transition-all duration-300 delay-75`}
                >
                  <Card
                    onClick={() => {
                      onSelectAction(address.id);
                    }}
                    className={`address-list cursor-pointer`}
                  >
                    <div className=" w-full flex flex-col items-start justify-center gap-3 font-semibold">
                      <div className="text-pretty ">
                        Full Name: {address.fullName}
                      </div>
                      <div className="text-balance">
                        Area: {address?.area?.name}
                      </div>
                      <div className="text-pretty">
                        Zone/Upazila: {address?.zone?.name}
                      </div>
                      <div className="text-pretty">
                        City/District: {address?.city?.name}
                      </div>
                    </div>
                  </Card>
                </div>
              </Col>
            </React.Fragment>
          );
        })}
      </Row>
    </React.Fragment>
  );
};

AddressList.propTypes = {
  setCheckoutAddress: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    checkoutAddress: state.address.checkoutAddress,
  };
};

const mapDispatchToProps = { setCheckoutAddress };

export default connect(mapStateToProps, mapDispatchToProps)(AddressList);
