import { Space } from "antd";
import React from "react";
import EsButton from "../../../components/EsUtils/EsButton";
import {
  PlusSquareOutlined,
  LinkOutlined,
  EditTwoTone,
  DeleteOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { isEmptyOrNull } from "../../gen-es/esCheckFunc";
import CstActionLink from "../../../components/EsAction/CstActionLink";
import CstButtonActionLink from "../../../components/EsAction/CstButtonActionLink";
import dateFormat from "dateformat";
import CstBtnActionLink from "../../../components/EsAction/CstBtnActionLink";
import { getDigitToBanglaSongkha } from "../../gen-es/converter";
/**
 *
 * @param {saleItem} addSaleItem get selected sale item by btn action
 * @returns table columns
 */
export const saleReturnItemColumns = (addSaleItem) => [
  {
    title: "#",
    dataIndex: "idx",
    key: "idx",
    className: "sale-stok-item-id",
    render: (value, item, idx) => {
      //esBackLogger.info("Return Sale Item ", item);
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
    render: (v) => getDigitToBanglaSongkha(v),
  },
  {
    title: "বিক্রয়মূল্য",
    dataIndex: "price",
    key: "price",
    render: (v) => getDigitToBanglaSongkha(v),
  },

  {
    title: "Discount",
    dataIndex: "discountRate",
    key: "discountRate",
    render: (dis) => {
      return <span>{getDigitToBanglaSongkha(dis)}%</span>;
    },
  },
  {
    title: "Vat",
    dataIndex: "vatRate",
    key: "vatRate",
    render: (vat) => {
      return <span>{getDigitToBanglaSongkha(vat)}%</span>;
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
                addSaleItem(item);
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

export const saleReturnListColumns = [
  {
    title: "#",
    dataIndex: "idx",
    key: "idx",
    className: "order-customer-id",
    render: (v, i, idx) => {
      return `${idx + 1}`;
    },
  },

  {
    title: "বিক্রয় মূল্য",
    dataIndex: "itemsTotal",
    key: "itemsTotal",
  },
  {
    title: "মোট ডিস্কাউন্ট",
    dataIndex: "totalDiscount",
    key: "totalDiscount",
  },
  {
    title: "সর্বমোট বিক্রয় মূল্য",
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
    render: (date, item, idx) => {
      return <>{dateFormat(date, "d/m/yy")}</>;
    },
  },

  {
    title: "Action",
    dataIndex: "id",
    key: "id",
    render: (value) => {
      return (
        <React.Fragment>
          <Space>
            <CstBtnActionLink
              name={``}
              title="বিস্তারিত"
              key={`action-details-${value}`}
              pathName={`/sales/returns/[id]`}
              query={{ id: value }}
              icon={<FileTextOutlined />}
              type="success"
            />

            <CstBtnActionLink
              pathName={`/sales/returns/delete/[id]`}
              query={{ id: value }}
              name={``}
              title="Delete"
              key={`action-delete-${value}`}
              icon={<DeleteOutlined />}
              type="error"
            />
          </Space>
        </React.Fragment>
      );
    },
  },
];

export const saleReturnItemsColumns = [
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
    render: (dis, item) => {
      return (
        <span>
          {item?.dsicount}({dis}%)
        </span>
      );
    },
  },
  {
    title: "Vat",
    dataIndex: "vatRate",
    key: "vatRate",
    render: (vatRate, item) => {
      return (
        <span>
          {item?.vat}({vatRate}%)
        </span>
      );
    },
  },
  {
    title: "Sub Total",
    dataIndex: "subTotal",
    key: "subTotal",
    render: (subTotal) => {
      return <span>{subTotal}</span>;
    },
  },
];
