"use client";

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Card, Col, Form, Row } from "antd";
import {
  thunkAddCategory,
  thunkAllCategory,
  thunkCategory,
  thunkRemoveCegory,
  thunkUpdateCategory,
} from "@/src/redux/reducer/categoryReducer";
import LoadingContent from "@/src/app/components/utils/loading/LoadingContent";
import { isEmptyOrNull } from "@/src/app/components/utils/Action/esFunc/gen-es/esCheckFunc";
import { connect } from "react-redux";
import { esFrontLogger } from "@/src/utils/es-loger/esFrontLogger";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckSquare,
  faXmarkSquare,
} from "@fortawesome/free-solid-svg-icons";

import { getAccessByMenuKey } from "@/src/utils/access/role.access.utils";
import EsViewModal from "@/src/app/components/utils/EsUtils/Modal/EsViewModal";
import CategoryForm from "@/src/Components/Category/CategoryForm";
import ConfrimModal from "@/src/app/components/utils/EsUtils/Modal/ConfrimModal";
import { getUpdatedNotification } from "@/src/utils/ui/initNotification";
import { redirect } from "next/navigation";
const CategoryDetailsCard = ({
  categoryResp,
  roleAccess,
  categoriesResp,
  categoryUpdateResp,
  categoryRemoveResp,
  id,
  ...props
}) => {
  const [form] = Form.useForm();
  const [category, setCategory] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [categories, setCategories] = useState([]);

  const [isOpenConfrimRemove, setIsOpenConfrimRemove] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [catAccess, setCatAccess] = useState({});

  const [catUpdateKey, setCatUpdateKey] = useState(
    `${Math.random() * 11148674}-cat-update-cat`
  );

  const [deleteKey, setDeleteKey] = useState(
    `${Math.random() * 11148674}-cat-delete-cat`
  );

  useEffect(() => {
    if (!isEmptyOrNull(categoriesResp)) {
      setCategories(categoriesResp);
      
    } else {
      props.thunkAllCategory();
    }
  }, [categoriesResp]);

  useEffect(() => {
    if (!isEmptyOrNull(roleAccess)) {
      setCatAccess(roleAccess?.category);
    }
  }, [roleAccess]);

  useEffect(() => {
    props.thunkCategory(id);
  }, [id]);

  useEffect(() => {
    if (!isEmptyOrNull(categoryResp)) {
      setCategory(categoryResp.response);
      setIsLoading(false);
      if (categoryResp.status) {
        if (isEmptyOrNull(categoryResp.response)) {
          redirect("/administrator/categories");
        }
      }
    }
  }, [categoryResp]);

  const onRemove = () => {
    if (catAccess?.isRemove) {
      setIsOpenConfrimRemove(!isOpenConfrimRemove);
    }
  };

  const onEditAction = () => {
    if (catAccess?.isEdit) {
      setIsOpen(true);
    }
  };

  const onRemoveAction = () => {
    if (catAccess?.isRemove) {
      getUpdatedNotification(
        "info",
        deleteKey,
        "Category removing",
        `Removing '${category?.name}' Category`
      );
      props.thunkRemoveCegory(id);
      setIsSubmit(true);
    }
  };

  const onUpdateAction = (values) => {
    if (catAccess?.isEdit) {
      setIsSubmit(true);
      getUpdatedNotification(
        "info",
        catUpdateKey,
        "Sending Category Update Request...",
        "Please, wait category Updating..."
      );
      values.id = id;
      props.thunkUpdateCategory(values);
    }
  };

  const onUpdateFailed = (values) => {
    console.log("onUpdateFailed, ", values);
  };

  useEffect(() => {
    if (isSubmit) {
      console.log("Update Response ", categoryUpdateResp);
      if (categoryUpdateResp.status) {
        getUpdatedNotification(
          "success",
          catUpdateKey,
          "Sending Category Update Request...",
          "Please, wait category Updating..."
        );
        props.thunkCategory(id);
      } else {
        getUpdatedNotification(
          "error",
          catUpdateKey,
          "Sending Category Add Request...",
          categoryUpdateResp.message
        );
      }
      setIsSubmit(false);
      setIsOpen(false);
    }
  }, [categoryUpdateResp]);

  useEffect(() => {
    if (isSubmit) {
      if (categoryRemoveResp.status) {
        getUpdatedNotification(
          "success",
          deleteKey,
          "Sending Category Removed Request...",
          categoryRemoveResp.message
        );
        redirect("/administrator/categories");
      } else {
        getUpdatedNotification(
          "error",
          deleteKey,
          "Sending Category Removed...",
          categoryRemoveResp.message
        );
      }
      setIsSubmit(false);
      setIsOpenConfrimRemove(false);
    }
  }, [categoryRemoveResp]);

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
        <CategoryForm
          title="Update Category"
          initForm={form}
          categories={categories}
          name="category"
          onSubmitAction={onUpdateAction}
          onFailedAction={onUpdateFailed}
          btnText={"Update"}
          initValues={category}
        />
      </EsViewModal>

      <ConfrimModal
        isOpen={isOpenConfrimRemove}
        onConfrim={onRemoveAction}
        onCancel={onRemove}
        title="You want to remove this category?"
        content={
          <div className="grid grid-cols-1 gap-2">
            <span>{category?.name}</span>
            <span>{category?.description}</span>
          </div>
        }
      />
      <Card title="Category Details" className="p-0">
        {isLoading ? (
          <LoadingContent isActive={isLoading} />
        ) : (
          <Row>
            <Col span={24} className="font-semibold">
              <div className="grid grid-cols-1 gap-5">
                <div className="flex flex-row gap-3 ">
                  <div className="font-bold">Name:</div>
                  <div className="font-semibold">{category?.name}</div>
                </div>

                <div className="flex flex-row gap-3 ">
                  <div className="font-bold">Description:</div>
                  <div className="font-semibold">{category?.description}</div>
                </div>

                <div className="flex flex-row gap-3 ">
                  <div className="font-bold">Url:</div>
                  <div className="font-semibold">{category?.actionUrl}</div>
                </div>

                <div className="flex flex-row gap-3 ">
                  <div className="font-bold">Key:</div>
                  <div className="font-semibold">{category?.key}</div>
                </div>

                <div className="flex flex-row gap-3 ">
                  <div className="font-bold">Slug:</div>
                  <div className="font-semibold">{category?.slug}</div>
                </div>

                <div className="flex flex-row gap-3 items-center font-semibold">
                  <div className="font-bold">Is Sub Category:</div>
                  <div className="font-semibold text-xl flex flex-col ">
                    {category?.isSub ? (
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
                        !catAccess?.isEdit ? "cursor-not-allowed" : ""
                      }`}
                    >
                      Edit
                    </button>
                    <button
                      onClick={onRemove}
                      className={`px-4 py-1 rounded-sm bg-red-600 hover:bg-red-800 hover:text-white ${
                        !catAccess?.isRemove ? "cursor-not-allowed" : ""
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

CategoryDetailsCard.propTypes = {
  thunkCategory: PropTypes.func.isRequired,
  thunkUpdateCategory: PropTypes.func.isRequired,
  thunkRemoveCegory: PropTypes.func.isRequired,
  thunkAllCategory: PropTypes.func.isRequired,
  categoryResp: PropTypes.object,
  categoryUpdateResp: PropTypes.object,
  roleAccess: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    categoryResp: state.category.category,
    categoriesResp: state.category.categories,
    roleAccess: state.role.userAccess,
    categoryUpdateResp: state.category.update,
    categoryRemoveResp: state.category.remove,
  };
};

const mapDispatchToProps = {
  thunkCategory,
  thunkAllCategory,
  thunkUpdateCategory,
  thunkRemoveCegory,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryDetailsCard);
