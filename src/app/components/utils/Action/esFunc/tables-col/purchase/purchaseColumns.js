import { Space } from "antd";
import EsButton from "../../../components/EsUtils/EsButton";
import { PlusSquareOutlined, FileTextOutlined } from "@ant-design/icons";
import React from "react";
import CstActionLink from "../../../components/EsAction/CstActionLink";
import EsDateFormat from "../../../components/EsUtils/EsDateFormat";
import CstButtonActionLink from "../../../components/EsAction/CstButtonActionLink";

/**
 *
 * @param {purchaseItem} addSaleItem get selected sale item by btn action
 * @returns table columns
 */
export const purchaseReturnItemColumns = (addPurchaseItem) => [
  {
    title: "#",
    dataIndex: "idx",
    key: "idx",
    className: "sale-stok-item-id",
    render: (value, item, idx) => {
      return idx + 1;
    },
  },
  {
    title: "চালান নং.",
    dataIndex: "invId",
    key: "invId",
  },
  {
    title: "পণ্যর নাম",
    dataIndex: "name",
    key: "name",
    className: "sale-stok-item-title",
  },
  {
    title: "পরিমাণ",
    dataIndex: "qty",
    key: "quantity",
  },
  {
    title: "বিক্রয়মূল্য",
    dataIndex: "price",
    key: "price",
  },

  {
    title: "Discount",
    dataIndex: "discountRate",
    key: "discountRate",
    render: (dis) => {
      return <span>{dis}%</span>;
    },
  },
  {
    title: "Tax",
    dataIndex: "taxRate",
    key: "taxRate",
    render: (tax) => {
      return <span>{tax > 0 ? tax : 0}%</span>;
    },
  },

  {
    title: "Action",
    dataIndex: "publicId",
    key: "publicId",
    render: (value, item, idx) => {
      return (
        <React.Fragment>
          <Space>
            <EsButton
              onClick={() => {
                addPurchaseItem(item);
              }}
              type={`success`}
              text="Add"
              icon={<PlusSquareOutlined />}
            />
          </Space>
        </React.Fragment>
      );
    },
  },
];

export const purchaseReturnInvoiceColumns = [
  {
    title: "#",
    dataIndex: "idx",
    key: "idx",
    render: (value, item, idx) => {
      return idx + 1;
    },
  },
  {
    title: "সরবরাহকারী ",
    dataIndex: "stakeholder",
    key: "stakeholder",
    render: (value) => {
      return (
        <>
          <CstActionLink
            to={`/suppliers/${value?.id}`}
            name={value?.name}
            title={value?.name}
          />
        </>
      );
    },
  },

  {
    title: "আইটেম টোটাল",
    dataIndex: "itemsTotal",
    key: "itemsTotal",
  },

  {
    title: "ফেরত ফি/খরচ",
    dataIndex: "returnFees",
    key: "returnFees",
  },
  {
    title: "সমন্বয়",
    dataIndex: "lessAdustment",
    key: "lessAdustment",
  },
  {
    title: "সর্বমোট",
    dataIndex: "grandTotal",
    key: "grandTotal",
  },
  {
    title: "পরিশোধিত",
    dataIndex: "paidAmount",
    key: "paidAmount",
  },
  {
    title: "বকেয়া",
    dataIndex: "creditAmount",
    key: "creditAmount",
  },
  {
    title: "তারিখ",
    dataIndex: "date",
    key: "date",
    render: (v) => {
      return <EsDateFormat date={v} format="dd-mm-yyyy" />;
    },
  },

  {
    title: "Action",
    dataIndex: "id",
    key: "id",
    render: (value, item, idx) => {
      return (
        <React.Fragment>
          <Space>
            <CstButtonActionLink
              name={`Details`}
              title="বিস্তারিত"
              key={`action-details-${item.id}`}
              to={`/purchases/returns/${item.id}`}
              icon={<FileTextOutlined />}
            />
          </Space>
        </React.Fragment>
      );
    },
  },
];

export const purchaseReturnItemReadOnlyColumns = [
  {
    title: "#",
    dataIndex: "idx",
    key: "idx",
    className: "sale-stok-item-id",
    render: (value, item, idx) => {
      return idx + 1;
    },
  },

  {
    title: "রেফারেন্স চালান নং.",
    dataIndex: "refInvId",
    key: "refInvId",
  },

  {
    title: "পণ্যর নাম",
    dataIndex: "name",
    key: "name",
    className: "return-item-title",
  },
  {
    title: "পরিমাণ",
    dataIndex: "qty",
    key: "quantity",
  },
  {
    title: "বিক্রয়মূল্য",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "পণ্যর মোট মূল্য",
    dataIndex: "itemSub",
    key: "itemSub",
  },

  {
    title: "Discount",
    dataIndex: "discountRate",
    key: "discountRate",
    render: (dis, item) => {
     
      return (
        <span>{`${item && item.discount ? item.discount : ""} (${dis}%)`}</span>
      );
    },
  },
  {
    title: "Tax",
    dataIndex: "taxRate",
    key: "taxRate",
    render: (taxRate, item) => {
      return <span>{`${item && item.tax ? item.tax : ""} (${taxRate}%)`}</span>;
    },
  },
  {
    title: "Sub Total",
    dataIndex: "subTotal",
    key: "subTotal",
    render: (amount) => {
      return <span>{amount}</span>;
    },
  },
];
