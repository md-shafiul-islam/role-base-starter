"use client";
import { Col, Row, Table } from "antd";
import React, { useEffect, useState } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getRegionCols } from "@/src/utils/ui/cols/address-cols";
import { thunkAllRegion } from "@/src/redux/reducer/addressReducer";
import { isEmptyOrNull } from "@/src/app/components/utils/Action/esFunc/gen-es/esCheckFunc";

const RegionTable = ({ regionsResp = [], isAction = false, ...props }) => {
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    props.thunkAllRegion();
  }, []);

  useEffect(() => {
    if (!isEmptyOrNull(regionsResp)) {
      setRegions(regionsResp);
    }
  }, [regionsResp]);

  console.log("RegionTable regionesResp, ", regionsResp);

  return (
    <React.Fragment>
      <div className="w-full">
        <Table
          dataSource={regions}
          columns={getRegionCols()}
          className="w-full"
        />
      </div>
    </React.Fragment>
  );
};

RegionTable.propTypes = {
  thunkAllRegion: PropTypes.func.isRequired,
  regionsResp: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    regionsResp: state.address.regions,
  };
};

const mapDispatchToProps = {
  thunkAllRegion,
};

export default connect(mapStateToProps, mapDispatchToProps)(RegionTable);
