"use client";

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Card, Col, Form, Row } from "antd";
import {
  thunkStakeholder,
  thunkRemoveStakeholder,
  thunkUpdateStakeholder,
} from "@/src/redux/reducer/stakeholderReducer";
import LoadingContent from "@/src/app/components/utils/loading/LoadingContent";
import { isEmptyOrNull } from "@/src/app/components/utils/Action/esFunc/gen-es/esCheckFunc";
import { connect } from "react-redux";

import EsViewModal from "@/src/app/components/utils/EsUtils/Modal/EsViewModal";
import StakeholderForm from "@/src/Components/Stakeholder/StakeholderForm";
import ConfrimModal from "@/src/app/components/utils/EsUtils/Modal/ConfrimModal";
import { getUpdatedNotification } from "@/src/utils/ui/initNotification";
import { redirect } from "next/navigation";
import CstImage from "../CstView/CstImage";
import { thunkAllStakeholderType } from "@/src/redux/reducer/stakeholderTypeReducer";

const StakeholderDetailsCard = ({
  stakholderResp,
  roleAccess,
  stakholderRemoveResp,
  stakholderUpdateResp,
  stakeTypesResp,
  id,
  ...props
}) => {
  const [form] = Form.useForm();

  const [isOpen, setIsOpen] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [stakeholder, setStakeholder] = useState({});

  const [isOpenConfrimRemove, setIsOpenConfrimRemove] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [stakeholderAccess, setStakeholderAccess] = useState({});
  const [stakeTypes, setStakeTypes] = useState({});

  const [updateKey, setUpdateKey] = useState(
    `${Math.random() * 11148674}-stakholder-update`
  );

  const [deleteKey, setDeleteKey] = useState(
    `${Math.random() * 11148674}-stakholder-delete-cat`
  );

  useEffect(() => {
    if (!isEmptyOrNull(roleAccess)) {
      setStakeholderAccess(roleAccess?.stakeholder);
    }
  }, [roleAccess]);

  useEffect(() => {
    if (!isEmptyOrNull(stakeTypesResp)) {
      setStakeTypes(stakeTypesResp);
    }
  }, [stakeTypesResp]);

  useEffect(() => {
    props.thunkAllStakeholderType();
    props.thunkStakeholder(id);
  }, [id]);

  useEffect(() => {
    if (!isEmptyOrNull(stakholderResp)) {
      setStakeholder(stakholderResp.response);
      setIsLoading(false);
      if (stakholderResp.status) {
        if (isEmptyOrNull(stakholderResp.response)) {
          redirect("/administrator/stakeholders");
        }
      }
    }
  }, [stakholderResp]);

  const onRemove = () => {
    if (stakeholderAccess?.isRemove) {
      setIsOpenConfrimRemove(!isOpenConfrimRemove);
    }
  };

  const onEditAction = () => {
    if (stakeholderAccess?.isEdit) {
      setIsOpen(true);
    }
  };

  const onRemoveAction = () => {
    if (stakeholderAccess?.isRemove) {
      getUpdatedNotification(
        "info",
        deleteKey,
        "Stakeholder removing",
        `Removing '${stakeholder?.name}' Stakeholder`
      );

      props.thunkRemoveStakeholder(id);
      setIsSubmit(true);
    }
  };

  const onUpdateAction = (values) => {
    if (stakeholderAccess?.isEdit) {
      setIsSubmit(true);
      getUpdatedNotification(
        "info",
        updateKey,
        "Sending Stakeholder Update Request...",
        "Please, wait Stakeholder Updating..."
      );
      values.id = id;
      props.thunkUpdateStakeholder(values);
    }
  };

  const onUpdateFailed = (values) => {
    console.log("onUpdateFailed, ", values);
  };

  useEffect(() => {
    if (isSubmit) {
      console.log("Update Response ", stakholderUpdateResp);
      if (stakholderUpdateResp.status) {
        getUpdatedNotification(
          "success",
          updateKey,
          "Sending Stakholder Update Request...",
          stakholderUpdateResp.message
        );
        props.thunkStakeholder(id);
      } else {
        getUpdatedNotification(
          "error",
          updateKey,
          "Sending Stakholder Add Request...",
          stakholderUpdateResp.message
        );
      }
      setIsSubmit(false);
      setIsOpen(false);
    }
  }, [stakholderUpdateResp]);

  useEffect(() => {
    if (isSubmit) {
      if (stakholderRemoveResp.status) {
        getUpdatedNotification(
          "success",
          deleteKey,
          "Sending Stakholder Removed Request...",
          stakholderRemoveResp.message
        );
        redirect("/administrator/stakeholders");
      } else {
        getUpdatedNotification(
          "error",
          deleteKey,
          "Sending Stakholder Removed...",
          stakholderRemoveResp.message
        );
      }
      setIsSubmit(false);
      setIsOpenConfrimRemove(false);
    }
  }, [stakholderRemoveResp]);

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
        <StakeholderForm
          title="Update Stakeholder"
          initForm={form}
          name="stakeholder"
          onSubmitAction={onUpdateAction}
          onFailedAction={onUpdateFailed}
          btnText={"Update"}
          initValues={{ ...stakeholder, stakeType: stakeholder.stakeType?.id }}
          stakeTypes={stakeTypes}
        />
      </EsViewModal>

      <ConfrimModal
        isOpen={isOpenConfrimRemove}
        onConfrim={onRemoveAction}
        onCancel={onRemove}
        title="You want to remove this Brand?"
        content={
          <div className="grid grid-cols-1 gap-2">
            <span>{stakeholder?.name}</span>
            <span>{stakeholder?.description}</span>
          </div>
        }
      />
      <Card title="Stakeholder Details" className="p-0">
        {isLoading ? (
          <LoadingContent isActive={isLoading} />
        ) : (
          <Row>
            <Col span={24} className="font-semibold">
              <div className="grid grid-cols-1 gap-5">
                <div className="flex flex-row gap-3 ">
                  <div className="font-bold">First Name:</div>
                  <div className="font-semibold">{stakeholder?.firstName}</div>
                </div>
                <div className="flex flex-row gap-3 ">
                  <div className="font-bold">Last Name:</div>
                  <div className="font-semibold">{stakeholder?.lastName}</div>
                </div>
                <div className="flex flex-row gap-3 ">
                  <div className="font-bold">Address 1:</div>
                  <div className="font-semibold">{stakeholder?.address1}</div>
                </div>
                <div className="flex flex-row gap-3 ">
                  <div className="font-bold">Address 2:</div>
                  <div className="font-semibold">{stakeholder?.address2}</div>
                </div>
                <div className="flex flex-row gap-3 ">
                  <div className="font-bold">Description:</div>
                  <div className="font-semibold">
                    {stakeholder?.description}
                  </div>
                </div>

                <div className="flex flex-row gap-3 ">
                  <div className="font-bold">Phone No:</div>
                  <div className="font-semibold">{stakeholder?.phoneNo}</div>
                </div>

                <div className="flex flex-row gap-3 ">
                  <div className="font-bold">Gender:</div>
                  <div className="font-semibold">{stakeholder?.gender}</div>
                </div>

                <div className="flex flex-row gap-3 ">
                  <div className="font-bold">Ref. Code:</div>
                  <div className="font-semibold">{stakeholder?.refCode}</div>
                </div>

                <div className="flex flex-row gap-3 ">
                  <div className="font-bold">Stakeholder Type:</div>
                  <div className="font-semibold">
                    {stakeholder?.stakeType?.title}
                  </div>
                </div>
                <div className="flex flex-row gap-3 ">
                  <div className="font-bold">Create:</div>
                  <div className="font-semibold">{stakeholder?.createdAt}</div>
                </div>

                <div className="flex flex-row gap-3 ">
                  <div className="font-bold">Last Updated:</div>
                  <div className="font-semibold">{stakeholder?.updatedAt}</div>
                </div>

                {/* <div className="flex flex-row gap-3 ">
                  <div className="font-bold">Stakeholder Type:</div>
                  <div className="font-semibold">
                    <CstImage
                      altTag={stakeholder?.name}
                      title={stakeholder?.name}
                      height={120}
                      width={120}
                      to={stakeholder?.logoUrl}
                    />{" "}
                  </div>
                </div> */}

                <div className="">
                  <div className="flex flex-row gap-4 ">
                    <button
                      onClick={onEditAction}
                      className={`px-4 py-1 rounded-sm bg-green-600 hover:bg-green-800 hover:text-white ${
                        !stakeholderAccess?.isEdit ? "cursor-not-allowed" : ""
                      }`}
                    >
                      Edit
                    </button>
                    <button
                      onClick={onRemove}
                      className={`px-4 py-1 rounded-sm bg-red-600 hover:bg-red-800 hover:text-white ${
                        !stakeholderAccess?.isRemove ? "cursor-not-allowed" : ""
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

StakeholderDetailsCard.propTypes = {
  thunkAllStakeholderType: PropTypes.func.isRequired,
  thunkStakeholder: PropTypes.func.isRequired,
  thunkRemoveStakeholder: PropTypes.func.isRequired,
  thunkUpdateStakeholder: PropTypes.func.isRequired,
  stakholderResp: PropTypes.object,
  roleAccess: PropTypes.object,
  stakeTypesResp: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    stakholderResp: state.stakeholder.stakeholder,
    roleAccess: state.role.userAccess,
    stakholderUpdateResp: state.stakeholder.update,
    stakholderRemoveResp: state.stakeholder.remove,
    stakeTypesResp: state.stakeType.stakeholderTypes,
  };
};

const mapDispatchToProps = {
  thunkStakeholder,
  thunkRemoveStakeholder,
  thunkUpdateStakeholder,
  thunkAllStakeholderType,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StakeholderDetailsCard);
