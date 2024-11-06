"use client";

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Card, Col, Form, Row } from "antd";
import {
  thunkAddStakeholderType,
  thunkAllStakeholderType,
  thunkRemoveStakeholderType,
  thunkStakeholderType,
  thunkUpdateStakeholderType,
} from "@/src/redux/reducer/stakeholderTypeReducer";

import LoadingContent from "@/src/app/components/utils/loading/LoadingContent";
import { isEmptyOrNull } from "@/src/app/components/utils/Action/esFunc/gen-es/esCheckFunc";
import { connect } from "react-redux";

import EsViewModal from "@/src/app/components/utils/EsUtils/Modal/EsViewModal";
import StakeholderTypeForm from "@/src/Components/StakeholderType/StakeholderTypeForm";
import ConfrimModal from "@/src/app/components/utils/EsUtils/Modal/ConfrimModal";
import { getUpdatedNotification } from "@/src/utils/ui/initNotification";
import { redirect } from "next/navigation";
import CstImage from "@/src/Components/CstView/CstImage";

const StakeholderTypeDetailsCard = ({
  stakeTypeResp,
  roleAccess,
  stakeTypeUpdateResp,
  stakeTypeRemoveResp,
  id,
  ...props
}) => {
  const [form] = Form.useForm();
  const [stakeType, setStakeType] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const [isOpenConfrimRemove, setIsOpenConfrimRemove] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const [stakeTypeUpdateKey, setStakeTypeUpdateKey] = useState(
    `${Math.random() * 11148674}-stakeholder-type-update-cat`
  );

  const [deleteKey, setDeleteKey] = useState(
    `${Math.random() * 11148674}-stakeholder-type-delete-cat`
  );

  useEffect(() => {
    props.thunkStakeholderType(id);
  }, [id]);

  useEffect(() => {
    console.log("stakeTypeResp, ", stakeTypeResp);
    if (!isEmptyOrNull(stakeTypeResp)) {
      setStakeType(stakeTypeResp.response);
      setIsLoading(false);
      if (stakeTypeResp.status) {
        if (isEmptyOrNull(stakeTypeResp.response)) {
          redirect("/administrator/StakeTypes");
        }
      }
    }
  }, [stakeTypeResp]);

  const onRemove = () => {
    setIsOpenConfrimRemove(!isOpenConfrimRemove);
  };

  const onEditAction = () => {
    setIsOpen(true);
  };

  const onRemoveAction = () => {
    getUpdatedNotification(
      "info",
      deleteKey,
      "StakeType removing",
      `Removing '${stakeType?.name}' StakeType`
    );

    props.thunkRemoveStakeholderType(id);
    setIsSubmit(true);
  };

  const onUpdateAction = (values) => {
    setIsSubmit(true);
    getUpdatedNotification(
      "info",
      stakeTypeUpdateKey,
      "Sending StakeType Update Request...",
      "Please, wait StakeType Updating..."
    );
    values.id = id;
    props.thunkUpdateStakeholderType(values);
  };

  const onUpdateFailed = (values) => {
    console.log("onUpdateFailed, ", values);
  };

  useEffect(() => {
    if (isSubmit) {
      console.log("Update Response ", stakeTypeUpdateResp);
      if (stakeTypeUpdateResp.status) {
        getUpdatedNotification(
          "success",
          stakeTypeUpdateKey,
          "Sending StakeType Update Request...",
          stakeTypeUpdateResp.message
        );
        props.thunkStakeholderType(id);
      } else {
        getUpdatedNotification(
          "error",
          stakeTypeUpdateKey,
          "Sending StakeType Add Request...",
          stakeTypeUpdateResp.message
        );
      }
      setIsSubmit(false);
      setIsOpen(false);
    }
  }, [stakeTypeUpdateResp]);

  useEffect(() => {
    if (isSubmit) {
      if (stakeTypeRemoveResp.status) {
        getUpdatedNotification(
          "success",
          deleteKey,
          "Sending StakeType Removed Request...",
          stakeTypeRemoveResp.message
        );
        redirect("/administrator/stakeholders/types");
      } else {
        getUpdatedNotification(
          "error",
          deleteKey,
          "Sending StakeType Removed...",
          stakeTypeRemoveResp.message
        );
      }
      setIsSubmit(false);
      setIsOpenConfrimRemove(false);
    }
  }, [stakeTypeRemoveResp]);

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
        <StakeholderTypeForm
          title="Update Stakeholder Type"
          initForm={form}
          name="stakeholderType"
          onSubmitAction={onUpdateAction}
          onFailedAction={onUpdateFailed}
          btnText={"Update"}
          initValues={stakeType}
        />
      </EsViewModal>

      <ConfrimModal
        isOpen={isOpenConfrimRemove}
        onConfrim={onRemoveAction}
        onCancel={onRemove}
        title="You want to remove this StakeType?"
        content={
          <div className="grid grid-cols-1 gap-2">
            <span>{stakeType?.name}</span>
            <span>{stakeType?.description}</span>
          </div>
        }
      />
      <Card title="StakeType Details" className="p-0">
        {isLoading ? (
          <LoadingContent isActive={isLoading} />
        ) : (
          <Row>
            <Col span={24} className="font-semibold">
              <div className="grid grid-cols-1 gap-5">
                <div className="flex flex-row gap-3 ">
                  <div className="font-bold">Title:</div>
                  <div className="font-semibold">{stakeType?.title}</div>
                </div>
                <div className="flex flex-row gap-3 ">
                  <div className="font-bold">Value:</div>
                  <div className="font-semibold">{stakeType?.value}</div>
                </div>

                <div className="">
                  <div className="flex flex-row gap-4 ">
                    <button
                      onClick={onEditAction}
                      className={`px-4 py-1 rounded-sm bg-green-600 hover:bg-green-800 hover:text-white`}
                    >
                      Edit
                    </button>
                    <button
                      onClick={onRemove}
                      className={`px-4 py-1 rounded-sm bg-red-600 hover:bg-red-800 hover:text-white`}
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

StakeholderTypeDetailsCard.propTypes = {
  thunkStakeholderType: PropTypes.func.isRequired,
  thunkUpdateStakeholderType: PropTypes.func.isRequired,
  thunkRemoveStakeholderType: PropTypes.func.isRequired,
  stakeTypeResp: PropTypes.object,
  stakeTypeUpdateResp: PropTypes.object,
  stakeTypeRemoveResp: PropTypes.object,
  roleAccess: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    stakeTypeResp: state.stakeType.stakeholderType,
    roleAccess: state.role.userAccess,
    stakeTypeUpdateResp: state.stakeType.update,
    stakeTypeRemoveResp: state.stakeType.remove,
  };
};

const mapDispatchToProps = {
  thunkStakeholderType,
  thunkUpdateStakeholderType,
  thunkRemoveStakeholderType,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StakeholderTypeDetailsCard);
