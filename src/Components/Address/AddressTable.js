"use client";
import { Col, Row, Table } from "antd";
import React, { useEffect, useState } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getAddressCols } from "@/src/utils/ui/cols/address-cols";
import { thunkAllAddress } from "@/src/redux/reducer/addressReducer";
import { isEmptyOrNull } from "@/src/app/components/utils/Action/esFunc/gen-es/esCheckFunc";

const AddressTable = ({ addressesResp = [], isAction = false, ...props }) => {
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    props.thunkAllAddress();
  }, []);

  useEffect(() => {
    if (!isEmptyOrNull(addressesResp)) {
      setAddresses(addressesResp);
    }
  }, [addressesResp]);

  console.log("addressesResp, ", addressesResp);

  return (
    <React.Fragment>
      <div className="w-full">
        <Table
          dataSource={addresses}
          columns={getAddressCols()}
          className="w-full"
        />
      </div>
    </React.Fragment>
  );
};

AddressTable.propTypes = {
  thunkAllAddress: PropTypes.func.isRequired,
  addressesResp: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    addressesResp: state.address.addresses,
  };
};

const mapDispatchToProps = {
  thunkAllAddress,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddressTable);
