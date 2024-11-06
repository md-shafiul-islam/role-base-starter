import { Space } from "antd";
import React from "react";
import CstButtonActionLink from "../../../components/EsAction/CstButtonActionLink";
import EsDateFormat from "../../../components/EsUtils/EsDateFormat";

import {
  EditTwoTone,
  DeleteOutlined,
  FileTextOutlined,
} from "@ant-design/icons";

export const byProductsColumns = [
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
    title: "ব্যাচ নং",
    dataIndex: "batchCode",
    key: "batchCode",
  },
  {
    title: "নাম",
    dataIndex: "item",
    key: "item",
    render: (item) => {
      return <>{`${item?.form?.name} ${item?.name} ${item?.unitName}`}</>;
    },
  },

  {
    title: "নোট/Note",
    dataIndex: "note",
    key: "note",
  },
  {
    title: "পরিমাণ",
    dataIndex: "qty",
    key: "qty",
  },

  {
    title: "দাম/মূল্য",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "সর্বমোট",
    dataIndex: "totalAmount",
    key: "totalAmount",
  },
  {
    title: "তারিখ",
    dataIndex: "date",
    key: "date",
    render: (date) => {
      return <EsDateFormat date={date} format="d/m/yy" />;
    },
  },

  {
    title: "Action",
    dataIndex: "publicId",
    key: "publicId",
    render: (value) => {
      return (
        <React.Fragment>
          <Space>
            <CstButtonActionLink
              name={``}
              title="বিস্তারিত"
              key={`action-details-by-products-${value}`}
              to={`/production/by-products/${value}`}
              icon={<FileTextOutlined />}
            />

            <CstButtonActionLink
              name={``}
              title="Edit"
              key={`action-edit-by-products-${value}`}
              to={`/production/by-products/edit/${value}`}
              icon={<EditTwoTone />}
            />
          </Space>
        </React.Fragment>
      );
    },
  },
];

export const byProductsBatchColumns = (batch) => {
  return [
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
      title: "ব্যাচ নং",
      dataIndex: "batchCode",
      key: "batchCode",
      render: () => `${batch?.batchCode}`,
    },
    {
      title: "নাম",
      dataIndex: "item",
      key: "item",
      render: (item) => {
        return <>{`${item?.form?.name} ${item?.name} ${item?.unitName}`}</>;
      },
    },

    {
      title: "নোট/Note",
      dataIndex: "note",
      key: "note",
    },
    {
      title: "পরিমাণ",
      dataIndex: "qty",
      key: "qty",
    },

    {
      title: "দাম/মূল্য",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "সর্বমোট",
      dataIndex: "totalAmount",
      key: "totalAmount",
    },
    {
      title: "তারিখ",
      dataIndex: "date",
      key: "date",
      render: (date) => {
        return <EsDateFormat date={date} format="d/m/yy" />;
      },
    },

    {
      title: "Action",
      dataIndex: "publicId",
      key: "publicId",
      render: (value) => {
        return (
          <React.Fragment>
            <Space>
              <CstButtonActionLink
                name={``}
                title="বিস্তারিত"
                key={`action-details-${value}`}
                to={`/production/by-products/${value}`}
                icon={<FileTextOutlined />}
              />

              <CstButtonActionLink
                name={``}
                title="Edit"
                key={`action-edit-${value}`}
                to={`/production/by-products/edit/${value}`}
                icon={<EditTwoTone />}
              />
            </Space>
          </React.Fragment>
        );
      },
    },
  ];
};
