"use client";
import { Table } from "antd";
import React, { useEffect, useState } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getUnitCols } from "@/src/utils/ui/cols/unit-cols";
import { thunkAllUnit } from "@/src/redux/reducer/unitReducer";
import { isEmptyOrNull } from "@/src/app/components/utils/Action/esFunc/gen-es/esCheckFunc";

const UnitTable = ({ unitsResp = [], isAction = false, ...props }) => {
  const [units, setUnits] = useState([]);

  useEffect(() => {
    props.thunkAllUnit();
  }, []);

  useEffect(() => {
    console.log("Category All unit, ", unitsResp);
    if (!isEmptyOrNull(unitsResp)) {
      setUnits(unitsResp);
    }
  }, [unitsResp]);

  return (
    <React.Fragment>
      <Table dataSource={units} columns={getUnitCols()} />
    </React.Fragment>
  );
};

UnitTable.propTypes = {
  thunkAllUnit: PropTypes.func.isRequired,
  unitsResp: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    unitsResp: state.unit.units,
  };
};

const mapDispatchToProps = {
  thunkAllUnit,
};

export default connect(mapStateToProps, mapDispatchToProps)(UnitTable);
