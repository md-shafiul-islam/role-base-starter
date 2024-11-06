"use client";
import { Col, Row, Table } from "antd";
import React, { useEffect, useState } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getBrandCols } from "@/src/utils/ui/cols/brand-cols";
import { thunkAllBrand } from "@/src/redux/reducer/brandReducer";
import { isEmptyOrNull } from "@/src/app/components/utils/Action/esFunc/gen-es/esCheckFunc";

const BrandTable = ({ brandsResp = [], isAction = false, ...props }) => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    props.thunkAllBrand();
  }, []);

  useEffect(() => {
    console.log("brandsResp, ", brandsResp);
    if (!isEmptyOrNull(brandsResp)) {
      setBrands(brandsResp);
    }
  }, [brandsResp]);

  return (
    <React.Fragment>
      <div className="w-full">
        <Table dataSource={brands} columns={getBrandCols()} className="w-full" />
      </div>
    </React.Fragment>
  );
};

BrandTable.propTypes = {
  thunkAllBrand: PropTypes.func.isRequired,
  BrandsResp: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    brandsResp: state.brand.brands,
  };
};

const mapDispatchToProps = {
  thunkAllBrand,
};

export default connect(mapStateToProps, mapDispatchToProps)(BrandTable);
