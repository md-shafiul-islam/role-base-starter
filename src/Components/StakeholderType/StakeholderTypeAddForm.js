"use client";
import React, { useEffect, useState } from "react";
import { Form } from "antd";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { thunkAddStakeholderType } from "@/src/redux/reducer/stakeholderTypeReducer";

import { getUpdatedNotification } from "@/src/utils/ui/initNotification";
import StakeholderTypeForm from "@/src/Components/StakeholderType/StakeholderTypeForm";


const StakeholderTypeAddForm = ({ stakeholderTypeAddResp, ...props }) => {
  const [form] = Form.useForm();
  const [isSubmit, setIsSubmit] = useState(false);
  const [stakeholderTypeAddKey, setStakeholderTypeAddKey] = useState(
    `${Math.random() * 11148654674}-StakeholderType-add-StakeholderType`
  );

  useEffect(() => {
    if (isSubmit) {
      if (stakeholderTypeAddResp.status) {
        getUpdatedNotification(
          "success",
          stakeholderTypeAddKey,
          "Sending StakeholderType Add Request...",
          stakeholderTypeAddResp.message
        );
      } else {
        getUpdatedNotification(
          "error",
          stakeholderTypeAddKey,
          "Sending StakeholderType Add Request...",
          stakeholderTypeAddResp.message
        );
      }
      setIsSubmit(false);
      form.resetFields();
    }
  }, [stakeholderTypeAddResp]);

  const onSubmitFailed = (values) => {
    console.log("StakeholderType Failed ", values);
  };

  const onSubmitAction = (values) => {
    setIsSubmit(true);
    getUpdatedNotification(
      "info",
      stakeholderTypeAddKey,
      "Sending StakeholderType Add Request...",
      "Please, wait StakeholderType adding..."
    );
    props.thunkAddStakeholderType(values);
  };

  return (
    <React.Fragment>
      <StakeholderTypeForm
        name="stakeholderType"
        initForm={form}
        onSubmitAction={onSubmitAction}
        onFailedAction={onSubmitFailed}
        btnText="Add"
      />
    </React.Fragment>
  );
};

StakeholderTypeAddForm.propTypes = {
  stakeholderTypeAddResp: PropTypes.object,
  thunkAddStakeholderType: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    stakeholderTypeAddResp: state?.stakeType?.added,
  };
};

const mapDispatchToProps = { thunkAddStakeholderType };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StakeholderTypeAddForm);
