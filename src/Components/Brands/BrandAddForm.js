"use client";
import React, { useEffect, useState } from "react";
import { Form } from "antd";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { thunkAddBrand, thunkAllBrand } from "@/src/redux/reducer/brandReducer";

import { getUpdatedNotification } from "@/src/utils/ui/initNotification";
import BrandForm from "@/src/Components/Brands/BrandForm";

const BrandAddForm = ({ brandAddResp, brandsResp, ...props }) => {
  const [form] = Form.useForm();
  const [isSubmit, setIsSubmit] = useState(false);
  const [brandAddKey, setBrandAddKey] = useState(
    `${Math.random() * 11148654674}-brand-add-brand`
  );
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    props.thunkAllBrand();
  }, []);

  useEffect(() => {
    console.log("brands, ", brandsResp);
    if (brandsResp) {
      setBrands(brandsResp);
    }
  }, [brandsResp]);

  useEffect(() => {
    if (isSubmit) {
      if (brandAddResp.status) {
        getUpdatedNotification(
          "success",
          brandAddKey,
          "Sending brand Add Request...",
          brandAddResp.message
        );
        props.thunkAllBrand();
      } else {
        getUpdatedNotification(
          "error",
          brandAddKey,
          "Sending brand Add Request...",
          brandAddResp.message
        );
      }
      setIsSubmit(false);
      form.resetFields();
    }
  }, [brandAddResp]);

  const onSubmitFailed = (values) => {
    console.log("brand Failed ", values);
  };

  const onSubmitAction = (values) => {
    setIsSubmit(true);
    getUpdatedNotification(
      "info",
      brandAddKey,
      "Sending brand Add Request...",
      "Please, wait brand adding..."
    );
    props.thunkAddBrand(values);
  };

  return (
    <React.Fragment>
      <BrandForm
        name="brand"
        initForm={form}
        brands={brands}
        onSubmitAction={onSubmitAction}
        onFailedAction={onSubmitFailed}
        btnText="Add"
      />
    </React.Fragment>
  );
};

BrandAddForm.propTypes = {
  brandAddResp: PropTypes.object,
  thunkAddBrand: PropTypes.func.isRequired,
  thunkAllBrand: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    brandsResp: state?.brand?.brands,
    brandAddResp: state?.brand?.added,
  };
};

const mapDispatchToProps = { thunkAddBrand, thunkAllBrand };

export default connect(mapStateToProps, mapDispatchToProps)(BrandAddForm);
