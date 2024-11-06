"use client";

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Card, Col, Form, Row, Space } from "antd";
import {
  thunkRole,
  thunkRemoveRole,
  thunkUpdateRole,
  thunkToggleActiveRole,
} from "@/src/redux/reducer/roleReducer";
import LoadingContent from "@/src/app/components/utils/loading/LoadingContent";
import { isEmptyOrNull } from "@/src/app/components/utils/Action/esFunc/gen-es/esCheckFunc";
import { connect } from "react-redux";

import EsDateFormat from "@/src/Components/EsUtils/EsDateFormat";
import EsButton from "@/src/Components/EsUtils/EsButton";
import EsBadge from "@/src/Components/EsUtils/EsBadge";
import EsViewModal from "@/src/app/components/utils/EsUtils/Modal/EsViewModal";
import RoleForm from "@/src/Components/Role/RoleForm";
import AccessTab from "@/src/Components/Role/AccessTab";
import ConfrimModal from "@/src/app/components/utils/EsUtils/Modal/ConfrimModal";
import { getUpdatedNotification } from "@/src/utils/ui/initNotification";
import { redirect } from "next/navigation";
import CstImage from "../CstView/CstImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckSquare,
  faXmarkSquare,
} from "@fortawesome/free-solid-svg-icons";

const RoleDetailsCard = ({
  roleResp,
  roleAccess,
  roleRemoveResp,
  roleUpdateResp,
  stakeTypesResp,
  activeToggleResp,
  id,
  ...props
}) => {
  const [form] = Form.useForm();

  const [isOpen, setIsOpen] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [role, setRole] = useState({});

  const [isOpenConfrimRemove, setIsOpenConfrimRemove] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [userRoleAccess, setUserRoleAccess] = useState({});
  const [roles, setRoles] = useState([]);

  const [activeKey, setActiveKey] = useState(
    `${Math.random() * 111468948674}-active-role-update`
  );

  const [verifyKey, setVerifyKey] = useState(
    `${Math.random() * 7845124}-verify-role-update`
  );

  const [updateKey, setUpdateKey] = useState(
    `${Math.random() * 11148674}-role-update`
  );

  const [deleteKey, setDeleteKey] = useState(
    `${Math.random() * 11148674}-role-delete-cat`
  );

  useEffect(() => {
    if (!isEmptyOrNull(roleResp)) {
      if (roleResp.status) {
        setRole(roleResp.response);
      }
    }
  }, [roleResp]);

  useEffect(() => {
    if (!isEmptyOrNull(roleAccess)) {
      setUserRoleAccess(roleAccess?.role);
    }
  }, [roleAccess]);

  useEffect(() => {
    props.thunkRole(id);
  }, [id]);

  useEffect(() => {
    if (!isEmptyOrNull(roleResp)) {
      setRole(roleResp.response);
      setIsLoading(false);
      if (roleResp.status) {
        if (isEmptyOrNull(roleResp.response)) {
          redirect("/administrator/roles");
        }
      }
    }
  }, [roleResp]);

  const onRemove = () => {
    if (roleAccess?.isRemove) {
      setIsOpenConfrimRemove(!isOpenConfrimRemove);
    }
  };

  const onEditAction = () => {
    if (roleAccess?.isEdit) {
      setIsOpen(true);
    }
  };

  const onRemoveAction = () => {
    if (roleAccess?.isRemove) {
      getUpdatedNotification(
        "info",
        deleteKey,
        "role removing",
        `Removing '${role?.name}' role`
      );

      props.thunkRole(id);
      setIsSubmit(true);
    }
  };

  const onUpdateAction = (values) => {
    if (roleAccess?.isEdit) {
      setIsSubmit(true);
      getUpdatedNotification(
        "info",
        updateKey,
        "Sending role Update Request...",
        "Please, wait role Updating..."
      );
      values.id = id;
      props.thunkUpdaterole(values);
    }
  };

  const onUpdateFailed = (values) => {
    console.log("onUpdateFailed, ", values);
  };

  useEffect(() => {
    if (isSubmit) {
      console.log("Update Response ", roleUpdateResp);
      if (roleUpdateResp.status) {
        getUpdatedNotification(
          "success",
          updateKey,
          "Sending role Update Request...",
          roleUpdateResp.message
        );
        props.thunkRole(id);
      } else {
        getUpdatedNotification(
          "error",
          updateKey,
          "Sending role Add Request...",
          roleUpdateResp.message
        );
      }
      setIsSubmit(false);
      setIsOpen(false);
    }
  }, [roleUpdateResp]);

  useEffect(() => {
    if (isSubmit) {
      if (roleRemoveResp.status) {
        getUpdatedNotification(
          "success",
          deleteKey,
          "Sending role Removed Request...",
          roleRemoveResp.message
        );
        redirect("/administrator/roles");
      } else {
        getUpdatedNotification(
          "error",
          deleteKey,
          "Sending role Removed...",
          roleRemoveResp.message
        );
      }
      setIsSubmit(false);
      setIsOpenConfrimRemove(false);
    }
  }, [roleRemoveResp]);

  const onVerifyAction = () => {
    props.thunkRoleVerify({ id: role?.id, verify: true });
    getUpdatedNotification("info", verifyKey, "Please, wait role Verifing ...");
    setIsSubmit(true);
  };

  const onActiveAction = () => {
    props.thunkToggleActiveRole({ id: role?.id, active: true });
    getUpdatedNotification(
      "info",
      activeKey,
      `Please, wait role ${role?.isActive ? "Deactivating" : "Activating"} `
    );
    setIsSubmit(true);
  };

  useEffect(() => {
    if (isSubmit && !isEmptyOrNull(activeToggleResp)) {
      if (activeToggleResp.status) {
        getUpdatedNotification(
          "success",
          activeKey,
          `Please, role ${role?.isActive ? "Deactivate" : "Activated"} :) `
        );
        props.thunkRole(id);
      } else {
        getUpdatedNotification(
          "error",
          activeKey,
          `Failed to  ${role?.isActive ? "Deactivate" : "Activated"}  role !!`
        );
      }
      setIsSubmit(false);
    }
  }, [activeToggleResp]);

  console.log("Role ", role);
  console.log("roleResp ", roleResp);

  return (
    <React.Fragment>
      <EsViewModal
        isOpen={isOpen}
        handleOk={() => {
          setIsOpen(false);
        }}
        btnName="Close"
        isClosable={false}
      >
        <roleForm
          title="Update role"
          initForm={form}
          name="role"
          onSubmitAction={onUpdateAction}
          onFailedAction={onUpdateFailed}
          btnText={"Update"}
          initValues={{ ...role, role: role?.role?.publicId }}
          roles={roles}
        />
      </EsViewModal>

      <ConfrimModal
        isOpen={isOpenConfrimRemove}
        onConfrim={onRemoveAction}
        onCancel={onRemove}
        title="You want to remove this Brand?"
        content={
          <div className="grid grid-cols-1 gap-2 font-medium">
            <span>Name: {role?.name}</span>
            <span>Email: {role?.email}</span>
            <span>Phone No: {role?.phoneNo}</span>
          </div>
        }
      />
      <Card title="Role Details" className="p-0">
        {isLoading ? (
          <LoadingContent isActive={isLoading} />
        ) : (
          <Row>
            <Col span={24} className="font-semibold">
              <div className="grid grid-cols-1 gap-14">
                <div className=" grid grid-cols-1 gap-4 shadow-xl p-4 box-border">
                  <div className="flex flex-col gap-5">
                    <div className="flex flex-row gap-4">
                      <div className="font-bold">Name:</div>
                      <div className="font-semibold">{role?.title}</div>
                    </div>
                    <div className="flex flex-row gap-4">
                      <div className="font-bold">Code:</div>
                      <div className="font-semibold flex flex-row gap-4">
                        <span>{role?.code}</span>{" "}
                      </div>
                    </div>
                    <div className="flex flex-row gap-4">
                      <div className="font-bold">Description:</div>
                      <div className="font-semibold">{role?.description}</div>
                    </div>

                    <div className="flex flex-row gap-4">
                      <div className="font-bold">Active:</div>
                      <div className="font-semibold">
                        <Space>
                          <EsBadge
                            text={!role?.isActive ? "Inactive" : "Active"}
                            type={role?.isActive ? "success" : "error"}
                            className="py-1 px-4"
                          />
                          <EsButton
                            onClick={onActiveAction}
                            text={role?.isActive ? "Inactive" : "Active"}
                            type={!role?.isActive ? "success" : "error"}
                          />
                        </Space>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-500 pt-8">
                    <div className="flex flex-row gap-4 ">
                      <button
                        onClick={onEditAction}
                        className={`px-4 py-1 rounded-sm bg-green-600 hover:bg-green-800 hover:text-white ${
                          !roleAccess?.isEdit ? "cursor-not-allowed" : ""
                        }`}
                      >
                        Edit
                      </button>
                      <button
                        onClick={onRemove}
                        className={`px-4 py-1 rounded-sm bg-red-600 hover:bg-red-800 hover:text-white ${
                          !roleAccess?.isRemove ? "cursor-not-allowed" : ""
                        }`}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 box-border shadow-xl p-4">
                  <div className="font-bold">Role Access:</div>
                  {!isEmptyOrNull(role?.access) ? (
                    <>
                      <AccessTab access={role?.access} roleId={id} />
                    </>
                  ) : (
                    <span>This role has not any Organization</span>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        )}
      </Card>
    </React.Fragment>
  );
};

RoleDetailsCard.propTypes = {
  thunkRole: PropTypes.func.isRequired,
  thunkRemoveRole: PropTypes.func.isRequired,
  thunkUpdateRole: PropTypes.func.isRequired,
  thunkAllRole: PropTypes.func.isRequired,
  thunkToggleActiveRole: PropTypes.func.isRequired,
  roleResp: PropTypes.object,
  roleAccess: PropTypes.object,
  roleResp: PropTypes.object,
  roleUpdateResp: PropTypes.object,
  roleRemoveResp: PropTypes.object,
  activeToggleResp: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    roleResp: state.role.role,
    roleAccess: state.role.roleAccess,
    roleUpdateResp: state.role.update,
    roleRemoveResp: state.role.remove,
    activeToggleResp: state.role.toggleActive,
  };
};

const mapDispatchToProps = {
  thunkRole,
  thunkRemoveRole,
  thunkUpdateRole,
  thunkToggleActiveRole,
};

export default connect(mapStateToProps, mapDispatchToProps)(RoleDetailsCard);
