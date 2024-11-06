"use client";

import { Button, Card, Col, Form, Input, Row, Select } from "antd";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import InvoiceForm from "./InvoiceForm";
import EsButton from "@/src/Components/EsUtils/EsButton";
import { isEmptyOrNull } from "@/src/app/components/utils/Action/esFunc/gen-es/esCheckFunc";
import { thunkStakeholderByQuery } from "@/src/redux/reducer/stakeholderReducer";
import { getUpdatedNotification } from "@/src/utils/ui/initNotification";
import { thunkAllProductByOrg } from "@/src/redux/reducer/productReducer";
import { useSession } from "next-auth/react";
import {
  thunkAllInvoiceByStatus,
  thunkPlaceInvoice,
} from "@/src/redux/reducer/invoiceReducer";
import { esFrontLogger } from "@/src/utils/es-loger/esFrontLogger";

const InvoiceAddForm = ({
  title = "Add Invoice",
  name = "invoice",
  organizationResp,
  byStakeholderResp,
  productsResp,
  unitsResp,
  invoicePlaceResp,
  ...props
}) => {
  const { data: session } = useSession();

  const [isSubmit, setIsSubmit] = useState(false);
  const [products, setProducts] = useState([]);
  const [client, setClient] = useState(undefined);
  const [phoneNo, setPhoneNo] = useState("");
  const [product, setProduct] = useState("");
  const [barCode, setbarCode] = useState("");
  const [cardID, setCardID] = useState("");

  const [findClientKey, setFindClientKey] = useState(
    `${Math.random() * 54214874}-cliend-find`
  );

  const [invoicePlaceKey, setInvoicePlaceKey] = useState(
    `${Math.random() * 548712456358}-invoice-palce-key`
  );

  esFrontLogger.log("Session user ", session?.user);

  useEffect(() => {
    if (!isEmptyOrNull(session?.user)) {
      props.thunkAllProductByOrg(session?.user?.organization);
    }
  }, [session?.user]);

  useEffect(() => {
    if (!isEmptyOrNull(productsResp)) {
      if (productsResp.status) {
        getUpdatedNotification(
          "success",
          "org-all-product-key",
          productsResp.message
        );
        setProducts(productsResp.response);
      } else {
        getUpdatedNotification(
          "erorr",
          "org-all-product-key",
          productsResp.message
        );
      }
    }
  }, [productsResp]);

  useEffect(() => {
    esFrontLogger.log("byStakeholderResp, ", byStakeholderResp);
    if (isSubmit && !isEmptyOrNull(byStakeholderResp)) {
      if (byStakeholderResp.status) {
        setClient(byStakeholderResp.response);
        getUpdatedNotification(
          "success",
          findClientKey,
          byStakeholderResp.message
        );
      } else {
        getUpdatedNotification(
          "error",
          findClientKey,
          byStakeholderResp.message
        );
      }

      setIsSubmit(false);
    }
  }, [byStakeholderResp]);

  const onFailedAction = (values) => {
    esFrontLogger.log("onFailedAction Invoice ", values);
  };

  const onSubmitAction = (values) => {
    setIsSubmit(true);
    values.stakeholder = client?.id;
    values.organization = session?.user?.organization;
    values.user = session.user?.id;

    esFrontLogger.log("onSubmitAction Invoice ", values);

    getUpdatedNotification("info", invoicePlaceKey, "Invoiceing please wait");
    props.thunkPlaceInvoice(values);
  };

  useEffect(() => {
    if (!isEmptyOrNull(invoicePlaceResp) && isSubmit) {
      if (invoicePlaceResp.status) {
        getUpdatedNotification(
          "success",
          invoicePlaceKey,
          invoicePlaceResp.message
        );
        props.thunkAllInvoiceByStatus();
      } else {
        getUpdatedNotification(
          "erorr",
          invoicePlaceKey,
          invoicePlaceResp.message
        );
      }

      setIsSubmit(false);
    }
  }, [invoicePlaceResp]);

  //Start Client

  const onClienFind = (e) => {
    getUpdatedNotification("info", findClientKey, "Client Finding ...");
    setIsSubmit(true);
    if (!isEmptyOrNull(phoneNo)) {
      props.thunkStakeholderByQuery({ phoneNo });
    } else if (!isEmptyOrNull(cardID)) {
      props.thunkStakeholderByQuery({ cardID });
    }
  };

  const onChangeCardId = (e) => {
    setCardID(e.target.value);
  };

  const onCardAction = (e) => {
    if (e.keyCode === 13 || e.key === "Enter") {
      getUpdatedNotification("info", findClientKey, "Client Finding ...");

      props.thunkStakeholderByQuery({ genId: cardID });
      setIsSubmit(true);
    }
  };

  const onChangePhoneNo = (e) => {
    setPhoneNo(e.target.value);
  };

  const onPhoneNoAction = (e) => {
    if (e.keyCode === 13 || e.key === "Enter") {
      getUpdatedNotification("info", findClientKey, "Client Finding ...");

      props.thunkStakeholderByQuery({ phoneNo });
      setIsSubmit(true);
    }
  };

  //End Client

  const onChangeBarCode = (e) => {
    e.preventDefault();
    setbarCode(e.target.value);
  };

  const onBarCodeKeyPress = (e) => {
    if (e.key === "Enter" || e.keyCode === 13 || e.code === "Enter") {
      const item = products.find((item) => {
        return item.barCode === barCode;
      });
      setProduct(item);
    }
  };

  const onChangeProduct = (id) => {
    esFrontLogger.log("onChangeProduct, ", id);

    const item = products.find((item) => item?.id === id);
    setProduct(item);
  };

  const onFindProduct = (e) => {
    esFrontLogger.log("onFindProduct ", e);
  };

  esFrontLogger.log("Client ID ", client);

  return (
    <React.Fragment>
      <Row gutter={[0, 24]}>
        <Col span={24}>
          <Card title="Find Client" bordered>
            <Row gutter={[20, 6]}>
              <Col span={2}>Client By:</Col>
              <Col span={8}>
                <Input
                  placeholder="Client Phone No."
                  onChange={onChangePhoneNo}
                  value={phoneNo}
                  onKeyDown={onPhoneNoAction}
                />
              </Col>
              <Col span={8}>
                <Input
                  placeholder="Card ID"
                  onChange={onChangeCardId}
                  value={cardID}
                  onKeyDown={onCardAction}
                />
              </Col>
              <Col span={3}>
                <EsButton text="Fin Client" type="info" onClick={onClienFind} />
              </Col>
            </Row>
          </Card>
        </Col>

        <Col span={24}>
          <Card title="Client">
            <div className="grid grid-cols-2">
              <div className="flex  flex-row gap-5">
                <div>Name:</div>
                <div>{client?.firstName}</div>
              </div>

              <div className="flex  flex-row gap-5">
                <div>Card ID:</div>
                <div>{client?.genId}</div>
              </div>

              <div className="flex  flex-row gap-5">
                <div>Phone No:</div>
                <div>{client?.phoneNo}</div>
              </div>
            </div>
          </Card>
        </Col>

        <Col span={24}>
          <Card title="Add Or Select product">
            <Row gutter={[0, 24]}>
              <Col span={24}>
                <Row gutter={[24, 20]}>
                  <Col span={4} className="font-medium bg-gr">
                    Find By Title:
                  </Col>
                  <Col span={18}>
                    <Select
                      style={{ width: `100%` }}
                      placeholder="Select product"
                      showSearch
                      onChange={onChangeProduct}
                    >
                      {products?.map((product) => {
                        return (
                          <Option value={product?.id}>{product?.title}</Option>
                        );
                      })}
                    </Select>
                  </Col>
                  <Col span={2}>
                    <EsButton
                      text="Add"
                      type="success"
                      onClick={onFindProduct}
                    />
                  </Col>
                </Row>
              </Col>

              <Col span={24}>
                <Row gutter={[8, 20]}>
                  <Col span={4} className="font-medium">
                    Add Product By Barcode
                  </Col>
                  <Col span={8}>
                    <Input
                      placeholder="Bar Code"
                      onKeyDown={onBarCodeKeyPress}
                      onChange={onChangeBarCode}
                      value={barCode}
                    />
                  </Col>
                  <Col span={3}>
                    <EsButton
                      text="Add"
                      type="success"
                      onClick={onFindProduct}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
        </Col>

        <Col span={24}>
          <Card title="Products">
            <InvoiceForm
              name={name}
              insetItem={product}
              onFailedAction={onFailedAction}
              onSubmitAction={onSubmitAction}
            />
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

InvoiceAddForm.propTypes = {
  thunkStakeholderByQuery: PropTypes.func.isRequired,
  thunkAllProductByOrg: PropTypes.func.isRequired,
  thunkPlaceInvoice: PropTypes.func.isRequired,
  productsResp: PropTypes.array,
  byStakeholderResp: PropTypes.object,
  invoicePlaceResp: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    byStakeholderResp: state.stakeholder.byQuery,
    productsResp: state.product.orgProducts,
    invoicePlaceResp: state.invoice.added,
  };
};

const mapDispatchToProps = {
  thunkStakeholderByQuery,
  thunkAllProductByOrg,
  thunkPlaceInvoice,
};

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceAddForm);
