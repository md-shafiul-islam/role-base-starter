"use client";
import React, { useEffect, useState } from "react";
import { Form } from "antd";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { thunkAddaddress, thunkAlladdress } from "@/src/redux/reducer/addressReducer";

import { getUpdatedNotification } from "@/src/utils/ui/initNotification";
import AddressForm from "@/src/Components/addresss/AddressForm";

const addressAddForm = ({ addressAddResp, addresssResp, ...props }) => {
  const [form] = Form.useForm();
  const [isSubmit, setIsSubmit] = useState(false);
  const [addressAddKey, setaddressAddKey] = useState(
    `${Math.random() * 11148654674}-address-add-address`
  );
  const [addresss, setaddresss] = useState([]);

  useEffect(() => {
    props.thunkAlladdress();
  }, []);

  useEffect(() => {
    console.log("addresss, ", addresssResp);
    if (addresssResp) {
      setaddresss(addresssResp);
    }
  }, [addresssResp]);

  useEffect(() => {
    if (isSubmit) {
      if (addressAddResp.status) {
        getUpdatedNotification(
          "success",
          addressAddKey,
          "Sending address Add Request...",
          addressAddResp.message
        );
        props.thunkAlladdress();
      } else {
        getUpdatedNotification(
          "error",
          addressAddKey,
          "Sending address Add Request...",
          addressAddResp.message
        );
      }
      setIsSubmit(false);
      form.resetFields();
    }
  }, [addressAddResp]);

  const onSubmitFailed = (values) => {
    console.log("address Failed ", values);
  };

  const onSubmitAction = (values) => {
    setIsSubmit(true);
    getUpdatedNotification(
      "info",
      addressAddKey,
      "Sending address Add Request...",
      "Please, wait address adding..."
    );
    props.thunkAddaddress(values);
  };

  return (
    <React.Fragment>
      <AddressForm
        name="address"
        initForm={form}
        addresss={addresss}
        onSubmitAction={onSubmitAction}
        onFailedAction={onSubmitFailed}
        btnText="Add"
      />
    </React.Fragment>
  );
};

addressAddForm.propTypes = {
  addressAddResp: PropTypes.object,
  thunkAddaddress: PropTypes.func.isRequired,
  thunkAlladdress: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    addresssResp: state?.address?.addresss,
    addressAddResp: state?.address?.added,
  };
};

const mapDispatchToProps = { thunkAddaddress, thunkAlladdress };

export default connect(mapStateToProps, mapDispatchToProps)(addressAddForm);
