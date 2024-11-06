"use client";
import { Table } from "antd";
import React, { useEffect, useState } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getCategoryCols } from "@/src/utils/ui/cols/category-cols";
import { thunkAllCategory } from "@/src/redux/reducer/categoryReducer";
import { isEmptyOrNull } from "@/src/app/components/utils/Action/esFunc/gen-es/esCheckFunc";

const CategoryTable = ({ categoriesResp = [], isAction = false, ...props }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    props.thunkAllCategory();
  }, []);

  useEffect(() => {
    console.log("Category Resp, ", categoriesResp);
    if (!isEmptyOrNull(categoriesResp)) {
      setCategories(categoriesResp);
    }
  }, [categoriesResp]);

  return (
    <React.Fragment>
      <Table dataSource={categories} columns={getCategoryCols()} />
    </React.Fragment>
  );
};

CategoryTable.propTypes = {
  thunkAllCategory: PropTypes.func.isRequired,
  categoriesResp: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    categoriesResp: state.category.categories,
  };
};

const mapDispatchToProps = {
  thunkAllCategory,
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryTable);
