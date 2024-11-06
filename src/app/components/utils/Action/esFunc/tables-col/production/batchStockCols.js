import { Space } from "antd";
import React from "react";
import CstButtonActionLink from "../../../components/EsAction/CstButtonActionLink";
import EsDateFormat from "../../../components/EsUtils/EsDateFormat";

import {
  EditTwoTone,
  DeleteOutlined,
  FileTextOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import EsBadge from "../../../components/EsUtils/EsBadge";
import EsButton from "../../../components/EsUtils/EsButton";

export const batchStockColumns = () => {
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
      render: (v, item) => {
        return <Space>
          <CstButtonActionLink
            name={v}
            title="বিস্তারিত"
            key={`action-details-${item.id}`}
            to={`/production/batches/${item.batchId}`}
            icon={<FileTextOutlined />}
          />
        </Space>
      }
    },

    {
      title: "নোট",
      dataIndex: "note",
      key: "note",
    },
    {
      title: "সর্বমোট",
      dataIndex: "grandTotal",
      key: "grandTotal",
    },

    {
      title: "পরিশোধিত",
      dataIndex: "paiedAmount",
      key: "paiedAmount",
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
      render: (approve, item) => {
        return (
          <React.Fragment>
            <Space>
              {approve == 1 ? (
                <EsBadge text="Approve" type="success" />
              ) : ""}
              {item?.approve === 0 ? <EsBadge text="Pending" type="" /> : ""}
            </Space>
          </React.Fragment>
        );
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
                key={`action-details-stocks-${item.id}`}
                to={`/production/stocks/${item.id}`}
                icon={<FileTextOutlined />}
              />

              <CstButtonActionLink
                name={``}
                title="Edit"
                key={`action-edit-stocks-${item.id}`}
                to={`/production/stocks/edit/${item.id}`}
                icon={<EditTwoTone />}
              />
              <CstButtonActionLink
                name={``}
                title="Delete"
                key={`action-delete-stocks-${item.id}`}
                to={`/production/stocks/delete/${item.id}`}
                icon={<DeleteOutlined />}
              />
            </Space>
          </React.Fragment>
        );
      },
    },
  ];
};
