import { Space } from "antd";
import React from "react";
import CstButtonActionLink from "../../../components/EsAction/CstButtonActionLink";
import EsDateFormat from "../../../components/EsUtils/EsDateFormat";

import {
  EditTwoTone,
  DeleteOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { getEsDecFormat } from "../../gen-es/converter";

export const materialColumns = [
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
    title: "সর্বমোট পরিমাণ",
    dataIndex: "parentUnit",
    key: "parentUnit",
    render: (unit, item) => {
      return <>{`${getEsDecFormat(item?.qty)} | (${unit?.name})`}</>;
    },
  },

  {
    title: "কাচামালের মূল্য",
    dataIndex: "grandTotal",
    key: "grandTotal",
  },

  {
    title: "পরিশোধিত পরিমাণ",
    dataIndex: "paidAmount",
    key: "paidAmount",
  },
  {
    title: "বকেয়া পরিমাণ",
    dataIndex: "creditAmount",
    key: "creditAmount",
  },
  {
    title: "তারিখ",
    dataIndex: "date",
    key: "date",
    render: (date) => {
      return <EsDateFormat format="d/m/yy" date={date} />;
    },
  },
  {
    title: "Action",
    dataIndex: "publicId",
    key: "publicId",
    render: (value, item) => {
      return (
        <React.Fragment>
          <Space>
            <CstButtonActionLink
              name={``}
              title="বিস্তারিত"
              key={`action-detail-materials-${value}`}
              to={`/production/raw-materials/${value}`}
              icon={<FileTextOutlined />}
            />

            <CstButtonActionLink
              name={``}
              title="Edit"
              key={`action-edit-materials-${value}`}
              to={`/production/raw-materials/edit/${value}`}
              icon={<EditTwoTone />}
            />
            <CstButtonActionLink
              name={``}
              title="Delete"
              key={`action-delete-materials-${value}`}
              to={`/production/raw-materials/delete/${value}`}
              icon={<DeleteOutlined />}
            />
          </Space>
        </React.Fragment>
      );
    },
  },
];

export const materialBatchColumns = (batch) => {
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
      title: "সর্বমোট পরিমাণ",
      dataIndex: "parentUnit",
      key: "parentUnit",
      render: (unit, item) => {
        return <>{`${getEsDecFormat(item?.qty)} | (${unit?.name})`}</>;
      },
    },

    {
      title: "কাচামালের মূল্য",
      dataIndex: "grandTotal",
      key: "grandTotal",
    },

    {
      title: "পরিশোধিত পরিমাণ",
      dataIndex: "paidAmount",
      key: "paidAmount",
    },
    {
      title: "বকেয়া পরিমাণ",
      dataIndex: "creditAmount",
      key: "creditAmount",
    },
    {
      title: "তারিখ",
      dataIndex: "date",
      key: "date",
      render: (date) => {
        return <EsDateFormat format="d/m/yy" date={date} />;
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
                key={`action-detail-${value}`}
                to={`/production/raw-materials/${value}`}
                icon={<FileTextOutlined />}
              />

              <CstButtonActionLink
                name={``}
                title="Edit"
                key={`action-edit-${value}`}
                to={`/production/raw-materials/edit/${value}`}
                icon={<EditTwoTone />}
              />
              <CstButtonActionLink
                name={``}
                title="Delete"
                key={`action-delete-${value}`}
                to={`/production/raw-materials/delete/${value}`}
                icon={<DeleteOutlined />}
              />
            </Space>
          </React.Fragment>
        );
      },
    },
  ];
};
