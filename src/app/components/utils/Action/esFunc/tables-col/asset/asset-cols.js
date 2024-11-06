import { Space } from "antd";
import React from "react";
import CstBtnActionLink from "../../../components/EsAction/CstBtnActionLink";
import {
  EditTwoTone,
  DeleteOutlined,
  FileTextOutlined,
} from "@ant-design/icons";

export const assetIndexColumns = [
  {
    title: "#",
    dataIndex: "idx",
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
    title: "পণ্যের পরিমাণ/সংখ্যা",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "দাম",
    dataIndex: "amount",
    key: "amount",
  },

  {
    title: "মোট দাম",
    dataIndex: "totalAmount",
    key: "totalAmount",
  },

  {
    title: "সর্বমোট দাম",
    dataIndex: "grandTotal",
    key: "grandTotal",
  },

  {
    title: "পরিশোধিত",
    dataIndex: "payedAmount",
    key: "payedAmount",
  },
  {
    title: "বকেয়া/ক্রেডিট",
    dataIndex: "creditAmount",
    key: "creditAmount",
  },

  {
    title: "Action",
    dataIndex: "id",
    key: "id",
    render: (value, item, idx) => {
      return (
        <React.Fragment>
          <Space>
            <CstBtnActionLink
              name={`Details`}
              title="বিস্তারিত"
              key={`action-details-${value}`}
              pathName={`/assets/[id]`}
              query={{ id: value }}
              icon={<FileTextOutlined />}
            />
          </Space>
        </React.Fragment>
      );
    },
  },
];
