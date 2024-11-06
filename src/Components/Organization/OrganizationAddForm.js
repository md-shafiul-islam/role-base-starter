"use client";
import React, { useEffect, useState } from "react";
import { Form } from "antd";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  thunkAddOrganization,
  thunkAllOrganization,
} from "@/src/redux/reducer/organizationReducer";

import { getUpdatedNotification } from "@/src/utils/ui/initNotification";
import OrganizationForm from "@/src/Components/Organization/OrganizationForm";

const OrganizationAddForm = ({ organizationAddResp, ...props }) => {

  const [form] = Form.useForm();
  const [isSubmit, setIsSubmit] = useState(false);

  const [organizationAddKey, setOrganizationAddKey] = useState(
    `${Math.random() * 11148654674}-Organization-add-Organization`
  );
  const [organization, setOrganization] = useState([]);

  useEffect(() => {
    props.thunkAllOrganization();
  }, []);

  useEffect(() => {
    if (isSubmit) {
      if (organizationAddResp.status) {
        getUpdatedNotification(
          "success",
          organizationAddKey,
          "Sending Organization Add Request...",
          organizationAddResp.message
        );
        props.thunkAllOrganization();
        form.resetFields();
      } else {
        getUpdatedNotification(
          "error",
          organizationAddKey,
          "Sending Organization Add Request...",
          organizationAddResp.message
        );
      }
      setIsSubmit(false);
    }
  }, [organizationAddResp]);

  const onSubmitFailed = (values) => {
    console.log("Organization Failed ", values);
  };

  const onSubmitAction = (values) => {
    setIsSubmit(true);
    getUpdatedNotification(
      "info",
      organizationAddKey,
      "Sending Organization Add Request...",
      "Please, wait Organization adding..."
    );
    console.log("onSubmitAction values, ", values);
    props.thunkAddOrganization(values);
  };

  return (
    <React.Fragment>
      <OrganizationForm
        name="Organization"
        initForm={form}
        onSubmitAction={onSubmitAction}
        onFailedAction={onSubmitFailed}
        btnText="Add"
      />
    </React.Fragment>
  );
};

OrganizationAddForm.propTypes = {
  organizationAddResp: PropTypes.object,
  thunkAddOrganization: PropTypes.func.isRequired,
  thunkAllOrganization: PropTypes.func.isRequired,
  thunkAllOrganizationType: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    organizationsResp: state?.organization?.organizations,
    organizationAddResp: state?.organization?.added,
  };
};

const mapDispatchToProps = {
  thunkAddOrganization,
  thunkAllOrganization,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrganizationAddForm);
