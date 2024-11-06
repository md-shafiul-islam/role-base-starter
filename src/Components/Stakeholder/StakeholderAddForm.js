"use client";
import React, { useEffect, useState } from "react";
import { Form } from "antd";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  thunkAddStakeholder,
  thunkAllStakeholder,
} from "@/src/redux/reducer/stakeholderReducer";

import { getUpdatedNotification } from "@/src/utils/ui/initNotification";
import StakeholderForm from "@/src/Components/Stakeholder/StakeholderForm";
import { thunkAllStakeholderType } from "@/src/redux/reducer/stakeholderTypeReducer";
import { isEmptyOrNull } from "@/src/app/components/utils/Action/esFunc/gen-es/esCheckFunc";

const StakeholderAddForm = ({
  stakeholderAddResp,
  stakeTypesResp,
  ...props
}) => {
  const [form] = Form.useForm();
  const [isSubmit, setIsSubmit] = useState(false);
  const [stakeTypes, setStakeTypes] = useState([]);

  const [stakeholderAddKey, setStakeholderAddKey] = useState(
    `${Math.random() * 11148654674}-stakeholder-add-stakeholder`
  );
  const [stakeholder, setStakeholder] = useState([]);

  useEffect(() => {
    props.thunkAllStakeholder();
    props.thunkAllStakeholderType();
  }, []);

  useEffect(() => {
    if (!isEmptyOrNull(stakeTypesResp)) {
      setStakeTypes(stakeTypesResp);
    }
    console.log("stakeTypesResp, ", stakeTypesResp);
  }, [stakeTypesResp]);

  useEffect(() => {
    if (isSubmit) {
      if (stakeholderAddResp.status) {
        getUpdatedNotification(
          "success",
          stakeholderAddKey,
          "Sending Stakeholder Add Request...",
          stakeholderAddResp.message
        );
        props.thunkAllStakeholder();
        form.resetFields();
      } else {
        getUpdatedNotification(
          "error",
          stakeholderAddKey,
          "Sending Stakeholder Add Request...",
          stakeholderAddResp.message
        );
      }
      setIsSubmit(false);
    }
  }, [stakeholderAddResp]);

  const onSubmitFailed = (values) => {
    console.log("Stakeholder Failed ", values);
  };

  const onSubmitAction = (values) => {
    setIsSubmit(true);
    getUpdatedNotification(
      "info",
      stakeholderAddKey,
      "Sending Stakeholder Add Request...",
      "Please, wait Stakeholder adding..."
    );
    console.log("onSubmitAction values, ", values);
    props.thunkAddStakeholder(values);
  };

  return (
    <React.Fragment>
      <StakeholderForm
        name="Stakeholder"
        stakeTypes={stakeTypes}
        initForm={form}
        onSubmitAction={onSubmitAction}
        onFailedAction={onSubmitFailed}
        btnText="Add"
      />
    </React.Fragment>
  );
};

StakeholderAddForm.propTypes = {
  stakeholderAddResp: PropTypes.object,
  stakeTypesResp: PropTypes.object,
  thunkAddStakeholder: PropTypes.func.isRequired,
  thunkAllStakeholder: PropTypes.func.isRequired,
  thunkAllStakeholderType: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    stakeholdersResp: state?.stakeholder?.stakeholders,
    stakeTypesResp: state.stakeType.stakeholderTypes,
    stakeholderAddResp: state?.stakeholder?.added,
  };
};

const mapDispatchToProps = {
  thunkAddStakeholder,
  thunkAllStakeholder,
  thunkAllStakeholderType,
};

export default connect(mapStateToProps, mapDispatchToProps)(StakeholderAddForm);
