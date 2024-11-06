import { Space } from "antd";
import React from "react";
import CstActionLink from "../../../components/EsAction/CstActionLink";
import CstButtonActionLink from "../../../components/EsAction/CstButtonActionLink";
import EsDateFormat from "../../../components/EsUtils/EsDateFormat";

import { FileTextOutlined } from "@ant-design/icons";
import { getCurrenyFormatSongkha } from "../../gen-es/converter";

export const purchaseColumns = [
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
    title: "সরবরাহকারী ",
    dataIndex: "esStakeholder",
    key: "supplier",
    render: (value, item) => {
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
    title: "পণ্য সমূহের মূল্য",
    dataIndex: "itemsTotal",
    key: "itemsTotal",
    render: (v) => getCurrenyFormatSongkha(v),
  },
  {
    title: "ছাড়",
    dataIndex: "lessAdjustment",
    key: "lessAdjustment",
    render: (v) => getCurrenyFormatSongkha(v),
  },
  {
    title: "সমন্বয়",
    dataIndex: "discount",
    key: "discount",
    render: (v) => getCurrenyFormatSongkha(v),
  },

  {
    title: "ক্রয় মূল্য",
    dataIndex: "grandTotal",
    key: "grandTotal",
    render: (v) => getCurrenyFormatSongkha(v),
  },
  {
    title: "পরিশোধিত ",
    dataIndex: "payedAmount",
    key: "payedAmount",
    render: (v) => getCurrenyFormatSongkha(v),
  },
  {
    title: "বকেয়া",
    dataIndex: "creditAmount",
    key: "creditAmount",
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
              key={`action-details-${item.id}`}
              to={`/purchases/${item.id}`}
              icon={<FileTextOutlined />}
            />
          </Space>
        </React.Fragment>
      );
    },
  },
];
