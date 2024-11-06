import React from "react";
import { Space } from "antd";
import CstActionLink from "../../../components/EsAction/CstActionLink";
import CstButtonActionLink from "../../../components/EsAction/CstButtonActionLink";
import EsDateFormat from "../../../components/EsUtils/EsDateFormat";

import { FileTextOutlined } from "@ant-design/icons";
import { getCurrenyFormatSongkha } from "../../gen-es/converter";

export const saleReportcolumns = [
  {
    title: "#",
    dataIndex: "idx",
    key: "idx",
    className: "order-customer-id",
    render: (value, item, idx) => {
      return idx + 1;
    },
  },
  {
    title: "ক্রেতা",
    dataIndex: "customer",
    key: "customer",
    render: (value, item) => {
      return (
        <>
          <CstActionLink
            to={`/customers/${value?.id}`}
            name={value?.name}
            title={value?.name}
          />
        </>
      );
    },
  },
  {
    title: "আইটেম টোটাল",
    dataIndex: "itemTotal",
    key: "itemsTotal",
    render: (v) => getCurrenyFormatSongkha(v),
  },
  {
    title: "ডিসকাউন্ট পর পরিমাণ",
    dataIndex: "amountAfterDiscount",
    key: "amountAfterDiscount",
    render: (v) => getCurrenyFormatSongkha(v),
  },
  {
    title: "সমন্বয় পরিমাণ",
    dataIndex: "lsessAdjustment",
    key: "lsessAdjustment",
    render: (v) => getCurrenyFormatSongkha(v),
  },
  {
    title: "সর্বমোট মূল্য",
    dataIndex: "grandTotal",
    key: "grandTotal",
    render: (v, item) => {
      let grandTotal = item?.amountAfterDiscount - item?.lsessAdjustment;
      return getCurrenyFormatSongkha(grandTotal);
    },
  },
  {
    title: "পরিশোধিত",
    dataIndex: "payAmount",
    key: "payAmount",
    render: (v) => getCurrenyFormatSongkha(v),
  },
  {
    title: "বকেয়া",
    dataIndex: "dueAmount",
    key: "dueAmount",
    render: (v) => getCurrenyFormatSongkha(v),
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
              name={``}
              title="বিস্তারিত"
              key={`action-details-sale-${item.id}`}
              to={`/sales/${item.id}`}
              icon={<FileTextOutlined />}
            />
          </Space>
        </React.Fragment>
      );
    },
  },
];
