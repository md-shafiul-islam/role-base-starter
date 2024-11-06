"use client";
import React, { useEffect, useState } from "react";
import { Form } from "antd";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { thunkAddUser, thunkAllUser } from "@/src/redux/reducer/userReducer";

import { getUpdatedNotification } from "@/src/utils/ui/initNotification";
import UserForm from "@/src/Components/User/UserForm";
import { thunkAllRole } from "@/src/redux/reducer/roleReducer";
import { isEmptyOrNull } from "@/src/app/components/utils/Action/esFunc/gen-es/esCheckFunc";

const UserAddForm = ({ userAddResp, rolesResp, ...props }) => {
  const [form] = Form.useForm();
  const [isSubmit, setIsSubmit] = useState(false);
  const [roles, setRoles] = useState([]);
  const [userAddKey, setuserAddKey] = useState(
    `${Math.random() * 11148654674}-user-add-user`
  );
  const [users, setUsers] = useState([]);

  useEffect(() => {
    props.thunkAllRole();
  }, []);

  useEffect(() => {
    console.log("User Roles, ", rolesResp);
    if (!isEmptyOrNull(rolesResp)) {
      setRoles(rolesResp);
    }
  }, []);

  useEffect(() => {
    if (isSubmit) {
      if (userAddResp.status) {
        getUpdatedNotification(
          "success",
          userAddKey,
          "Sending user Add Request...",
          userAddResp.message
        );
        props.thunkAllUser();
        form.resetFields();
      } else {
        getUpdatedNotification(
          "error",
          userAddKey,
          "Sending user Add Request...",
          userAddResp.message
        );
      }
      setIsSubmit(false);
    }
  }, [userAddResp]);

  const onSubmitFailed = (values) => {
    console.log("user Failed ", values);
  };

  const onSubmitAction = (values) => {
    setIsSubmit(true);
    getUpdatedNotification(
      "info",
      userAddKey,
      "Sending user Add Request...",
      "Please, wait user adding..."
    );
    console.log("onSubmitAction values, ", values);
    props.thunkAddUser(values);
  };

  return (
    <React.Fragment>
      <UserForm
        name="user"
        initForm={form}
        onSubmitAction={onSubmitAction}
        onFailedAction={onSubmitFailed}
        roles={roles}
        btnText="Add"
      />
    </React.Fragment>
  );
};

UserAddForm.propTypes = {
  userAddResp: PropTypes.object,
  rolesResp: PropTypes.object,
  thunkAddUser: PropTypes.func.isRequired,
  thunkAllUser: PropTypes.func.isRequired,
  thunkAllRole: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    userAddResp: state?.user?.added,
    rolesResp: state?.role?.roles,
  };
};

const mapDispatchToProps = {
  thunkAddUser,
  thunkAllUser,
  thunkAllRole,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserAddForm);
