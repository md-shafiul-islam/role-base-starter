import {
  EditTwoTone,
  DeleteOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { Space } from "antd";
import EsButton from "../../../components/EsUtils/EsButton";
import React from "react";

export const branchsCols = (onUpdate, onRemove, onDetails) => {
  return [
    {
      title: "#",
      dataIndex: "idx",
      key: "idx",
      className: "id-cell",
      render: (value, item, idx) => {
        return idx + 1;
      },
    },
    {
      title: "Bank Name",
      dataIndex: "bank",
      key: "bank",
      render: (bank) => {
        return (
          <React.Fragment>
            <b>{bank?.name}</b>
          </React.Fragment>
        );
      },
    },
    {
      title: "Branchs Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Contact No.",
      dataIndex: "phoneNo",
      key: "phoneNo",
    },

    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (id, item) => {
        return (
          <Space>
            <EsButton
              onClick={() => {
                onDetails(item);
              }}
              type="success"
              icon={<FileTextOutlined />}
            />
            <EsButton
              onClick={() => {
                onUpdate(item);
              }}
              type="cool"
              icon={<EditTwoTone />}
            />
            <EsButton
              onClick={() => {
                onRemove(item);
              }}
              type="error"
              icon={<DeleteOutlined />}
            />
          </Space>
        );
      },
    },
  ];
};

const bankBranchesCols = (onUpdate, onRemove, onDetails) => {
  return [
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
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "description",
      dataIndex: "description",
      key: "description",
    },

    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (id, item) => {
        return (
          <Space>
            <EsButton
              onClick={() => {
                onDetails(item);
              }}
              type="success"
              icon={<FileTextOutlined />}
            />
            <EsButton
              onClick={() => {
                onUpdate(item);
              }}
              type="cool"
              icon={<EditTwoTone />}
            />
            <EsButton
              onClick={() => {
                onRemove(item);
              }}
              type="error"
              icon={<DeleteOutlined />}
            />
          </Space>
        );
      },
    },
  ];
};
