"use client";

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Card, Col, Form, Row } from "antd";
import {
  thunkAllBrand,
  thunkBrand,
  thunkRemoveBrand,
  thunkUpdateBrand,
} from "@/src/redux/reducer/brandReducer";
import LoadingContent from "@/src/app/components/utils/loading/LoadingContent";
import { isEmptyOrNull } from "@/src/app/components/utils/Action/esFunc/gen-es/esCheckFunc";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckSquare,
  faXmarkSquare,
} from "@fortawesome/free-solid-svg-icons";

import EsViewModal from "@/src/app/components/utils/EsUtils/Modal/EsViewModal";
import BrandForm from "@/src/Components/Brands/BrandForm";
import ConfrimModal from "@/src/app/components/utils/EsUtils/Modal/ConfrimModal";
import { getUpdatedNotification } from "@/src/utils/ui/initNotification";
import { redirect } from "next/navigation";
import CstImage from "../CstView/CstImage";

const BrandDetailsCard = ({
  brandResp,
  roleAccess,
  brandsResp,
  brandUpdateResp,
  brandRemoveResp,
  id,
  ...props
}) => {
  const [form] = Form.useForm();
  const [brand, setBrand] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [brands, setBrands] = useState([]);

  const [isOpenConfrimRemove, setIsOpenConfrimRemove] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [brandAccess, setBrandAccess] = useState({});

  const [brandUpdateKey, setBrandUpdateKey] = useState(
    `${Math.random() * 11148674}-Brand-update-cat`
  );

  const [deleteKey, setDeleteKey] = useState(
    `${Math.random() * 11148674}-Brand-delete-cat`
  );

  useEffect(() => {
    if (!isEmptyOrNull(brandsResp)) {
      setBrands(brandsResp);
    } else {
      props.thunkAllBrand();
    }
  }, [brandsResp]);

  useEffect(() => {
    if (!isEmptyOrNull(roleAccess)) {
      setBrandAccess(roleAccess?.brand);
    }
  }, [roleAccess]);

  useEffect(() => {
    props.thunkBrand(id);
  }, [id]);

  useEffect(() => {
    if (!isEmptyOrNull(brandResp)) {
      setBrand(brandResp.response);
      setIsLoading(false);
      if (brandResp.status) {
        if (isEmptyOrNull(brandResp.response)) {
          redirect("/administrator/brands");
        }
      }
    }
  }, [brandResp]);

  const onRemove = () => {
    if (brandAccess?.isRemove) {
      setIsOpenConfrimRemove(!isOpenConfrimRemove);
    }
  };

  const onEditAction = () => {
    if (brandAccess?.isEdit) {
      setIsOpen(true);
    }
  };

  const onRemoveAction = () => {
    if (brandAccess?.isRemove) {
      getUpdatedNotification(
        "info",
        deleteKey,
        "Brand removing",
        `Removing '${brand?.name}' Brand`
      );

      props.thunkRemoveBrand(id);
      setIsSubmit(true);
    }
  };

  const onUpdateAction = (values) => {
    if (brandAccess?.isEdit) {
      setIsSubmit(true);
      getUpdatedNotification(
        "info",
        brandUpdateKey,
        "Sending Brand Update Request...",
        "Please, wait Brand Updating..."
      );
      values.id = id;
      props.thunkUpdateBrand(values);
    }
  };

  const onUpdateFailed = (values) => {
    console.log("onUpdateFailed, ", values);
  };

  useEffect(() => {
    if (isSubmit) {
      console.log("Update Response ", brandUpdateResp);
      if (brandUpdateResp.status) {
        getUpdatedNotification(
          "success",
          brandUpdateKey,
          "Sending Brand Update Request...",
          brandUpdateResp.message
        );
        props.thunkBrand(id);
      } else {
        getUpdatedNotification(
          "error",
          brandUpdateKey,
          "Sending Brand Add Request...",
          brandUpdateResp.message
        );
      }
      setIsSubmit(false);
      setIsOpen(false);
    }
  }, [brandUpdateResp]);

  useEffect(() => {
    if (isSubmit) {
      if (brandRemoveResp.status) {
        getUpdatedNotification(
          "success",
          deleteKey,
          "Sending Brand Removed Request...",
          brandRemoveResp.message
        );
        redirect("/administrator/brands");
      } else {
        getUpdatedNotification(
          "error",
          deleteKey,
          "Sending Brand Removed...",
          brandRemoveResp.message
        );
      }
      setIsSubmit(false);
      setIsOpenConfrimRemove(false);
    }
  }, [brandRemoveResp]);


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
        <BrandForm
          title="Update Brand"
          initForm={form}
          Brands={brand}
          name="Brand"
          onSubmitAction={onUpdateAction}
          onFailedAction={onUpdateFailed}
          btnText={"Update"}
          initValues={brand}
        />
      </EsViewModal>

      <ConfrimModal
        isOpen={isOpenConfrimRemove}
        onConfrim={onRemoveAction}
        onCancel={onRemove}
        title="You want to remove this Brand?"
        content={
          <div className="grid grid-cols-1 gap-2">
            <span>{brand?.name}</span>
            <span>{brand?.description}</span>
          </div>
        }
      />
      <Card title="Brand Details" className="p-0">
        {isLoading ? (
          <LoadingContent isActive={isLoading} />
        ) : (
          <Row>
            <Col span={24} className="font-semibold">
              <div className="grid grid-cols-1 gap-5">
                <div className="flex flex-row gap-3 ">
                  <div className="font-bold">Name:</div>
                  <div className="font-semibold">{brand?.name}</div>
                </div>
                <div className="flex flex-row gap-3 ">
                  <div className="font-bold">Description:</div>
                  <div className="font-semibold">{brand?.description}</div>
                </div>

                <div className="flex flex-row gap-3 ">
                  <div className="font-bold">Phone No:</div>
                  <div className="font-semibold">{brand?.phoneNo}</div>
                </div>

                <div className="flex flex-row gap-3 ">
                  <div className="font-bold">Tag Line:</div>
                  <div className="font-semibold">{brand?.tagLine}</div>
                </div>

                <div className="flex flex-row gap-3 ">
                  <div className="font-bold">Web-Site:</div>
                  <div className="font-semibold">{brand?.website}</div>
                </div>

                <div className="flex flex-row gap-3 ">
                  <div className="font-bold">Logo:</div>
                  <div className="font-semibold">
                    <CstImage
                      altTag={brand?.name}
                      title={brand?.name}
                      height={120}
                      width={120}
                      to={brand?.logoUrl}
                    />{" "}
                  </div>
                </div>

                <div className="">
                  <div className="flex flex-row gap-4 ">
                    <button
                      onClick={onEditAction}
                      className={`px-4 py-1 rounded-sm bg-green-600 hover:bg-green-800 hover:text-white ${
                        !brandAccess?.isEdit ? "cursor-not-allowed" : ""
                      }`}
                    >
                      Edit
                    </button>
                    <button
                      onClick={onRemove}
                      className={`px-4 py-1 rounded-sm bg-red-600 hover:bg-red-800 hover:text-white ${
                        !brandAccess?.isRemove ? "cursor-not-allowed" : ""
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

BrandDetailsCard.propTypes = {
  thunkBrand: PropTypes.func.isRequired,
  thunkUpdateBrand: PropTypes.func.isRequired,
  thunkRemoveBrand: PropTypes.func.isRequired,
  thunkAllBrand: PropTypes.func.isRequired,
  brandResp: PropTypes.object,
  brandUpdateResp: PropTypes.object,
  roleAccess: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    brandResp: state.brand.brand,
    brandsResp: state.brand.brand,
    roleAccess: state.role.userAccess,
    brandUpdateResp: state.brand.update,
    brandRemoveResp: state.brand.remove,
  };
};

const mapDispatchToProps = {
  thunkBrand,
  thunkAllBrand,
  thunkUpdateBrand,
  thunkRemoveBrand,
};

export default connect(mapStateToProps, mapDispatchToProps)(BrandDetailsCard);
