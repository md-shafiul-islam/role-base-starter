"use client";

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Card, Col, Form, Row, Space } from "antd";
import {
  thunkUser,
  thunkRemoveUser,
  thunkUpdateUser,
  thunkUserActiveToggle,
  thunkUserVerify,
  thunkCreateStakeholderByUser,
} from "@/src/redux/reducer/userReducer";
import LoadingContent from "@/src/app/components/utils/loading/LoadingContent";
import { isEmptyOrNull } from "@/src/app/components/utils/Action/esFunc/gen-es/esCheckFunc";
import { connect } from "react-redux";

import EsDateFormat from "@/src/Components/EsUtils/EsDateFormat";
import EsButton from "@/src/Components/EsUtils/EsButton";
import EsBadge from "@/src/Components/EsUtils/EsBadge";
import EsViewModal from "@/src/app/components/utils/EsUtils/Modal/EsViewModal";
import UserForm from "@/src/Components/User/UserForm";
import ConfrimModal from "@/src/app/components/utils/EsUtils/Modal/ConfrimModal";
import { getUpdatedNotification } from "@/src/utils/ui/initNotification";
import { redirect } from "next/navigation";
import CstImage from "../CstView/CstImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckSquare,
  faXmarkSquare,
} from "@fortawesome/free-solid-svg-icons";
import AddOrgToUserForm from "@/src/Components/User/AddOrgToUserForm";
import { thunkAllRole } from "@/src/redux/reducer/roleReducer";

const UserDetailsCard = ({
  userResp,
  rolesResp,
  roleAccess,
  userRemoveResp,
  userUpdateResp,
  stakeTypesResp,
  activeToggleResp,
  verifyResp,
  createStakeResp,
  id,
  ...props
}) => {
  const [form] = Form.useForm();

  const [isOpen, setIsOpen] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [user, setUser] = useState({});

  const [isOpenConfrimRemove, setIsOpenConfrimRemove] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [userAccess, setUserAccess] = useState({});
  const [roles, setRoles] = useState([]);

  const [activeKey, setActiveKey] = useState(
    `${Math.random() * 111468948674}-active-user-update`
  );

  const [verifyKey, setVerifyKey] = useState(
    `${Math.random() * 7845124}-verify-user-update`
  );

  const [updateKey, setUpdateKey] = useState(
    `${Math.random() * 11148674}-user-update`
  );

  const [deleteKey, setDeleteKey] = useState(
    `${Math.random() * 11148674}-user-delete-cat`
  );
  const [createStakeKey, setCreateStakeKey] = useState(
    `${Math.random() * 8665458474}-user-stakeholder`
  );

  useEffect(() => {
    props.thunkAllRole();
  }, []);

  useEffect(() => {
    if (!isEmptyOrNull(rolesResp)) {
      setRoles(rolesResp);
    }
  }, [rolesResp]);

  useEffect(() => {
    if (!isEmptyOrNull(roleAccess)) {
      setUserAccess(roleAccess?.user);
    }
  }, [roleAccess]);

  useEffect(() => {
    props.thunkUser(id);
  }, [id]);

  useEffect(() => {
    if (!isEmptyOrNull(userResp)) {
      setUser(userResp.response);
      setIsLoading(false);
      if (userResp.status) {
        if (isEmptyOrNull(userResp.response)) {
          redirect("/administrator/users");
        }
      }
    }
  }, [userResp]);

  const onRemove = () => {
    if (userAccess?.isRemove) {
      setIsOpenConfrimRemove(!isOpenConfrimRemove);
    }
  };

  const onEditAction = () => {
    if (userAccess?.isEdit) {
      setIsOpen(true);
    }
  };

  const onRemoveAction = () => {
    if (userAccess?.isRemove) {
      getUpdatedNotification(
        "info",
        deleteKey,
        "User removing",
        `Removing '${user?.name}' User`
      );

      props.thunkRemoveUser(id);
      setIsSubmit(true);
    }
  };

  const onUpdateAction = (values) => {
    if (userAccess?.isEdit) {
      setIsSubmit(true);
      getUpdatedNotification(
        "info",
        updateKey,
        "Sending User Update Request...",
        "Please, wait User Updating..."
      );
      values.id = id;
      props.thunkUpdateUser(values);
    }
  };

  const onUpdateFailed = (values) => {
    console.log("onUpdateFailed, ", values);
  };

  useEffect(() => {
    if (isSubmit) {
      if (userUpdateResp.status) {
        getUpdatedNotification(
          "success",
          updateKey,
          "Sending user Update Request...",
          userUpdateResp.message
        );
        props.thunkUser(id);
      } else {
        getUpdatedNotification(
          "error",
          updateKey,
          "Sending user Add Request...",
          userUpdateResp.message
        );
      }
      setIsSubmit(false);
      setIsOpen(false);
    }
  }, [userUpdateResp]);

  useEffect(() => {
    if (isSubmit) {
      if (userRemoveResp.status) {
        getUpdatedNotification(
          "success",
          deleteKey,
          "Sending user Removed Request...",
          userRemoveResp.message
        );
      } else {
        getUpdatedNotification(
          "error",
          deleteKey,
          "Sending user Removed...",
          userRemoveResp.message
        );
      }
      setIsSubmit(false);
      setIsOpenConfrimRemove(false);
    }
  }, [userRemoveResp]);

  const onVerifyAction = () => {
    props.thunkUserVerify({ id: user?.id, verify: true });
    getUpdatedNotification("info", verifyKey, "Please, wait User Verifing ...");
    setIsSubmit(true);
  };

  const onActiveAction = () => {
    props.thunkUserActiveToggle({ id: user?.id, active: true });
    getUpdatedNotification(
      "info",
      activeKey,
      `Please, wait User ${user?.isActive ? "Deactivating" : "Activating"} `
    );
    setIsSubmit(true);
  };

  useEffect(() => {
    if (isSubmit && !isEmptyOrNull(activeToggleResp)) {
      if (activeToggleResp.status) {
        getUpdatedNotification(
          "success",
          activeKey,
          `Please, User ${user?.isActive ? "Deactivate" : "Activated"} :) `
        );
        props.thunkUser(id);
      } else {
        getUpdatedNotification(
          "error",
          activeKey,
          `Failed to  ${user?.isActive ? "Deactivate" : "Activated"}  User !!`
        );
      }
      setIsSubmit(false);
    }
  }, [activeToggleResp]);

  useEffect(() => {
    console.log("User verifyResp, ", verifyResp);
    if (isSubmit && !isEmptyOrNull(verifyResp)) {
      if (verifyResp.status) {
        props.thunkUser(id);
        getUpdatedNotification("success", verifyKey, verifyResp.message);
      } else {
        getUpdatedNotification("error", verifyKey, verifyResp.message);
      }
      setIsSubmit(false);
    }
  }, [verifyResp]);

  const onCreateStakeholder = () => {
    props.thunkCreateStakeholderByUser(user?.id);
    getUpdatedNotification(
      "info",
      createStakeKey,
      "Wait creating 'Stakeholder' ..."
    );
    setIsSubmit(true);
  };

  useEffect(() => {
    if (isSubmit && !isEmptyOrNull(createStakeResp)) {
      if (createStakeResp.status) {
        getUpdatedNotification(
          "success",
          createStakeKey,
          createStakeResp.message
        );
        props.thunkUser(id);
      } else {
        getUpdatedNotification(
          "error",
          createStakeKey,
          createStakeResp.message
        );
      }

      setIsSubmit(false);
    }
  }, [createStakeResp]);

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
        <UserForm
          title="Update User"
          initForm={form}
          name="User"
          onSubmitAction={onUpdateAction}
          onFailedAction={onUpdateFailed}
          btnText={"Update"}
          initValues={{ ...user, role: user?.role?.publicId }}
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
            <span>Name: {user?.name}</span>
            <span>Email: {user?.email}</span>
            <span>Phone No: {user?.phoneNo}</span>
          </div>
        }
      />
      <Card
        title="User Details"
        className="p-0"
        extra={
          !user.hasStakholder ? (
            <EsButton
              text="Create Stakeholder"
              onClick={onCreateStakeholder}
              type="success"
            />
          ) : (
            <span className="bg-green-600 py-2 px-4 text-white font-medium">
              Stakeholder Created
            </span>
          )
        }
      >
        {isLoading ? (
          <LoadingContent isActive={isLoading} />
        ) : (
          <Row>
            <Col span={24} className="font-semibold">
              <div className="grid grid-cols-2 gap-5">
                <div className=" grid grid-cols-1 gap-4 shadow-xl p-4 box-border">
                  <div className="flex flex-row gap-3 ">
                    <div className="font-bold">Name:</div>
                    <div className="font-semibold">{user?.name}</div>
                  </div>
                  <div className="flex flex-row gap-3 ">
                    <div className="font-bold">Email:</div>
                    <div className="font-semibold flex flex-row gap-4">
                      <span>{user?.email}</span>{" "}
                      <span
                        className={`${
                          user?.isEmailVerified
                            ? "text-green-700"
                            : "text-red-500"
                        }`}
                      >
                        <FontAwesomeIcon
                          icon={
                            user?.isEmailVerified
                              ? faCheckSquare
                              : faXmarkSquare
                          }
                        />
                      </span>{" "}
                      <span>
                        {user?.isEmailVerified ? (
                          <EsButton
                            onClick={onVerifyAction}
                            text="Verify"
                            type="success"
                          />
                        ) : (
                          ""
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-row gap-3 ">
                    <div className="font-bold">Phone No:</div>
                    <div className="font-semibold">{user?.phoneNo}</div>
                  </div>
                  <div className="flex flex-row gap-3 ">
                    <div className="font-bold">User Name:</div>
                    <div className="font-semibold">{user?.userName}</div>
                  </div>
                  <div className="flex flex-row gap-3 ">
                    <div className="font-bold">Role:</div>
                    <div className="font-semibold">{user?.role?.title}</div>
                  </div>

                  <div className="flex flex-row gap-3 ">
                    <div className="font-bold">Create:</div>
                    <div className="font-semibold">
                      {" "}
                      <EsDateFormat date={user?.createdAt} />
                    </div>
                  </div>

                  <div className="flex flex-row gap-3 ">
                    <div className="font-bold">Last Updated:</div>
                    <div className="font-semibold">
                      <EsDateFormat date={user?.updatedAt} />
                    </div>
                  </div>

                  <div className="flex flex-row gap-3 items-center ">
                    <div className="font-bold">Verified:</div>
                    <div className="font-semibold">
                      {!user?.isVerified ? (
                        <EsButton
                          onClick={onVerifyAction}
                          text="User Verify"
                          type="success"
                        />
                      ) : (
                        <span className="text-xl">
                          {" "}
                          <span className="text-green-500">
                            <FontAwesomeIcon icon={faCheckSquare} />{" "}
                          </span>{" "}
                          Yes
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-row gap-3 items-center ">
                    <div className="font-bold">Active:</div>
                    <div className="font-semibold">
                      <Space>
                        <EsBadge
                          text={!user?.isActive ? "Inactive" : "Active"}
                          type={user?.isActive ? "success" : "error"}
                          className="py-1 px-4"
                        />
                        <EsButton
                          onClick={onActiveAction}
                          text={user?.isActive ? "Inactive" : "Active"}
                          type={!user?.isActive ? "success" : "error"}
                        />
                      </Space>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 box-border shadow-xl p-4">
                  <div className="font-bold">Organization:</div>
                  {!isEmptyOrNull(user?.organization) ? (
                    <>
                      <div className="font-semibold">
                        <div className="flex flex-col gap-2 font-medium">
                          <div className="flex flex-row gap-2">
                            <div className="font-bold">Name:</div>
                            <div className="">{user?.organization?.name}</div>
                          </div>
                          <div className="flex flex-row flex-wrap gap-2">
                            <div className="font-bold">Email:</div>
                            <div className="">{user?.organization?.email}</div>
                          </div>
                          <div className="flex flex-row gap-2">
                            <div className="font-bold">Phone No:</div>
                            <div className="">
                              {user?.organization?.phoneNo}
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <span>This User has not any Organization</span>
                  )}
                </div>

                <div className="">
                  <div className="flex flex-row gap-4 ">
                    <button
                      onClick={onEditAction}
                      className={`px-4 py-1 rounded-sm bg-green-600 hover:bg-green-800 hover:text-white ${
                        !userAccess?.isEdit ? "cursor-not-allowed" : ""
                      }`}
                    >
                      Edit
                    </button>
                    <button
                      onClick={onRemove}
                      className={`px-4 py-1 rounded-sm bg-red-600 hover:bg-red-800 hover:text-white ${
                        !userAccess?.isRemove ? "cursor-not-allowed" : ""
                      }`}
                    >
                      Remove
                    </button>
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

UserDetailsCard.propTypes = {
  thunkAllUserType: PropTypes.func.isRequired,
  thunkUser: PropTypes.func.isRequired,
  thunkRemoveUser: PropTypes.func.isRequired,
  thunkUpdateUser: PropTypes.func.isRequired,
  thunkAllRole: PropTypes.func.isRequired,
  thunkUserActiveToggle: PropTypes.func.isRequired,
  thunkUserVerify: PropTypes.func.isRequired,
  thunkCreateStakeholderByUser: PropTypes.func.isRequired,
  userResp: PropTypes.object,
  roleAccess: PropTypes.object,
  rolesResp: PropTypes.object,
  userUpdateResp: PropTypes.object,
  userRemoveResp: PropTypes.object,
  activeToggleResp: PropTypes.object,
  verifyResp: PropTypes.object,
  createStakeResp: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    userResp: state.user.user,
    roleAccess: state.role.userAccess,
    rolesResp: state.role.roles,
    userUpdateResp: state.user.update,
    userRemoveResp: state.user.remove,
    activeToggleResp: state.user.toggleActive,
    verifyResp: state.user.verify,
    createStakeResp: state.user.createStake,
  };
};

const mapDispatchToProps = {
  thunkUser,
  thunkRemoveUser,
  thunkUpdateUser,
  thunkAllRole,
  thunkUserActiveToggle,
  thunkUserVerify,
  thunkCreateStakeholderByUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailsCard);
