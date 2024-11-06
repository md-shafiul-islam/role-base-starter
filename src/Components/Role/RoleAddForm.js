"use client";
import React, { useEffect, useState } from "react";
import { Form } from "antd";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { thunkAddRole, thunkAllRole } from "@/src/redux/reducer/roleReducer";
import { thunkAllMenus } from "@/src/redux/reducer/menuReducer";

import { getUpdatedNotification } from "@/src/utils/ui/initNotification";
import RoleForm from "@/src/Components/Role/RoleForm";

const RoleAddForm = ({ roleAddResp, menusResp, ...props }) => {

  const [form] = Form.useForm();
  const [isSubmit, setIsSubmit] = useState(false);
  const [menus, setMenus] = useState([]);

  const [roleAddKey, setRoleAddKey] = useState(
    `${Math.random() * 11148654674}-Role-add-Role`
  );
  const [role, setRole] = useState([]);

  useEffect(() => {
    props.thunkAllRole();
    props.thunkAllMenus();
  }, []);

  useEffect(() => {
    if (menusResp) {
      setMenus(menusResp);
    }
  }, [menusResp]);

  useEffect(() => {
    if (isSubmit) {
      if (roleAddResp.status) {
        getUpdatedNotification(
          "success",
          roleAddKey,
          "Sending Role Add Request...",
          roleAddResp.message
        );
        props.thunkAllRole();
        form.resetFields();
      } else {
        getUpdatedNotification(
          "error",
          roleAddKey,
          "Sending Role Add Request...",
          roleAddResp.message
        );
      }
      setIsSubmit(false);
    }
  }, [roleAddResp]);

  const onSubmitFailed = (values) => {
    console.log("Role Failed ", values);
  };

  const onSubmitAction = (values) => {
    setIsSubmit(true);
    getUpdatedNotification(
      "info",
      roleAddKey,
      "Sending Role Add Request...",
      "Please, wait Role adding..."
    );
    console.log("onSubmitAction values, ", values);
    props.thunkAddRole(values);
  };

  return (
    <React.Fragment>
      <RoleForm
        name="role"
        initForm={form}
        onSubmitAction={onSubmitAction}
        onFailedAction={onSubmitFailed}
        menus={menus}
        btnText="Add"
      />
    </React.Fragment>
  );
};

RoleAddForm.propTypes = {
  roleAddResp: PropTypes.object,
  thunkAddRole: PropTypes.func.isRequired,
  thunkAllRole: PropTypes.func.isRequired,
  thunkAllMenus: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    rolesResp: state?.role?.roles,
    roleAddResp: state?.role?.added,
  };
};

const mapDispatchToProps = {
  thunkAllRole,
  thunkAddRole,
  thunkAllMenus,
};

export default connect(mapStateToProps, mapDispatchToProps)(RoleAddForm);
