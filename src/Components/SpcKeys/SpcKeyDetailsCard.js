"use client";

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Card, Col, Form, Row } from "antd";

import LoadingContent from "@/src/app/components/utils/loading/LoadingContent";
import { isEmptyOrNull } from "@/src/app/components/utils/Action/esFunc/gen-es/esCheckFunc";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckSquare,
  faXmarkSquare,
} from "@fortawesome/free-solid-svg-icons";

import EsViewModal from "@/src/app/components/utils/EsUtils/Modal/EsViewModal";
import spcKeyForm from "@/src/Components/spcKeys/spcKeyForm";
import ConfrimModal from "@/src/app/components/utils/EsUtils/Modal/ConfrimModal";
import { getUpdatedNotification } from "@/src/utils/ui/initNotification";
import { redirect } from "next/navigation";
import CstImage from "../CstView/CstImage";
import {
  thunkAllSpecKey,
  thunkSpecKey,
  thunkRemoveSpecKey,
  thunkUpdateSpecKey,
} from "@/src/redux/reducer/specKeyReducer";
import SpcKeyForm from "@/src/Components/SpcKeys/SpcKeyForm";

const SpcKeyDetailsCard = ({
  spcKeyResp,
  roleAccess,
  spcKeyUpdateResp,
  spcKeyRemoveResp,
  id,
  ...props
}) => {
  const [form] = Form.useForm();
  const [spcKey, setspcKey] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const [isOpenConfrimRemove, setIsOpenConfrimRemove] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [spcKeyAccess, setSpcKeyAccess] = useState({});

  const [spcKeyUpdateKey, setSpcKeyUpdateKey] = useState(
    `${Math.random() * 11148674}-spcKey-update-cat`
  );

  const [deleteKey, setDeleteKey] = useState(
    `${Math.random() * 11148674}-spcKey-delete-cat`
  );

  useEffect(() => {
    if (!isEmptyOrNull(roleAccess)) {
      setSpcKeyAccess(roleAccess["specification-key"]);
    }
  }, [roleAccess]);

  useEffect(() => {
    props.thunkSpecKey(id);
  }, [id]);

  useEffect(() => {
    if (!isEmptyOrNull(spcKeyResp)) {
      setspcKey(spcKeyResp.response);
      setIsLoading(false);
      if (spcKeyResp.status) {
        if (isEmptyOrNull(spcKeyResp.response)) {
          redirect("/administrator/spcKeys");
        }
      }
    }
  }, [spcKeyResp]);

  const onRemove = () => {
    if (spcKeyAccess?.isRemove) {
      setIsOpenConfrimRemove(!isOpenConfrimRemove);
    }
  };

  const onEditAction = () => {
    if (spcKeyAccess?.isEdit) {
      setIsOpen(true);
    }
  };

  const onRemoveAction = () => {
    if (spcKeyAccess?.isRemove) {
      getUpdatedNotification(
        "info",
        deleteKey,
        "spcKey removing",
        `Removing '${spcKey?.name}' spcKey`
      );

      props.thunkRemoveSpecKey(id);
      setIsSubmit(true);
    }
  };

  const onUpdateAction = (values) => {
    if (spcKeyAccess?.isEdit) {
      setIsSubmit(true);
      getUpdatedNotification(
        "info",
        spcKeyUpdateKey,
        "Sending spcKey Update Request...",
        "Please, wait spcKey Updating..."
      );
      values.id = id;

      props.thunkUpdateSpecKey(values);
    }
  };

  const onUpdateFailed = (values) => {
    console.log("onUpdateFailed, ", values);
  };

  useEffect(() => {
    if (isSubmit) {
      console.log("Update Response ", spcKeyUpdateResp);
      if (spcKeyUpdateResp.status) {
        getUpdatedNotification(
          "success",
          spcKeyUpdateKey,
          "Sending spcKey Update Request...",
          spcKeyUpdateResp.message
        );
        props.thunkSpecKey(id);
      } else {
        getUpdatedNotification(
          "error",
          spcKeyUpdateKey,
          "Sending spcKey Add Request...",
          spcKeyUpdateResp.message
        );
      }
      setIsSubmit(false);
      setIsOpen(false);
    }
  }, [spcKeyUpdateResp]);

  useEffect(() => {
    if (isSubmit) {
      if (spcKeyRemoveResp.status) {
        getUpdatedNotification(
          "success",
          deleteKey,
          "Sending spcKey Removed Request...",
          spcKeyRemoveResp.message
        );
        redirect("/administrator/specification-keys");
      } else {
        getUpdatedNotification(
          "error",
          deleteKey,
          "Sending spcKey Removed...",
          spcKeyRemoveResp.message
        );
      }
      setIsSubmit(false);
      setIsOpenConfrimRemove(false);
    }
  }, [spcKeyRemoveResp]);

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
        <SpcKeyForm
          title="Update spcKey"
          initForm={form}
          spcKeys={spcKey}
          name="spcKey"
          onSubmitAction={onUpdateAction}
          onFailedAction={onUpdateFailed}
          btnText={"Update"}
          initValues={spcKey}
        />
      </EsViewModal>

      <ConfrimModal
        isOpen={isOpenConfrimRemove}
        onConfrim={onRemoveAction}
        onCancel={onRemove}
        title="You want to remove this spcKey?"
        content={
          <div className="grid grid-cols-1 gap-2">
            <span>{spcKey?.name}</span>
            <span>{spcKey?.description}</span>
          </div>
        }
      />
      <Card title="Specification Key Details" className="p-0">
        {isLoading ? (
          <LoadingContent isActive={isLoading} />
        ) : (
          <Row>
            <Col span={24} className="font-semibold">
              <div className="grid grid-cols-1 gap-5">
                <div className="flex flex-row gap-3 ">
                  <div className="font-bold">Name:</div>
                  <div className="font-semibold">{spcKey?.name}</div>
                </div>
                <div className="flex flex-row gap-3 ">
                  <div className="font-bold">Value:</div>
                  <div className="font-semibold">{spcKey?.value}</div>
                </div>

                <div className="flex flex-row gap-3 ">
                  <div className="font-bold">Type As No:</div>
                  <div className="font-semibold">{spcKey?.type}</div>
                </div>

                <div className="">
                  <div className="flex flex-row gap-4 ">
                    <button
                      onClick={onEditAction}
                      className={`px-4 py-1 rounded-sm bg-green-600 hover:bg-green-800 hover:text-white ${
                        !spcKeyAccess?.isEdit ? "cursor-not-allowed" : ""
                      }`}
                    >
                      Edit
                    </button>
                    <button
                      onClick={onRemove}
                      className={`px-4 py-1 rounded-sm bg-red-600 hover:bg-red-800 hover:text-white ${
                        !spcKeyAccess?.isRemove ? "cursor-not-allowed" : ""
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

SpcKeyDetailsCard.propTypes = {
  thunkSpecKey: PropTypes.func.isRequired,
  thunkAllSpecKey: PropTypes.func.isRequired,
  thunkUpdateSpecKey: PropTypes.func.isRequired,
  thunkRemoveSpecKey: PropTypes.func.isRequired,
  spcKeyResp: PropTypes.object,
  spcKeyUpdateResp: PropTypes.object,
  roleAccess: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    spcKeyResp: state.spcKey.specKey,
    spcKeysResp: state.spcKey.spcKey,
    roleAccess: state.role.userAccess,
    spcKeyUpdateResp: state.spcKey.update,
    spcKeyRemoveResp: state.spcKey.remove,
  };
};

const mapDispatchToProps = {
  thunkSpecKey,
  thunkAllSpecKey,
  thunkUpdateSpecKey,
  thunkRemoveSpecKey,
};

export default connect(mapStateToProps, mapDispatchToProps)(SpcKeyDetailsCard);
