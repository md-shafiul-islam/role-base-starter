"use client";

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Card, Col, Form, Row } from "antd";
import {
  thunkAllUnit,
  thunkUnit,
  thunkRemoveUnit,
  thunkUpdateUnit,
} from "@/src/redux/reducer/unitReducer";
import LoadingContent from "@/src/app/components/utils/loading/LoadingContent";
import { isEmptyOrNull } from "@/src/app/components/utils/Action/esFunc/gen-es/esCheckFunc";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckSquare,
  faXmarkSquare,
} from "@fortawesome/free-solid-svg-icons";

import EsViewModal from "@/src/app/components/utils/EsUtils/Modal/EsViewModal";
import UnitForm from "@/src/Components/Unit/UnitForm";
import ConfrimModal from "@/src/app/components/utils/EsUtils/Modal/ConfrimModal";
import { getUpdatedNotification } from "@/src/utils/ui/initNotification";
import { redirect } from "next/navigation";

const UnitDetailsCard = ({
  unitResp,
  roleAccess,
  unitsResp,
  unitUpdateResp,
  unitRemoveResp,
  id,
  ...props
}) => {
  const [form] = Form.useForm();
  const [unit, setUnit] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [units, setUnits] = useState([]);

  const [isOpenConfrimRemove, setIsOpenConfrimRemove] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [unitAccess, setUnitAccess] = useState({});

  const [unitUpdateKey, setUnitUpdateKey] = useState(
    `${Math.random() * 11148674}-unit-update-cat`
  );

  const [deleteKey, setDeleteKey] = useState(
    `${Math.random() * 11148674}-unit-delete-cat`
  );

  useEffect(() => {
    if (!isEmptyOrNull(unitsResp)) {
      setUnits(unitsResp);
    } else {
      props.thunkAllUnit();
    }
  }, [unitsResp]);

  useEffect(() => {
    if (!isEmptyOrNull(roleAccess)) {
      setUnitAccess(roleAccess?.unit);
    }
  }, [roleAccess]);

  useEffect(() => {
    props.thunkUnit(id);
  }, [id]);

  useEffect(() => {
    if (!isEmptyOrNull(unitResp)) {
      setUnit(unitResp.response);
      setIsLoading(false);
      if (unitResp.status) {
        if (isEmptyOrNull(unitResp.response)) {
          redirect("/administrator/units");
        }
      }
    }
  }, [unitResp]);

  const onRemove = () => {
    if (unitAccess?.isRemove) {
      setIsOpenConfrimRemove(!isOpenConfrimRemove);
    }
  };

  const onEditAction = () => {
    if (unitAccess?.isEdit) {
      setIsOpen(true);
    }
  };

  const onRemoveAction = () => {
    if (unitAccess?.isRemove) {
      getUpdatedNotification(
        "info",
        deleteKey,
        "Unit removing",
        `Removing '${unit?.name}' Unit`
      );

      props.thunkRemoveUnit(id);
      setIsSubmit(true);
    }
  };

  const onUpdateAction = (values) => {
    if (unitAccess?.isEdit) {
      setIsSubmit(true);
      getUpdatedNotification(
        "info",
        unitUpdateKey,
        "Sending Unit Update Request...",
        "Please, wait Unit Updating..."
      );
      values.id = id;
      props.thunkUpdateUnit(values);
    }
  };

  const onUpdateFailed = (values) => {
    console.log("onUpdateFailed, ", values);
  };

  useEffect(() => {
    if (isSubmit) {
      console.log("Update Response ", unitUpdateResp);
      if (unitUpdateResp.status) {
        getUpdatedNotification(
          "success",
          unitUpdateKey,
          "Sending Unit Update Request...",
          unitUpdateResp.message
        );
        props.thunkUnit(id);
      } else {
        getUpdatedNotification(
          "error",
          unitUpdateKey,
          "Sending Unit Add Request...",
          unitUpdateResp.message
        );
      }
      setIsSubmit(false);
      setIsOpen(false);
    }
  }, [unitUpdateResp]);

  useEffect(() => {
    if (isSubmit) {
      if (unitRemoveResp.status) {
        getUpdatedNotification(
          "success",
          deleteKey,
          "Sending Unit Removed Request...",
          unitRemoveResp.message
        );
        redirect("/administrator/units");
      } else {
        getUpdatedNotification(
          "error",
          deleteKey,
          "Sending Unit Removed...",
          unitRemoveResp.message
        );
      }
      setIsSubmit(false);
      setIsOpenConfrimRemove(false);
    }
  }, [unitRemoveResp]);

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
        <UnitForm
          title="Update Unit"
          initForm={form}
          units={units}
          name="Unit"
          onSubmitAction={onUpdateAction}
          onFailedAction={onUpdateFailed}
          btnText={"Update"}
          initValues={unit}
        />
      </EsViewModal>

      <ConfrimModal
        isOpen={isOpenConfrimRemove}
        onConfrim={onRemoveAction}
        onCancel={onRemove}
        title="You want to remove this Unit?"
        content={
          <div className="grid grid-cols-1 gap-2">
            <span>{unit?.name}</span>
            <span>{unit?.description}</span>
          </div>
        }
      />
      <Card title="Unit Details" className="p-0">
        {isLoading ? (
          <LoadingContent isActive={isLoading} />
        ) : (
          <Row>
            <Col span={24} className="font-semibold">
              <div className="grid grid-cols-1 gap-5">
                <div className="flex flex-row gap-3 ">
                  <div className="font-bold">Name:</div>
                  <div className="font-semibold">{unit?.name}</div>
                </div>
                <div className="flex flex-row gap-3 ">
                  <div className="font-bold">Description:</div>
                  <div className="font-semibold">{unit?.description}</div>
                </div>

                <div className="flex flex-row gap-3 ">
                  <div className="font-bold">Value:</div>
                  <div className="font-semibold">{unit?.value}</div>
                </div>

                <div className="flex flex-row gap-3 ">
                  <div className="font-bold">Num:</div>
                  <div className="font-semibold">{unit?.num}</div>
                </div>

                <div className="flex flex-row gap-3 ">
                  <div className="font-bold">Parent:</div>
                  <div className="font-semibold">{unit?.parentName}</div>
                </div>

                <div className="flex flex-row gap-3 ">
                  <div className="font-bold">Total Value:</div>
                  <div className="font-semibold">{unit?.totalValue}</div>
                </div>

                <div className="flex flex-row gap-3 items-center font-semibold">
                  <div className="font-bold">Is Sub Unit:</div>
                  <div className="font-semibold text-xl flex flex-col ">
                    {unit?.isSub ? (
                      <span className="text-green-700">
                        <FontAwesomeIcon icon={faCheckSquare} />
                      </span>
                    ) : (
                      <span className="text-red-500">
                        <FontAwesomeIcon icon={faXmarkSquare} />
                      </span>
                    )}
                  </div>
                </div>

                <div className="">
                  <div className="flex flex-row gap-4 ">
                    <button
                      onClick={onEditAction}
                      className={`px-4 py-1 rounded-sm bg-green-600 hover:bg-green-800 hover:text-white ${
                        !unitAccess?.isEdit ? "cursor-not-allowed" : ""
                      }`}
                    >
                      Edit
                    </button>
                    <button
                      onClick={onRemove}
                      className={`px-4 py-1 rounded-sm bg-red-600 hover:bg-red-800 hover:text-white ${
                        !unitAccess?.isRemove ? "cursor-not-allowed" : ""
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

UnitDetailsCard.propTypes = {
  thunkUnit: PropTypes.func.isRequired,
  thunkUpdateUnit: PropTypes.func.isRequired,
  thunkRemoveUnit: PropTypes.func.isRequired,
  thunkAllUnit: PropTypes.func.isRequired,
  UnitResp: PropTypes.object,
  UnitUpdateResp: PropTypes.object,
  roleAccess: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    unitResp: state.unit.unit,
    unitsResp: state.unit.units,
    roleAccess: state.role.userAccess,
    unitUpdateResp: state.unit.update,
    unitRemoveResp: state.unit.remove,
  };
};

const mapDispatchToProps = {
  thunkUnit,
  thunkAllUnit,
  thunkUpdateUnit,
  thunkRemoveUnit,
};

export default connect(mapStateToProps, mapDispatchToProps)(UnitDetailsCard);
