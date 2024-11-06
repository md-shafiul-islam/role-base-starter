"use client";
import { Col, Row, Table } from "antd";
import React, { useEffect, useState } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getSpcKeyCols } from "@/src/utils/ui/cols/spcKey-cols";

import { isEmptyOrNull } from "@/src/app/components/utils/Action/esFunc/gen-es/esCheckFunc";
import { thunkAllSpecKey } from "@/src/redux/reducer/specKeyReducer";

const SpcKeyTable = ({ spcKeysResp = [], isAction = false, ...props }) => {
  const [spcKeys, setspcKeys] = useState([]);

  useEffect(() => {
    props.thunkAllSpecKey();
  }, []);

  useEffect(() => {
    if (!isEmptyOrNull(spcKeysResp)) {
      setspcKeys(spcKeysResp);
    }
  }, [spcKeysResp]);

  return (
    <React.Fragment>
      <div className="w-full">
        <Table
          dataSource={spcKeys}
          columns={getSpcKeyCols()}
          className="w-full"
        />
      </div>
    </React.Fragment>
  );
};

SpcKeyTable.propTypes = {
  thunkAllSpecKey: PropTypes.func.isRequired,
  spcKeysResp: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    spcKeysResp: state.spcKey.specKeys,
  };
};

const mapDispatchToProps = {
  thunkAllSpecKey,
};

export default connect(mapStateToProps, mapDispatchToProps)(SpcKeyTable);
