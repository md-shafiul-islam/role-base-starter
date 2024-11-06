"use client";
import { Col, Row, Table } from "antd";
import React, { useEffect, useState } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getCityCols } from "@/src/utils/ui/cols/address-cols";
import { thunkAllCity } from "@/src/redux/reducer/addressReducer";
import { isEmptyOrNull } from "@/src/app/components/utils/Action/esFunc/gen-es/esCheckFunc";

const CityTable = ({ cityResp = [], isAction = false, ...props }) => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    props.thunkAllCity();
  }, []);

  useEffect(() => {
    if (!isEmptyOrNull(cityResp)) {
      setCities(cityResp);
    }
  }, [cityResp]);

  console.log("cityResp, ", cityResp);

  return (
    <React.Fragment>
      <div className="w-full">
        <Table dataSource={cities} columns={getCityCols()} className="w-full" />
      </div>
    </React.Fragment>
  );
};

CityTable.propTypes = {
  thunkAllCity: PropTypes.func.isRequired,
  cityResp: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    cityResp: state.address.cities,
  };
};

const mapDispatchToProps = {
  thunkAllCity,
};

export default connect(mapStateToProps, mapDispatchToProps)(CityTable);
