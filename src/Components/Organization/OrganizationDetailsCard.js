"use client";

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Card, Col, Form, Row, Space } from "antd";
import {
  thunkOrganization,
  thunkOrganizationToggleActive,
  thunkOrganizationVerify,
  thunkRemoveOrganization,
  thunkUpdateOrganization,
  thunkUserAddOrganization,
} from "@/src/redux/reducer/organizationReducer";
import LoadingContent from "@/src/app/components/utils/loading/LoadingContent";
import { isEmptyOrNull } from "@/src/app/components/utils/Action/esFunc/gen-es/esCheckFunc";
import { connect } from "react-redux";

import EsButton from "@/src/Components/EsUtils/EsButton";
import EsViewModal from "@/src/app/components/utils/EsUtils/Modal/EsViewModal";
import ConfrimModal from "@/src/app/components/utils/EsUtils/Modal/ConfrimModal";
import { getUpdatedNotification } from "@/src/utils/ui/initNotification";
import { redirect } from "next/navigation";
import CstImage from "../CstView/CstImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckSquare,
  faXmarkSquare,
} from "@fortawesome/free-solid-svg-icons";

import OrganizationForm from "@/src/Components/Organization/OrganizationForm";
import AddUserToOrganizationForm from "@/src/Components/Organization/AddUserToOrganizationForm";
import EsBadge from "../EsUtils/EsBadge";

const OrganizationDetailsCard = ({
  organizationResp,
  roleAccess,
  removeOrganizationResp,
  updateOrganizationResp,
  stakeTypesResp,
  userOrganizationResp,
  toggleResp,
  verifyResp,
  id,
  ...props
}) => {
  const [form] = Form.useForm();

  const [isOpen, setIsOpen] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [userAddKey, setUserAddKey] = useState(
    `${Math.random() * 5879421546}-organization-add-user-update`
  );

  const [toggleKey, setToggleKey] = useState(
    `${Math.random() * 987455845446}-organization-toogle-active`
  );

  const [verifyKey, setVerifyKey] = useState(
    `${Math.random() * 59874124546}-organization-verifyKey-update`
  );

  const [organization, setOrganization] = useState({});

  const [isOpenConfrimRemove, setIsOpenConfrimRemove] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [isOpenAddUser, setIsOpenAddUser] = useState(false);
  const [organizationAccess, setOrganizationAccess] = useState({});

  const [updateKey, setUpdateKey] = useState(
    `${Math.random() * 11148674}-organization-update`
  );

  const [deleteKey, setDeleteKey] = useState(
    `${Math.random() * 11148674}-organization-delete-cat`
  );

  useEffect(() => {
    if (!isEmptyOrNull(roleAccess)) {
      setOrganizationAccess(roleAccess?.organization);
    }
  }, [roleAccess]);

  useEffect(() => {
    props.thunkOrganization(id);
  }, [id]);

  useEffect(() => {
    if (!isEmptyOrNull(organizationResp)) {
      setOrganization(organizationResp.response);
      setIsLoading(false);
      if (organizationResp.status) {
        if (isEmptyOrNull(organizationResp.response)) {
          redirect("/administrator/organizations");
        }
      }
    }
  }, [organizationResp]);

  const onRemove = () => {
    if (organizationAccess?.isRemove) {
      setIsOpenConfrimRemove(!isOpenConfrimRemove);
    }
  };

  const onEditAction = () => {
    if (organizationAccess?.isEdit) {
      setIsOpen(true);
    }
  };

  const onRemoveAction = () => {
    if (organizationAccess?.isRemove) {
      getUpdatedNotification(
        "info",
        deleteKey,
        "organization removing",
        `Removing '${organization?.name}' organization`
      );

      props.thunkRemoveOrganization(id);
      setIsSubmit(true);
    }
  };

  const onUpdateAction = (values) => {
    if (organizationAccess?.isEdit) {
      setIsSubmit(true);
      getUpdatedNotification(
        "info",
        updateKey,
        "Sending organization Update Request...",
        "Please, wait organization Updating..."
      );
      values.id = id;
      props.thunkUpdateOrganization(values);
    }
  };

  const onUpdateFailed = (values) => {
    console.log("onUpdateFailed, ", values);
  };

  useEffect(() => {
    if (isSubmit) {
      if (updateOrganizationResp.status) {
        getUpdatedNotification(
          "success",
          updateKey,
          "Sending organization Update Request...",
          updateOrganizationResp.message
        );
        props.thunkOrganization(id);
      } else {
        getUpdatedNotification(
          "error",
          updateKey,
          "Sending organization Add Request...",
          updateOrganizationResp.message
        );
      }
      setIsSubmit(false);
      setIsOpen(false);
    }
  }, [updateOrganizationResp]);

  useEffect(() => {
    if (isSubmit) {
      if (removeOrganizationResp.status) {
        getUpdatedNotification(
          "success",
          deleteKey,
          "Sending organization Removed Request...",
          removeOrganizationResp.message
        );
        redirect("/administrator/organizations");
      } else {
        getUpdatedNotification(
          "error",
          deleteKey,
          "Sending organization Removed...",
          removeOrganizationResp.message
        );
      }
      setIsSubmit(false);
      setIsOpenConfrimRemove(false);
    }
  }, [removeOrganizationResp]);

  const onAddUser = () => {
    setIsOpenAddUser(!isOpenAddUser);
  };

  const onAddUserAction = (values) => {
    values.id = organization?.id;

    getUpdatedNotification("info", userAddKey, "Organization user adding...");

    props.thunkUserAddOrganization(values);
    setIsSubmit(true);
  };

  const onFailedAddUserAction = () => {
    console.log("onFailedAddUserAction !!");
  };

  useEffect(() => {
    if (!isEmptyOrNull(userOrganizationResp) && isSubmit) {
      if (userOrganizationResp.status) {
        getUpdatedNotification(
          "success",
          userAddKey,
          userOrganizationResp.message
        );
        setIsOpenAddUser(false);
      } else {
        getUpdatedNotification(
          "error",
          userAddKey,
          userOrganizationResp.message
        );
      }

      setIsSubmit(false);
    }
  }, [userOrganizationResp]);

  const onOrganizationVerify = () => {
    setIsSubmit(true);
    getUpdatedNotification("info", verifyKey, "Verifing. Plesae wait...");
    props.thunkOrganizationVerify({ id: organization?.id, verify: true });
  };

  const onOrganizationToggleActive = () => {
    setIsSubmit(true);
    getUpdatedNotification(
      "info",
      toggleKey,
      "Active toggling. Plesae wait..."
    );

    props.thunkOrganizationToggleActive({ id: organization?.id, active: true });
  };

  useEffect(() => {
    if (!isEmptyOrNull(toggleResp) && isSubmit) {
      if (toggleResp.status) {
        getUpdatedNotification("success", toggleKey, toggleResp.message);
        props.thunkOrganization(id);
      } else {
        getUpdatedNotification("error", toggleKey, toggleResp.message);
      }
      setIsSubmit(false);
    }
  }, [toggleResp]);

  useEffect(() => {
    if (!isEmptyOrNull(verifyResp) && isSubmit) {
      if (verifyResp.status) {
        getUpdatedNotification("success", verifyKey, verifyResp.message);
        props.thunkOrganization(id);
      } else {
        getUpdatedNotification("error", verifyKey, verifyResp.message);
      }
      setIsSubmit(false);
    }
  }, [verifyResp]);

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
        <OrganizationForm
          title="Update Organization"
          initForm={form}
          name="organization"
          onSubmitAction={onUpdateAction}
          onFailedAction={onUpdateFailed}
          btnText={"Update"}
          initValues={organization}
        />
      </EsViewModal>

      <EsViewModal
        isOpen={isOpenAddUser}
        handleOk={onAddUser}
        btnName="Close"
        isClosable={false}
      >
        <AddUserToOrganizationForm
          title="Add User to organization"
          name="addOrganization"
          onSubmitAction={onAddUserAction}
          onFailedAction={onFailedAddUserAction}
          btnText={"Add Organization"}
          selectUsers={organization.users}
        />
      </EsViewModal>

      <ConfrimModal
        isOpen={isOpenConfrimRemove}
        onConfrim={onRemoveAction}
        onCancel={onRemove}
        title="You want to remove this Brand?"
        content={
          <div className="grid grid-cols-1 gap-2 font-medium">
            <span>Name: {organization?.name}</span>
            <span>Email: {organization?.email}</span>
            <span>Phone No: {organization?.phoneNo}</span>
          </div>
        }
      />
      <Card
        title="organization Details"
        className="p-0"
        extra={<EsButton text="Add ORG" type="success" onClick={onAddUser} />}
      >
        {isLoading ? (
          <LoadingContent isActive={isLoading} />
        ) : (
          <Row>
            <Col span={24} className="font-semibold">
              <div className="grid grid-cols-2 gap-6">
                <div className="grid grid-cols-1 gap-6 box-border shadow-xl p-4">
                  <div className="flex flex-row gap-3 ">
                    <div className="font-bold">Organization Name:</div>
                    <div className="font-semibold">{organization?.name}</div>
                  </div>
                  <div className="flex flex-row gap-3 ">
                    <div className="font-bold">Email:</div>
                    <div className="font-semibold flex flex-row gap-4">
                      <span>{organization?.email}</span>{" "}
                    </div>
                  </div>
                  <div className="flex flex-row gap-3 ">
                    <div className="font-bold">Phone No:</div>
                    <div className="font-semibold">{organization?.phoneNo}</div>
                  </div>

                  <div className="flex flex-row gap-3 ">
                    <div className="font-bold">Trade License:</div>
                    <div className="font-semibold">
                      {organization?.tradeLicense}
                    </div>
                  </div>

                  <div className="flex flex-row gap-3 ">
                    <div className="font-bold">Active:</div>
                    <div className="font-semibold">
                      <Space>
                        <EsBadge
                          text={!organization?.isActive ? "InActive" : "Active"}
                          type={organization?.isActive ? "success" : "error"}
                          className="py-1 px-4"
                        />

                        <EsButton
                          icon={
                            <FontAwesomeIcon
                              icon={
                                !organization?.isActive
                                  ? faCheckSquare
                                  : faXmarkSquare
                              }
                            />
                          }
                          onClick={onOrganizationToggleActive}
                          text={organization?.isActive ? "InActive" : "Active"}
                          type={!organization?.isActive ? "success" : "error"}
                        />
                      </Space>
                    </div>
                  </div>

                  <div className="flex flex-row gap-3 ">
                    <div className="font-bold">Verified:</div>
                    <div className="font-semibold">
                      <span
                        className={`${
                          organization?.isVerified
                            ? "text-green-700"
                            : "text-red-500"
                        }`}
                      >
                        {organization?.isVerified ? "Yes" : "No"}&nbsp;
                        <FontAwesomeIcon
                          icon={
                            organization?.isVerified
                              ? faCheckSquare
                              : faXmarkSquare
                          }
                        />
                      </span>{" "}
                      <span>
                        {!organization?.isVerified ? (
                          <EsButton
                            onClick={onOrganizationVerify}
                            text="Verify"
                            type="success"
                          />
                        ) : (
                          ""
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="">
                    <div className="flex flex-row gap-4 ">
                      <button
                        onClick={onEditAction}
                        className={`px-4 py-1 rounded-sm bg-green-600 hover:bg-green-800 hover:text-white ${
                          !organizationAccess?.isEdit
                            ? "cursor-not-allowed"
                            : ""
                        }`}
                      >
                        Edit
                      </button>
                      <button
                        onClick={onRemove}
                        className={`px-4 py-1 rounded-sm bg-red-600 hover:bg-red-800 hover:text-white ${
                          !organizationAccess?.isRemove
                            ? "cursor-not-allowed"
                            : ""
                        }`}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-6 box-border shadow-xl p-4">
                  <div className="font-bold">
                    User{organization.users.length > 1 ? "'s" : ""} :
                  </div>
                  <div className="font-semibold grid grid-cols-2 gap-5">
                    {organization.users?.length > 0 ? (
                      <>
                        {organization.users?.map((user) => {
                          return (
                            <div className="flex flex-col gap-2">
                              <div className="flex flex-row">
                                <div className="">Name:</div>
                                <div className="">{user?.name}</div>
                              </div>
                              <div className="flex flex-row flex-wrap">
                                <div className="">Email:</div>
                                <div className="">{user?.email}</div>
                              </div>
                              <div className="flex flex-row">
                                <div className="">Phone No:</div>
                                <div className="">{user?.phoneNo}</div>
                              </div>
                            </div>
                          );
                        })}
                      </>
                    ) : (
                      <span>User Not set yet</span>
                    )}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        )}
      </Card>
    </React.Fragment>
  );
};

OrganizationDetailsCard.propTypes = {
  thunkUserAddOrganization: PropTypes.func.isRequired,
  thunkOrganization: PropTypes.func.isRequired,
  thunkRemoveOrganization: PropTypes.func.isRequired,
  thunkUpdateOrganization: PropTypes.func.isRequired,
  organizationResp: PropTypes.object,
  updateOrganizationResp: PropTypes.object,
  removeOrganizationResp: PropTypes.object,
  roleAccess: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    organizationResp: state.organization.organization,
    roleAccess: state.role.userAccess,
    updateOrganizationResp: state.organization.update,
    removeOrganizationResp: state.organization.remove,
    userOrganizationResp: state.organization.addUser,
    toggleResp: state.organization.toggle,
    verifyResp: state.organization.verify,
  };
};

const mapDispatchToProps = {
  thunkOrganization,
  thunkRemoveOrganization,
  thunkUpdateOrganization,
  thunkUserAddOrganization,
  thunkOrganizationToggleActive,
  thunkOrganizationVerify,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrganizationDetailsCard);
