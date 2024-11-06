import { isEmptyOrNull } from "@/src/app/components/utils/Action/esFunc/gen-es/esCheckFunc";
import { faPlusSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form, Input, Row, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const { Option } = Select;

const InvoiceForm = ({
  initForm,
  insetItem,
  onSubmitAction,
  onFailedAction,
  ...props
}) => {
  const [from] = Form.useForm();

  let productAction = { add: null, remove: null };

  useEffect(() => {
    if (!isEmptyOrNull(insetItem)) {
      insertProductToForm(insetItem);
    }
  }, [insetItem]);
  const onValuesChange = (value, values) => {
    console.log("onValuesChange, values, ", values);
    console.log("onValuesChange, value, ", value);
    const nValues = values;

    let totalDiscount = 0,
      itemsTotal = 0,
      grandTotal = 0,
      changeAmount = 0,
      creditAmount = 0,
      lessAdjustment = Number(values.lessAdjustment);

    if (value.hasOwnProperty("items")) {
      const items = [];
      values.items.forEach((item) => {
        if (!isEmptyOrNull(item)) {
          const nItem = item;
          let qty = Number(item.qty),
            price = Number(item.price),
            discount = Number(item.clientDiscount),
            discountSub = 0,
            subTotal = 0;

          subTotal = qty * price;
          discountSub = qty * discount;
          if (subTotal > 0) {
            nItem.subTotal = subTotal;
            itemsTotal = itemsTotal + subTotal;
          }

          if (discountSub > 0) {
            totalDiscount = totalDiscount + discountSub;
            nItem.discountSub = discountSub;
          }
          items.push(nItem);
        }
      });
      values.items = items;
      values.itemsTotal = itemsTotal;
      grandTotal = itemsTotal - totalDiscount;

      values.clientTotalDiscount = totalDiscount;
      values.grandTotal = grandTotal;
      values.creditAmount = grandTotal;
    }

    if (value.hasOwnProperty("clientTotalDiscount")) {
      grandTotal = values.itemsTotal - values.clientTotalDiscount;
      values.grandTotal = grandTotal;
      values.creditAmount = grandTotal;
    }

    if (value.hasOwnProperty("lessAdjustment")) {
      console.log("lessAdjustment ", lessAdjustment);
      if (lessAdjustment > 0) {
        grandTotal =
          Number(values.itemsTotal) -
          (Number(lessAdjustment) + Number(values.clientTotalDiscount));
      } else {
        grandTotal =
          Number(values.itemsTotal) - Number(values.clientTotalDiscount);
      }
      values.grandTotal = grandTotal;
      values.creditAmount = grandTotal;
    }

    if (value.hasOwnProperty("paidAmount")) {
      let paidAmount = Number(values.paidAmount);

      if (paidAmount > 0) {
        if (paidAmount >= values.grandTotal) {
          values.changeAmount = paidAmount - values.grandTotal;
          values.creditAmount = 0;
        } else {
          values.creditAmount = values.grandTotal - paidAmount;
          values.changeAmount = 0;
        }
      }
    }
    from.setFieldsValue(values);
  };

  const insertProductToForm = (product) => {
    const values = from.getFieldsValue();

    let items = [],
      isExist = false;
    if (Array.isArray(values.items)) {
      items = values.items;
      values.items.forEach((item) => {
        if (item.id === product.id) {
          isExist = true;
        }
      });
    } else {
      items = [];
    }

    if (!isExist) {
      const {
        flatDiscount,
        id,
        clientDiscount,
        price,
        quantity,
        title,
        isActive,
      } = product;

      if (productAction.add) {
        productAction.add({
          flatDiscount,
          id,
          clientDiscount,
          price,
          quantity,
          title,
          isActive,
          qty: 1,
          subTotal: price,
        });
      }
    }
  };

  return (
    <React.Fragment>
      <Form
        {...layout}
        form={from}
        onFinish={onSubmitAction}
        onFinishFailed={onFailedAction}
        onValuesChange={onValuesChange}
      >
        {(values) => {
          return (
            <div className="grid grid-cols-1 gap-3 invoice-form items-center">
              <div className="grid grid-cols-12">
                <div className="grid grid-cols-12 col-span-5">
                  <div>#</div>
                  <div className="col-span-11">Title</div>
                </div>
                <div className="grid grid-cols-12 col-span-5">
                  <div className="col-span-3">Qty</div>
                  <div className="col-span-5">Price</div>
                  <div className="col-span-4">Discount</div>
                </div>
                <div className="grid grid-cols-12 col-span-2">
                  <div className="col-span-11 text-right pr-5">Sub Total</div>
                  <div className="col-span-1"></div>
                </div>
              </div>

              <Form.List name="items">
                {(items, { add, remove }) => {
                  productAction.add = add;
                  productAction.remove = remove;
                  return (
                    <>
                      {items.map(({ key, name, ...restField }) => {
                        return (
                          <div
                            className={`grid grid-cols-12 border-t py-2 items-center ${
                              items.length === name + 1 ? "border-b" : ""
                            }`}
                          >
                            <div className="grid grid-cols-12 col-span-5">
                              <div>
                                <div>{name + 1}</div>
                              </div>
                              <div className="col-span-11">
                                <div className="col-span-5">
                                  {Array.isArray(values.items)
                                    ? values.items[name]?.title
                                    : ""}
                                </div>
                              </div>
                            </div>

                            <div className="grid grid-cols-12 col-span-5 items-center gap-3">
                              <div className="col-span-3">
                                <Form.Item
                                  className=""
                                  wrapperCol={24}
                                  {...restField}
                                  name={[name, "qty"]}
                                >
                                  <Input placeholder="Qty" />
                                </Form.Item>
                              </div>
                              <div className="col-span-5">
                                <Form.Item
                                  wrapperCol={24}
                                  {...restField}
                                  name={[name, "price"]}
                                >
                                  <Input placeholder="Price" />
                                </Form.Item>
                              </div>
                              <div className="col-span-4">
                                <Form.Item
                                  wrapperCol={24}
                                  {...restField}
                                  name={[name, "clientDiscount"]}
                                >
                                  <Input placeholder="Client Discount" />
                                </Form.Item>
                              </div>
                            </div>

                            <div className="grid grid-cols-12 col-span-2">
                              <div className="col-span-11 text-right pr-3">
                                {Array.isArray(values.items)
                                  ? values.items[name]?.subTotal
                                  : 0}
                              </div>
                              <div className="col-span-1">
                                <span className="flex flex-col items-center justify-center h-full text-red-600 cursor-pointer pt-1">
                                  {
                                    <FontAwesomeIcon
                                      icon={faTrash}
                                      onClick={() => remove(name)}
                                    />
                                  }
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </>
                  );
                }}
              </Form.List>

              {/* Start Es Invoice field */}
              <div className="flex flex-row justify-between items-center border-t mt-5 pt-2">
                <div className="font-bold">Items Total</div>
                <div className="w-52">
                  <Form.Item
                    name="itemsTotal"
                    wrapperCol={24}
                    className="!pb-1"
                    rules={[
                      {
                        required: true,
                        message: "Please input Items Total !",
                      },
                    ]}
                  >
                    <Input placeholder="Items Total" />
                  </Form.Item>
                </div>
              </div>

              <div className="flex flex-row items-center justify-between border-t  pt-2">
                <div className="font-bold">Client Total Discount</div>
                <div className="w-52">
                  <Form.Item
                    wrapperCol={24}
                    name="clientTotalDiscount"
                    rules={[
                      {
                        required: true,
                        message: "Please input Client Total Discount!",
                      },
                    ]}
                  >
                    <Input placeholder="Client Total Discount " />
                  </Form.Item>
                </div>
              </div>

              <div className="flex flex-row justify-between border-t  pt-2">
                <div className="font-bold">Less Adjustment</div>
                <div className="w-52">
                  <Form.Item wrapperCol={24} name="lessAdjustment">
                    <Input placeholder="Adjustment " />
                  </Form.Item>
                </div>
              </div>

              <div className="flex flex-row justify-between border-t  pt-2">
                <div className="font-bold">Grand Total</div>
                <div className="w-52">
                  <Form.Item
                    wrapperCol={24}
                    name="grandTotal"
                    rules={[
                      {
                        required: true,
                        message: "Please input Grand Total!",
                      },
                    ]}
                  >
                    <Input placeholder="Grand Total " />
                  </Form.Item>
                </div>
              </div>

              <div className="flex flex-row justify-between border-t  pt-2">
                <div className="font-bold">Paid Amount</div>
                <div className="w-52">
                  <Form.Item
                    wrapperCol={24}
                    name="paidAmount"
                    rules={[
                      {
                        required: true,
                        message: "Please input Paid Amount",
                      },
                    ]}
                  >
                    <Input placeholder="Paid Amount " />
                  </Form.Item>
                </div>
              </div>

              <div className="flex flex-row justify-between border-t  pt-2">
                <div className="font-bold">Credit Amount</div>
                <div className="w-52">
                  <Form.Item
                    wrapperCol={24}
                    name="creditAmount"
                    rules={[
                      {
                        required: true,
                        message: "Please input Credit Amount",
                      },
                    ]}
                  >
                    <Input placeholder="Credit Amount" />
                  </Form.Item>
                </div>
              </div>

              <div className="flex flex-row justify-between border-t  pt-2">
                <div className="font-bold">Change Amount</div>
                <div className="w-52">
                  <Form.Item
                    wrapperCol={24}
                    name="changeAmount"
                    rules={[
                      {
                        required: true,
                        message: "Please input Change Amount",
                      },
                    ]}
                  >
                    <Input placeholder="Change Amount" />
                  </Form.Item>
                </div>
              </div>

              <div className="flex flex-row justify-between border-t  pt-2">
                <div className="font-bold">Vendor Note</div>
                <div className="w-52 sm:w-full xs:w-full md:w-1/2">
                  <Form.Item wrapperCol={24} name="vendorNote">
                    <TextArea placeholder="Vendor Note" />
                  </Form.Item>
                </div>
              </div>
              {/* End Es Invoice field */}

              <div className="flex flex-row items-center gap-6 border-t  pt-2 text-white font-semibold">
                <button
                  htmlType="submit"
                  className="bg-green-600 px-5 py-2 shadow-2xl"
                >
                  Add Invoice
                </button>
                <button
                  className="bg-red-600 px-5 py-2 shadow-2xl"
                  onClick={() => {
                    from.resetFields();
                  }}
                >
                  Rest Field
                </button>
              </div>
            </div>
          );
        }}
      </Form>
    </React.Fragment>
  );
};

export default InvoiceForm;
