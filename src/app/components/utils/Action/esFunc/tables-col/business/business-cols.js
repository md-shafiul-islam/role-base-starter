import React from "react";

import {
  EditTwoTone,
  DeleteOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { Space } from "antd";
import EsButton from "../../../components/EsUtils/EsButton";
import { getCurrenyFormatSongkha } from "../../gen-es/converter";

export const businessBankAccountCols = (openAction) => {
  return [
    {
      title: "#",
      dataIndex: "idx",
      className: "id-cell",
      key: "idx",
      render: (value, item, idx) => {
        return idx + 1;
      },
    },
    {
      title: "নাম",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "অ্যাকাউন্ট নাম্বার",
      dataIndex: "accountNo",
      key: "accountNo",
    },
    {
      title: "শাঁখা",
      dataIndex: "bankBranch",
      key: "bankBranch",
      render: (branch) => {
        return <span>{branch?.address}</span>;
      },
    },

    {
      title: "ধরণ",
      dataIndex: "type",
      key: "type",
      render: (type) => {
        return <span>{type?.name}</span>;
      },
    },

    {
      title: "ডেবিট",
      dataIndex: "totalDebit",
      key: "totalDebit",
      render: (v) => getCurrenyFormatSongkha(v),
    },

    {
      title: "ক্রেডিট",
      dataIndex: "totalCredit",
      key: "totalCredit",
      render: (v) => getCurrenyFormatSongkha(v),
    },

    {
      title: "",
      dataIndex: "id",
      key: "id",
      render: (value, item, idx) => {
        return (
          <React.Fragment>
            <Space>
              <EsButton
                icon={<FileTextOutlined />}
                type="success"
                onClick={() => {
                  openAction(true, item);
                }}
              />
            </Space>
          </React.Fragment>
        );
      },
    },
  ];
};

export const businessNamePhoneNosCols = (onUpdate, onRemove) => {
  return [
    {
      title: "#",
      dataIndex: "idx",
      className: "id-cell",
      key: "idx",
      render: (value, item, idx) => {
        return idx + 1;
      },
    },
    {
      title: "নাম",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "কানেকশন",
      dataIndex: "lineType",
      key: "lineType",
      render: (type) => {
        return <span>{type?.name}</span>;
      },
    },
    {
      title: "নাম্বার",
      dataIndex: "phoneNo",
      key: "phoneNo",
    },

    {
      title: "ব্যাবহারের ধরণ",
      dataIndex: "office",
      key: "office",
      render: (office) => {
        return <span>{office ? `অফিস` : ``}</span>;
      },
    },

    {
      title: "",
      dataIndex: "id",
      key: "id",
      render: (value, item, idx) => {
        return (
          <React.Fragment>
            <Space>
              <EsButton
                icon={<EditTwoTone />}
                type="success"
                onClick={() => {
                  onUpdate(item);
                }}
              />
              <EsButton
                icon={<DeleteOutlined />}
                type="error"
                onClick={() => {
                  onRemove(item);
                }}
              />
            </Space>
          </React.Fragment>
        );
      },
    },
  ];
};
