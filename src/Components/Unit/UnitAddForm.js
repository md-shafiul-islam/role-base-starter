"use client";
import React, { useEffect, useState } from "react";
import { Form } from "antd";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { thunkAddUnit, thunkAllUnit } from "@/src/redux/reducer/unitReducer";

import { getUpdatedNotification } from "@/src/utils/ui/initNotification";
import UnitForm from "@/src/Components/Unit/UnitForm";

const UnitAddForm = ({ unitAddResp, unitsResp, ...props }) => {
  const [form] = Form.useForm();
  const [isSubmit, setIsSubmit] = useState(false);
  const [unitAddKey, setUnitAddKey] = useState(
    `${Math.random() * 11148654674}-unit-add-unit`
  );
  const [units, setUnits] = useState([]);

  useEffect(() => {
    props.thunkAllUnit();
  }, []);

  useEffect(() => {
    console.log("Units, ", unitsResp);
    if (unitsResp) {
      setUnits(unitsResp);
    }
  }, [unitsResp]);

  useEffect(() => {
    if (isSubmit) {
      if (unitAddResp.status) {
        getUpdatedNotification(
          "success",
          unitAddKey,
          "Sending Unit Add Request...",
          unitAddResp.message
        );
        props.thunkAllUnit();
      } else {
        getUpdatedNotification(
          "error",
          unitAddKey,
          "Sending Unit Add Request...",
          unitAddResp.message
        );
      }
      setIsSubmit(false);
      form.resetFields();
    }
  }, [unitAddResp]);

  const onSubmitFailed = (values) => {
    console.log("Unit Failed ", values);
  };

  const onSubmitAction = (values) => {
    setIsSubmit(true);
    getUpdatedNotification(
      "info",
      unitAddKey,
      "Sending Unit Add Request...",
      "Please, wait Unit adding..."
    );
    props.thunkAddUnit(values);
  };

  return (
    <React.Fragment>
      <UnitForm
        name="Unit"
        initForm={form}
        units={units}
        onSubmitAction={onSubmitAction}
        onFailedAction={onSubmitFailed}
        btnText="Add"
      />
    </React.Fragment>
  );
};

UnitAddForm.propTypes = {
  unitAddResp: PropTypes.object,
  thunkAddUnit: PropTypes.func.isRequired,
  thunkAllUnit: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    unitsResp: state?.unit?.units,
    unitAddResp: state?.unit?.added,
  };
};

const mapDispatchToProps = { thunkAddUnit, thunkAllUnit };

export default connect(mapStateToProps, mapDispatchToProps)(UnitAddForm);
