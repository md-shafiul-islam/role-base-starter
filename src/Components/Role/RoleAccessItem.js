"use client";

import {
  faCheckSquare,
  faPenSquare,
  faPenToSquare,
  faXmarkSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import IconItem from "@/src/Components/Role/IconItem";
import { connect } from "react-redux";

import PropTypes from "prop-types";
import {
  thunkRole,
  thunkRoleAccess,
  thunkUpdateRoleAccessItem,
} from "@/src/redux/reducer/roleReducer";
import EsViewModal from "@/src/app/components/utils/EsUtils/Modal/EsViewModal";
import EsButton from "../EsUtils/EsButton";
import UpdateRoleAccessForm from "@/src/Components/Role/UpdateRoleAccessForm";
import { Form } from "antd";
import { isEmptyOrNull } from "@/src/app/components/utils/Action/esFunc/gen-es/esCheckFunc";
import { getUpdatedNotification } from "@/src/utils/ui/initNotification";

const RoleAccessItem = ({ id, item = {}, updateRoleAccessResp, ...props }) => {
  const [form] = Form.useForm();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [updateKey, setUpdateKey] = useState(
    `${Math.random() * 49841458}-update-access`
  );
  const {
    createdAt,
    isActive,
    isAdd,
    isAll,
    isApprove,
    isAuth,
    isEdit,
    isRemove,
    isView,
    menuKey,
    publicId,
    title,
  } = item;

  useEffect(() => {
    form.setFieldsValue(item);
  }, [item]);

  const onUpdateAction = (values) => {
    values.publicId = publicId;
    setIsSubmit(true);
    props.thunkUpdateRoleAccessItem(values);
    getUpdatedNotification(
      "info",
      updateKey,
      `${title} Access update Request sending...`
    );
  };

  useEffect(() => {
    if (!isEmptyOrNull(updateRoleAccessResp) && isSubmit) {
      if (updateRoleAccessResp.status) {
        setIsOpen(false);
        getUpdatedNotification(
          "success",
          updateKey,
          `${title} ${updateRoleAccessResp.message}`
        );
        props.thunkRole(id);
        props.thunkRoleAccess();
      } else {
        getUpdatedNotification(
          "error",
          updateKey,
          `${title} ${updateRoleAccessResp.message}`
        );
      }

      setIsSubmit(false);
    }
  }, [updateRoleAccessResp]);
  return (
    <React.Fragment>
      <EsViewModal isOpen={isOpen}>
        <UpdateRoleAccessForm
          onSubmitAction={onUpdateAction}
          initValues={item}
          initForm={form}
          onCancel={() => {
            setIsOpen(false);
          }}
          title={`Update '${title}' Role Access`}
        />
      </EsViewModal>
      <div className="w-full grid grid-cols-10 gap-4">
        <div className="flex flex-col gap-5">
          <div>View</div> <IconItem isEnabled={isView} />
        </div>
        <div className="flex flex-col gap-5">
          <div>Add</div>
          <IconItem isEnabled={isAdd} />
        </div>
        <div className="flex flex-col gap-5">
          <div>Edit</div>
          <IconItem isEnabled={isEdit} />
        </div>
        <div className="flex flex-col gap-5">
          <div>Approve</div>
          <IconItem isEnabled={isApprove} />
        </div>
        <div className="flex flex-col gap-5">
          <div>Remove</div>
          <IconItem isEnabled={isRemove} />
        </div>
        <div className="flex flex-col gap-5">
          <div>All</div>
          <IconItem isEnabled={isAll} />
        </div>
        <div className="flex flex-col gap-5">
          <div>Auth</div>
          <IconItem isEnabled={isAuth} />
        </div>
        <div className="flex flex-col gap-5 ">
          <div>Active</div>
          <IconItem isEnabled={isActive} />
        </div>
        <div className="flex flex-col gap-5 col-span-2">
          <div className="">Action</div>
          <div
            className="border-2 border-l-8 transition-all duration-500 border-teal-700 hover:bg-teal-700 hover:text-white cursor-pointer shadow-xl"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            <div className="w-full box-border flex flex-row gap-2 items-center justify-center  h-8  ">
              <span>Change</span>
              <span className="text-lg">
                <FontAwesomeIcon icon={faPenToSquare} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

RoleAccessItem.propTypes = {
  thunkUpdateRoleAccess: PropTypes.func.isRequired,
  thunkRoleAccess: PropTypes.func.isRequired,
  thunkRole: PropTypes.func.isRequired,
  updateRoleAccessResp: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    updateRoleAccessResp: state.role.updateAccessItem,
  };
};

const mapDispatchToProps = {
  thunkUpdateRoleAccessItem,
  thunkRole,
  thunkRoleAccess,
};

export default connect(mapStateToProps, mapDispatchToProps)(RoleAccessItem);
