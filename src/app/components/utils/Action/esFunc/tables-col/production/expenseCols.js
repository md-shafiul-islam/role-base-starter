import { Space } from "antd";
import React from "react";
import CstButtonActionLink from "../../../components/EsAction/CstButtonActionLink";
import EsDateFormat from "../../../components/EsUtils/EsDateFormat";

import {
  EditTwoTone,
  DeleteOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import EsBadge from "../../../components/EsUtils/EsBadge";
import EsButton from "../../../components/EsUtils/EsButton";

export const expenseColumns = [
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
    dataIndex: "name",
    key: "name",
  },

  {
    title: "বিবরণ",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "খরচের শ্রেণী",
    dataIndex: "batchExpenseCategory",
    key: "batchExpenseCategory",
  },

  {
    title: "পরিমাণ",
    dataIndex: "qty",
    key: "qty",
  },
  {
    title: "দাম/মূল্য",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "সর্বমোট",
    dataIndex: "grandTotal",
    key: "grandTotal",
  },
  {
    title: "তারিখ",
    dataIndex: "dateGroup",
    key: "dateGroup",
    render: (date) => {
      return <EsDateFormat date={date} format="d/m/yy" />;
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
              key={`action-batch-expenses-details-${item.id}`}
              to={`/production/batch-expenses/${item.id}`}
              icon={<FileTextOutlined />}
            />

            <CstButtonActionLink
              name={``}
              title="Edit"
              key={`action-batch-expenses-edit-${item.id}`}
              to={`/production/batch-expenses/edit/${item.id}`}
              icon={<EditTwoTone />}
            />
            <CstButtonActionLink
              name={``}
              title="Delete"
              key={`action-batch-expenses-delete-${item.id}`}
              to={`/production/batch-expenses/delete/${item.id}`}
              icon={<DeleteOutlined />}
            />
          </Space>
        </React.Fragment>
      );
    },
  },
];

export const expenseBatchColumns = (batch, expenseDetailAction) => {
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
      title: "নাম",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "বিবরণ",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "খরচের শ্রেণী",
      dataIndex: "batchExpenseCategory",
      key: "batchExpenseCategory",
      render: (category) => `${category?.bnName}`,
    },

    {
      title: "পরিমাণ",
      dataIndex: "qty",
      key: "qty",
    },
    {
      title: "দাম/মূল্য",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "সর্বমোট",
      dataIndex: "grandTotal",
      key: "grandTotal",
    },
    {
      title: "তারিখ",
      dataIndex: "dateGroup",
      key: "dateGroup",
      render: (date) => {
        return <EsDateFormat date={date} format="d/m/yy" />;
      },
    },
    {
      title: "Status",
      dataIndex: "approve",
      key: "approve",
      width: 100,
      render: (approve, item) => {
        if (!item?.notCountable) {
          return approve == 1 ? (
            <EsBadge type="success" text="Approved" />
          ) : approve == 3 ? (
            <EsBadge type="error" text="Rejected" />
          ) : (
            <EsBadge type="info" text="Pending" />
          );
        } else {
          return (
            <span style={{ textWrap: `nowrap` }}>
              <EsBadge type="success" text="Not Countable" />
            </span>
          );
        }
      },
    },

    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (value, item) => {
        return (
          <React.Fragment>
            <Space>
              <EsButton
                onClick={() => {
                  expenseDetailAction(value);
                }}
                icon={<FileTextOutlined />}
                type="cool"
              />
              {item.approve === 0 ? (
                <CstButtonActionLink
                  name={``}
                  title="Edit"
                  key={`action-edit-${value}`}
                  to={`/production/batch-expenses/edit/${value}`}
                  icon={<EditTwoTone />}
                />
              ) : (
                ""
              )}
            </Space>
          </React.Fragment>
        );
      },
    },
  ];
};
