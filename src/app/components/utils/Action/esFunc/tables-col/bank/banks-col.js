import {
  EditTwoTone,
  DeleteOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { Space } from "antd";
import EsButton from "../../../components/EsUtils/EsButton";
import React from "react";
import { getShortText } from "../../gen-es/converter";

export const bankListCols = (onUpdate, onRemove, onDetails) => {
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
      title: "Logo",
      dataIndex: "logoUrl",
      key: "logoUrl",
      render: (v) => {
        return (
          <React.Fragment>
            <div
              className="logo-area"
              style={{ backgroundImage: `url(${v})` }}
            ></div>
          </React.Fragment>
        );
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
      render: (v) => `${getShortText(v, 50)}`,
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
