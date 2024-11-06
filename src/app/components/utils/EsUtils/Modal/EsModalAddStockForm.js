import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Input, Modal, Row, Select, Space } from "antd";
import { shallowEqual, useSelector, connect, useDispatch } from "react-redux";
import {
  CheckCircleTwoTone,
  PlusSquareOutlined,
  DeleteFilled,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import EsButton from "../EsButton";
import { isEmptyOrNull } from "../../../utils/gen-es/esCheckFunc";
import { getEsAddNum, getEsDecFormat, getEsNumber } from "../../../utils/gen-es/converter";
import PropTypes from "prop-types";
import {
  addBatchToStockAction,
  getBatchAction,
} from "../../../redux/actions/batchAction";
import { SET_BATCH_ADD_TO_STOCK } from "../../../redux/types";
import EsStockInfoCard from "../EsStockInfoCard";

const EsModalAddStockForm = ({
  isOpen = false,
  title,
  handleOk,
  handleCancel,
  initValues = {
    products: [],
    itemsTotal: 0,
  },
  batch,
  ...params
}) => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [isDisable, setIsDisable] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [totalBatchProductQty, setTotalBatchProductQty] = useState(0);


  const {
    stakeholders = [],
    items = [],
    units = [],
    addStock,
  } = useSelector((state) => {
    return {
      stakeholders: state?.stakeholder?.stakeholders?.response,
      items: state?.item?.items?.response,
      units: state?.unit?.units?.response,
      addStock: state?.batch?.addStock,
    };
  }, shallowEqual);

  const { completeUnit, totalProductQty, byProducts } = batch;

  useEffect(() => {

    if (!isEmptyOrNull(byProducts)) {

      let totalQty = 0;

      byProducts?.map((product) => {
        if (!isEmptyOrNull(product)) {
          totalQty = (getEsNumber(product?.qty) * getEsNumber(product?.item?.unitBaseValue)) + totalQty;
        }
      });

      totalQty = totalQty / getEsNumber(completeUnit?.baseValue);
      totalQty = totalProductQty + totalQty;

      setTotalBatchProductQty(totalQty);

    }
  }, [byProducts])

  const getUnitById = (id) => {
    let sUnit = null;
    id = Number(id);
    if (!isEmptyOrNull(units) && id > 0) {
      units.forEach((unit) => {
        if (!isEmptyOrNull(unit)) {
          if (Number(unit.id) === id) {
            sUnit = unit;
          }
        }
      });
    }
    return sUnit;
  };

  const getItemById = (id) => {
    id = Number(id);
    let sItem = null;
    if (!isEmptyOrNull(items) && id > 0) {
      items.forEach((item) => {
        if (!isEmptyOrNull(item)) {
          if (Number(item.id) === id) {
            sItem = item;
          }
        }
      });
    }
    return sItem;
  };

  const submitAction = (values) => {
    if (!isEmptyOrNull(formValues)) {
      formValues.batch = batch?.publicId;
      setIsDisable(true);
      params.addBatchToStockAction(formValues);
    }
  };

  useEffect(() => {
    if (!isEmptyOrNull(addStock)) {
      if (addStock.status && isDisable) {
        dispatch({
          type: SET_BATCH_ADD_TO_STOCK,
          payload: undefined,
        });
        params.getBatchAction(batch?.publicId);
        handleOk(true);
      }
      setIsDisable(false);
    }
  }, [addStock]);

  const onValuesCahngeAction = (value, values) => {
    if (!isEmptyOrNull(values)) {
      let {
        products = [],
        itemsTotal = 0,
        grandTotal,
        paiedAmount,
        creditAmount,
      } = values;

      let totalBaseValue =
        getEsNumber(completeUnit?.baseValue) * getEsNumber(totalBatchProductQty);

      const nProducts = [];
      let totalUseQty = 0;
      if (!isEmptyOrNull(products)) {
        products.forEach((product, idx) => {
          const item = getItemById(product?.item);
          const unit = getUnitById(item?.unitId);
          let { minEsPrice, itemQty, purchasePrice } = product;
          let multiplyPrice = 0,
            subTotal = 0,
            itemTotalBaseValue = 0,
            itemUnitBaseValue = getEsNumber(unit?.baseValue),
            cmBaseValue = getEsNumber(completeUnit?.baseValue);

          itemTotalBaseValue = itemUnitBaseValue * getEsNumber(product?.qty);
          itemQty = itemTotalBaseValue / cmBaseValue;
          totalUseQty = totalUseQty + itemQty;
          itemQty = `${itemQty} ${completeUnit?.name}`


          multiplyPrice = getEsNumber(itemUnitBaseValue / cmBaseValue);

          subTotal =
            getEsNumber(product?.qty) * getEsNumber(product?.purchasePrice);

          itemsTotal += getEsNumber(Number(subTotal).toFixed(2));
          product.subTotal = subTotal;

          product.itemQty = itemQty;
          product.minSalePrice = getEsAddNum(purchasePrice, item?.unitValue);
          nProducts.push(product);

        });
      }
      values.usedQuantity = totalUseQty;
      // //esBackLogger.info("EsModalAddStockForm products, ", products);

      grandTotal = itemsTotal;

      if (getEsNumber(grandTotal) >= getEsNumber(paiedAmount)) {
        creditAmount = getEsNumber(grandTotal) - getEsNumber(paiedAmount);
      } else {
        creditAmount = 0;
      }

      const fValues = {
        ...values,
        products: nProducts,
        grandTotal,
        itemsTotal,
        creditAmount,
        paiedAmount,
      };
      setFormValues(fValues);
      form.setFieldsValue(fValues);
    }
  };

  return (
    <Modal
      width={1200}
      open={isOpen}
      title={title}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="ok" type="primary" onClick={handleOk}>
          Ok
        </Button>,
      ]}
    >


      <Row gutter={[6, 16]}>
        <Col span={24}><EsStockInfoCard batch={batch} /></Col>
        <Col span={24}>
          <Card>
            <Form
              form={form}
              wrapperCol={{ span: 24 }}
              layout="horizontal"
              size={"middle"}
              onFinish={submitAction}
              initialValues={initValues}
              name={params.name}
              onValuesChange={onValuesCahngeAction}
            >
              {(values) => {
                return (
                  <React.Fragment>
                    <Form.Item name={`id`} hidden>
                      <Input />
                    </Form.Item>
                    <Form.Item name={`batch`} hidden>
                      <Input />
                    </Form.Item>

                    <Row gutter={[3, 1]} className="product-row bb1px">
                      <Col span={4}>সরবারহকারি</Col>
                      <Col span={16}>
                        <Form.Item name={`stakeholder`} rules={[
                          {
                            required: true,
                            message: 'Please Select One ...',
                          },
                        ]}>
                          <Select
                            placeholder="Select Stakeholder ..."
                            menuItemSelectedIcon={
                              <CheckCircleTwoTone twoToneColor="#52c41a" />
                            }
                            showSearch={true}
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                              option?.children
                                ?.toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                            }
                            allowClear={true}
                          >
                            {stakeholders?.map((item) => {
                              return <Option value={item?.id}>{`${item?.name}, ${item?.address1}, ${item?.phoneNo} `}</Option>;
                            })}
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={[3, 8]} className="bb1px product-row">
                      <Col span={1}>#</Col>
                      <Col span={5}>Product</Col>
                      <Col span={3}>Info</Col>
                      <Col span={2}>Quantity</Col>
                      <Col span={3}>Purches Price</Col>
                      <Col span={3}>Min Sale Price</Col>
                      <Col span={3}>Max Sale Price</Col>
                      <Col span={4}>
                        <Row>
                          <Col span={20}>Item Sub Total</Col>
                          <Col span={4}></Col>
                        </Row>
                      </Col>
                    </Row>

                    <Form.List name="products">
                      {(fields, { add, remove }) => {
                        return (
                          <>
                            {fields.map(({ key, name, ...restField }, idx) => {
                              return (
                                <React.Fragment key={`products-${key}`}>
                                  <Row gutter={[3, 8]} className="bb1px product-row">
                                    <Col span={1}>{idx + 1}</Col>
                                    <Col span={5}>
                                      <Form.Item {...restField} name={[name, `item`]} rules={[
                                        {
                                          required: true,
                                          message: 'Please Select One Item!',
                                        },
                                      ]}>
                                        <Select
                                          className="ant-select ant-select-single"
                                          style={{
                                            width: "100%",
                                          }}
                                          placeholder="Select Item ..."
                                          menuItemSelectedIcon={
                                            <CheckCircleTwoTone twoToneColor="#52c41a" />
                                          }
                                          showSearch={true}
                                          optionFilterProp="children"
                                          filterOption={(input, option) =>
                                            option?.children
                                              ?.toLowerCase()
                                              .indexOf(input.toLowerCase()) >= 0
                                          }
                                          allowClear={true}
                                        >
                                          {items?.map((item, idx) => {
                                            return (
                                              <React.Fragment
                                                key={`item-option-${idx}`}
                                              >
                                                <Select.Option value={item.id}>
                                                  {`${item?.form?.name} ${item.name} ${item?.strength?.name} `}
                                                </Select.Option>
                                              </React.Fragment>
                                            );
                                          })}
                                        </Select>
                                      </Form.Item>
                                    </Col>
                                    <Col span={3}>
                                      <Space direction="vertical">

                                        <span>
                                          Qty:{" "}
                                          <b>{values?.products[key]?.itemQty}</b>
                                        </span>

                                      </Space>
                                    </Col>
                                    <Col span={2}>
                                      <Form.Item {...restField} name={[name, "qty"]} rules={[
                                        {
                                          required: true,
                                          message: 'Please Enter Quantity',
                                        },
                                      ]} >
                                        <Input placeholder="Quantity" />
                                      </Form.Item>
                                    </Col>

                                    <Col span={3}>
                                      <Form.Item
                                        {...restField}
                                        name={[name, "purchasePrice"]}
                                        rules={[
                                          {
                                            required: true,
                                            message: 'Please Enter Purchase Price',
                                          },
                                        ]}
                                      >
                                        <Input placeholder="purchase Price" />
                                      </Form.Item>
                                    </Col>
                                    <Col span={3}>
                                      <Form.Item
                                        {...restField}
                                        name={[name, "minSalePrice"]}
                                      >
                                        <Input placeholder="Min Sale Price" />
                                      </Form.Item>
                                    </Col>
                                    <Col span={3}>
                                      <Form.Item
                                        {...restField}
                                        name={[name, "maxPrice"]}
                                      >
                                        <Input placeholder="Max Sale Price" />
                                      </Form.Item>
                                    </Col>

                                    <Col span={4}>
                                      <Row>
                                        <Col span={20}>
                                          <Space align="center" className="pd-tb-5">
                                            {getEsDecFormat(
                                              values?.products[key]?.subTotal
                                            )}
                                          </Space>
                                        </Col>
                                        <Col span={4}>
                                          <Space align="center" justify="center">
                                            <DeleteFilled
                                              onClick={() => remove(key)}
                                            />
                                          </Space>
                                        </Col>{" "}
                                      </Row>
                                    </Col>
                                  </Row>
                                </React.Fragment>
                              );
                            })}
                            <Button
                              icon={<PlusSquareOutlined />}
                              onClick={() => {
                                add({
                                  qty: 0,
                                  purchasePrice: null,
                                  minSalePrice: null,
                                  maxPrice: null,
                                  subTotal: 0,
                                  item: null,
                                  minEsPrice: 0,
                                });
                              }}
                            >
                              Add Item
                            </Button>
                          </>
                        );
                      }}
                    </Form.List>
                    <Row gutter={[3, 1]} className="product-row bb1px">
                      <Col span={7}>Items Quantity/পণ্যসমূহের একত্রিত পরিমাণ</Col>
                      <Col span={5}>
                        {`Total: ${totalBatchProductQty} ${completeUnit?.name} | Added: ${values?.usedQuantity} ${completeUnit?.name}`}
                      </Col>
                      <Col span={7}>
                        Items Sub Total Amount/পণ্যসমূহের একত্রিত দাম
                      </Col>
                      <Col span={3}>{getEsDecFormat(values?.itemsTotal)}</Col>
                    </Row>

                    <Row gutter={[3, 1]} className="product-row bb1px">
                      <Col span={6}>Grand Total/সর্বমোট দাম</Col>

                      <Col span={5} offset={12}>
                        <span className="txt-format">
                          {getEsDecFormat(values?.grandTotal)}
                        </span>
                      </Col>
                    </Row>

                    <Row gutter={[3, 1]} className="product-row bb1px">
                      <Col span={6}>Paid/পরিশোধ</Col>
                      <Col span={5} offset={12}>
                        <Form.Item name="paiedAmount">
                          <Input />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={[3, 1]} className="product-row bb1px">
                      <Col span={8}>Remaining Payable Amount/বকেয়া টাকার পরিমাণ</Col>
                      <Col span={5} offset={10}>
                        <span className="txt-format">
                          {getEsDecFormat(values?.creditAmount)}
                        </span>
                      </Col>
                    </Row>

                    <Row gutter={[12, 2]} className="product-row bb1px">
                      <Col span={16}></Col>

                      <Col span={4}>
                        <EsButton
                          type=""
                          text="Rest"
                          block
                          onClick={() => {
                            form.resetFields();
                          }}
                        />
                      </Col>

                      <Col span={4}>
                        <Form.Item>
                          <EsButton
                            htmlType="submit"
                            type="success"
                            text="Submit"
                            block
                            disabled={isDisable}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </React.Fragment>
                );
              }}
            </Form>
          </Card>
        </Col>
      </Row>
    </Modal>
  );
};

EsModalAddStockForm.propTypes = {
  addBatchToStockAction: PropTypes.func.isRequired,
  getBatchAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {
  addBatchToStockAction,
  getBatchAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EsModalAddStockForm);
