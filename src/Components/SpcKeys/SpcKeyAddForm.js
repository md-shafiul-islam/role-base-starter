"use client";
import React, { useEffect, useState } from "react";
import { Form } from "antd";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getUpdatedNotification } from "@/src/utils/ui/initNotification";
import { thunkAddSpecKey, thunkAllSpecKey } from "@/src/redux/reducer/specKeyReducer";
import SpcKeyForm from "@/src/Components/SpcKeys/SpcKeyForm";

const SpcKeyAddForm = ({ spcKeyAddResp, spcKeysResp, ...props }) => {
  const [form] = Form.useForm();
  const [isSubmit, setIsSubmit] = useState(false);
  const [spcKeyAddKey, setspcKeyAddKey] = useState(
    `${Math.random() * 11148654674}-spcKey-add-spcKey`
  );
  const [spcKeys, setspcKeys] = useState([]);

  useEffect(() => {
    props.thunkAllSpecKey();
  }, []);

  useEffect(() => {
    console.log("spcKeys, ", spcKeysResp);
    if (spcKeysResp) {
      setspcKeys(spcKeysResp);
    }
  }, [spcKeysResp]);

  useEffect(() => {
    if (isSubmit) {
      if (spcKeyAddResp.status) {
        getUpdatedNotification(
          "success",
          spcKeyAddKey,
          "Sending spcKey Add Request...",
          spcKeyAddResp.message
        );
        props.thunkAllSpecKey();
      } else {
        getUpdatedNotification(
          "error",
          spcKeyAddKey,
          "Sending spcKey Add Request...",
          spcKeyAddResp.message
        );
      }
      setIsSubmit(false);
      form.resetFields();
    }
  }, [spcKeyAddResp]);

  const onSubmitFailed = (values) => {
    console.log("spcKey Failed ", values);
  };

  const onSubmitAction = (values) => {
    setIsSubmit(true);
    getUpdatedNotification(
      "info",
      spcKeyAddKey,
      "Sending spcKey Add Request...",
      "Please, wait spcKey adding..."
    );
    
    props.thunkAddSpecKey(values);
  };

  return (
    <React.Fragment>
      <SpcKeyForm
        name="spcKey"
        initForm={form}
        spcKeys={spcKeys}
        onSubmitAction={onSubmitAction}
        onFailedAction={onSubmitFailed}
        btnText="Add"
      />
    </React.Fragment>
  );
};

SpcKeyAddForm.propTypes = {
  spcKeyAddResp: PropTypes.object,
  thunkAllSpecKey: PropTypes.func.isRequired,
  thunkAddSpecKey: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    spcKeysResp: state?.spcKey?.spcKeys,
    spcKeyAddResp: state?.spcKey?.added,
  };
};

const mapDispatchToProps = { thunkAddSpecKey, thunkAllSpecKey };

export default connect(mapStateToProps, mapDispatchToProps)(SpcKeyAddForm);
