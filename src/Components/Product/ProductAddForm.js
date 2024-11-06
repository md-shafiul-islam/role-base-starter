"use client";

import React, { useEffect, useState } from "react";

import { Card, Col, Form, Row } from "antd";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { isEmptyOrNull } from "@/src/app/components/utils/Action/esFunc/gen-es/esCheckFunc";
import {
  thunkAllProduct,
  thunkAddProduct,
} from "@/src/redux/reducer/productReducer";
import { getUpdatedNotification } from "@/src/utils/ui/initNotification";
import { thunkAllSpecKey } from "@/src/redux/reducer/specKeyReducer";
import { thunkAllCategory } from "@/src/redux/reducer/categoryReducer";
import { thunkAllOrganization } from "@/src/redux/reducer/organizationReducer";

import ProductForm from "@/src/Components/Product/ProductForm";

const ProductAddForm = ({ addProductResp, ...props }) => {
  const [isSubmit, setIsSubmit] = useState(false);
  const [organizations, setOrganizations] = useState([]);

  const [addProductKey, setAddProductKey] = useState(
    `${Math.random() * 744147555444}-product-add`
  );

  useEffect(() => {
    if (isSubmit && !isEmptyOrNull(addProductResp)) {
      if (addProductResp.status) {
        getUpdatedNotification(
          "success",
          addProductKey,
          addProductResp.message
        );
      } else {
        getUpdatedNotification("error", addProductKey, addProductResp.message);
      }
      setIsSubmit(false);
    }
  }, [addProductResp]);

  const [form] = Form.useForm();

  const initValues = {
    aliasName: null,
    title: null,
    quantity: null,
    imageUrl: null,
    videoUrl: null,
    price: null,
    flatDiscount: null,
    clientDiscount: null,
    agentDiscount: null,
    agentCharge: null,
    isUpcoming: null,
    description: null,
    images: [{ url: null, alt: null }],
    metaDatas: [
      {
        name: null,
        content: null,
      },
    ],

    organization: null,
    category: null,
    locations: [],
    unit: null,

    specifications: [
      {
        key: null,
        value: null,
        description: null,
      },
    ],

    avgRating: null,
  };

  const onFailedAction = (values) => {
    console.log("Order Added Failed ", values);
  };
  const onProductAction = (values) => {
    console.log("onProductAction, ", values);
    getUpdatedNotification(
      "info",
      addProductKey,
      "Product Add Request sending..."
    );
    setIsSubmit(true);
    props.thunkAddProduct(values);
  };

  useEffect(() => {
    if (isSubmit && !isEmptyOrNull(addProductResp)) {
      if (addProductResp.status) {
        getUpdatedNotification(
          "success",
          addProductKey,
          addProductResp.message
        );
        form.resetFields();
        props.thunkAllProduct();
      } else {
        getUpdatedNotification("error", addProductKey, addProductResp.message);
      }
      setIsSubmit(false);
    } 
  }, [addProductResp]);

  return (
    <Row>
      <Col span={24}>
        <ProductForm
          initForm={form}
          initValues={initValues}
          onSubmitAction={onProductAction}
          onFailedAction={onFailedAction}
          btnText="Add Product"
        />
      </Col>
    </Row>
  );
};

ProductAddForm.propTypes = {
  thunkAddProduct: PropTypes.func.isRequired,
  thunkAllProduct: PropTypes.func.isRequired,
  addProductResp: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    addProductResp: state?.product?.added,
  };
};

const mapDispatchToProps = {
  thunkAllProduct,
  thunkAddProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductAddForm);
