"use client";
import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Card,
  Row,
  Col,
  Select,
  Space,
} from "antd";
import {
  MinusCircleOutlined,
  PlusSquareOutlined,
  DeleteFilled,
} from "@ant-design/icons";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CstSelectMetaData from "../EsUtils/CstSelectMetaData";
import TextArea from "antd/lib/input/TextArea";
import CstUploadFile from "../EsAction/CstField/CstUploadFile";
import CstSunEditor from "../Editor/CstSunEditor";
import {
  thunkAddCategory,
  thunkAllCategory,
} from "@/src/redux/reducer/categoryReducer";

import {
  getNotificationWithIcon,
  getUpdatedNotification,
} from "@/src/utils/ui/initNotification";

import CategoryForm from "@/src/Components/Category/CategoryForm";

const { Option } = Select;

const CategoryAddForm = ({ categoryAddResp, categoriesResp, ...props }) => {
  const [form] = Form.useForm();
  const [isSubmit, setIsSubmit] = useState(false);
  const [catAddKey, setCatAddKey] = useState(
    `${Math.random() * 11148674}-cat-add-cat`
  );
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    props.thunkAllCategory();
  }, []);

  useEffect(() => {
    if (categoriesResp) {
      setCategories(categoriesResp);
    }
  }, [categoriesResp]);

  useEffect(() => {
    if (isSubmit) {
      if (categoryAddResp.status) {
        getUpdatedNotification(
          "success",
          catAddKey,
          "Sending Category Add Request...",
          "Please, wait category adding..."
        );
      } else {
        getUpdatedNotification(
          "error",
          catAddKey,
          "Sending Category Add Request...",
          categoryAddResp.message
        );
      }
      setIsSubmit(false);
      form.resetFields();
    }
  }, [categoryAddResp]);

  const onSubmitFailed = (values) => {
    console.log("Category Failed ", values);
  };

  const onSubmitAction = (values) => {
    setIsSubmit(true);
    getUpdatedNotification(
      "info",
      catAddKey,
      "Sending Category Add Request...",
      "Please, wait category adding..."
    );
    props.thunkAddCategory(values);
  };

  return (
    <React.Fragment>
      <CategoryForm
        name="category"
        initForm={form}
        categories={categories}
        onSubmitAction={onSubmitAction}
        onFailedAction={onSubmitFailed}
        btnText="Add"
      />
    </React.Fragment>
  );
};

CategoryAddForm.propTypes = {
  categoryAddResp: PropTypes.object,
  thunkAddCategory: PropTypes.func.isRequired,
  thunkAllCategory: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    categoriesResp: state?.category?.categories,
    categoryAddResp: state?.category?.added,
  };
};

const mapDispatchToProps = { thunkAddCategory, thunkAllCategory };

export default connect(mapStateToProps, mapDispatchToProps)(CategoryAddForm);
